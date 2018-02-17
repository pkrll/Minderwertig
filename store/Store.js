'use strict';

const fs = require('fs');

class Store {

  constructor() {
    let accounts = JSON.parse(fs.readFileSync('./store/accounts.json', 'utf8'));

    this.clients = accounts["clients"];
    this.drivers = accounts["drivers"];
    // Holds all the sockets for the different type of users,
    // driver and client sockets indexed by user id.
    this.sockets = {
      clients: {},
      drivers: {},
      dispatchers: []
    };

    this.orders = {};
    this.trips = {};
  }

  addClientSocket(id, socket) {
    this.sockets['clients'][id] = socket;
  }

  getClientSocket(id) {
    return this.sockets['clients'][id];
  }

  addDriverSocket(id, socket) {
    this.sockets['drivers'][id] = socket;
  }

  getDriverSocket(id) {
    return this.sockets['drivers'][id];
  }

  addDispatcherSocket(socket) {
    this.sockets['dispatchers'].push(socket);
  }

  getDispatcherSockets(id) {
    return this.sockets['dispatchers'];
  }

  retrieveClient(email, password) {
    return Store.retrieveUser(email, password, this.clients);
  }

  retrieveDriver(email, password) {
    return Store.retrieveUser(email, password, this.drivers);
  }

  static retrieveUser(email, password, userList) {
    for (let user of userList) {
      if (user.email === email && user.password === password) {
        return user;
      }
    }

    return null;
  }

  /*
   *  Returns a list of all clients
   */
  getAllClients() {
    return this.clients;
  }

  /*
   *  Returns the client with the specified id
   */
  getClient(id) {
    for (let client of this.clients) {
      if (client.uid === id) {
        return client;
      }
    }

    return null;
  }

  /*
   *  Returns a list of all drivers
   */
  getAllDrivers() {
    return this.drivers;
  }

  /*
   *  Returns the driver with the specified id
   */
  getDriver(id) {
    for (let driver of this.drivers) {
      if (driver.uid === id) {
        return driver;
      }
    }

    return null;
  }

  addOrder(order) {
    order.id = this.getNewOrderId();
    this.orders[order.id] = order;
  }

  updateOrder(order) {
    this.orders[order.id] = order;
  }

  getOrder(id) {
    return this.orders[id];
  }

  getOrders() {
    return this.orders;
  }

  removeOrder(id) {
    delete this.orders[id];
  }

  addTrip(trip) {
    trip.id = this.getNewTripId();
    this.trips[trip.id] = trip;

    console.log("TRIPS: " + this.trips);
  }

  getTrip(id) {
    return this.trips[id];
  }

  getTrips() {
    return this.trips;
  }

  removeTrip(id) {
    delete this.trips[id]
  }

  getNewTripId() {
    return this.getNewId(this.trips);
  }

  getNewOrderId() {
    return this.getNewId(this.orders);
  }

  getNewId(object) {
    const lastOrder = Object.keys(object).reduce(function (last, next) {
      return Math.max(last, next);
    }, 0);

    return lastOrder + 1;
  }

}

module.exports = Store;
