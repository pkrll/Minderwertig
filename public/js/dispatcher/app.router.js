const router = new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/dispatcher',
      components: {
        menu: menu_view_v,
        list: orders_view_v
      }
    },
    {
      path: '/dispatcher/trips',
      components: {
        menu: menu_view_v,
        list: trips_view_v
      }
    },
    {
      path: '/dispatcher/cars',
      components: {
        menu: menu_view_v,
        list: cars_view_v
      }
    }
  ]
});
