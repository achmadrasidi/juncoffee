const { getTransactions, createTransaction, findTransaction, updateTransaction, deleteTransaction } = require("../models/transactionModel.js");

const getAllOrders = async (_req, res) => {
  try {
    const { total, data } = await getTransactions();
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

const findOrderByQueries = async (req, res) => {
  try {
    const { data } = await findTransaction(req.query);
    res.status(200).json({
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
      data: [],
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
      data: [],
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
      data: [],
      error,
    });
  }
};

module.exports = { getAllOrders, addTransaction, findOrderByQueries, editTransaction, deleteOrderById };
