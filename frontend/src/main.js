import Vue from "vue";
import App from "./App.vue";

import axios from "axios";
import VueAxios from "vue-axios";

/** By Cong Liu.
 * "axios.defaults.withCredentials" must be set as "ture" so that express-session in backend can work properly.
 * Otherwise, the sessionID will be replaced when the page is refreshed
 */
axios.defaults.withCredentials = true;

Vue.use(VueAxios, axios);

import VueSocketIO from "vue-socket.io";
const socket = new VueSocketIO({
  debug: true,
  options: { autoConnect: false }, // socket won't connect automatically. Must use "this.$socket.connect()" somewhere. Like in "App.vue" --Cong
  connection: "http://localhost:9090",
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
