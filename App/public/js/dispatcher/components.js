const orders_view_v = Vue.component('orders-view-v', {
  props: ['app'],
  template: '\
  <div> \
    <ul> \
      <li v-for="order in app.orders"> {{ order.from }} - {{ order.to }}</li> \
    </ul> \
  </div>'
});
