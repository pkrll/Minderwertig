const router = new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/dispatcher',
      components: {
        panel: panel_view_v,
        map: null
      }
    }
  ]
});
