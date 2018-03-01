'use strict'
var socket = io();

var app = new Vue({
  router,
  el: '#app',
  data: data,
  created: created,
  methods: actions,
  mounted: function() {
    clearInterval(this.sendPosition);
    navigator.geolocation.getCurrentPosition(function (position) {
      this.position = { lat: position.coords.latitude,
                        lng: position.coords.longitude
                      };
      setInterval(this.sendPosition, 1000);
    }.bind(this));
  }
});
