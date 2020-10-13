"use strict";

const fs = require("fs");
const parse = require("csv-parse");
const csvString = require("csv-string");
var csvData = [];
let csvDataString = "";
fs.createReadStream("./poverty_short.csv")
  .pipe(parse({ delimiter: ":" }))
  .on("data", function (csvrow) {
    csvData.push(csvrow);
  })
  .on("end", function () {
    csvDataString = csvString.stringify(csvData);
  });

const http = require("http");
const socketIO = require("socket.io");
const express = require("express");
const express_session = require("express-session");
const sharedsession = require("express-socket.io-session");

const app = express();
const server = http.createServer(app);
const serverSocket = socketIO(server);
const PORT = 9090;

// >------>
const redis = require("redis");
const connect_redis = require("connect-redis");
const redisStore = connect_redis(express_session);
const redisClient = redis.createClient(6379, "127.0.0.1");
// <------<

const session = express_session({
  secret: "keyboard cat",
  resave: false,
  saveUninitialized: true,
  cookie: ("name", "value", { maxAge: 5 * 60 * 1000, secure: false }),
  store: new redisStore({ client: redisClient }),
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
  console.log("/login, sessID:", req.sessionID);
  if (req.session.userinfo) {
    console.log("session.userinfo:", req.session.userinfo);
    res.send(req.session.userinfo + " has logged in");
  } else {
    req.session.userinfo = Math.floor(1000 + Math.random() * 9000); // random 4 digits ID, test purpose
    console.log("session.userinfo:", req.session.userinfo);
    res.send("successful log in！");
  }
});

app.use("/logout", function (req, res) {
  if (req.session.userinfo) {
    delete req.session.userinfo;
    res.send("You'vd logged out!");
  } else {
    res.send("You haven't logged in!!");
  }
});

// app.use("/destroySession", function (req, res) {
//   let sessionID = req.sessionID;
//   if (sessionID) {
//     let dataID = "sess:" + sessionID + "_data";
//     redisClient.del(dataID);
//     req.session.destroy(function () {
//       res.send("destroy session:" + sessionID);
//     });
//   } else {
//     console.log("no session to destroy"); // this should never show
//   }
// });

app.use("/", function (req, res) {
  console.log("/, sessionID:", req.sessionID);
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
  let session = socket.handshake.session;
  let sessionID = socket.handshake.sessionID;
  let dataID = "sess:" + sessionID + "_data";
  socket.on("addData", function () {
    // console.log(">>>>>>>>>>>>>>>");
    // console.log("socket: addData called");
    // console.log("userinfo:", socket.handshake.session.userinfo);
    // console.log("sessionID:", socket.handshake.sessionID);
    // console.log("<<<<<<<<<<<<<<<");
    if (session.userinfo) {
      // let dataID ="sess:" +sessionID + "_data";
      redisClient.set(dataID, csvDataString, redis.print);
      redisClient.expireat(dataID, parseInt(+new Date() / 1000) + 300); // data exipres in 300 seconds
      socket.emit("addDataRes", "add data done");
    } else {
      console.log("not logged in");
      socket.emit("addDataRes", "NOT logged in");
    }
  });
  socket.on("getData", function () {
    if (session.userinfo) {
      // let dataID = sessionID + "data";
      redisClient.get(dataID, function (err, reply) {
        socket.emit("getDataRes", reply);
      });
    } else {
      console.log("not logged in");
      socket.emit("getDataRes", "NOT logged in");
    }
  });
  socket.on("checkSocketSession", function () {
    console.log("socket session", socket.handshake.session);
    console.log("socket sessionID", socket.handshake.sessionID);
  });
  // socket.on("destroySession")
});

server.listen(PORT);
