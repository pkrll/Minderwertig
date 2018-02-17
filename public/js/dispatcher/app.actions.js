const actions = {
  /**
   * Sends a booking proposal to user.
   *
   * @param  {Object} order The proposal
   */
  handleOrder: function (order) {
    // TEmporary shit

    const driver = {
      "id": 1,
      "username": "ulfi",
      "password": "foo",
      "metadata": {
        "name": "Ulf Sigvardsson",
        "image_url": "",
        "position": {
          "x": 0,
          "y": 0
        },
      },
      "vehicle": {
        "name": "Volvo V70",
        "image_url": "/img/mercedes.jpg"
      }
    }

    order.driver = driver;
    order.duration = "02:25";
    order.price = 540.0;
    socket.emit('dispatcher/trip/proposal', order);
  }

}
