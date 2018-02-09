const router = new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/dispatcher',
      components: {
        left: orders_view_v,
        center: trips_view_v,
        right: null
      }
    }
  ]
});
