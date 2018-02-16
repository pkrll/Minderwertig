const router = new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/client',
      components: {
        titlebar: null,
        submenu: null,
        main: login_email_v
      }
    },
    {
      path: '/client/wait',
      components: {
        titlebar: titlebar_v,
        submenu: null,
        main: login_load_v
      }
    },
    {
      path: '/client/order',
      components: {
        titlebar: titlebar_v,
        submenu: submenu_v,
        main: order_form_v
      }
    },
    {
      path: '/client/order/wait',
      components: {
        titlebar: titlebar_v,
        submenu: submenu_v,
        main: order_wait_v
      }
    },
    {
      path: '/client/order/confirmation',
      components: {
        titlebar: titlebar_v,
        submenu: submenu_v,
        main: order_found_v
      }
    },
    {
      path: '/client/trips',
      components: {
        titlebar: titlebar_v,
        submenu: submenu_v,
        main: trips_v
      }
    },
    {
      path: '/client/login/fail',
      components: {
        titlebar: null,
        submenu: null,
        main: login_fail_v
      }
    },
    {
      path: '/client/trip/',
      components: {
        titlebar: titlebar_v,
        submenu: submenu_v,
        main: trip_details_v
      }
    },
    {
      path: '/client/order/done',
      components: {
        titlebar: titlebar_v,
        submenu: submenu_v,
        main: order_done_v
      }
    },
  ]
});
