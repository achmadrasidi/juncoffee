const Router = require("express").Router();

const userController = require("../controllers/userController.js");

Router.get("/all", userController.getAllUsers);

Router.get("/", userController.getUserByQueries);

Router.post("/", userController.addUser);

Router.delete("/:id", userController.deleteUserById);

Router.put("/", userController.editUser);

Router.patch("/", userController.editUserPassword);

module.exports = Router;
