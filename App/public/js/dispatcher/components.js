const orders_view_v = Vue.component('orders-view-v', {
  props: ['app'],
  template: '\
  <div> \
    <ul> \
      <li v-for="order in app.orders" v-on:click="handle(order)"> {{ order.from }} - {{ order.to }}</li> \
    </ul> \
  </div>',
  methods: {
    // TODO: Refactor needed
    handle: function(order) {
      app.handleOrder(order);
    }
  }
});
