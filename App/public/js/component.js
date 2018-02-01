Vue.component('card-v', {
  props: ['trip', 'name', 'color', 'action'],
  template: '<div class="booking"><meta-v v-bind:trip="trip"></meta-v><h2>{{ trip.name }}</h2><trip-v v-bind:trip="trip"></trip-v><button-dual-v v-bind:name="[name[0], name[1]]" v-bind:color="[color[0], color[1]]" size="small" v-bind:action="[action[0], action[1]]"></button-dual-v></div>'
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

Vue.component('menu-v', {
  props: ['menu'],
  template: '<ul><li v-for="item in menu">{{ item.name }}</li></ul>'
});

Vue.component('button-v', {
  props: ['name', 'color', 'size', 'action'],
  template: '<button :class="[color, size]" @click="action">{{ name }}</button>'
});

Vue.component('button-dual-v', {
  props: ['name', 'color', 'action', 'size'],
  template: '<div class="btn-dual"><button-v v-bind:name="name[0]" v-bind:color="color[0]" v-bind:size="size" v-bind:action="action[0]"></button-v><button-v v-bind:name="name[1]" v-bind:color="color[1]" v-bind:size="size" v-bind:action="action[1]"></button-v></div>'
});
