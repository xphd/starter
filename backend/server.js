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
    console.log(typeof csvDataString);
    // console.log(csvDataString);
  });

const express = require("express");
const session = require("express-session");

const app = express();
const PORT = 9090;

// >------>
const redis = require("redis");
const connect_redis = require("connect-redis");
const redisStore = connect_redis(session);
const redisClient = redis.createClient(6379, "127.0.0.1");
// <------<

const cors = require("cors");
// app.use(cors());
app.use(
  cors({
    origin: ["http://localhost:8080", "https://localhost:8080"],
    credentials: true,
    exposedHeaders: ["set-cookie"],
  })
);

app.use(
  session({
    // >------>
    store: new redisStore({ client: redisClient }),
    // <------<
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true,
    cookie: ("name", "value", { maxAge: 5 * 60 * 1000, secure: false }),
  })
);

// if app.use, the order maters. "/" must be at the end
app.use("/login", function (req, res) {
  // config session

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

app.use("/addData", function (req, res) {
  // redisClient
  if (req.session.userinfo) {
    // req.session.data = csvData;
    let sessionID = req.sessionID;
    let dataID = sessionID + "data";

    redisClient.set(dataID, csvDataString, redis.print);
    res.send("data added");
  } else {
    console.log("not logged in");
    res.send("You are NOT logged in");
  }
});

app.use("/getData", function (req, res) {
  if (req.session.userinfo) {
    let sessionID = req.sessionID;
    let dataID = sessionID + "data";
    redisClient.get(dataID, function (err, reply) {
      // console.log(reply);
      // console.log(typeof reply);
      res.json(csvString.parse(reply));
    });
    // res.json(req.session.data);
  } else {
    console.log("not logged in");
    res.send("You are NOT logged in");
  }
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

app.listen(PORT);
