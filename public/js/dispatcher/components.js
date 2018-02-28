const menu_view_v = Vue.component('panel-view-v', {
  props: ['app'],
  template: '\
  <div class="menu">\
    <router-link to="/dispatcher" class="active">Bookings</router-link>\
    <router-link to="/dispatcher/trips">Active trips</router-link>\
    <router-link to="/dispatcher/cars">Cars</router-link>\
  </div>'
});

const menu_view_trip_v = Vue.component('panel-view-v', {
  props: ['app'],
  template: '\
  <div class="menu">\
    <router-link to="/dispatcher">Bookings</router-link>\
    <router-link to="/dispatcher/trips" class="active">Active trips</router-link>\
    <router-link to="/dispatcher/cars">Cars</router-link>\
  </div>'
});

const menu_view_cars_v = Vue.component('panel-view-v', {
  props: ['app'],
  template: '\
  <div class="menu">\
    <router-link to="/dispatcher">Bookings</router-link>\
    <router-link to="/dispatcher/trips">Active trips</router-link>\
    <router-link to="/dispatcher/cars" class="active">Cars</router-link>\
  </div>'
});

const orders_view_v = Vue.component('orders-view-v', {
  props: ['app'],
  template: '\
  <div class="orders-view-v active">\
    <p class="small message" v-if="Object.keys(app.orders).length === 0">No bookings found.</p>\
    <card-v v-for="order in app.orders" :key="order.id" :trip="order" :app="app"></card-v> \
  </div>'
});

const trips_view_v = Vue.component('trips-view-v', {
  props: ['app'],
  template: '\
  <div class="trips-view-v">\
    <p class="small message" v-if="Object.keys(app.trips).length === 0">No trips found.</p> \
    <card-v v-for="trip in app.trips" :key="trip.id" :trip="trip" :app="app"></card-v> \
  </div>'
});

const cars_view_v = Vue.component('cars-view-v', {
  props: ['app'],
  template: '\
  <div class="cars-view-v">\
    <p class="small message" v-if="Object.keys(app.trips).length === 0">No cars found.</p>\
    <card-v v-for="trip in app.trips" :key="trip.id" :trip="trip" :app="app"></card-v> \
  </div>'
});

const card_v = Vue.component('card-v', {
  props: ['app', 'trip'],
  data: function () {
    const date = MWDate.format(this.trip.route.time);
    return {
      date: date.date,
      time: date.time,
      eta: MWDate.timeUntil(this.trip.route.time)
    }
  },
  template: '\
  <div class="trip-v" v-on:click="handle(trip)">\
    <div class="tab red"></div>\
    <div class="content">\
      <div class="meta">\
        <div class="time">\
          <img src="/img/pin.svg" alt="">\
          <h3 class="mono">{{time}}</h3>\
        </div>\
        <div class="timeLeft">\
          <img src="/img/clock.svg" alt="">\
          <h3 class="mono">{{eta}}</h3>\
        </div>\
      </div>\
      <h3 class="name">{{date}}</h3>\
      <div class="route">\
        <div class="path"><div></div></div>\
        <p class="small">{{trip.route.from}}</p>\
        <p class="small">{{trip.route.to}}</p>\
      </div>\
    </div>\
  </div>',
  methods: {
    // TODO: Refactor needed
    handle: function (order) {
      console.log(order);
      app.handleOrder(order);
    }
  }
});


const map_view_v = Vue.component('map-view-v', {
  props: ['app'],
  template: '\
  <div id="my-Map"> \
  </div>',
  mounted: function () {
   // set up the map
   this.map = L.map('my-Map').setView([59.8415,17.648], 11);

   // create the tile layer with correct attribution
   var osmUrl='http://{s}.tile.osm.org/{z}/{x}/{y}.png';
   var osmAttrib='Map data © <a href="http://openstreetmap.org">OpenStreetMap</a> contributors';
   L.tileLayer(osmUrl, {
       attribution: osmAttrib,
       maxZoom: 18
   }).addTo(this.map);
 }

});
