const { getProducts, createProduct, updateProduct, deleteProduct, getProductById } = require("../models/productModel.js");

const getProductDetail = async (req, res) => {
  try {
    const { total, data } = await getProductById(req.params.id);
    res.status(200).json({
      total,
      data,
      error: null,
    });
  } catch (err) {
    const { error, status } = err;
    res.status(status).json({
      data: [],
      error,
    });
  }
};

const findProductByQueries = async (req, res) => {
  try {
    const { total, data } = await getProducts(req.query);
    res.status(200).json({
      total,
      data,
      error: null,
    });
  } catch (err) {
    const { error, status } = err;
    res.status(status).json({
      data: [],
      error,
    });
  }
};

const addProduct = async (req, res) => {
  try {
    const { data, message } = await createProduct(req.body);
    res.status(201).json({
      data,
      message,
      error: null,
    });
  } catch (err) {
    const { error, status } = err;
    res.status(status).json({
      data: [],
      error,
    });
  }
};

const editProduct = async (req, res) => {
  try {
    const { data, message } = await updateProduct(req.body);
    res.status(200).json({
      data,
      message,
      error: null,
    });
  } catch (err) {
    const { error, status } = err;
    res.status(status).json({
      data: [],
      error,
    });
  }
};

const deleteProductById = async (req, res) => {
  try {
    const { data, message } = await deleteProduct(req.params.id);
    res.status(200).json({
      data,
      message,
      error: null,
    });
  } catch (err) {
    const { error, status } = err;
    res.status(status).json({
      data: [],
      error,
    });
  }
};

module.exports = { getProductById, findProductByQueries, addProduct, editProduct, deleteProductById };
