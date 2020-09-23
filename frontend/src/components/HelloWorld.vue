<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <button @click="pingBackend()">ping backend</button>
    <button @click="login()">login</button>
    <button @click="addData()">add data</button>
    <button @click="getData()">get data</button>
    <button @click="logout()">logout</button>

    <p>Server: {{responseMessage}}</p>
  </div>
</template>

<script>
// import axios from "axios";
export default {
  name: "HelloWorld",
  props: {
    msg: String,
  },
  data() {
    return {
      responseMessage: "",
      baseUrl: "http://localhost:9090",
      data: null,
    };
  },
  methods: {
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
  mounted() {
    // this.login();
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
