const { apiKey, permission } = require("../auth/checkauth");


const router = (app) => {
  // app.use(apiKey)
  // app.use(permission("0000"))
  app.use("/v1/api", require("./access"));
};

module.exports = router;
