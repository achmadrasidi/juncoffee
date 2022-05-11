const Router = require("express").Router();

const { getProductDetail, searchProducts, favProduct, addProduct, editProduct, deleteProductById } = require("../controllers/productController");
const { productValidator } = require("../middleware/fieldValidator.js");
const { valueValidator } = require("../middleware/valueValidator.js");
const { checkToken, checkRole } = require("../middleware/authValidator");

// USER
// get product detail
Router.get("/detail/:id", checkToken, checkRole("user"), valueValidator, getProductDetail);
// get all,search product
Router.get("/", valueValidator, productValidator, searchProducts);
// favourite product
Router.get("/favourite", checkToken, checkRole("user"), valueValidator, productValidator, favProduct);

// ADMIN
// add new product
Router.post("/", checkToken, checkRole("admin"), valueValidator, productValidator, addProduct);
// edit product detail
Router.patch("/:id", checkToken, checkRole("admin"), valueValidator, productValidator, editProduct);
// delete product
Router.delete("/:id", checkToken, checkRole("admin"), valueValidator, deleteProductById);

module.exports = Router;
