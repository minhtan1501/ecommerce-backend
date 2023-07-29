const compression = require("compression");
const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const { checkOverLoad } = require("./helper/check.connect");
const router = require("./routers");
const app = express();

// init middleware
app.use(morgan("dev"));
app.use(helmet());
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}))
// init db
require('./dbs/init.mongo');
// checkOverLoad()
//init router
router(app);
//handle error

module.exports = app;
