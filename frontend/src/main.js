import Vue from "vue";
import App from "./App.vue";

import axios from "axios";
import VueAxios from "vue-axios";
// axios.defaults.withCredentials = true;
Vue.use(VueAxios, axios);

// let host = location.host;
// let pathname = location.pathname;
// console.log(host);
// console.log(pathname);

import VueSocketIO from "vue-socket.io";
const socket = new VueSocketIO({
  debug: true,
  connection: "http://localhost:9090",
  // connection: location + "/socket.io",
});
Vue.use(socket);

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
