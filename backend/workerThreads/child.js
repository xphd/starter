const {
  isMainThread,
  parentPort,
  workerData,
  threadId,
  MessageChannel,
  MessagePort,
  Worker,
} = require("worker_threads");

parentPort.once("message", (value) => {
  //   value.myPort.postMessage("hello");
  value.myPort.on("message", (msg) => {
    console.log(`thread ${threadId}: receive ${msg}`);
  });
});
