const orders_view_v = Vue.component('orders-view-v', {
  props: ['app'],
  template: '\
  <div>Orders: \
    <ul> \
      <li v-for="order in app.orders" v-on:click="handle(order)"> {{ order.from }} - {{ order.to }}</li> \
    </ul> \
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
  <div>Trips:  \
    <ul> \
      <li v-for="trip in app.trips"> {{ trip.from }} - {{ trip.to }}</li> \
    </ul> \
  </div>'
});
