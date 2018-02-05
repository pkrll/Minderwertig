const created = function() {

  socket.emit('dispatcher/login', {});
  /**
   * Invoked on login.
   *
   * @param  {object} data The current data
   */
  socket.on('currentQueue', function (data) {
    this.orders = data.orders;
    this.trips  = data.trips;
    this.cars   = data.cars;
  }.bind(this));

  socket.on('dispatcher/orderRequest', function (data) {
    this.orders.push(data);
  }.bind(this));



}
