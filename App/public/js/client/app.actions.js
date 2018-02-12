const actions = {
  /**
   * Returns the specified date in milliseconds from the UNIX epoch.
   *
   * @param   {[Int]} date  An array holding the year, month and day of the date.
   * @param   {[Int]} time  An array holding the hour and minutes of the date.
   *
   * @return  {Object} The date in milliseconds.
   */
  getUnixTime: function (date, time) {
    return new Date(date[0], date[1] - 1, date[2], time[0], time[1]).getTime();
  },
  /**
   * Returns a formatted date.
   *
   * @param   {Int} timestamp The date in milliseconds
   *
   * @return  {Object} The date formatted.
   */
  formatDate: function (timestamp) {
    var date = new Date(timestamp);

    var year = date.getFullYear();
    var day = date.getDate();
    var month = date.getMonth();

    return {
      date: day + '/' + (month+1) + '/' + year,
      time: date.getHours() + ':' + date.getMinutes()
    };
  },
  /**
   * Calculates time in minutes until the specified time.
   *
   * @param   {Int} timestamp The date in milliseconds
   *
   * @return  {Object} The time left until timestamp.
   */
  calculateTimeUntil: function (timestamp) {
    var eta = timestamp - new Date().getTime();

    var hours = Math.floor(eta/(1000*60*60) % 24)
    var minutes = Math.floor(eta/(1000*60));

    if (minutes > 59) {
      return hours + ':' + Math.floor(minutes % 60);
    } else {
      return '00:' + minutes;
    }
  },
  /**
   * Attempts to login with the specified credentials
   *
   * @param   {Object} credentials The email and password of the user
   */
  login: function (credentials) {
    router.push('/client/wait');
    socket.emit('client/login', credentials);
  },
  /**
   * Sends a booking request to the server.
   *
   * @param   {Object} order The booking details
   */
  sendOrder: function (order) {
    // The order needs to have an account before sending it to the server
    // The server could add the client property itself, by matching socket
    // to client from the Store, but that requires a lot more logic.
    order.client = this.account;

    router.push('/client/order/wait');
    socket.emit('client/order/request', order);
  },
  /**
   * Send a confirmation of the current order, stored in the Vue instance's
   * data property 'currentOrder'.
   */
  sendConfirmation: function (response) {
    router.push(''); // TODO
    let message = { id: this.temporary.currentOrder.id, response: response  };
    socket.emit('client/order/confirmation', message);
    // TODO: Add currentOrder to our trips array or whatnot, y'all
  }
}
