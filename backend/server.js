"use strict";

const { DynamicPool } = require("node-worker-threads-pool");

const dynamicPool = new DynamicPool(2);

const http = require("http");
const express = require("express");
const session = require("express-session");
const socketIO = require("socket.io");

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
    console.log(Object.keys(req));
    console.log(req.sessionID);
    console.log(req.session);

    res.send("successful log in！");
  }
});

app.use("/logout", function (req, res) {
  req.session.destroy();
  res.send("You'vd logged out!!");
});

let count = 0;

function myFunc1(id) {
  console.log("this is:", id);
  console.log("before while");

  // while (1) {}
  function sleep(milliseconds) {
    const date = Date.now();
    let currentDate = null;
    do {
      currentDate = Date.now();
    } while (currentDate - date < milliseconds);
  }
  sleep(3000);
  console.log("after while");
}

app.use("/startThread", function (req, res) {
  dynamicPool.exec({
    task: myFunc1,
    param: count,
  });
  count++;
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
});
