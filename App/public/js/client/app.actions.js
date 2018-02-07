const actions = {
  /**
   * Attempts to login with the specified credentials
   *
   * @param  {Object} credentials The email and password of the user
   */
  login: function (credentials) {
    router.push('/client/wait');
    socket.emit('client/login', credentials);
  },
  /**
   * Sends a booking request to the server.
   *
   * @return {Object} order The booking details
   */
  sendOrder: function (order) {
    order.client = this.account;

    router.push('');
    socket.emit('client/order/request', order);
  },
  /**
   * Send a confirmation of the current order, stored in the Vue instance's
   * data property 'currentBooking'.
   */
  sendConfirmation: function (response) {
    router.push(''); // TODO
    
    let message = { id: this.currentBooking.id, response: response  };
    socket.emit('client/order/confirm', message);
  }
}
