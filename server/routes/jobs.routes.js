const { authJwt } = require("../middleware");
const controller = require("../controllers/jobs.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post("/api/job", [authJwt.verifyToken], controller.createJob);
  app.get("/api/job", [authJwt.verifyToken], controller.getJobs);
  app.get("/api/job/:id", [authJwt.verifyToken], controller.getJobById);
  app.put("/api/job/:id", [authJwt.verifyToken], controller.updateJobById);
};
