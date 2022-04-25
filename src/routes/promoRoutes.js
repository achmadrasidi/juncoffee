const Router = require("express").Router();

const promoController = require("../controllers/promoController.js");

Router.get("/all", promoController.getAllPromos);

Router.get("/", promoController.findPromoByQueries);

Router.post("/", promoController.addPromo);

Router.put("/", promoController.editPromo);

Router.delete("/:id", promoController.deletePromoById);

module.exports = Router;
