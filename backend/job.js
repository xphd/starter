const sleep = require("./sleep.js");
function job() {
  console.log("job begins");
  console.log("before while socket", threadId);
  sleep(5000);
  console.log("after while socket", threadId);
  console.log("job ends");
}

module.exports = job;
