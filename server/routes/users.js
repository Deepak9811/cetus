var express = require("express");
var router = express.Router();
const userController = require("../controller/Users.controller");

var UserController = require("../controller/Users.controller");

//**********USER-LOG-IN*********************** */
router.post("/login", function (req, res, next) {
  UserController.login(req, res);
});

// const productController = require("../controller/Products.controller");

// router.post('/add-product', function(req, res, next) {
//   productController.addProduct(req,res);
// });

//**********USER-ADD*********************** */

router.post("/add-user", function (req, res, next) {
  userController.userRegister(req, res);
});

//**********USER-ALL-LIST*********************** */

router.get("/get-user-list", function (req, res, next) {
  UserController.getUsersList(req, res);
});

//**********USER-GET-BY-ID*********************** */

router.get("/users", function (req, res, next) {
  UserController.getUsersById(req, res);
});

//**************DELETE-USERS********************************* */
router.delete("/users", function (req, res, next) {
  UserController.DeleteUsers(req, res);
});

//**********USER-UPDATE-PASSWORD*********************** */

router.put("/temp-generator", function (req, res, next) {
  UserController.forgotUserPassTemp(req, res);
});


router.get("/users-info-by-email", function (req, res, next) {
  UserController.findUserInfByEmail(req, res);
});


//**********USER-UPDATE-PASSWORD*********************** */

router.put("/update-userData", function (req, res, next) {
  UserController.updateUserData(req, res);
});

//**********CHECK-USER-ADD*********************** */

router.post("/check-user", function (req, res, next) {
  userController.CheckUserRegister(req, res);
});

module.exports = router;
