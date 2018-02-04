const fs = require('fs');

class Store {

  constructor() {
    let accounts = JSON.parse(fs.readFileSync('./store/accounts.json', 'utf8'));

    this.clients = accounts["clients"];
    this.drivers = accounts["drivers"];

    this.sockets = {
      clients: {},
      drivers: {},
      dispatchers: []
    };

    this.orders = [];
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

  addDispatcherSocket(id, socket) {
    this.sockets['dispatchers'].push(socket);
  }

  getDispatcherSockets(id) {
    return this.sockets['dispatchers'];
  }

  retrieveClient(email, password) {
    return this.retrieveUser(email, password, this.clients);
  }

  retrieveUser(email, password, userList) {
    for (let user of userList) {
      if (user.email == email && user.password == password) {
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
      if (client.uid == id) {
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
      if (driver.uid == id) {
        return driver;
      }
    }

    return null;
  }

  addOrder(order) {
    this.orders.push(order);
  }

}

module.exports = Store;
