const Router = require("express").Router();

const userController = require("../controllers/userController.js");
const { userPostValidator } = require("../middleware/postValidator.js");
const { userPutValidator } = require("../middleware/putValidator.js");

Router.get("/all", userController.getAllUsers);

Router.get("/", userController.getUserByQueries);

Router.post("/", userPostValidator, userController.addUser);

Router.delete("/:id", userController.deleteUserById);

Router.put("/", userPutValidator, userController.editUser);

Router.patch("/", userController.editUserPassword);

module.exports = Router;
