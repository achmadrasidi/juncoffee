const Router = require("express").Router();

const productController = require("../controllers/productController.js");

const { productValidator } = require("../middleware/fieldValidator.js");
const inputFormatter = require("../middleware/valueValidator.js");

Router.get("/detail/:id", inputFormatter, productValidator, productController.getProductDetail);

Router.get("/", inputFormatter, productValidator, productController.searchProducts);

Router.post("/", inputFormatter, productValidator, productController.addProduct);

Router.put("/", inputFormatter, productValidator, productController.editProduct);

Router.delete("/:id", inputFormatter, productValidator, productController.deleteProductById);

module.exports = Router;
