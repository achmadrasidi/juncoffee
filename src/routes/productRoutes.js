const Router = require("express").Router();

const productController = require("../controllers/productController.js");

const { productPostValidator } = require("../middleware/postValidator.js");
const { putValidator } = require("../middleware/putValidator.js");
const getValidator = require("../middleware/getValidator");

Router.get("/detail/:id", productController.getProductDetail);

Router.get("/", getValidator, productController.searchProducts);

Router.post("/", productPostValidator, productController.addProduct);

Router.put("/", putValidator, productController.editProduct);

Router.delete("/:id", productController.deleteProductById);

module.exports = Router;
