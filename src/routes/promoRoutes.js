const Router = require("express").Router();

const promoController = require("../controllers/promoController.js");

const { promoValidator } = require("../middleware/fieldValidator.js");
const inputFormatter = require("../middleware/valueValidator.js");

// USER
// get promo details
Router.get("/detail/:id", inputFormatter, promoValidator, promoController.getDetailPromo);
// view all promo,search promo
Router.get("/", inputFormatter, promoValidator, promoController.searchPromos);

// ADMIN
// add new promo
Router.post("/", inputFormatter, promoValidator, promoController.addPromo);
// edit promo
Router.put("/:id", inputFormatter, promoValidator, promoController.editPromo);
// delete promo
Router.delete("/:id", inputFormatter, promoValidator, promoController.deletePromoById);

module.exports = Router;
