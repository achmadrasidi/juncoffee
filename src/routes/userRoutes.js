const Router = require("express").Router();

const userController = require("../controllers/userController.js");
const { userPostValidator } = require("../middleware/postValidator.js");
const { putValidator } = require("../middleware/putValidator.js");
const inputFormatter = require("../middleware/inputFormatter.js");
const getValidator = require("../middleware/getValidator.js");

// get user detail
Router.get("/detail/:id", userController.getUserDetail);

// search users with query/keyword
Router.get("/", getValidator, userController.searchUsers);

// add new user
Router.post("/", inputFormatter, userPostValidator, userController.addUser);

// delete user by id
Router.delete("/:id", userController.deleteUserById);

// edit user detail
Router.put("/", inputFormatter, putValidator, userController.editUser);

// edit user password
Router.patch("/", userController.editUserPassword);

module.exports = Router;
