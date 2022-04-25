const Router = require("express").Router();

const { getAllOrders, addTransaction, findOrderByQueries, editTransaction, deleteOrderById } = require("../controllers/transactionController.js");

Router.get("/all", getAllOrders);

Router.get("/", findOrderByQueries);

Router.post("/", addTransaction);

Router.patch("/", editTransaction);

Router.delete("/:id", deleteOrderById);

module.exports = Router;
