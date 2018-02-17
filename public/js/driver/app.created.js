const created = function () {
  //socket.emit('driver/login', { email: "c@a.se", password: "foo" });

  /**
   * Invoked on successful login.
   *
   * @param  {object} account The account of the user.
   */
  socket.on('login/success', function (account) {
    this.account = account;
    router.push('/driver/assignments');
  }.bind(this));
  /**
   * Invoked when login has failed.
   *
   * @param  {Object} message The reason for failure.
   */
  socket.on('login/failure', function (message) {
    this.message = message;
    router.push('/driver/login/fail');
  }.bind(this));
  /**
   * Invoked when received a new booking confirmation.
   *
   * @param  {Object} data The booking details.
   */
  socket.on('order/booking', function (data) {
    console.log(data);
  });
}
