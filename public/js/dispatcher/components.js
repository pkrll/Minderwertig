const panel_view_v = Vue.component('panel-view-v', {
  props: ['app'],
  template: '\
  <div class="panel-view-v">\
      <div class="menu">\
        <p class="active">Bookings</p>\
        <p>Active trips</p>\
        <p>Cars</p>\
      </div>\
      <orders-view-v :app="app"></orders-view-v>\
      <trips-view-v :app="app"></trips-view-v>\
  </div>'
});

const orders_view_v = Vue.component('orders-view-v', {
  props: ['app'],
  template: '\
  <div class="orders-view-v">\
    <card-v v-for="order in app.orders" @click="handle(order)" :key="order.id" :trip="order" :app="app"></card-v> \
  </div>',
  methods: {
    // TODO: Refactor needed
    handle: function (order) {
      app.handleOrder(order);
    }
  }
});

const trips_view_v = Vue.component('trips-view-v', {
  props: ['app'],
  template: '\
  <div class="trips-view-v">\
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
  <div class="trip-v">\
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
});