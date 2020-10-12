<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <button @click="ping()">ping</button>
    <button @click="login()">login</button>
    <button @click="logout()" :disabled="!isLoggedin">logout</button>
    <button @click="addData()" :disabled="!isLoggedin">add data</button>
    <button @click="getData()" :disabled="!isLoggedin">get data</button>
    <p>Server: {{ responseMessage }}</p>
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
      responseMessage: null,
      baseUrl: "http://localhost:9090",
      data: null,
      isLoggedin: false,
    };
  },
  sockets: {
    connect() {
      console.log("Vue: connected!");
      this.responseMessage = "Vue: connected!";
    },
  },
  methods: {
    ping() {
      this.httpVisit("/");
    },
    login() {
      this.isLoggedin = true;
      // this.$socket.disconnect();
      // this.$socket.connect();
      // this.httpVisit("/login");
      let append = "/login";
      console.log("httpVisit:", append);
      let options = {
        method: "GET",
        url: this.baseUrl + append,
      };
      this.axios(options).then((res) => {
        this.responseMessage = res["data"];
        this.$socket.disconnect();
        this.$socket.connect();
      });
    },
    logout() {
      this.isLoggedin = false;
      this.$socket.disconnect();
      this.httpVisit("/logout");
    },
    addData() {
      this.socketVisit("addData");
    },
    getData() {
      this.socketVisit("getData");
    },
    httpVisit(append) {
      console.log("httpVisit:", append);
      let options = {
        method: "GET",
        url: this.baseUrl + append,
        // headers: { crossdomain: true },
      };
      this.axios(options).then((res) => {
        // console.log("Server:", res["data"]);
        console.log("httpVisit res:", append);
        console.log("type of res['data']:", typeof res["data"]);
        if (typeof res["data"] === "object") {
          console.log("get object");
          this.data = res["data"];
          console.log(this.data);
        } else {
          this.responseMessage = res["data"];
        }
      });
    },
    socketVisit(event) {
      console.log("socketVisit:", event);
      this.$socket.emit(event);
    },
  },
  mounted() {
    this.ping();
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
