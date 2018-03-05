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
        titlebar: titlebar_v,
        submenu: submenu_v,
        main: trips_v
      },
      meta: {
        title: 'My trips',
        hasLeftArrow: false,
        hasRightArrow: false
      }
    },
    {
      path: '/driver/assignments/:id',
      components: {
        titlebar: titlebar_v,
        submenu: submenu_v,
        main: details_v
      },
      meta: {
        title: 'Assignment',
        hasLeftArrow: true,
        hasRightArrow: false
      }
    },
    {
      path: '/driver/trip/active',
      components: {
        titlebar: titlebar_v,
        submenu: submenu_v,
        main: trip_active_details_v
      },
      meta: {
        title: 'Ongoing trip',
        hasLeftArrow: true,
        hasRightArrow: false
      }
    }
  ]
});
