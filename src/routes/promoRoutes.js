const Router = require("express").Router();

const promoController = require("../controllers/promoController.js");

const { promoPostValidator } = require("../middleware/postValidator.js");
const { putValidator } = require("../middleware/putValidator.js");

Router.get("/all", promoController.getAllPromos);

Router.get("/", promoController.findPromoByQueries);

Router.post("/", promoPostValidator, promoController.addPromo);

Router.put("/", putValidator, promoController.editPromo);

Router.delete("/:id", promoController.deletePromoById);

module.exports = Router;
