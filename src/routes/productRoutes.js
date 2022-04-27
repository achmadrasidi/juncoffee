const Router = require("express").Router();

const productController = require("../controllers/productController.js");

const { productValidator } = require("../middleware/fieldValidator.js");
const inputFormatter = require("../middleware/valueValidator.js");

// USER
// get product detail
Router.get("/detail/:id", inputFormatter, productValidator, productController.getProductDetail);
// search,filter,sort product
Router.get("/", inputFormatter, productValidator, productController.searchProducts);
// favourite product
Router.get("/favourite", inputFormatter, productValidator, productController.favProduct);

// ADMIN
// add new product
Router.post("/add", inputFormatter, productValidator, productController.addProduct);
// edit product detail
Router.put("/edit", inputFormatter, productValidator, productController.editProduct);
// delete product
Router.delete("/:id", inputFormatter, productValidator, productController.deleteProductById);

module.exports = Router;
