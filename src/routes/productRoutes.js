const Router = require("express").Router();

const productController = require("../controllers/productController.js");

const { productPostValidator } = require("../middleware/postValidator.js");
const { putValidator } = require("../middleware/putValidator.js");

Router.get("/all", productController.getAllProducts);

Router.get("/", productController.findProductByQueries);

Router.post("/", productPostValidator, productController.addProduct);

Router.put("/", putValidator, productController.editProduct);

Router.delete("/:id", productController.deleteProductById);

module.exports = Router;
