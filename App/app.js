'use strict';

var express = require('express');
var app = express();

var http   = require('http').Server(app);
var io = require('socket.io')(http);

var Store = require('./store/Store');
var store = new Store();

require('./routes.js')(app)
require('./config.js')(app)

io.on('connection', function (socket) {
  socket.emit('connection', { connected: true });

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

  socket.on('client/orderRequest', function (request) {
    console.log("CLIENT: Order request received...");

    let dispatchers = store.getDispatcherSockets();

    for (var dispatcher of dispatchers) {
      console.log("Sending request to dispatcher");
      dispatcher.emit('dispatcher/orderRequest', request);
    }
  });

  // ----------------------------------------
  //  DISPATCHER
  // ----------------------------------------

  socket.on('dispatcher/login', function (data) {
    console.log("A dispatcher has logged on!");
    store.addDispatcherSocket(socket);

    socket.emit("currentQueue", { orders: [], trips: [], cars: []} );
  });

});

var server = http.listen(app.get('port'), function () {
  console.log('Server listening on port ' + app.get('port'));
});
