const created = function () {
  socket.emit('client/login', {email: "a@a.se", password: "foo"});

  /**
   * Invoked on successful login.
   *
   * @param  {object} account The account of the user.
   */
  socket.on('login/success', function (account) {
    this.account = account;
    router.push('/client/order');
  }.bind(this));
  /**
   * Invoked when login has failed.
   *
   * @param  {Object} message The reason for failure.
   */
  socket.on('login/failure', function (message) {
    this.temporary.message = message;
    router.push('/client/login/fail');
  }.bind(this));
  /**
   * Invoked when receiving a new booking confirmation.
   *
   * @param  {Object} data The booking details.
   */
  socket.on('trip/proposal', function (data) {
    this.temporary.currentOrder = data;
    router.push('/client/order/confirmation');
  }.bind(this));
  /**
   * Invoked when client receives a new trip.
   *
   * @param  {Object} trip The trip.
   */
  socket.on('trip/new', function (trip) {
    delete this.temporary.currentOrder;
    this.trips.push(trip);
    console.log(this.trips);
    console.log(trip);
    router.push('/client/trips');
  }.bind(this));
  /**
   * Invoked when client receives an error from the server.
   *
   * @param  {Object} data.message The error message
   */
  socket.on('error', function (data) {
    alert(data.message);
  });
}
