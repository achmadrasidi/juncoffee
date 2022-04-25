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
  let error;
  let valid = true;
  const body = Object.keys(obj);

  if (body.length < 4) {
    valid = false;
    error = "Missing Required Field(s)";
  }

  for (const key in obj) {
    const value = obj[key];
    const emailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    const phoneFormat = /^\d{12}$/;

    if (value === "") {
      valid = false;
      error = "Field(s) cannot be empty";
    }

    if (key === "email") {
      if (!value.match(emailFormat)) {
        valid = false;
        error = "Invalid Email Input";
      }
    }

    if (key === "phone_number") {
      Number(value);
      if (!value.match(phoneFormat)) {
        valid = false;
        error = "Invalid Phone Input";
      }
    }

    if (key === "gender") {
      if (value !== "male" && value !== "female") {
        valid = false;
        error = "gender must be male or female";
      }
    }
  }
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
