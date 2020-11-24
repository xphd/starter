"use strict";

const http = require("http");
const express = require("express");
const sharedsession = require("express-socket.io-session");
const socketIO = require("socket.io");

const Piscina = require("piscina");
const { AbortController } = require("abort-controller");
const { resolve } = require("path");

const app = express();
const server = http.createServer(app);
const serverSocket = socketIO(server);
const PORT = 9090;

// const socket_listeners = require("./socket_listeners");

const express_session = require("express-session");
// >------>
const redis = require("redis");
// const connect_redis = require("connect-redis");
// const redisStore = connect_redis(express_session);
// const redisClient = redis.createClient(6379, "127.0.0.1");
// <------<

// set express session
let express_session_instance = express_session({
  secret: "keyboard cat",
  resave: false,
  saveUninitialized: true,
  cookie: ("name", "value", { maxAge: 5 * 60 * 1000, secure: false }),
  // store: new redisStore({ client: redisClient }),
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

app.use("/", function (req, res) {
  console.log(req.sessionID);
  res.send(req.sessionID + " logged in successfully!");
});

server.listen(PORT);
console.log("Server listening", PORT);

serverSocket.use(
  sharedsession(express_session_instance, {
    autoSave: true, // must have to update redis
  })
);

const piscina = new Piscina({
  filename: resolve(__dirname, "job.js"),
  minThreads: 2,
  maxThreads: 5,
});

serverSocket.on("connection", (socket) => {
  console.log("Server socket is connected!");

  (async function () {
    const abortController = new AbortController();
    try {
      const task = piscina.runTask({ a: 4, b: 5 }, abortController.signal);
      // abortController.abort();
      await task;
    } catch (err) {
      console.log(err);
      console.log("The task was canceled");
    }
  })();

  // let groom = new Groom();
  // socket_listeners.set(groom);

  // socket.on("createThreadinPool", () => {});

  // socket.on("createThread", () => {
  //   console.log("createThread called");

  //   (async function () {
  //     const abortController = new AbortController();
  //     try {
  //       const task = piscina.runTask(null, abortController.signal);
  //       // abortController.abort();
  //       await task;
  //     } catch (err) {
  //       console.log(err);
  //       console.log("The task was canceled");
  //     }
  //   })();
  // });

  // socket.on("getThreads", () => {});

  // socket.on("deleteThread", () => {
  //   console.log("deleteThread called");
  // });
});
