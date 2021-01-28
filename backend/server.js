"use strict";

const http = require("http");
const express = require("express");
const socketIO = require("socket.io");
const fs = require("fs");

const app = express();
const server = http.createServer(app);
const serverSocket = socketIO(server, { origins: "*:*" });

const redis = require("redis");

console.log("Server listening 9090");
server.listen(9090);

app.get("/", function (req, res) {
  // console.log(">http get '/', sessionID:", req.sessionID);
  console.log("/ reached");
  res.send("hello, connected!");
});

app.get("/redis", function (req, res) {
  const redisClient = redis.createClient(6379, "127.0.0.1");
  redisClient.on("ready", function () {
    console.log("redis is ready");
    res.send("redis is ready");
  });
});
// serverSocket.on("connection", socket => {
//   console.log("Server: connected!");
// });
