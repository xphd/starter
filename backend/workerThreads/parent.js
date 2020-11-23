const { Worker, MessageChannel } = require("worker_threads");
const { port1, port2 } = new MessageChannel();

let worker = new Worker("./child.js");

port1.postMessage("hello");
worker.postMessage({ myPort: port1 }, [port1]);
