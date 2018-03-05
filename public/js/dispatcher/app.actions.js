const actions = {
  /**
   * Sends a booking proposal to user.
   *
   * @param  {Object} order The proposal
   */
  handleOrder: function (order) {
    this.directionsDisplay.set('directions', null);
    socket.emit('dispatcher/trip/proposal', order);
    this.temporary.currentOrder = null;
  },
  /**
   * Shows the route of the order.
   *
   * @param  {Object} order The order selected.
   */
  selectOrder: function (order) {
    this.temporary.currentOrder = order;

    if (order.route.geo) {
      this.directionsDisplay.set('directions', null);
      this.directionsDisplay.setMap(this.map);

      this.directionsService.route({
        origin: this.temporary.currentOrder.route.geo.from,
        destination: this.temporary.currentOrder.route.geo.to,
        waypoints: [],
        optimizeWaypoints: true,
        travelMode: 'DRIVING'
      }, function (response, status) {
        if (status === 'OK') {
          this.directionsDisplay.setDirections(response);
          this.temporary.currentOrder.price = this.calculatePrice(response.routes[0].legs[0].distance.value);
          this.temporary.currentOrder.duration = response.routes[0].legs[0].duration.value;
        }
      }.bind(this));
    }
  },
  /**
   * Shows the route of the trip.
   *
   * @param  {[type]} trip The selected trip.
   */
  selectTrip: function (trip) {
    if (trip.route.geo) {
      this.directionsDisplay.set('directions', null);
      this.directionsDisplay.setMap(this.map);

      this.directionsService.route({
        origin: trip.route.geo.from,
        destination: trip.route.geo.to,
        waypoints: [],
        optimizeWaypoints: true,
        travelMode: 'DRIVING'
      }, function (response, status) {
        if (status === 'OK') {
          this.directionsDisplay.setDirections(response);
        }
      }.bind(this));
    }
  },
  /**
   * Assigns a driver to the currently selected order.
   *
   * @param  {[type]} driverId The id of the driver.
   */
  assignDriverToCurrentOrder: function (driverId) {
    if (this.temporary.currentOrder) {
      let order = this.temporary.currentOrder;

      order.driver_id = driverId;
      order.vehicle = {
        "name": "Volvo V70",
        "image_url": "/img/mercedes.jpg"
      };

      this.handleOrder(order);
    }
  },

  addDriverMarkerToMap: function (driverId, position) {
    if (this.markers[driverId] == null) {
      this.markers[driverId] = new google.maps.Marker({
        position: position,
        map: this.map,
        title: 'TAXI!'
      });

      this.markers[driverId].addListener('click', function() {
        this.assignDriverToCurrentOrder(driverId);
      }.bind(this));
    } else {
      this.markers[driverId].setPosition(position);
    }
  },

  calculatePrice: function (distanceInMeters) {
    return Math.round(50 + (15 * (distanceInMeters / 1000)));
  }

}
