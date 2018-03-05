'use strict';

const express = require('express');
const app = express();

const http = require('http').Server(app);
const io = require('socket.io')(http);

const Store = require('./store/Store');
const store = new Store('./store/accounts.json');

require('./routes')(app);
require('./config')(app);

/**
 * Broadcasts to all dispatchers.
 *
 * @param  {String} message The message to sent.
 * @param  {Object} data    The data to send.
 */
function sendToDispatchers(message, data) {
  let dispatchers = store.getDispatcherSockets();

  for (let dispatcher of dispatchers) {
    console.log("Sending request to dispatcher");
    dispatcher.emit(message, data);
  }
}

io.on('connection', function (socket) {
  socket.emit('connection', {connected: true});

  // ----------------------------------------
  //  CLIENT
  // ----------------------------------------

  /**
   * Listener for ``client/login``.
   *
   * This function checks the user credentials, and sends
   * back the account to the user if it exists, otherwise
   * the user will receive a failure message.
   *
   * @param  {Object} credentials The user credentials.
   */
  socket.on('client/login', function (credentials) {
    console.log("CLIENT: Attempting to login...");
    let account = store.retrieveClient(credentials.email, credentials.password);

    if (account != null) {
      socket.emit('login/success', account);
      store.addClientSocket(account.id, socket);
      console.log("CLIENT: Login successful!");
    } else {
      socket.emit('login/failure', "Wrong e-mail or password!");
      console.log("CLIENT: Login failed!");
    }
  });
  /**
   * Listener for ``client/order/request``.
   *
   * Adds the order request to the store and sends it
   * all connected dispatchers.
   *
   * @param  {Object} order The order request.
   */
  socket.on('client/order/request', function (order) {
    console.log("CLIENT: Order request received...");
    store.addOrder(order);
    sendToDispatchers('order/request', order);
  });
  /**
   * Listener for ``client/order/confirmation``.
   *
   * Confirms or removes an order.
   *
   * @param  {Object} confirmation The confirmation object.
   */
  socket.on('client/order/confirmation', function (data) {
    console.log("CLIENT: Order confirmation received");

    if (data.response === true) {
      // Retrieve the order and add it as a trip
      // This will change the object's id when adding as a trip
      const order = store.getOrder(data.id);

      // If the order does not exists, send back an error.
      if (order === undefined) {
        socket.emit('error', {message: "An error has occurred. Order was not found"});
        return;
      }

      store.addTrip(order); //Ändra detta
      sendToDispatchers('trip/new', order);
      socket.emit('trip/new', order);

      let driver = store.getDriverSocket(order.driver_id);
      if (driver != null) driver.emit('trip/new', order);
    }
    // Remove the order from the list of orders in store
    store.removeOrder(data.id);
  });

  // ----------------------------------------
  //  DISPATCHER
  // ----------------------------------------

  /**
   * Listener for ``dispatcher/login``.
   */
  socket.on('dispatcher/login', function (data) {
    console.log("A dispatcher has logged on!");
    store.addDispatcherSocket(socket);

    socket.emit("login/success", {
      orders: store.getOrders(), trips: store.getTrips(), cars: store.getAllDrivers()
    });
  });
  /**
   * Listener for ``dispatcher/trip/proposal``.
   *
   * Sends a trip proposal to a client.
   *
   * @param  {Object} request The trip proposal
   */
  socket.on('dispatcher/trip/proposal', function (request) {
    console.log("DISPATCHER: New trip proposal received...");
    // FIXME: This may have to change depending on how the data structure ends up looking

    let client = store.getClientSocket(request.client_id);
    // Update the order, with driver info
    store.updateOrder(request);
    client.emit('trip/proposal', request);

    // Remove the order from all dispatcher's order list
    sendToDispatchers('order/remove', request.id);
  });

  // ----------------------------------------
  //  DRIVER
  // ----------------------------------------

  socket.on('driver/login', function (request) {
    console.log("A driver has logged on!");
    let account = store.retrieveDriver(request.username, request.password);

    if (account != null) {
      socket.emit('login/success', account);
      store.addDriverSocket(account.id, socket);
      console.log("DRIVER: Login successful!");
    } else {
      socket.emit('login/failure', "Wrong username or password!");
      console.log("DRIVER: Login failed!");
    }
  });

  socket.on('driver/position', function (data) {
    console.log("Setting position for driver " + data.id);
    store.setDriverPosition(data.id, data.position);
    sendToDispatchers('position/driver', data);
  });

  socket.on('driver/done', function (trip) {
      console.log("Trip finished.");
      let client_id = trip.client_id;
      let client_sc = store.getClientSocket(client_id);
      store.removeTrip(trip.id);
      client_sc.emit('client/done', trip);
      sendToDispatchers('trip/done', trip.id);

  });

  socket.on('driver/begin', function(data) {
    console.log('DISPATCHER: Trip '+ data.id +' began.');
    sendToDispatchers('trip/begin', data.id);
    let trip = store.getTrip(data.id);
    trip.active = true;
    let client_id = trip.client_id;
    let client_sc = store.getClientSocket(client_id);
    client_sc.emit('trip/begin', data);
  });

});

function exitHandler(err) {
  store.save(process.exit);
}

const server = http.listen(app.get('port'), function () {
  console.log('Server listening on port ' + app.get('port'));
  process.on('SIGINT', exitHandler.bind(null));
});
