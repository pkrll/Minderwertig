const router = new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/driver',
      components: {
        titlebar: null,
        main: login_view_v
      }
    },
    {
      path: '/driver/login/',
      components: {
        titlebar: null,
        main: login_v
      }
    },
    {
      path: '/driver/wait',
      components: {
        titlebar: null,
        main: login_load_v
      }
    },
    {
      path: '/driver/login/fail',
      components: {
        titlebar: null,
        main: login_fail_v
      }
    },
    {
      path: '/driver/assignments',
      components: {
        titlebar: null,
        main: assignments_v
      }
    },
  ]
});
