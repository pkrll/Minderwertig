const client_menu_v = Vue.component('client-menu-v', {
  props: ['app', 'show'],
  template: '\
      <div class="client-menu-v" :class="{ active: this.app.menuIsActive }"> \
      <img class="close" src="/img/exit.svg" v-on:click="this.app.toggleMenu">\
      <img class="logo" src="/img/logo_black.svg" alt="">\
         <h2>Menu</h2> \
         <router-link to="/client/order"> \
            <h1 v-on:click="this.app.toggleMenu">Order trip</h1> \
         </router-link> \
         <router-link to="/client/trips"> \
            <h1 v-on:click="this.app.toggleMenu">My trips</h1> \
          </router-link> \
         <h1 v-on:click="logout">Log out</h1> \
      </div>',
  methods: {
    logout: function (event) {
      this.app.toggleMenu();
      this.app.logout();
    }
  }
});

// Client waiting for taxi to be found
const order_wait_v = Vue.component('order-wait-v', {
  props: ['app'],
  template: '\
    <div class="order-wait-v"> \
        <svg id="loading" viewBox="0 0 139 33" version="1.1" xmlns="http://www.w3.org/2000/svg">\
          <circle id="left" opacity="0" cx="16.5" cy="16.5" r="16.5"></circle>\
          <circle id="mid" opacity="0" cx="69.5" cy="16.5" r="16.5"></circle>\
          <circle id="right" opacity="0" cx="122.5" cy="16.5" r="16.5"></circle>\
        </svg> \
        <h1>Searching for trip</h1> \
        <p>This could take several minutes...</p> \
      <button class="orange">Cancel</button> \
    </div>',
  beforeRouteLeave(to, from, next) {
    if (to.name == 'order') {
      this.app.cancelOrder(null);
    }

    next();
  }
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
    <img src="/img/logo_black_full.svg" alt=""> \
    <h2>Welcome to Minderwertig. Simply a more convenient travel!</h2>\
    <input type="email" placeholder="E-mail..." v-model="credentials.email"> \
    <input type="password" placeholder="Password..."  v-model="credentials.password"> \
    <button class="green" v-on:click="login">Log in</button> \
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
      date: {
        date: "",
        time: ""
      }
    }
  },
  mounted: function () {
    const picker = flatpickr("#datepicker", {});
  },
  template: '\
  <div class="order-form-v"> \
    <div> \
      <label for="from">From</label> \
      <input type="text" name="from" placeholder="From..." v-model="order.route.from" data-validate="required"> \
    </div> \
    <div> \
      <label for="from">To</label> \
      <input type="text" name="to" placeholder="To..." v-model="order.route.to" data-validate="required"> \
    </div> \
    <div> \
      <label for="date">Date</label> \
      <input class="mono" type="text" name="date" id="datepicker" v-model="date.date" placeholder="Tap to pick date" data-validate="required, date"> \
    </div>\
    <div>\
      <label for="time">Time</label> \
      <input class="mono" type="time" name="date" v-model="date.time" placeholder="Tap to pick time" data-validate="required, time"> \
    </div> \
    <div> \
      <label for="capacity">Passengers</label> \
      <input type="text" name="passengers" v-model="order.passengers" placeholder="Number of passengers..." data-validate="number, required"> \
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
  computed: {
    validate: function () {
      console.log(this);
    }
  },
  methods: {
    sendOrder: function (event) {
      event.preventDefault();

      const date = this.date.date.split("-");
      const time = this.date.time.split(":");

      const timestamp = MWDate.toUnixTime(date, time);

      if (MWValidate('order-form-v')) {
        if (MWDate.hasPassed(timestamp)) {
          alert("Please enter a valid date!");
        } else {
          this.order.route.time = timestamp;
          app.sendOrder(this.order);
        }
      } else {
        alert("Please fill in your order!");
      }
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
  props: ['app', 'trip'],
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
      this.app.displayTripDetails(this.trip);
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
    <img :src="trip.vehicle.image_url" alt="">\
    <div>\
      <label>Car model</label>\
      <input type="text" :value="trip.vehicle.name" disabled>\
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
  <button class="normal red" v-on:click="cancelReservation">Cancel trip</button>\
  </div>',
  methods: {
    cancelReservation: function () {
      this.app.cancelTrip(this.trip);
    }
  }
});

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
      <img :src="trip.vehicle.image_url" alt="">\
      <div>\
        <label>Car model</label>\
        <input type="text" :value="trip.vehicle.name" disabled>\
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
    <button class="green" v-on:click="confirmOrder(true, $event)">Order</button>\
    <button class="grey">Cancel</button>\
  </div>',
  methods: {
    confirmOrder: function (response, event) {
      this.app.sendConfirmation(response);
    }
  }
});

const order_done_v = Vue.component('order-done-v', {
  props: ['app'],
  template: '\
  <div class="order-done-v order-wait-v"> \
      <img src="/img/checkbox.svg" alt=""> \
      <h1>Trip ordered!</h1> \
      <p>Your trip is saved under my bookings.</p> \
    <router-link to="/client/trips"><button class="green">Continue</button></router-link> \
  </div>'
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
    <img class="left" src="/img/left.svg" alt="" v-show="this.$route.meta.hasLeftArrow" v-on:click="goBack">\
    <img class="right" src="/img/right.svg" alt="" v-show="this.$route.meta.hasRightArrow" v-on:click="goForward">\
    <p class="small">{{this.$route.meta.title}}</p>\
  </div>',
  methods: {
    goBack: function () {
      router.go(-1);
    },
    goForward: function () {
      router.go(1);
    }
  }
});

const fard_view_v = Vue.component('fard-view-v', {
  props: ['app'],
  template: ' \
  <div> \
    <div> \
      <h1> Val av transporttjänst </h1> \
    </div> \
    <div> \
      <router-link to="/client/fardtjanst"> <button class="blue"> Färdtjänst </button> <router-link> \
    </div> \
    <div> \
      <router-link to="/client/order"> <button class="green"> Minderwertig Taxi </button> </router-link> \
    </div> \
  </div>' ,
});
