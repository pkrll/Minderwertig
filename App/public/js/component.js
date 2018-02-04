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



// OUR OLD STUFF


const order_found_v = Vue.component('order-found-v', {
  props: ['data', 'page'],
  template: '<div class="order-found-v"><card-v v-for="trip in data.trips" v-bind:trip="trip" v-bind:key="trip.uid" v-bind:page="page"></card-v></div>'
});

const card_v = Vue.component('card-v', {
  props: ['trip', 'page'],
  template: '<div class="booking"><meta-v v-bind:trip="trip"></meta-v><h2>{{ trip.name }}</h2><trip-v v-bind:trip="trip"></trip-v><button-dual-v v-bind:button_name="[page.button[0].name, page.button[0].name]" v-bind:color="[page.button[0].name, page.button[0].name]" size="small" v-bind:action="[page.button[0].action, page.button[0].action]"></button-dual-v></div>'
});

Vue.component('card-overlay-v', {
  props: ['trip', 'name', 'color', 'action'],
  template: '<div class="booking"><meta-v v-bind:trip="trip"></meta-v><h2>{{ trip.name }}</h2><trip-v v-bind:trip="trip"></trip-v></div>'
});

Vue.component('meta-v', {
  props: ['trip'],
  template: '<div class="meta"><div class="time"><img src="" alt=""><p class="small">{{ trip.time }}</p></div><div class="time-left"><img src="" alt=""><p class="small">{{ trip.time_left }}</p></div></div>'
});

Vue.component('trip-v', {
  props: ['trip'],
  template: '<div class="trip"><img src="" alt=""><p class="small">{{ trip.from }}</p><p class="small">{{ trip.to }}</p></div>'
});

Vue.component('titlebar-v', {
  props: ['account', 'menu'],
  template: '<nav id="titlebar"><img :src="account.metadata.image_url" alt=""><img src="" alt=""><menu-v v-bind:menu="menu"></menu-v><img src="" alt=""></nav>'
});

const menu_v = Vue.component('menu-v', {
  props: ['menu'],
  template: '<ul><li v-for="item in menu">{{ item.name }}</li></ul>'
});

Vue.component('button-v', {
  props: ['button_name', 'color', 'size', 'action'],
  template: '<button :class="[color, size]" @click="action">{{ button_name }}</button>'
});

Vue.component('button-dual-v', {
  props: ['button_name', 'color', 'action', 'size'],
  template: '<div class="btn-dual"><button-v v-bind:button_name="button_name[0]" v-bind:color="color[0]" v-bind:size="size" v-bind:action="action[0]"></button-v><button-v v-bind:button_name="button_name[1]" v-bind:color="color[1]" v-bind:size="size" v-bind:action="action[1]"></button-v></div>'
});
