const created = function () {

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
  }.bind(this));

  socket.on('order/request', function (order) {
    // This ensures that the orders property is reactive
    Vue.set(this.orders, order.id, order);
  }.bind(this));

  socket.on('order/remove', function (id) {
    // This ensures that the orders property is reactive
    Vue.delete(this.orders, id);
  }.bind(this));

  socket.on('trip/new', function (trip) {
    // This ensures that the trips property is reactive
    Vue.set(this.trips, trip.id, trip);
  }.bind(this));

}
