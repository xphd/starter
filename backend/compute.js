const {
  Worker,
  isMainThread,
  parentPort,
  workerData,
} = require("worker_threads");
var sleep = require("thread-sleep");
console.log("compute begin");
// while (1) {
//   //   console.log("Hello World");
// }
console.log(workerData);
let n = 2000;
var start = Date.now();
var res = sleep(n);
var end = Date.now();
// res is the actual time that we slept for
console.log(res + " ~= " + (end - start) + " ~= " + n);
console.log("compute end");
