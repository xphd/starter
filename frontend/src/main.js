import Vue from "vue";
import App from "./App.vue";

import VueSocketIO from "vue-socket.io";
const socket = new VueSocketIO({
  debug: true,
  connection: "http://localhost:9090"
});
Vue.use(socket);

Vue.config.productionTip = false;

new Vue({
  render: function(h) {
    return h(App);
  }
}).$mount("#app");
