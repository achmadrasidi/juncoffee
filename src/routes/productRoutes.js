const Router = require("express").Router();

const productController = require("../controllers/productController.js");

Router.get("/all", productController.getAllProducts);

Router.get("/", productController.findProductByQueries);

Router.post("/", productController.addProduct);

Router.put("/", productController.editProduct);

Router.delete("/:id", productController.deleteProductById);

module.exports = Router;
