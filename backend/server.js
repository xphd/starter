"use strict";

const csvString = require("csv-string");

var fs = require("fs");
var parse = require("csv-parse");

var csvData = [];
let csvDataString = "";
fs.createReadStream("./poverty_short.csv")
  .pipe(parse({ delimiter: ":" }))
  .on("data", function (csvrow) {
    // console.log(csvrow);
    //do something with csvrow
    csvData.push(csvrow);
  })
  .on("end", function () {
    //do something with csvData
    // console.log(csvData);
    // console.log(typeof String(csvData[0]));
    // console.log(String(csvData));
    csvDataString = csvString.stringify(csvData);
    // console.log(typeof csvDataString);
    // console.log(csvDataString);
  });

const express = require("express");
const express_session = require("express-session");
const sharedsession = require("express-socket.io-session");

const app = express();
const http = require("http");
const server = http.createServer(app);
const socketIO = require("socket.io");
const serverSocket = socketIO(server);
const PORT = 9090;

// >------>
const redis = require("redis");
const connect_redis = require("connect-redis");
const redisStore = connect_redis(express_session);
const redisClient = redis.createClient(6379, "127.0.0.1");
// <------<

const session = express_session({
  // >------>
  store: new redisStore({ client: redisClient }),
  // <------<
  secret: "keyboard cat",
  resave: false,
  saveUninitialized: true,
  cookie: ("name", "value", { maxAge: 5 * 60 * 1000, secure: false }),
});
app.use(session);

const cors = require("cors");
let corsOptions = {
  origin: ["http://localhost:8080", "https://localhost:8080"],
  credentials: true,
  exposedHeaders: ["set-cookie"],
};
app.use(cors(corsOptions));

// if app.use, the order maters. "/" must be at the end
app.use("/login", function (req, res) {
  console.log("http /login");
  console.log("req.sessionID:", req.sessionID);
  if (req.session.userinfo) {
    console.log("session.userinfo:", req.session.userinfo);
    res.send(req.session.userinfo + " has logged in");
  } else {
    req.session.userinfo = Math.random();
    // console.log(Object.keys(req));
    // console.log(req.sessionID);
    // console.log(req.session);
    console.log("session.userinfo:", req.session.userinfo);
    res.send("successful log in！");
  }
  // console.log("after login:", req.session);
});

app.use("/logout", function (req, res) {
  if (req.session.userinfo) {
    req.session.destroy();
    res.send("You'vd logged out!");
  } else {
    res.send("You haven't logged in!!");
  }
});

app.use("/", function (req, res) {
  // fetch session
  console.log("http /, sessionID:", req.sessionID);
  if (req.session.userinfo) {
    res.send("hello " + req.session.userinfo + "，welcome");
  } else {
    res.send("NOT loggged in");
  }
});

serverSocket.use(
  sharedsession(session, {
    autoSave: true, // must have to update redis
  })
);

serverSocket.on("connection", (socket) => {
  console.log("Server: connected!");
  socket.on("addData", function () {
    console.log(">>>>>>>>>>>>>>>");
    console.log("socket: addData called");
    console.log("userinfo:", socket.handshake.session.userinfo);
    console.log("sessionID:", socket.handshake.sessionID);
    console.log("<<<<<<<<<<<<<<<");
  });
});

server.listen(PORT);
