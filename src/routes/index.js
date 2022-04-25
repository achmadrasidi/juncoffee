const Router = require("express").Router();

const productsRouter = require("./productRoutes");
const usersRouter = require("./userRoutes");
const promosRouter = require("./promoRoutes");
const transactionsRouter = require("./transactionRoutes");

Router.use("/product", productsRouter);
Router.use("/user", usersRouter);
Router.use("/transaction", transactionsRouter);
Router.use("/promo", promosRouter);

module.exports = Router;
