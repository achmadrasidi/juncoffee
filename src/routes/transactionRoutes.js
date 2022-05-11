const Router = require("express").Router();

const { addTransaction, findOrderByQueries, editTransaction, deleteOrderById, getDetailOrder } = require("../controllers/transactionController.js");

const { orderValidator } = require("../middleware/fieldValidator.js");
const { valueValidator } = require("../middleware/valueValidator.js");

// ADMIN
// get transaction details
Router.get("/detail/:id", valueValidator, getDetailOrder);
// get all transactions or search transactions
Router.get("/", valueValidator, orderValidator, findOrderByQueries);
// add new transaction
Router.post("/", valueValidator, orderValidator, addTransaction);
// update order status
Router.patch("/:id", valueValidator, orderValidator, editTransaction);
// delete transaction
Router.delete("/:id", valueValidator, deleteOrderById);

module.exports = Router;
