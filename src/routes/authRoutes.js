const Router = require("express").Router();
const { register, login, logout } = require("../controllers/authcontroller.js");
const { userValidator } = require("../middleware/fieldValidator.js");
const { valueValidator, duplicateValidator } = require("../middleware/valueValidator.js");
const { checkToken, checkRole, isLoggedIn } = require("../middleware/authValidator");

Router.post("/register", isLoggedIn, userValidator, valueValidator, duplicateValidator, register);
Router.post("/login", isLoggedIn, userValidator, valueValidator, login);
Router.delete("/logout", checkToken, checkRole("user"), logout);

module.exports = Router;
