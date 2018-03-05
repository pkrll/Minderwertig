'use strict';
const socket = io();

const app = new Vue({
  router,
  el: '#app',
  data: data,
  created: created,
  methods: actions,
  mounted: function () {
    this.position = {lat: 0, lng: 0};

    this.map = new google.maps.Map(document.getElementById('my-Map'), {
      zoom: 10,
      center: this.position
    });

    navigator.geolocation.getCurrentPosition(function (position) {
      this.position = { lat: position.coords.latitude,
                        lng: position.coords.longitude
                      };
      this.map.setCenter(this.position);

      this.directionsService = new google.maps.DirectionsService;
      this.directionsDisplay = new google.maps.DirectionsRenderer;

    }.bind(this));
  }
});
