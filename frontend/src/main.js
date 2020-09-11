import Vue from "vue";
import App from "./App.vue";

// import AxiosPlugin from "vue-axios-cors";
// Vue.use(AxiosPlugin);

// import VueSocketIO from "vue-socket.io";
// const socket = new VueSocketIO({
//   debug: true,
//   connection: "http://localhost:9090",
// });
// Vue.use(socket);

// use bootstrap
import { BootstrapVue, IconsPlugin } from "bootstrap-vue";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
// Install BootstrapVue
Vue.use(BootstrapVue);
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin);

Vue.config.productionTip = false;

new Vue({
  render: function(h) {
    return h(App);
  },
}).$mount("#app");
