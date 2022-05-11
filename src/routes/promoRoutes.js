const Router = require("express").Router();

const promoController = require("../controllers/promoController.js");

const { promoValidator } = require("../middleware/fieldValidator.js");
const { valueValidator } = require("../middleware/valueValidator.js");

// USER
// get promo details
Router.get("/detail/:id", valueValidator, promoController.getDetailPromo);
// view all promo,search promo
Router.get("/", valueValidator, promoValidator, promoController.searchPromos);

// ADMIN
// add new promo
Router.post("/", valueValidator, promoValidator, promoController.addPromo);
// edit promo
Router.patch("/:id", valueValidator, promoValidator, promoController.editPromo);
// delete promo
Router.delete("/:id", valueValidator, promoController.deletePromoById);

module.exports = Router;
