const router = new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/dispatcher',
      components: {
        titlebar: null,
        main: null
      }
    }
  ]
});
