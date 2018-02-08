const actions = {
  /**
   * Sends a booking proposal to user.
   *
   * @param  {Object} order The proposal
   */
  handleOrder: function (order) {
    socket.emit('dispatcher/trip/proposal', order);
  }

}
