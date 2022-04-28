const { getPromos, createPromo, getPromoById, updatePromo, deletePromo } = require("../models/promoModel.js");

const getDetailPromo = async (req, res) => {
  try {
    const { data } = await getPromoById(req.params.id);
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

const searchPromos = async (req, res) => {
  try {
    const { total, data } = await getPromos(req.query);
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
      error,
    });
  }
};

const editPromo = async (req, res) => {
  try {
    const { data, message } = await updatePromo(req.body, req.params.id);

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
      error,
    });
  }
};

module.exports = { getDetailPromo, addPromo, searchPromos, editPromo, deletePromoById };
