'use strict'
var socket = io();

var app = new Vue({
  router,
  el: '#app',
  data: data,
  created: created,
  methods: actions,
  mounted: function() {
    navigator.geolocation.getCurrentPosition(function (position) {
      this.position = { lat: position.coords.latitude,
                        lng: position.coords.longitude
                      };
      setInterval(this.sendPosition, 5000);
    }.bind(this));
  }
});
