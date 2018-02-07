const router = new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/dispatcher',
      components: {
        left: orders_view_v,
        center: null,
        right: null
      }
    }
  ]
});
