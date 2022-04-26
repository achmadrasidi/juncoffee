const validatorHelper = require("../helper/validatorHelper.js");

const userValidator = (req, res, next) => {
  const rules = ["name", "email", "password", "phone_number"];
  const { error, valid } = validatorHelper(req, rules);

  if (valid === false) {
    res.status(400).json({
      error,
    });
    return;
  }

  next();
};

const productValidator = (req, res, next) => {
  const rules = ["name", "price", "description", "stock", "category_id"];

  const { error, valid } = validatorHelper(req, rules);
  if (valid === false) {
    res.status(400).json({
      error,
    });
    return;
  }

  next();
};

const promoValidator = (req, res, next) => {
  const rules = ["name", "description", "discount", "expired_date", "coupon_code", "category_id", "product_id"];

  const { error, valid } = validatorHelper(req, rules);
  if (valid === false) {
    res.status(400).json({
      error,
    });
    return;
  }

  next();
};

const orderValidator = (req, res, next) => {
  const rules = ["user_id", "product_id", "quantity", "delivery_id"];

  const { error, valid } = validatorHelper(req, rules);
  if (valid === false) {
    res.status(400).json({
      error,
    });
    return;
  }

  next();
};

module.exports = { userValidator, productValidator, promoValidator, orderValidator };
