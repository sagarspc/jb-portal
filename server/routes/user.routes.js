const { authJwt } = require("../middleware");
const controller = require("../controllers/user.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post('/api/test/user',[authJwt.verifyToken], controller.createUser);
  app.get('/api/test/user/:id',[authJwt.verifyToken], controller.getUserById);
  app.put('/api/test/user/:id',[authJwt.verifyToken], controller.updateUserById);
};
