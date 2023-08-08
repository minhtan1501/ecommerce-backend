"use strict";

const _ = require("lodash");

const getIntoData = ({ fields = [], object = {} }) => {
  return _.pick(object, fields);
};

const sendError = (res, message = "", statusCode = 403) => {
  return res.status(statusCode).json({
    message,
  });
};
module.exports = {
  getIntoData,
  sendError
};
