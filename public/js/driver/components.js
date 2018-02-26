// Logging in screen
const login_load_v = Vue.component('login-v', {
  props: ['app'],
  template: '<h2>Loading...</h2>'
});

// Login failure
const login_fail_v = Vue.component('login-fail-v', {
  props: ['app'],
  template: '<h2>Login failure: {{app.message}}</h2>'
});

// Login e-mail form
const login_v = Vue.component('login-v', {
  props: ['app'],
  data: function () {
    return {
      credentials: {}
    }
  },
  template: '\
  <div class="login-email-v">\
    <img src="/img/logo_black_full.svg" alt="">\
    <h2>Driver area</h2>\
    <input type="username" placeholder="E-mail..." v-model="credentials.username"> \
    <input type="password" placeholder="Password..." v-model="credentials.password"> \
    <button class="green" v-on:click="login">Logga in</button> \
  </div>',
  methods: {
    login: function (event) {
      event.preventDefault();
      app.login(this.credentials);
    }
  }
});

const menu_v = Vue.component('menu-v', {
  props: ['app'],
  template: '<ul><li v-for="item in app.menu">{{ item.name }}</li></ul>'
});

/* Remove this component once trips_v is done */
const assignments_v = Vue.component('assignments-v', {
  props: ['app'],
  template: '\
  <div>\
    <ul v-for="item in app.assignments"> \
      <li>{{ item.name }}</li> \
      <li>{{ item.from }}</li> \
      <li>{{ item.to }}</li> \
      <li>{{ item.time }}</li> \
      <button v-on:click="viewDetails(item, $event)" class="orange">Detaljer</button> \
    </ul> \
  </div>',
  methods: {
    viewDetails: function (customer, event) {
      app.viewAssignment(customer);
    },
  },
});

const trips_v = Vue.component('trips-v', {
  props: ['app'],
  template: '\
  <div class="trips-v">\
    <trip-v v-for="trip in app.assignments" :key="trip.id" v-bind:trip="trip" v-bind:app="app"></trip-v>\
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

const details_v = Vue.component('details-v', {
  props: ['app'],
  data: function () {
    return {
      details: {
        name: app.assignmentDisplay.name,
        from: app.assignmentDisplay.from,
        to: app.assignmentDisplay.to,
        time: app.assignmentDisplay.time
      }
    }
  },
  template: '\
  <div>\
  <h2>Orderdetaljer</h2>\
  <p>{{details.name}}</p>\
  <p>From: {{details.from}}</p>\
  <p>To: {{details.to}}</p>\
  <p>{{details.time}}</p>\
  <button v-on:click="beginTrip(details, $event)" class="green">Starta resa</button> \
  <button v-on:click="returnToAssignments" class="orange">Tillbaka</button>\
  </div>',
  methods: {
    returnToAssignments: function () {
      router.push('/driver/assignments');
    },
    beginTrip: function (assignment, event) {
      console.log(assignment.name);
      app.beginTrip(assignment);
    }
  }
});

const trip_active_v = Vue.component('trip-active-v', {
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
  <div class="trip-active-v">\
    <div class="trip-v" v-on:click="displayTripDetails">\
      <div class="content">\
        <div class="meta">\
          <div class="timeLeft">\
            <img src="/img/clock.svg" alt="">\
            <h3 class="mono">{{eta}}</h3>\
          </div>\
        </div>\
        <h3 class="name">John Doe</h3>\
        <div class="route">\
          <div class="path"><div></div></div>\
          <p class="small">{{trip.route.from}}</p>\
          <p class="small">{{trip.route.to}}</p>\
        </div>\
      </div>\
      <button class="orange">Pause</button>\
      <button class="red">Cancel</button>\
    </div>\
  </div>',
  methods: {
    displayTripDetails: function () {
      this.app.displayTripDetails(this.trip);
    }
  }
});