"use strict";

// const sleep = require("sleep");
const crypto = require("crypto");
const start = Date.now();
process.env.UV_THREADPOOL_SIZE = 8;

const http = require("http");
const express = require("express");
const socketIO = require("socket.io");
const fs = require("fs");

const app = express();
const server = http.createServer(app);
const serverSocket = socketIO(server, { origins: "*:*" });
// const serverSocket = socketIO(server);

console.log("Server listening 9090");

function logHashTime() {
  crypto.pbkdf2("a", "b", 100000, 512, "sha512", () => {
    console.log("Hash: ", Date.now() - start);
  });
}
// const cors = require("cors");
// app.use(cors());
app.use("/login", function (req, res) {
  // setTimeout(logHashTime, 3000);
  logHashTime();
  logHashTime();
  logHashTime();
  logHashTime();
  logHashTime();
  logHashTime();
  logHashTime();
  logHashTime();
  // console.log("login called");
  // let seconds = 3;
  // console.log("sleep begin", seconds);
  // sleep.sleep(seconds);
  // console.log("sleep end");
  res.send("logged in");
});

server.listen(9090);

serverSocket.on("connection", (socket) => {
  console.log("Server: connected!");
});
