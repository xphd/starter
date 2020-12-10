"use strict";

const http = require("http");
const express = require("express");
const socketIO = require("socket.io");

const app = express();
const server = http.createServer(app);
const serverSocket = socketIO(server, { origins: "*:*" });
// const serverSocket = socketIO(server);

const cors = require("cors");
app.use(
  cors({
    origin: ["http://localhost:8080", "https://localhost:8080"],
    credentials: true,
    exposedHeaders: ["set-cookie"],
  })
);

app.use("/cong", function (req, res) {
  console.log("server: /cong called");
  res.send("/cong accessed");
});

// app.use("/", function (req, res) {
//   console.log("server: / called");
//   res.send("/ accessed");
// });

console.log("Server listening 9090");
server.listen(9090, "0.0.0.0");

serverSocket.on("connection", (socket) => {
  console.log("Server: connected!");
  socket.on("pingSocket", function () {
    console.log("server: pingSocket called");
  });
});
