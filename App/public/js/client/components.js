// Logging in screen
const login_load_v = Vue.component('login-email-v', {
  props: ['app'],
  template: '<h2>Loading...</h2>'
});

// Login failure
const login_fail_v = Vue.component('login-fail-v', {
  props: ['app'],
  template: '<h2>Login failure: {{app.message}}</h2>'
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
  <div> \
    <input type="email" v-model="credentials.email"> \
    <input type="password" v-model="credentials.password"> \
    <button v-on:click="login">Logga in</button> \
  </div>',
  methods: {
    login: function (event) {
      event.preventDefault();
      app.login(this.credentials);
    }
  }
});

// Temporary
const order_v = Vue.component('order-v', {
  props: ['app'],
  template: '<div>WELCOME TO ZOMBOCOM!!</div>'
});

const menu_v = Vue.component('menu-v', {
  props: ['menu'],
  template: '<ul><li v-for="item in menu">{{ item.name }}</li></ul>'
});
