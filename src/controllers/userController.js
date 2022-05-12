const { getUserById, getUsers, createUser, deleteUser, updateUserProfile, updateUserPassword, getUserHistory } = require("../models/userModel.js");

const getUserDetail = async (req, res) => {
  try {
    const { data } = await getUserById(req.params.id);

    res.status(200).json({
      data,
    });
  } catch (err) {
    const { message, status } = err;
    res.status(status).json({
      error: message,
    });
  }
};

const searchUsers = async (req, res) => {
  try {
    const { totalUser, totalPage, data } = await getUsers(req.query);
    const { page = 1, limit } = req.query;
    const queryProp = Object.keys(req.query);
    let pageQuery = "?page=";
    let limitQuery = `&limit=${limit}`;
    let route = "";

    const re = new RegExp(`\&page=${page}`);
    const reg = new RegExp(`\&limit=${limit}`);

    if (queryProp.length > 0) {
      route = req._parsedUrl.search.replace(/\?/g, "&").replace(re, "").replace(reg, "");
    }
    const currentPage = Number(page);
    const nextPage = `/user${pageQuery}${Number(page) + 1}${limitQuery}${route}`;
    const prevPage = `/user${pageQuery}${Number(page) - 1}${limitQuery}${route}`;

    const meta = {
      totalUser,
      totalPage,
      currentPage,
      nextPage: currentPage === Number(totalPage) ? null : nextPage,
      prevPage: currentPage === 1 ? null : prevPage,
    };
    res.status(200).json({
      meta,
      data,
    });
  } catch (err) {
    const { message, status } = err;
    res.status(status).json({
      error: message,
    });
  }
};

const userHistory = async (req, res) => {
  try {
    const { total, data } = await getUserHistory(req.params.id);
    res.status(200).json({
      total,
      data,
    });
  } catch (err) {
    const { message, status } = err;
    res.status(status).json({
      error: message,
    });
  }
};

const addUser = async (req, res) => {
  try {
    const { data, message } = await createUser(req.body);
    res.status(201).json({
      data,
      message,
    });
  } catch (err) {
    const { message, status } = err;
    res.status(status).json({
      error: message,
    });
  }
};

const editUser = async (req, res) => {
  try {
    const { data, message } = await updateUserProfile(req.body, req.userPayload.id);
    res.status(200).json({
      data,
      message,
    });
  } catch (err) {
    const { message, status } = err;
    res.status(status).json({
      error: message,
    });
  }
};

const editUserPassword = async (req, res) => {
  try {
    const { data, message } = await updateUserPassword(req.body, req.params.id);
    res.status(200).json({
      data,
      message,
    });
  } catch (err) {
    const { message, status } = err;
    res.status(status).json({
      error: message,
    });
  }
};

const deleteUserById = async (req, res) => {
  try {
    const { data, message } = await deleteUser(req.params.id);
    res.status(200).json({
      data,
      message,
    });
  } catch (err) {
    const { message, status } = err;
    res.status(status).json({
      error: message,
    });
  }
};

module.exports = {
  getUserDetail,
  searchUsers,
  userHistory,
  addUser,
  deleteUserById,
  editUser,
  editUserPassword,
};
