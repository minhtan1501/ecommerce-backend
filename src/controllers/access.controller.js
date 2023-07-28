"use strict";

const accessService = require("../services/access.service");

class AccessController {
  signup = async (req, res, next) => {
    try {
      console.log(`[P]::signup::`, req.body);
      /**
       * 200 ok
       * 201 created
       */
      return res.status(201).json(await accessService.signUp(req.body));
    } catch (error) {
      next(error);
    }
  };
}

module.exports = new AccessController();
