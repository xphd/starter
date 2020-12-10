<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <p>{{ message }}</p>
    <p>{{ responseMessage }}</p>
    <button @click="pingBackend()">pingBackend</button>
    <button @click="pingSocket()">pingSocket</button>
  </div>
</template>

<script>
export default {
  name: "HelloWorld",
  props: {
    msg: String,
  },
  data() {
    return {
      message: "message",
      responseMessage: "responseMessage",
      baseUrl: "", // "http://localhost:9090", see proxy in vue.config.js
    };
  },
  sockets: {
    connect() {
      console.log("Vue: connected!");
      this.message = "Vue: connected!";
    },
  },
  mounted() {
    // this.pingBackend();
    // this.pingSocket();
    // console.log("location in HelloWorld.vue is:", location);
  },

  methods: {
    pingBackend() {
      console.log("vue: pingBackend called");
      this.visit("/cong");
    },
    visit(append) {
      console.log("this.baseUrl + append", this.baseUrl + append);
      let options = {
        method: "GET",
        url: this.baseUrl + append,
        headers: { crossdomain: true },
      };
      this.axios(options).then((res) => {
        console.log("axios res");
        this.responseMessage = res["data"];
      });
    },
    pingSocket() {
      console.log("vue: pingSocket called ");
      this.$socket.emit("pingSocket");
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
