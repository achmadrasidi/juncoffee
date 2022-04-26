const Router = require("express").Router();

const userController = require("../controllers/userController.js");
const { userPostValidator } = require("../middleware/postValidator.js");
const { putValidator } = require("../middleware/putValidator.js");
const inputFormatter = require("../middleware/inputFormatter.js");

Router.get("/all", userController.getAllUsers);

Router.get("/", userController.getUserByQueries);

Router.post("/", inputFormatter, userPostValidator, userController.addUser);

Router.delete("/:id", userController.deleteUserById);

Router.put("/", inputFormatter, putValidator, userController.editUser);

Router.patch("/", userController.editUserPassword);

module.exports = Router;
