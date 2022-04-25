const Router = require("express").Router();

const { getAllOrders, addTransaction, findOrderByQueries, editTransaction, deleteOrderById } = require("../controllers/transactionController.js");

const { orderPostValidator } = require("../middleware/postValidator.js");

Router.get("/all", getAllOrders);

Router.get("/", findOrderByQueries);

Router.post("/", orderPostValidator, addTransaction);

Router.patch("/", editTransaction);

Router.delete("/:id", deleteOrderById);

module.exports = Router;
