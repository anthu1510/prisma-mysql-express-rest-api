const express = require("express");

const app = express();

// applying middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//routing config
require("./routes")(app);

module.exports = app;
