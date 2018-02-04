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
  order: function (booking) {
    router.push('');
    socket.emit('', booking);
  }
}
