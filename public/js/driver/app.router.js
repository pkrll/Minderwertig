const router = new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/driver',
      components: {
        titlebar: null,
        submenu: null,
        main: login_v
      }
    },
    {
      path: '/driver/login/wait',
      components: {
        titlebar: null,
        submenu: null,
        main: login_load_v
      }
    },
    {
      path: '/driver/login/fail',
      components: {
        titlebar: null,
        submenu: null,
        main: login_fail_v
      }
    },
    {
      path: '/driver/assignments',
      components: {
        titlebar: driver_menu_v,
        submenu: submenu_v,
        main: trips_v
      }
    },
    {
      path: '/driver/assignments/:id',
      components: {
        titlebar: menu_v,
        main: details_v
      }
    },
    {
      path: '/driver/trip',
      components: {
        titlebar: menu_v,
        main: trip_v
      }
    }
  ]
});
