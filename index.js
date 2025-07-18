const express = require("express");
const path = require("path");
const route = require("./route/bog.js");
const passport = require("./auth.js");
const bycrypt = require("bcrypt");

const bodyParser = require("body-parser");

const app = express();

const port = 3000;

// midilware Function

const logUser = (req, res, next) => {
  console.log(
    `[${new Date().toLocaleString()}] Request received for ${
      req.originalUrl
    } from ${req.ip}`
  );
  next();
};

app.use(bodyParser.json());
// app.use(express.static(path.join(__dirname, "static")));

app.use(passport.initialize());

// not using write now we are using json token
const localAuthMiddleware = passport.authenticate("local", { session: false });

app.get("/", logUser, route);

const perseRouter = require("./route/personRoutes.js");
const menuRouter = require("./route/menuRoutes.js");

app.use("/person", perseRouter);
app.use("/menu", menuRouter);

app.listen(port, () => {
  console.log("server is running");
});
