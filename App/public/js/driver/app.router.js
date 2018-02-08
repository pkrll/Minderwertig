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
      path: '/driver/login/wait',
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
        titlebar: menu_v,
        main: assignments_v
      }
    },
    {
      path: '/driver/assignments/:id',
      components: {
        titlebar: menu_v,
        main: details_v
      }
    },
  ]
});
