const Router = require("express").Router();

const userController = require("../controllers/userController.js");
const { userValidator } = require("../middleware/fieldValidator.js");
const inputFormatter = require("../middleware/valueValidator.js");

// USER
// get user detail
Router.get("/detail/:id", inputFormatter, userValidator, userController.getUserDetail);
// get user history
Router.get("/order/:id", inputFormatter, userValidator, userController.userHistory);
// edit user detail
Router.put("/edit-profile", inputFormatter, userValidator, userController.editUser);
// edit user password
Router.patch("/edit-password", inputFormatter, userValidator, userController.editUserPassword);

// USER AND ADMIN
// delete user by id
Router.delete("/:id", inputFormatter, userValidator, userController.deleteUserById);

// ADMIN
// get all users, search users
Router.get("/", inputFormatter, userValidator, userController.searchUsers);

// add new user
Router.post("/add", inputFormatter, userValidator, userController.addUser);

module.exports = Router;
