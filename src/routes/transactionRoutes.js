const Router = require("express").Router();

const { addTransaction, findOrderByQueries, editTransaction, deleteOrderById, getDetailOrder } = require("../controllers/transactionController.js");

const { orderValidator } = require("../middleware/fieldValidator.js");
const inputFormatter = require("../middleware/valueValidator.js");

Router.get("/detail/:id", inputFormatter, orderValidator, getDetailOrder);

Router.get("/", inputFormatter, orderValidator, findOrderByQueries);

Router.post("/", inputFormatter, orderValidator, addTransaction);

Router.patch("/", inputFormatter, orderValidator, editTransaction);

Router.delete("/:id", inputFormatter, orderValidator, deleteOrderById);

module.exports = Router;
