const Router = require("express").Router();

const productController = require("../controllers/productController.js");

const { productValidator } = require("../middleware/fieldValidator.js");
const inputFormatter = require("../middleware/valueValidator.js");

// USER
// get product detail
Router.get("/detail/:id", inputFormatter, productValidator, productController.getProductDetail);
// get all,search product
Router.get("/", inputFormatter, productValidator, productController.searchProducts);
// favourite product
Router.get("/favourite", inputFormatter, productValidator, productController.favProduct);

// ADMIN
// add new product
Router.post("/", inputFormatter, productValidator, productController.addProduct);
// edit product detail
Router.put("/:id", inputFormatter, productValidator, productController.editProduct);
// delete product
Router.delete("/:id", inputFormatter, productValidator, productController.deleteProductById);

module.exports = Router;
