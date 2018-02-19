const actions = {
  /**
   * Sends a booking proposal to user.
   *
   * @param  {Object} order The proposal
   */
  handleOrder: function (order) {

    order.driver_id = 1;
    order.vehicle = {
      "name": "Volvo V70",
      "image_url": "/img/mercedes.jpg"
    };
    order.duration = "01:25";
    order.price = 120.0;

    socket.emit('dispatcher/trip/proposal', order);
  }

}
