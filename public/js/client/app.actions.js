const actions = {
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
   * Logs out the current account and redirects back to the login screen
   *
   */
  logout: function () {
    this.account = null;
    router.push('/client');
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
    order.client_id = this.account.id;

    router.push('/client/order/wait');
    socket.emit('client/order/request', order);
  },
  /**
   * Cancels a booking requests.
   *
   * @param  {Object} order The booking details.
   */
  cancelOrder: function (order) {
    console.log("NOT IMPLEMENTED!");
  },
  /**
   * Cancels a trip.
   *
   * @param  {Object} trip The trip to cancel.
   */
  cancelTrip: function (trip) {
    delete this.account.trips[trip.id];
    router.push('/client/trips/');
    socket.emit('client/order/cancel', trip);
  },
  /**
   * Send a confirmation of the current order, stored in the Vue instance's
   * data property 'currentOrder'.
   */
  sendConfirmation: function (response) {
    router.push('/client/order/done');
    let message = {id: this.temporary.currentOrder.id, response: response};
    socket.emit('client/order/confirmation', message);
  },
  /**
   * Assings the specified trip to the current trip variable and
   * redirects to trip view.
   *
   * @param  {Object} trip The trip to view.
   */
  displayTripDetails: function (trip) {
    this.temporary.currentTrip = trip;
    if (trip == this.activeTrip) {
      router.push('/client/trip/active')
    }
    else {
      router.push('/client/trip');
    }
  },
  /**
   * Toggles the menu.
   */
  toggleMenu: function () {
    this.menuIsActive = !this.menuIsActive;
  }
};
