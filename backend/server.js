"use strict";

const http = require("http");
const express = require("express");
const sharedsession = require("express-socket.io-session");
const socketIO = require("socket.io");

const { DynamicPool } = require("node-worker-threads-pool");
let numberOfThreads = 4;
let dynamicPool = new DynamicPool(numberOfThreads);

const app = express();
const server = http.createServer(app);
const serverSocket = socketIO(server);
const PORT = 9090;

const socket_listeners = require("./socket_listeners");

const express_session = require("express-session");
// >------>
const redis = require("redis");
const connect_redis = require("connect-redis");
const redisStore = connect_redis(express_session);
const redisClient = redis.createClient(6379, "127.0.0.1");
// <------<

// set express session
let express_session_instance = express_session({
  secret: "keyboard cat",
  resave: false,
  saveUninitialized: true,
  cookie: ("name", "value", { maxAge: 5 * 60 * 1000, secure: false }),
  store: new redisStore({ client: redisClient }),
});
app.use(express_session_instance);

// set cors, for cross-origin
const cors = require("cors");
let cors_instance = cors({
  origin: ["http://localhost:8080", "https://localhost:8080"],
  credentials: true,
  exposedHeaders: ["set-cookie"],
});
app.use(cors_instance);

// app.use("/", function (req, res) {

//   if (req.session.userinfo) {
//     res.send("hello " + req.session.userinfo + "，welcome");
//   } else {
//     req.session.userinfo = Math.random();
//     res.send(req.sessionID + " successfully log in");
//   }
// });

app.use("/", function (req, res) {
  console.log("/, sessionID:", req.sessionID);
  res.send("hello, " + req.sessionID);
});

server.listen(PORT);
console.log("Server listening", PORT);

serverSocket.use(
  sharedsession(express_session_instance, {
    autoSave: true, // must have to update redis
  })
);

const Groom = require("./Groom/Groom.js");

const { Worker } = require("worker_threads");
const threads_map = new Map();

serverSocket.on("connection", (socket) => {
  console.log("Server socket is connected!");
  // let groom = new Groom();
  // socket_listeners.set(groom);

  socket.on("createThread", () => {
    console.log("createThread called");
    const worker = new Worker("./job.js");
    threads_map.set(worker.threadId, worker);
    console.log("worker thread created, threadId:", worker.threadId);
  });

  socket.on("getThreads", () => {
    console.log("getThreads called");
  });

  socket.on("deleteThread", () => {
    console.log("deleteThread called");
  });
});
