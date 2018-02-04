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
        main: order_v
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