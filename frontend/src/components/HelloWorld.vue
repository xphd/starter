<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <p>{{ responseMessage }}</p>
    <button @click="createThread()">createThread</button>
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
      responseMessage: "responseMessage",
      baseUrl: "http://localhost:9090",
      data: null,
    };
  },
  mounted() {
    this.visit("/");
  },
  sockets: {
    connect() {
      // console.log("Vue: socket connected!");
      this.responseMessage = "Vue: socket connected!";
    },
  },

  methods: {
    createThread() {
      this.socketEmit("createThread");
    },
    socketEmit(event) {
      console.log("Call", event);
      this.$socket.emit(event);
    },
    visit(append) {
      let options = {
        method: "GET",
        url: this.baseUrl + append,
      };
      this.axios(options).then((res) => {
        this.responseMessage = res["data"];
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
