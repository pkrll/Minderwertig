// Client menu
const client_menu_v = Vue.component('client-menu-v', {
  props: ['app', 'show'],
  template: '\
      <div class="client-menu-v" :class="{ active: app.isMenuActive }"> \
      <img class="close" src="/img/exit.svg" @click="toggleMenu">\
         <h2>Menu</h2> \
         <h1 v-on:click="orderTripRedirect">Order trip</h1> \
         <h1 v-on:click="myBookingsRedirect">My bookings</h1> \
         <h1 v-on:click="logoutRedirect">Log out</h1> \
      </div>',
  methods: {
    toggleMenu: function () {
      this.app.isMenuActive = !this.app.isMenuActive;
    },
    myBookingsRedirect: function (event) {
      this.toggleMenu();
      router.push('/client/trips');
    },
    logoutRedirect: function (event) {
      this.toggleMenu();
      this.app.logout();
    },
    orderTripRedirect: function (event) {
      this.toggleMenu();
      router.push('/client/order');
    }
  }
});

// Client waiting for taxi to be found
const order_wait_v = Vue.component('order-wait-v', {
  props: ['app'],
  template: '\
    <div class="order-wait-v"> \
        <img src=""> \
        <h1>Searching for trip</h1> \
        <h2>This could take several minutes...</h2> \
      <button class="orange">Cancel</button> \
    </div>'
});

// Logging in screen
const login_load_v = Vue.component('login-email-v', {
  props: ['app'],
  template: '<h2>Loading...</h2>'
});

// Login failure
const login_fail_v = Vue.component('login-fail-v', {
  props: ['app'],
  template: '<h2>Login failure: {{app.temporary.message}}</h2>'
});

// Login e-mail form
const login_email_v = Vue.component('login-email-v', {
  props: ['app'],
  data: function () {
    return {
      credentials: {}
    }
  },
  template: '\
  <div class="login-email-v"> \
    <img src="#" alt=""> \
    <h2>Welcome to Minderwertig. Simply a more convenient travel!</h2>\
    <input type="email" placeholder="E-mail..." v-model="credentials.email"> \
    <input type="password" placeholder="Password..."  v-model="credentials.password"> \
    <button class="green" v-on:click="login">Logga in</button> \
  </div>',
  methods: {
    login: function (event) {
      event.preventDefault();
      app.login(this.credentials);
    }
  }
});

const order_form_v = Vue.component('order-form-v', {
  props: ['app'],
  data: function () {
    return {
      show_additional_needs: false,
      order: {
        route: {},
        additional_needs: {
          wheelchair: false,
          pet: false
        }
      },
      date: {}
    }
  },
  mounted: function () {
    const picker = flatpickr("#datepicker", {});
  },
  template: '\
  <div class="order-form-v"> \
    <div> \
      <label for="from">From</label> \
      <input type="text" name="from" placeholder="From..." v-model="order.route.from"> \
    </div> \
    <div> \
      <label for="from">To</label> \
      <input type="text" name="to" placeholder="To..." v-model="order.route.to"> \
    </div> \
    <div> \
      <label for="from">Date</label> \
      <input class="mono" type="text" name="date" id="datepicker" v-model="date.date" placeholder="Tap to pick date"> \
      <input class="mono" type="time" name="date" v-model="date.time" placeholder="Tap to pick time"> \
    </div> \
    <div> \
      <label for="capacity">Capacity</label> \
      <select class="" name="capacity" v-model="order.capacity"> \
        <option value="4" selected>4</option> \
        <option value="7">7</option> \
        <option value="10">10</option> \
      </select> \
    </div> \
    <div> \
      <label for="special-needs">Additional needs</label> \
      <input type="checkbox" name="special-needs" v-model="show_additional_needs"> \
    </div> \
    <div v-show="show_additional_needs"> \
      <label for="pet">Pet</label> \
      <input type="checkbox" name="pet" v-model="order.additional_needs.pet"> \
    </div> \
    <div v-show="show_additional_needs"> \
      <label for="wheelchair">Wheelchair</label> \
      <input type="checkbox" name="wheelchair" v-model="order.additional_needs.wheelchair"> \
    </div>  \
    <button class="normal green" v-on:click="sendOrder">Continue</button> \
  </div>',
  methods: {
    sendOrder: function (event) {
      event.preventDefault();

      if (this.validate(this.order) && this.date.date != undefined && this.date.time != undefined) {
        var date = this.date.date.split("-");
        var time = this.date.time.split(":");

        this.order.route.time = MWDate.toUnixTime(date, time);

        app.sendOrder(this.order);
      } else {
        alert("Please fill in your order!");
      }
    },
    validate: function (order) {
      return (order.route.from != '' && order.route.to != '');
    }
  }
});

const trips_v = Vue.component('trips-v', {
  props: ['app'],
  template: '\
  <div class="trips-v">\
    <trip-v v-for="trip in app.account.trips" :key="trip.id" v-bind:trip="trip" v-bind:app="app"></trip-v>\
  </div>'
});

const trip_v = Vue.component('trip-v', {
  props: ['trip'],
  data: function () {
    const date = MWDate.format(this.trip.route.time);
    return {
      date: date.date,
      time: date.time,
      eta: MWDate.timeUntil(this.trip.route.time)
    }
  },
  template: '\
  <div class="trip-v" v-on:click="displayTripDetails">\
    <div class="tab red"></div>\
    <div class="content">\
      <div class="meta">\
        <div class="time">\
          <img src="/img/pin.svg" alt="">\
          <h3 class="mono">{{time}}</h3>\
        </div>\
        <div class="timeLeft">\
          <img src="/img/clock.svg" alt="">\
          <h3 class="mono">{{eta}}</h3>\
        </div>\
      </div>\
      <h3 class="name">{{date}}</h3>\
      <div class="route">\
        <div class="path"><div></div></div>\
        <p class="small">{{trip.route.from}}</p>\
        <p class="small">{{trip.route.to}}</p>\
      </div>\
    </div>\
  </div>',
  methods: {
    displayTripDetails: function () {
      app.displayTripDetails(this.trip);
    }
  }
});

const trip_details_v = Vue.component('trip-details-v', {
  props: ['app'],
  data: function () {
    const date = MWDate.format(this.app.temporary.currentTrip.route.time);
    return {
      trip: this.app.temporary.currentTrip,
      date: date.date,
      time: date.time,
      eta: MWDate.timeUntil(this.app.temporary.currentTrip.route.time)
    }
  },
  template: '\
  <div class="order-found-v">\
  <div class="car">\
    <h1>Booking details</h1>\
    <img :src="trip.driver.vehicle.image_url" alt="">\
    <div>\
      <label>Car model</label>\
      <input type="text" :value="trip.driver.vehicle.name" disabled>\
    </div>\
    <div class="meta">\
      <div>\
        <label>Arrival time</label>\
        <input type="text" :value="eta" disabled>\
      </div>\
      <div>\
        <label>Total travel time</label>\
        <input type="text" :value="trip.duration" disabled>\
      </div>\
    </div>\
  </div>\
  <div class="map"></div>\
  <div>\
    <label for="from">From</label>\
    <input type="text" name="from" :value="trip.route.from" disabled>\
  </div>\
  <div>\
    <label for="to">To</label>\
    <input type="text" name="to" :value="trip.route.to" disabled>\
  </div>\
  <div>\
    <label for="date">Date</label>\
    <input type="text" name="to" :value="date">\
  </div>\
  <div>\
    <label for="time">Time</label>\
    <input type="text" name="to" :value="time">\
  </div>\
  <div>\
    <label for="date">Price</label>\
    <input type="number" name="to" :value="trip.price">\
  </div>\
  <button class="normal red" v-on:click="cancelReservation">Cancel</button>\
  </div>',
  methods: {
    cancelReservation: function () {
      app.removeTrip(this.trip.id);
      router.push('/client/trips/');
    }
  }
})

const order_found_v = Vue.component('order-found-v', {
  props: ['app'],
  data: function () {
    const trip = this.app.temporary.currentOrder;
    const date = MWDate.format(trip.route.time);
    const eta = MWDate.timeUntil(trip.route.time).split(":");
    return {
      trip: trip,
      date: date.date + ' ' + date.time,
      eta: eta[0] + ':' + eta[1]
    }
  },
  template: '\
  <div class="order-found-v">\
    <div class="car">\
      <h1>Taxi found!</h1>\
      <img :src="trip.driver.vehicle.image_url" alt="">\
      <div>\
        <label>Car model</label>\
        <input type="text" :value="trip.driver.vehicle.name" disabled>\
      </div>\
      <div class="meta">\
        <div>\
          <label>Time until pickup</label>\
          <input type="text" :value="eta" disabled>\
        </div>\
        <div>\
          <label>Total travel time</label>\
          <input type="text" :value="trip.duration" disabled>\
        </div>\
      </div>\
    </div>\
    <div class="map"></div>\
    <div>\
      <label for="from">From</label>\
      <input type="text" name="from" :value="trip.route.from" disabled>\
    </div>\
    <div>\
      <label for="to">To</label>\
      <input type="text" name="to" :value="trip.route.to" disabled>\
    </div>\
    <div>\
      <label for="date">Date</label>\
      <input type="text" name="date" :value="date" disabled>\
    </div>\
    <div>\
      <label for="date">Price</label>\
      <input type="text" name="price" :value="trip.price" disabled>\
    </div>\
    <button class="normal green" v-on:click="confirmOrder(true, $event)">Order</button>\
  </div>',
  methods: {
    confirmOrder: function (response, event) {
      this.app.sendConfirmation(response);
    }
  }
});

const titlebar_v = Vue.component('titlebar-v', {
  props: ['app'],
  template: '\
  <div>\
  <div class="titlebar">\
    <img class="user" src="/img/kevin.jpg" alt="">\
    <img class="logo" src="/img/logo_black.svg" alt="">\
    <img class="menu" src="/img/menu.svg" v-on:click="app.toggleMenu" alt="">\
  </div>\
  <client-menu-v :app="app"></client-menu-v>\
  </div>'
});

const submenu_v = Vue.component('submenu-v', {
  props: ['app'],
  template: '\
  <div class="submenu">\
    <img class="left" src="/img/left.svg" alt="">\
    <img class="right" src="/img/right.svg" alt="">\
    <p class="small">Index</p>\
  </div>'
});
