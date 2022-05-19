const { getUserById, getUsers, createUser, deleteUser, updateUserProfile, updateUserPassword, getUserHistory } = require("../models/userModel.js");
const { createTransaction } = require("../models/transactionModel");
const { removeAccess } = require("../middleware/authValidator");
const { userStorage } = require("../config/cache");
const fs = require("fs");

const getUserDetail = async (req, res) => {
  try {
    const { data } = await getUserById(req);

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

    if (queryProp.length) {
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
    const { message } = err;
    const status = err.status ? err.status : 500;
    res.status(status).json({
      error: message,
    });
  }
};

const createOrder = async (req, res) => {
  try {
    const { data } = await createTransaction(req.body, req.userPayload.id);

    res.status(201).json({
      data,
      message: "Your Order has been process",
    });
  } catch (err) {
    const { message } = err;
    const status = err.status ? err.status : 500;
    res.status(status).json({
      error: message,
    });
  }
};

const userHistory = async (req, res) => {
  try {
    const { total, data } = await getUserHistory(req.userPayload.id);
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
    const { file } = req;
    let image = "";

    if (file) {
      image = file.path.replace("public", "").replace(/\\/g, "/");
      const {
        data: { image: oldImage },
      } = await getUserById(req);
      if (oldImage) {
        const route = req.baseUrl;
        const oldItem = oldImage.split("/")[3].split(".")[0];
        const oldCache = userStorage.getItem(oldItem);
        if (oldCache) {
          fs.unlinkSync(`./public/images${route}/${oldCache}`);
          userStorage.removeItem(oldItem);
        }
      }
      const imageDirCache = image.split("/")[3].split(".")[0];
      const imageCache = image.split("/")[3];
      userStorage.setItem(imageDirCache, imageCache);
    }
    const { data, message } = await updateUserProfile(req.body, req.userPayload.id, image);
    res.status(200).json({
      data,
      message,
    });
  } catch (err) {
    const { message } = err;
    const status = err.status ? err.status : 500;
    res.status(status).json({
      error: message,
    });
  }
};

const editUserPassword = async (req, res) => {
  try {
    const { data, message } = await updateUserPassword(req.body, req.userPayload.id);
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
    const { data, message } = await deleteUser(req);
    const path = req.path;
    const routes = req.baseUrl;
    if (path === "/delete/") {
      removeAccess(req.userPayload.id);
    }
    const oldImage = data.image;
    if (oldImage) {
      const oldItem = oldImage.split("/")[3].split(".")[0];
      const oldCache = userStorage.getItem(oldItem);
      if (oldCache) fs.unlinkSync(`./public/images${routes}/${oldCache}`);
      userStorage.removeItem(oldItem);
    }

    res.status(200).json({
      data,
      message,
    });
  } catch (err) {
    const { message } = err;
    const status = err.status ? err.status : 500;
    res.status(status).json({
      error: message,
    });
  }
};

module.exports = {
  getUserDetail,
  searchUsers,
  userHistory,
  createOrder,
  addUser,
  deleteUserById,
  editUser,
  editUserPassword,
};