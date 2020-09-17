<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "HelloWorld",
  props: {
    msg: String,
  },
  methods: {
    login() {
      const options = {
        method: "GET",
        headers: { crossdomain: true },
        url: "http://localhost:9090/login",
      };
      axios(options).then((res) => {
        // console.log(res["status"]);
        console.log("Server:", res["data"]);
      });
    },
  },
  mounted() {
    this.login();
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
