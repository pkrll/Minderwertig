const router = new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/client',
      components: {
        titlebar: null,
        main: login_email_v
      }
    },
    {
      path: '/client/wait',
      components: {
        titlebar: null,
        main: login_load_v
      }
    },
    {
      path: '/client/order',
      components: {
        titlebar: menu_v,
        main: order_form_v
      }
    },
    {
      path: '/client/order/wait',
      components: {
        titlebar: menu_v,
        main: order_wait_v
      }
    },
    {
      path: '/client/order/confirmation',
      components: {
        titlebar: menu_v,
        main: order_confirmation_v
      }
    },
    {
      path: '/client/trips',
      components: {
        titlebar: menu_v,
        main: trips_v
      }
    },
    {
      path: '/client/login/fail',
      components: {
        titlebar: null,
        main: login_fail_v
      }
    },
    {
      path: '/client/trip/',
      components: {
        titlebar: menu_v,
        main: trip_details_v
      }
    }
  ]
});
