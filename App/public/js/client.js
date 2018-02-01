var app = new Vue({
  el: '#client',
  data: {
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
  },
  methods: {
    skit: function(e) {
      console.log("Hej");
    }
  }
});
