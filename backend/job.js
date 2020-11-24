function job({ a, b }) {
  console.log(a);
  console.log(b);
  let obj = { a: 4, b: 5, sum: a + b };
  return obj;
  // socket.on("createThread", () => {
  //   console.log("createThread called");
  // });

  // const threads_array = require("./threads_array.js");

  // threads_array.push(1);
  // console.log(threads_array);
  // const { threadId } = require("worker_threads");
  // console.log("thread is running", threadId);

  // const sleep = require("./sleep.js");

  // // process.exit();
  // // console.log("job begins");
  // // console.log("before while");
  // let start = Date.now();
  // sleep(3000);
  // let end = Date.now();
  // // console.log("after while");
  // let totalTime = end - start;
  // console.log("Total time " + totalTime, threadId);
}

module.exports = job;
