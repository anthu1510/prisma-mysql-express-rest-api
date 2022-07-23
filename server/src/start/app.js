const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
require("express-group-routes");

const session = require("express-session");
const MySQLStore = require("express-mysql-session")(session);

const app = express();

const options = {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
};

const sessionStore = new MySQLStore(options);

// applying middleware
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true,
    store: sessionStore,
  })
);

//routing config
//require("../routes")(app);

app.group("/api", (router) => {
  require("../routes").map((route) => router.use(route.url, route.routerFile));
});

// Error handling
app.use((req, res, next) => {
  const error = new Error("Not Found");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({ status: "failed", error: { message: error.message } });
});

module.exports = app;
