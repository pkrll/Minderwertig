
var router = new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/client/login',
      components: {
        titlebar: menu_v,
        main: order_found_v
      }
    }
  ]
});

router.push('/client/login');

var app = new Vue({
  router,
  el: '#app',
  methods: {
    skit: function(e) {
      console.log("Hej");
    }
  },
  data: {
     page: {
      button: [
        { name: "Hej", color: "red", action: function() {
          console.log("skit");
        } }
      ]
    },
    account: {
      uuid: 0,
      metadata: {
        name: "Godzilla Hårddisksson",
        image_url: "http://pornhub.com",
        position: {
          x: 0,
          y: 0
        }
      },
      trips: [
        { uid: 0, time: '12:00', time_left: '1:26', name: 'Namn Namnsson', from: 'Hawaii', to: 'Kirkuk' },
      ]
    },
    menu: [
      { name: "Order trip" },
      { name: "My bookings"},
      { name: "Settings"},
      { name: "Contact us"},
      { name: "Logout"}
    ]
}

});
