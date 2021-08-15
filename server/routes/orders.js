var express = require("express");
var router = express.Router();
var ordersController = require("../controller/orders.controller");

router.post("/orders", function (req, res, next) {
  ordersController.AddOrders(req, res);
});

router.get("/orders-list", function (req, res, next) {
  ordersController.getOrdersList(req, res);
});

//*************orders-by-Id******************** */

router.get("/order-perticular-id", function (req, res, next) {
  ordersController.getById(req, res);
});

//**************update-order-status************************ */

router.put("/ordersUpdate", function (req, res, next) {
  ordersController.UpdateOrders(req, res);
});

//*************orders-userId-Id******************** */

router.get("/all-orders", function (req, res, next) {
  ordersController.getOrderById(req, res);
});

//*************orders-celebrity Id******************** */

router.get("/all-orders-celebrity", function (req, res, next) {
  ordersController.getOrderCelebrityId(req, res);
});

//*****************DELETE-ORDER**************************************** */
router.delete("/delete-orders", function (req, res, next) {
  ordersController.DeleteOrder(req, res);
});

module.exports = router;
