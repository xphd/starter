const {
  // Worker,
  // isMainThread,
  // parentPort,
  // workerData,

  threadId,
} = require("worker_threads");

function sleep(milliseconds) {
  const date = Date.now();
  let currentDate = null;
  do {
    currentDate = Date.now();
  } while (currentDate - date < milliseconds);
}

console.log("before while", threadId);
sleep(1000);
console.log("after while", threadId);
