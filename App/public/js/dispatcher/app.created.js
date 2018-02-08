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
    this.orders[order.id] = order;
  }.bind(this));

  socket.on('order/remove', function (id) {
    delete this.orders[id];
  }.bind(this));

  socket.on('trip/new', function (trip) {
    this.trips[trip.id] = trip;
  }.bind(this));

}
