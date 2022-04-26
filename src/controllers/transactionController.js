const { getOrderById, createTransaction, findTransaction, updateTransaction, deleteTransaction } = require("../models/transactionModel.js");

const getDetailOrder = async (req, res) => {
  try {
    const { data } = await getOrderById(req.params.id);
    res.status(200).json({
      data,
      error: null,
    });
  } catch (err) {
    const { error, status } = err;
    res.status(status).json({
      error,
    });
  }
};

const findOrderByQueries = async (req, res) => {
  try {
    const { total, data } = await findTransaction(req.query);
    res.status(200).json({
      total,
      data,
      error: null,
    });
  } catch (err) {
    const { error, status } = err;
    res.status(status).json({
      error,
    });
  }
};

const addTransaction = async (req, res) => {
  try {
    const { data, message } = await createTransaction(req.body);

    res.status(201).json({
      data,
      message,
      error: null,
    });
  } catch (err) {
    const { error, status } = err;
    res.status(status).json({
      error,
    });
  }
};

const editTransaction = async (req, res) => {
  try {
    const { data, message } = await updateTransaction(req.body);

    res.status(200).json({
      data,
      message,
      error: null,
    });
  } catch (err) {
    const { error, status } = err;
    res.status(status).json({
      error,
    });
  }
};

const deleteOrderById = async (req, res) => {
  try {
    const { data, message } = await deleteTransaction(req.params.id);

    res.status(200).json({
      data,
      message,
      error: null,
    });
  } catch (err) {
    const { error, status } = err;
    res.status(status).json({
      error,
    });
  }
};

module.exports = { getDetailOrder, addTransaction, findOrderByQueries, editTransaction, deleteOrderById };
