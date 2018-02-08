const login_view_v = Vue.component('login-view-v', {
  props: ['app'],
  template: ' \
  <div> \
  <h2>Kontrollpanel för chaufför</h2> \
    <button class="green" v-on:click="login">Logga in</button> \
  </div>',
  methods: {
    login: function(event) {
      event.preventDefault();
      router.push('/driver/login');
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
  <div> \
    <input type="username" v-model="credentials.username"> \
    <input type="password" v-model="credentials.password"> \
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

const assignments_v = Vue.component('assignments-v', {
  props: ['app'],
  template: '\
  <div>\
    <h2>Mina körningar</h2> \
    <ul v-for="item in app.assignments"> \
      <li>{{ item.name }}</li> \
      <li>{{ item.from }}</li> \
      <li>{{ item.to }}</li> \
      <li>{{ item.time }}</li> \
      <button v-on:click="viewDetails(item, $event)" class="green">Detaljer</button> \
    </ul> \
  </div>',
  methods: {
    viewDetails: function(customer, event) {
      app.viewAssignment(customer);
    }
  },
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
  <button v-on:click="returnToAssignments" class="green">Tillbaka</button>\
  </div>',
  methods: {
    returnToAssignments: function() {
      router.push('/driver/assignments');
    }
  }
});
