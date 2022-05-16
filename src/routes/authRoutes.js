const Router = require("express").Router();
const { register, login, logout } = require("../controllers/authController.js");
const { userValidator } = require("../middleware/fieldValidator.js");
const { valueValidator, duplicateValidator } = require("../middleware/valueValidator.js");
const { checkToken, checkRole, isLoggedIn } = require("../middleware/authValidator");
const uploadFile = require("../middleware/fileUpload");

Router.post("/register", isLoggedIn, valueValidator, uploadFile, userValidator, duplicateValidator, register);
Router.post("/login", isLoggedIn, valueValidator, userValidator, login);
Router.delete("/logout", checkToken, checkRole("user"), logout);

module.exports = Router;
