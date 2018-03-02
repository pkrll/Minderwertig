const created = function () {
  // Autologin
  socket.emit('dispatcher/login', {});
  /**
   * Invoked on login.
   *
   * @param  {object} data The current data
   */
  socket.on('login/success', function (data) {
    this.orders = data.orders;
    this.trips = data.trips;
    this.cars = data.cars;

    for (let index in this.cars) {
      let driverId = this.cars[index].id;
      let position = this.cars[index].position;
      this.addDriverMarkerToMap(driverId, position);
    }
  }.bind(this));
  /**
   * Invoked when a new order request has been received.
   *
   * @param  {Object} order The order request.
   */
  socket.on('order/request', function (order) {
    // This ensures that the orders property is reactive
    Vue.set(this.orders, order.id, order);
  }.bind(this));
  /**
   * Invoked when an order should be removed.
   *
   * @param  {Object} id The order id.
   */
  socket.on('order/remove', function (id) {
    // This ensures that the orders property is reactive
    Vue.delete(this.orders, id);
  }.bind(this));
  /**
   * Invoked when a new trip has been received.
   *
   * @param  {Object} trip The new trip.
   */
  socket.on('trip/new', function (trip) {
    // This ensures that the trips property is reactive
    Vue.set(this.trips, trip.id, trip);
  }.bind(this));
  /**
   * Invoked when a driver has begun a trip.
   *
   * @param  {[type]} trip The trip.
   */
  socket.on('trip/begin', function (trip) {
    console.log("Dispatcher received note of begun trip");
  }.bind(this));
  /**.
   * Invoked when a driver position has been updated.
   *
   * @param  {[type]} data The data containing the id of the driver and their position.
   */
  socket.on('position/driver', function (data) {
    this.addDriverMarkerToMap(data.id, data.position);
  }.bind(this));
};
