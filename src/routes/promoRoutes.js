const Router = require("express").Router();

const promoController = require("../controllers/promoController.js");

const { promoValidator } = require("../middleware/fieldValidator.js");
const inputFormatter = require("../middleware/valueValidator.js");

// USER
// get promo details
Router.get("/detail/:id", inputFormatter, promoValidator, promoController.getDetailPromo);
// search promo
Router.get("/", inputFormatter, promoValidator, promoController.searchPromos);

// ADMIN
// add new promo
Router.post("/add", inputFormatter, promoValidator, promoController.addPromo);
// edit promo
Router.put("/edit", inputFormatter, promoValidator, promoController.editPromo);
// delete promo
Router.delete("/:id", inputFormatter, promoValidator, promoController.deletePromoById);

module.exports = Router;
