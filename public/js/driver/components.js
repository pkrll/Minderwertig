const titlebar_v = Vue.component('titlebar-v', {
  props: ['app'],
  template: '\
  <div>\
  <div class="titlebar">\
    <img class="user" src="/img/kevin.jpg" alt="">\
    <img class="logo" src="/img/logo_black.svg" alt="">\
    <img class="menu" src="/img/menu.svg" v-on:click="app.toggleMenu" alt="">\
  </div>\
  <driver-menu-v :app="app"></driver-menu-v>\
  </div>'
});

const driver_menu_v = Vue.component('driver-menu-v', {
  props: ['app', 'show'],
  template: '\
      <div class="client-menu-v" :class="{ active: this.app.menuIsActive }"> \
      <img class="close" src="/img/exit.svg" v-on:click="this.app.toggleMenu">\
      <img class="logo" src="/img/logo_black.svg" alt="">\
         <h2>Menu</h2> \
         <router-link to="/driver/assignments"> \
            <h1 v-on:click="this.app.toggleMenu">My trips</h1> \
         </router-link> \
         <router-link to="/driver/trips"> \
            <h1 v-on:click="this.app.toggleMenu">New trips</h1> \
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
      <li>{{ item.route.from }}</li> \
      <li>{{ item.route.to }}</li> \
      <li>{{ item.route.time }}</li> \
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
    let status = "red";

   if (this.app.currentTrip) {
      status = (this.trip.id == app.currentTrip.id) ? 'green' : 'red';
    }

    return {
      status: status,
      date: date.date,
      time: date.time,
      eta: MWDate.timeUntil(this.trip.route.time)
    }
  },
  template: '\
  <div class="trip-v" v-on:click="displayTripDetails">\
    <div class="tab" v-bind:class="[status]"></div>\
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
     this.app.viewAssignment(this.trip);
    }
  }
});

const details_v = Vue.component('details-v', {
  props: ['app'],
  data: function () {
    const date = MWDate.format(app.assignmentDisplay.route.time);
    return {
      details: {
        name: app.assignmentDisplay.name,
        from: app.assignmentDisplay.route.from,
        to: app.assignmentDisplay.route.to,
        date: date.date,
        time: date.time,
        eta: MWDate.timeUntil(app.assignmentDisplay.route.time)
      }
    }
  },
  template: '\
  <div class="trip-details-v">\
    <div class="tab red"></div>\
    <div class="content">\
      <div class="meta">\
        <div class="name">\
          <h3>{{details.name}}</h3>\
        </div>\
        <div class="time">\
          <img src="/img/pin.svg" alt="">\
          <h3 class="mono">{{details.time}}</h3>\
        </div>\
        <div class="timeLeft">\
          <img src="/img/clock.svg" alt="">\
          <h3 class="mono">{{details.eta}}</h3>\
        </div>\
      </div>\
      <h3 class="name">{{details.date}}</h3>\
      <div class="route">\
        <div class="path"><div></div></div>\
        <p class="small">{{details.from}}</p>\
        <p class="small">{{details.to}}</p>\
      </div>\
      <button v-on:click="beginTrip(details, $event)" class="green">Start trip</button> \
      <button v-on:click="returnToAssignments" class="orange">Back</button>\
    </div>\
  </div>',

  methods: {
    returnToAssignments: function () {
      router.push('/driver/assignments');
    },
    beginTrip: function (assignment, event) {
      app.beginTrip();
    }
  }
});

const trip_active_v = Vue.component('trip-active-v', {
  props: ['app'],
  data: function () {
    const date = MWDate.format(app.currentTrip.route.time);
    return {
      details: {
        route: {
          date: date.date,
          time: date.time,
          eta: MWDate.timeUntil(app.currentTrip.route.time)
        },
      }
    }
  },
  template: '\
  <div class="trip-active-v">\
    <div class="trip-v">\
      <div class="content">\
        <div class="meta">\
          <div class="timePassed">\
            <img src="/img/clock.svg" alt="">\
            <h3 class="mono">Timer</h3>\
          </div>\
        </div>\
        <h3 class="name">John Doe</h3>\
        <div class="route">\
          <div class="path"><div></div></div>\
          <p class="small">{{app.currentTrip.route.from}}</p>\
          <p class="small">{{app.currentTrip.route.to}}</p>\
        </div>\
      </div>\
      <button class="orange">Pause</button>\
      <button class="red">Cancel</button>\
    </div>\
  </div>',
  methods: {
    returnToAssignments: function () {
      router.push('/driver/assignments');
    }
  }
});

const trip_done_v = Vue.component('trip-done-v', {
  props: ['app'],
  template: '\
  <div class="order-done-v order-wait-v"> \
      <img src="/img/checkbox.svg" alt=""> \
      <h1>Trip done!</h1> \
    <router-link to="/driver/trips"><button class="green">Continue</button></router-link> \
  </div>'
});
