const { apiKey, permission } = require("../auth/checkauth");


const router = (app) => {
  // check api key
  app.use(apiKey)
  // check permissions
  app.use(permission("0000"))
  app.use("/v1/api", require("./access"));
};

module.exports = router;
