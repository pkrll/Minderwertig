'use strict';

const fs = require('fs');

class Store {

  constructor(filename) {
    this.filename = (filename !== undefined) ? filename : "store.json";
    this.accounts = JSON.parse(fs.readFileSync(this.filename, 'utf8'));

    this.clients = this.accounts["clients"];
    this.drivers = this.accounts["drivers"];
    // Holds all the sockets for the different type of users,
    // driver and client sockets indexed by user id.
    this.sockets = {
      clients: {},
      drivers: {},
      dispatchers: []
    };

    this.orders = {};
    this.trips = {};

    // Load all saved trips into the trips object
    for (let client of this.clients) {
      Object.assign(this.trips, client.trips);
    }
  }

  save(callback) {
    console.log("Saving file...");

    let json = JSON.stringify(this.accounts, null, 2);

    fs.writeFile(this.filename, json, 'utf8', function writeFileCallback(err) {
      if (err != null) {
        console.log("Could not save file: " + err);
      }

      if (callback !== undefined) callback();
    });
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
      if (client.id === id) {
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
      if (driver.id === id) {
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

    let client = this.getClient(trip.client_id);
    client.trips[trip.id] = trip;
  }

  getTrip(id) {
    return this.trips[id];
  }

  getTrips() {
    return this.trips;
  }

  removeTrip(id) {
    let client = this.getClient(this.trips[id].client_id);
    delete client.trips[id];
    let driver = this.getDriver(this.trips[id].driver_id);
    delete driver.trips[id];
    delete this.trips[id];
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
