const Router = require("express").Router();

const productsRouter = require("./productRoutes");
const usersRouter = require("./userRoutes");
const promosRouter = require("./promoRoutes");
const transactionsRouter = require("./transactionRoutes");
const authRouter = require("./authRoutes");

Router.use("/auth", authRouter);
Router.use("/user", usersRouter);
Router.use("/product", productsRouter);
Router.use("/promo", promosRouter);
Router.use("/transaction", transactionsRouter);

module.exports = Router;
