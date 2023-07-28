

const router = (app) => {
  app.use("/v1/api", require("./access"));
};

module.exports = router;
