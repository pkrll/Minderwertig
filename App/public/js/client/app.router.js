const router = new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/client',
      components: {
        titlebar: null,
        main: order_found_v
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
        titlebar: null,
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
  ]
});
