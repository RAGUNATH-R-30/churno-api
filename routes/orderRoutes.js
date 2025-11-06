const express = require("express");
const orderController = require("../controllers/orderController");
const orderRouter = express.Router();

orderRouter.get("/getAllOrders", orderController.getAllOrders);
orderRouter.post("/getShopOrders", orderController.getShopOrders);

module.exports = orderRouter;
