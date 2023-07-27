const compression = require("compression");
const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const { checkOverLoad } = require("./helper/check.connect");
const app = express();

// init middleware
app.use(morgan("dev"));
app.use(helmet());
app.use(compression());
// init db
require('./dbs/init.mongo');
checkOverLoad()
//init router

//handle error

module.exports = app;
