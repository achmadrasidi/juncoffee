const Router = require("express").Router();
const { register } = require("../controllers/authcontroller.js");
const { userValidator } = require("../middleware/fieldValidator.js");
const { valueValidator, duplicateValidator } = require("../middleware/valueValidator.js");

Router.post("/register", userValidator, valueValidator, duplicateValidator, register);

module.exports = Router;
