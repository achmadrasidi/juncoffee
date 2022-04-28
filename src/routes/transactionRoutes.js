const Router = require("express").Router();

const { addTransaction, findOrderByQueries, editTransaction, deleteOrderById, getDetailOrder } = require("../controllers/transactionController.js");

const { orderValidator } = require("../middleware/fieldValidator.js");
const inputFormatter = require("../middleware/valueValidator.js");

// ADMIN
// get transaction details
Router.get("/detail/:id", inputFormatter, orderValidator, getDetailOrder);
// get all transactions or search transactions
Router.get("/", inputFormatter, orderValidator, findOrderByQueries);
// add new transaction
Router.post("/", inputFormatter, orderValidator, addTransaction);
// update order status
Router.patch("/:id", inputFormatter, orderValidator, editTransaction);
// delete transaction
Router.delete("/:id", inputFormatter, orderValidator, deleteOrderById);

module.exports = Router;
