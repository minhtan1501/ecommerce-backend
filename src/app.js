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
app.use(
  express.urlencoded({
    extended: true,
  })
);
// init db
require("./dbs/init.mongo");
// checkOverLoad()
//init router
router(app);
//handle error
app.use((req, res, next) => {
  const error = new Error("Not Found");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
    console.log(error);
  const statusCode = error.status || 500;
  return res.status(statusCode).json({
    status: "error",
    code: statusCode,
    message: error.message || "Internal Server Error",
  });
});
module.exports = app;
