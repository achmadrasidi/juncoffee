const Router = require("express").Router();

const userController = require("../controllers/userController.js");
const { userValidator } = require("../middleware/fieldValidator.js");
const inputFormatter = require("../middleware/valueValidator.js");

// get user detail
Router.get("/detail/:id", inputFormatter, userValidator, userController.getUserDetail);

// search users with query/keyword
Router.get("/", inputFormatter, userValidator, userController.searchUsers);

// add new user
Router.post("/", inputFormatter, userValidator, userController.addUser);

// delete user by id
Router.delete("/:id", inputFormatter, userValidator, userController.deleteUserById);

// edit user detail
Router.put("/", inputFormatter, userValidator, userController.editUser);

// edit user password
Router.patch("/", inputFormatter, userValidator, userController.editUserPassword);

module.exports = Router;
