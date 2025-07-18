const express = require("express");
const path = require("path");
const Menu = require("../models/Menu.js");

const route = express.Router();

route.get("/", (req, res) => {
  res.send("hello word");
});

route.post("/items", (req, res) => {
  res.send("hello word");
});

route.get("/file", (req, res) => {
  res.sendFile(path.join(__dirname, "../starter.html"));
  res.status(200);
});

route.get("/json", (req, res) => {
  res.json({
    shabbir: {
      age: 20,
    },
  });
  res.status(200);
});
route.get("/hello/:name", (req, res) => {
  res.send(`hello word ${req.params.name}`);
  res.status(200);
});

module.exports = route;
