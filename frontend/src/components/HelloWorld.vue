<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <p>{{ responseMessage }}</p>
    <button @click="login()">login</button>
    <button @click="doThread()">do thread</button>
    <button @click="threadPool()">thread pool</button>
    <button @click="poolDestroy()">pool destroy</button>
    <button @click="createPool()">create pool</button>
    <button @click="socketThreadPool()">socketThreadPool</button>
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
      responseMessage: "status",
      baseUrl: "http://localhost:9090",
      data: null,
    };
  },
  sockets: {
    connect() {
      console.log("Vue: connected!");
    },
    socketThreadPoolDone() {
      console.log("socketThreadPoolDone !!");
    },
  },

  methods: {
    socketThreadPool() {
      this.$socket.emit("socketThreadPool");
    },
    pingBackend() {
      this.visit("/");
    },
    login() {
      this.visit("/login");
    },
    addData() {
      this.visit("/addData");
    },
    getData() {
      this.visit("/getData");
    },
    logout() {
      this.visit("/logout");
    },
    doThread() {
      this.visit("/doThread");
    },
    threadPool() {
      this.visit("/threadPool");
    },
    poolDestroy() {
      this.visit("/poolDestroy");
    },
    createPool() {
      this.visit("/createPool");
    },
    visit(append) {
      let options = {
        method: "GET",
        url: this.baseUrl + append,
        // headers: { crossdomain: true },
      };
      this.axios(options).then((res) => {
        // console.log("Server:", res["data"]);
        console.log(append);
        console.log(typeof res["data"]);
        if (typeof res["data"] === "object") {
          console.log("get object");
          this.data = res["data"];
          console.log(this.data);
        } else {
          this.responseMessage = res["data"];
        }
      });
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
