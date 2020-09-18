"use strict";

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
  // console.log(req.session.userinfo);
  if (req.session.userinfo) {
    res.send(req.session.userinfo + "has logged in");
  } else {
    req.session.userinfo = Math.random();
    res.send("successful log in！");
  }
});

app.use("/logout", function (req, res) {
  req.session.destroy();
  res.send("You'vd logged out!!");
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
