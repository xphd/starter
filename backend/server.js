"use strict";

const {
  Worker,
  isMainThread,
  parentPort,
  workerData,
} = require("worker_threads");

const { DynamicPool } = require("node-worker-threads-pool");
let dynamicPool = new DynamicPool(4);

const http = require("http");
const express = require("express");
const session = require("express-session");
const socketIO = require("socket.io");

const fs = require("fs");
const parse = require("csv-parse");
const csvString = require("csv-string");
var csvData = [];
let csvDataString = "";
fs.createReadStream("poverty_short.csv")
  .pipe(parse({ delimiter: ":" }))
  .on("data", function (csvrow) {
    csvData.push(csvrow);
  })
  .on("end", function () {
    csvDataString = csvString.stringify(csvData);
  });

const app = express();
const server = http.createServer(app);
// const serverSocket = socketIO(server, { origins: "*:*" });
const serverSocket = socketIO(server);

console.log("Server listening 9090");

const cors = require("cors");
// const { resolve } = require("path");
app.use(
  cors({
    origin: ["http://localhost:8080", "https://localhost:8080"],
    credentials: true,
    exposedHeaders: ["set-cookie"],
  })
);

app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true,
    cookie: ("name", "value", { maxAge: 5 * 60 * 1000, secure: false }),
  })
);

app.use("/login", function (req, res) {
  if (req.session.userinfo) {
    res.send(req.session.userinfo + "has logged in");
  } else {
    req.session.userinfo = Math.random();
    // console.log(Object.keys(req));
    // console.log(req.sessionID);
    // console.log(req.session);

    res.send("successful log in！");
  }

  // res.send("logged in");
});

app.use("/logout", function (req, res) {
  req.session.destroy();
  res.send("You'vd logged out!!");
});

app.use("/doThread", function (req, res) {
  let worker = new Worker("./compute.js", {
    // workerData: csvData,
  });
  console.log("in server.js, thread id is", worker.threadId);

  worker.on("exit", (code) => {
    console.log("worker exit", worker.threadId);

    if (code !== 0) reject(new Error(`Worker stopped with exit code ${code}`));
    // console.log("before terminate");
    // worker.terminate().then(function () {
    //   console.log("done terminate");
    // });
  });
  res.send("thread done!!!");
});

let threadId = 0;

const myFunc1 = require("./myFunc1");

app.use("/threadPool", function (req, res) {
  dynamicPool
    .exec({
      task: myFunc1,
      param: threadId,
    })
    .then(() => {
      console.log("done"); // result will be 2.
    });
  threadId++;
  res.send("thread pool done");
});

app.use("/createPool", function (req, res) {
  console.log("create pool");
  dynamicPool = new DynamicPool(4);
  res.send("thread pool created");
});

app.use("/poolDestroy", function (req, res) {
  console.log("destroy threads in pool");
  dynamicPool.destroy();
  res.send("thread pool destroyed");
});

app.use("/", function (req, res) {
  // fetch session
  // console.log(req.session);
  if (req.session.userinfo) {
    res.send("hello " + req.session.userinfo + "，welcome");
  } else {
    res.send("NOT loggged in");
  }
});

server.listen(9090);

serverSocket.on("connection", (socket) => {
  console.log("Server: connected!");
  socket.on("socketThreadPool", function () {
    dynamicPool
      .exec({
        task: myFunc1,
        param: threadId,
      })
      .then(() => {
        console.log("done"); // result will be 2.
        socket.emit("socketThreadPoolDone");
      });
    threadId++;
  });
});
