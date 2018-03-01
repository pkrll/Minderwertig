const created = function () {
  socket.emit('driver/login', { username: "frank", password: "foo" });

  /**
   * Invoked on successful login.
   *
   * @param  {object} account The account of the user.
   */
  socket.on('login/success', function (account) {
    this.account = account;

    // TODO: Fix this shit later
    for (let id in account.trips) {
      this.assignments.push(account.trips[id]);
    }

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
  socket.on('trip/new', function (data) {
    this.assignments.push(data);
  }.bind(this));
}
