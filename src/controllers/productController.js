const { getProducts, getProductByFav, createProduct, updateProduct, deleteProduct, getProductById } = require("../models/productModel.js");

const getProductDetail = async (req, res) => {
  try {
    const { data } = await getProductById(req.params.id);
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

const searchProducts = async (req, res) => {
  try {
    const { total, data } = await getProducts(req.query);
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

const favProduct = async (req, res) => {
  try {
    const { total, data } = await getProductByFav(req.query);
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

const addProduct = async (req, res) => {
  try {
    const { data, message } = await createProduct(req.body);
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

const editProduct = async (req, res) => {
  try {
    const { data, message } = await updateProduct(req.body, req.params.id);
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

const deleteProductById = async (req, res) => {
  try {
    const { data, message } = await deleteProduct(req.params.id);
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
  searchProducts,
  getProductDetail,
  favProduct,
  addProduct,
  editProduct,
  deleteProductById,
};
