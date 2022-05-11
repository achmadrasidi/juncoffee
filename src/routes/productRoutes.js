const Router = require("express").Router();

const productController = require("../controllers/productController.js");

const { productValidator } = require("../middleware/fieldValidator.js");
const { valueValidator } = require("../middleware/valueValidator.js");

// USER
// get product detail
Router.get("/detail/:id", valueValidator, productController.getProductDetail);
// get all,search product
Router.get("/", valueValidator, productValidator, productController.searchProducts);
// favourite product
Router.get("/favourite", valueValidator, productValidator, productController.favProduct);

// ADMIN
// add new product
Router.post("/", valueValidator, productValidator, productController.addProduct);
// edit product detail
Router.patch("/:id", valueValidator, productValidator, productController.editProduct);
// delete product
Router.delete("/:id", valueValidator, productController.deleteProductById);

module.exports = Router;
