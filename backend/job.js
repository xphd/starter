// const { threadId } = require("worker_threads");

function job() {
  // const threads_array = require("./threads_array.js");

  // threads_array.push(1);
  // console.log(threads_array);
  const { threadId } = require("worker_threads");
  console.log("thread is running", threadId);

  const sleep = require("./sleep.js");

  // process.exit();
  // console.log("job begins");
  // console.log("before while");
  let start = Date.now();
  sleep(3000);
  let end = Date.now();
  // console.log("after while");
  let totalTime = end - start;
  console.log("Total time " + totalTime, threadId);
}

module.exports = job;
