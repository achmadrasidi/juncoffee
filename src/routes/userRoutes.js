const Router = require("express").Router();

const userController = require("../controllers/userController.js");
const { userValidator } = require("../middleware/fieldValidator.js");
const { valueValidator } = require("../middleware/valueValidator.js");

// USER
// get user detail
Router.get("/detail/:id", valueValidator, userController.getUserDetail);
// get user history
Router.get("/order/:id", valueValidator, userController.userHistory);
// edit user detail
Router.patch("/edit-profile/:id", valueValidator, userValidator, userController.editUser);
// edit user password
Router.patch("/edit-password/:id", valueValidator, userValidator, userController.editUserPassword);

// USER AND ADMIN
// delete user by id
Router.delete("/:id", valueValidator, userController.deleteUserById);

// ADMIN
// get all users, search users
Router.get("/", valueValidator, userValidator, userController.searchUsers);

// add new user
Router.post("/", valueValidator, userValidator, userController.addUser);

module.exports = Router;
