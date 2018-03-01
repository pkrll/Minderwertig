const actions = {
  /**
   * Sends a booking proposal to user.
   *
   * @param  {Object} order The proposal
   */
  handleOrder: function (order) {
    socket.emit('dispatcher/trip/proposal', order);
  },
  /**
   * Invoked when dispatcher selects an order.
   *
   * Shows the route of the order.
   *
   * @param  {Object} order The order selected.
   */
  selectOrder: function (order) {
    this.temporary.currentOrder = order;

    if (order.route.geo) {
      let directionsService = new google.maps.DirectionsService;
      let directionsDisplay = new google.maps.DirectionsRenderer;

      directionsDisplay.setMap(this.map);

      directionsService.route({
        origin: this.temporary.currentOrder.route.geo.from,
        destination: this.temporary.currentOrder.route.geo.to,
        waypoints: [],
        optimizeWaypoints: true,
        travelMode: 'DRIVING'
      }, function (response, status) {
        if (status === 'OK') {
          directionsDisplay.setDirections(response);
          this.temporary.currentOrder.duration = response.routes[0].legs[0].duration.value;
        }
      }.bind(this));
    }
  },

  selectTrip: function (trip) {
    if (trip.route.geo) {
      let directionsService = new google.maps.DirectionsService;
      let directionsDisplay = new google.maps.DirectionsRenderer;

      directionsDisplay.setMap(this.map);

      directionsService.route({
        origin: trip.route.geo.from,
        destination: trip.route.geo.to,
        waypoints: [],
        optimizeWaypoints: true,
        travelMode: 'DRIVING'
      }, function (response, status) {
        if (status === 'OK') {
          directionsDisplay.setDirections(response);
        }
      }.bind(this));
    }
  },

  assignDriverToCurrentOrder: function (driverId) {
    if (this.temporary.currentOrder) {
      let order = this.temporary.currentOrder;

      order.driver_id = driverId;
      order.vehicle = {
        "name": "Volvo V70",
        "image_url": "/img/mercedes.jpg"
      };

      order.price = 120.0;

      this.handleOrder(order);
    }
  }

}
