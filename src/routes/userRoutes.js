const Router = require("express").Router();

const { getUserDetail, userHistory, editUser, editUserPassword, deleteUserById, searchUsers, addUser } = require("../controllers/userController.js");
const { userValidator } = require("../middleware/fieldValidator.js");
const { valueValidator } = require("../middleware/valueValidator.js");
const { checkToken, checkRole } = require("../middleware/authValidator.js");

// USER
// get user detail
Router.get("/detail/:id", checkToken, checkRole("user"), valueValidator, getUserDetail);
// get user history
Router.get("/order/:id", checkToken, checkRole("user"), valueValidator, userHistory);
// edit user detail
Router.patch("/edit-profile/", checkToken, checkRole("user"), valueValidator, userValidator, editUser);
// edit user password
Router.patch("/edit-password/:id", checkToken, checkRole("user"), valueValidator, userValidator, editUserPassword);

// USER AND ADMIN
// delete user by id
Router.delete("/:id", checkToken, checkRole("user"), valueValidator, deleteUserById);

// ADMIN
// get all users, search users
Router.get("/", checkToken, checkRole("admin"), valueValidator, userValidator, searchUsers);

// add new user
Router.post("/", checkToken, checkRole("admin"), valueValidator, userValidator, addUser);

module.exports = Router;
