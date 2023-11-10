"use strict";

const { findById } = require("../services/apikey.service");
const { sendError } = require("../utils");

const HEADER = {
  API_KEY: "x-api-key",
  AUTHORIZATION: "authorization",
};

const apiKey = async (req, res, next) => {
  try {
    const key = req.headers[HEADER.API_KEY]?.toString();
    if (!key) {
      return sendError(res, "Forbidden Error");
    }

    // check objectKey
    const objKey = await findById(key);
    if (!objKey) {
      return sendError(res, "Forbidden Error");
    }

    req.objKey = objKey;
    return next();
  } catch (error) {
    console.log(error);
  }
};

const permission = (permission) => {
  return (req, res, next) => {
    if (!req.objKey.permissions) {
      return sendError(res, "Permission denied");
    }
    const validPermission = req.objKey.permissions.includes(permission);
    if (!validPermission) {
      console.log("Error permission");
      return sendError(res, "Permission denied");
    }
    next();
  };
};


module.exports = {
  apiKey,
  permission,
};
