<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <button @click="ping()">ping</button>
    <button @click="login()">login</button>
    <button @click="logout()" :disabled="!isLogin">logout</button>

    <!-- <button @click="destroySession()">destroy session</button>
    <button @click="destroySessionData()">destroy session data</button> -->

    <button @click="addData()" :disabled="!isLogin">add data</button>
    <button @click="getData()" :disabled="!isLogin">get data</button>
    <button @click="checkSocketSession()" :disabled="!isLogin">
      check socket session
    </button>
    <button @click="socketConnect()" :disabled="!isLogin">
      socket connect
    </button>
    <button @click="socketDisconnect()" :disabled="!isLogin">
      socket disconnect
    </button>
    <p>Http response: {{ httpResponse }}</p>
    <p>Socketio Response: {{ socketioResponse }}</p>
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
      // responseMessage: null,
      httpResponse: null,
      socketioResponse: null,
      baseUrl: "http://localhost:9090",
      data: null,
      isLogin: false,
    };
  },
  sockets: {
    connect() {
      console.log("Vue: connected!");
      this.socketioResponse = "Vue: connected!";
    },
    addDataRes(responseMessage) {
      console.log("Vue: addDataRes");
      this.socketioResponse = responseMessage;
    },
    getDataRes(data) {
      console.log("Vue:getDataRes");
      this.socketioResponse = data;
    },
  },
  methods: {
    ping() {
      this.httpVisit("/");
    },
    login() {
      this.isLogin = true;
      let append = "/login";
      console.log("httpVisit:", append);
      let options = {
        method: "GET",
        url: this.baseUrl + append,
      };
      this.axios(options).then((res) => {
        this.httpResponse = res["data"];
        // this.socketDisconnect();
        this.socketConnect();
      });
    },
    logout() {
      this.isLogin = false;
      this.socketDisconnect();
      this.httpVisit("/logout");
    },
    // destroySession() {
    //   this.httpVisit("/destroySession");
    // },
    addData() {
      this.socketVisit("addData");
    },
    getData() {
      this.socketVisit("getData");
    },
    checkSocketSession() {
      this.socketVisit("checkSocketSession");
    },
    socketConnect() {
      this.$socket.connect();
    },
    socketDisconnect() {
      this.$socket.disconnect();
    },
    httpVisit(append) {
      console.log("httpVisit:", append);
      let options = {
        method: "GET",
        url: this.baseUrl + append,
        // headers: { crossdomain: true },
      };
      this.axios(options).then((res) => {
        console.log("httpVisit res:", append);
        this.httpResponse = res["data"];
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
