"use strict";

const express = require("express");
const session = require("express-session");

const app = express();
const PORT = 9090;

const cors = require("cors");
app.use(cors());

app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true,
    cookie: ("name", "value", { maxAge: 5 * 60 * 1000, secure: false }),
  })
);

app.use("/login", function (req, res) {
  // config session
  console.log(req.session.userinfo);
  req.session.userinfo = "Alex";
  res.send("successful login！");
});

app.use("/", function (req, res) {
  // fetch session
  console.log(req.session);
  if (req.session.userinfo) {
    res.send("hello " + req.session.userinfo + "，welcome");
  } else {
    res.send("NOT loggged in");
  }
});

app.listen(PORT);
