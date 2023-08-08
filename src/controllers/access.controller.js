"use strict";

const { CREATED } = require("../core/success.response");
const accessService = require("../services/access.service");

class AccessController {
  signup = async (req, res) => {
    return new CREATED({
      message: "Registerer OK!",
      metadata: await accessService.signUp(req.body),
    }).send(res);
  };
}

module.exports = new AccessController();
