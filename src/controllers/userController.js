const { getUserById, getUsers, createUser, deleteUser, updateUserProfile, updateUserPassword } = require("../models/userModel.js");

const getUserDetail = async (req, res) => {
  try {
    const { data } = await getUserById(req.params.id);

    res.status(200).json({
      data,
      err: null,
    });
  } catch (err) {
    const { error, status } = err;
    res.status(status).json({
      data: [],
      error,
    });
  }
};

const searchUser = async (req, res) => {
  try {
    const { data } = await getUsers(req.query);

    res.status(200).json({
      data,
      err: null,
    });
  } catch (err) {
    const { error, status } = err;
    res.status(status).json({
      data: [],
      error,
    });
  }
};

const addUser = async (req, res) => {
  try {
    const { data, message } = await createUser(req.body);
    res.status(201).json({
      data,
      message,
      err: null,
    });
  } catch (err) {
    const { error, status } = err;
    res.status(status).json({
      data: [],
      error,
    });
  }
};

const editUser = async (req, res) => {
  try {
    const { data, message } = await updateUserProfile(req.body);

    res.status(200).json({
      data,
      message,
      err: null,
    });
  } catch (err) {
    const { error, status } = err;
    res.status(status).json({
      data: [],
      error,
    });
  }
};

const editUserPassword = async (req, res) => {
  try {
    const { data, message } = await updateUserPassword(req.body);
    res.status(200).json({
      data,
      message,
      err: null,
    });
  } catch (err) {
    const { error, status } = err;
    res.status(status).json({
      data: [],
      error,
    });
  }
};

const deleteUserById = async (req, res) => {
  try {
    const { data, message } = await deleteUser(req.params.id);
    res.status(200).json({
      data,
      message,
      err: null,
    });
  } catch (err) {
    const { error, status } = err;
    res.status(status).json({
      data: [],
      error,
    });
  }
};

module.exports = { getUserDetail, searchUser, addUser, deleteUserById, editUser, editUserPassword };
