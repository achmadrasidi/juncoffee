const Router = require("express").Router();

const promoController = require("../controllers/promoController.js");

const { promoValidator } = require("../middleware/fieldValidator.js");
const inputFormatter = require("../middleware/valueValidator.js");

Router.get("/detail/:id", inputFormatter, promoValidator, promoController.getDetailPromo);

Router.get("/", inputFormatter, promoValidator, promoController.searchPromos);

Router.post("/", inputFormatter, promoValidator, promoController.addPromo);

Router.put("/", inputFormatter, promoValidator, promoController.editPromo);

Router.delete("/:id", inputFormatter, promoValidator, promoController.deletePromoById);

module.exports = Router;
