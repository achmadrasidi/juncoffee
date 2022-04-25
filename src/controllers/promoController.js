const { getPromos, createPromo, findPromo, updatePromo, deletePromo } = require("../models/promoModel.js");

const getAllPromos = async (_req, res) => {
  try {
    const { total, data } = await getPromos();
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

const findPromoByQueries = async (req, res) => {
  try {
    const { data } = await findPromo(req.query);
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

const addPromo = async (req, res) => {
  try {
    const { data, message } = await createPromo(req.body);

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

const editPromo = async (req, res) => {
  try {
    const { data, message } = await updatePromo(req.body);

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

const deletePromoById = async (req, res) => {
  try {
    const { data, message } = await deletePromo(req.params.id);

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

module.exports = { getAllPromos, addPromo, findPromoByQueries, editPromo, deletePromoById };
