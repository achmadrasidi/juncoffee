const postValidatorHelper = require("../helper/postValidatorHelper.js");

const productPostValidator = (req, res, next) => {
  const obj = req.body;
  const { error, valid } = postValidatorHelper(obj, 5);

  if (valid === false) {
    res.status(400).json({
      error,
    });
    return;
  }
  next();
};

const promoPostValidator = (req, res, next) => {
  const obj = req.body;
  const { error, valid } = postValidatorHelper(obj, 7);
  if (valid === false) {
    res.status(400).json({
      error,
    });
    return;
  }
  next();
};

const userPostValidator = (req, res, next) => {
  const obj = req.body;
  let { error, valid } = postValidatorHelper(obj, 4);

  if (valid === false) {
    res.status(400).json({
      error,
    });
    return;
  }
  next();
};

const orderPostValidator = (req, res, next) => {
  const obj = req.body;
  const { error, valid } = postValidatorHelper(obj, 4);

  if (valid === false) {
    res.status(400).json({
      error,
    });
    return;
  }
  next();
};

module.exports = { productPostValidator, promoPostValidator, userPostValidator, orderPostValidator };
