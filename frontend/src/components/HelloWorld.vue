<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <p>{{ httpResponse }}</p>
    <p>{{ responseMessage }}</p>
    <button @click="createThread()">createThread</button>
    <button @click="getThreads()">getThreads</button>
    <button @click="deleteThread()">deleteThread</button>
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
    };
  },
  sockets: {
    connect() {
      console.log("Vue: connected!");
      this.responseMessage = "Vue: connected!";
    },
  },
  methods: {
    socketEmit(event) {
      console.log("Socket Emit:", event);
      this.$socket.emit(event);
    },
    createThread() {
      this.socketEmit("createThread");
    },
    getThreads() {
      this.socketEmit("getThreads");
    },
    deleteThread() {
      this.socketEmit("deleteThread");
    },
    ping() {
      let options = {
        method: "GET",
        url: "http://localhost:9090/",
      };
      this.axios(options).then((res) => {
        console.log();
        this.httpResponse = res["data"];
        this.$socket.connect();
      });
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
