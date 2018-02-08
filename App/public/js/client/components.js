const login_view_v = Vue.component('login-view-v', {
  props: ['app'],
  template: ' \
  <div> \
    <button>Logga in med Facebook</button> \
    <button v-on:click="loginEmail">Logga in med E-mail</button> \
  </div>',
  methods: {
    loginEmail: function (event) {
      event.preventDefault();
      router.push('/client/login/email');
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

// var myDate = arguments[0]
// return new Date(myDate.getFullYear(), myDate.getMonth(), myDate.getDate());

// Temporary
const order_form_v = Vue.component('order-form-v', {
  props: ['app'],
  data: function () {
    // TODO: FIX THIS SHIT
    var date = new Date();
    var day = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
    var time = (date.getHours() + 1) + ":" + date.getMinutes();

    return {
      order: {
        date: {
          day: day,
          time: time
        }
      }
    }
  },
  template: '\
  <div class="order-form-v"> \
    <div> \
      <label for="from">From</label> \
      <input type="text" name="from" placeholder="From..." v-model="order.from"> \
    </div> \
    <div> \
      <label for="from">To</label> \
      <input type="text" name="to" placeholder="To..." v-model="order.to"> \
    </div> \
    <div> \
      <label for="from">Date</label> \
      <input class="mono" type="text" name="date" v-model="order.date.day"> \
      <input class="mono" type="text" name="date" v-model="order.date.time"> \
    </div> \
    <div> \
      <label for="capacity">Capacity</label> \
      <select class="" name="capacity" v-model="order.capacity"> \
        <option value="4">4</option> \
        <option value="7">7</option> \
        <option value="10">10</option> \
      </select> \
    </div> \
    <div> \
      <label for="special-needs">Additional needs</label> \
      <input type="checkbox" name="special-needs"> \
    </div> \
    <button class="normal green" v-on:click="sendOrder">Continue</button> \
  </div>',
  methods: {
    sendOrder: function (event) {
      event.preventDefault();

      if (this.validate(this.order)) {
        app.sendOrder(this.order);
      } else {
        alert("Please fill in your order!");
      }
    },
    validate: function (order) {
      // TODO: Fix validate function so that it also checks date, capacity and additonal needs
      return (order.from != null && order.to != null);
    }
  }
});

const menu_v = Vue.component('menu-v', {
  props: ['app'],
  template: '<ul><li v-for="item in app.menu">{{ item.name }}</li></ul>'
});
