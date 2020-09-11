"use strict";

const http = require("http");
const express = require("express");
const socketIO = require("socket.io");
const fs = require("fs");

const app = express();

const port = 3000;

// const cors = require("cors");
// app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello World!!!");
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

// const server = http.createServer(app);
// // const serverSocket = socketIO(server, { origins: "*:*" });
// const serverSocket = socketIO(server);

// console.log("Server listening 9090");
// server.listen(9090);

// serverSocket.on("connection", (socket) => {
//   console.log("Server: connected!");
// });
