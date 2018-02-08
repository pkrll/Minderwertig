'use strict';

var express = require('express');
var app = express();

var http = require('http').Server(app);
var io = require('socket.io')(http);

var Store = require('./store/Store');
var store = new Store();

require('./routes.js')(app)
require('./config.js')(app)

io.on('connection', function (socket) {
  socket.emit('connection', {connected: true});

  // ----------------------------------------
  //  CLIENT
  // ----------------------------------------

  socket.on('client/login', function (request) {
    console.log("CLIENT: Attempting to login...");
    let account = store.retrieveClient(request.email, request.password);

    if (account != null) {
      socket.emit('login/success', account);
      store.addClientSocket(account.id, socket);
      console.log("CLIENT: Login successful!");
    } else {
      socket.emit('login/failure', "Wrong e-mail or password!");
      console.log("CLIENT: Login failed!");
    }
  });

  socket.on('client/order/request', function (request) {
    console.log("CLIENT: Order request received...");

    store.addOrder(request);

    let dispatchers = store.getDispatcherSockets();

    for (var dispatcher of dispatchers) {
      console.log("Sending request to dispatcher");
      dispatcher.emit('order/request', request);
    }
  });

  socket.on('client/order/confirmation', function (response) {
    console.log("CLIENT: Order confirmation received");
    console.log(response);
  });

  // ----------------------------------------
  //  DISPATCHER
  // ----------------------------------------

  socket.on('dispatcher/login', function (data) {
    console.log("A dispatcher has logged on!");
    store.addDispatcherSocket(socket);

    socket.emit("login/success", {orders: store.getOrders(), trips: store.getTrips(), cars: []});
  });

  socket.on('dispatcher/order/booking', function (request) {
    console.log("DISPATCHER: New booking received...");
    // FIXME: This may have to change depending on how the data structure ends up looking
    let client = store.getClientSocket(request.client.id);

    client.emit('order/booking', request);
  });

});

var server = http.listen(app.get('port'), function () {
  console.log('Server listening on port ' + app.get('port'));
});
