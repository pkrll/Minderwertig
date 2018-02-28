const router = new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/dispatcher',
      components: {
        menu: menu_view_v,
        list: orders_view_v,
        myMap: map_view_v,
      },
      meta: {
        tabIndex: 1
      }
    },
    {
      path: '/dispatcher/trips',
      components: {
        menu: menu_view_v,
        list: trips_view_v,
        myMap: map_view_v
      },
      meta: {
        tabIndex: 2
      }
    },
    {
      path: '/dispatcher/cars',
      components: {
        menu: menu_view_v,
        list: cars_view_v,
        myMap: map_view_v
      },
      meta: {
        tabIndex: 3
      }
    }
  ]
});
