const sleep = require("./sleep.js");
const { threadId, MessageChannel } = require("worker_threads");
const { port1, port2 } = new MessageChannel();
function job2() {
  port1.on("message", (message) => {
    console.log(message);
    console.log("terminate called");
  });

  console.log("job begins");
  console.log("before while", threadId);
  let start = Date.now();
  sleep(13000);
  let end = Date.now();
  console.log("after while", threadId);
  let totalTime = end - start;
  console.log("Total time " + totalTime, threadId);
}

// module.exports = job;

job2();
