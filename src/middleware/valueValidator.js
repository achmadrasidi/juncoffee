const { getUserByEmail } = require("../models/authModel.js");

const duplicateValidator = async (req, res, next) => {
  try {
    const result = await getUserByEmail(req.body.email);
    if (result.rowCount > 0) {
      res.status(400).json({
        error: "Email is Already in use",
      });
      return;
    }
    next();
  } catch (err) {
    const { message, status } = err;
    res.status(status).json({
      error: message,
    });
  }
};

const valueValidator = (req, res, next) => {
  let obj;

  if (Object.keys(req.query).length > 0) {
    obj = req.query;
  } else if (Object.keys(req.body).length > 0) {
    obj = req.body;
  } else {
    obj = req.params;
  }

  let valid = true;
  let error;

  for (const key in obj) {
    const value = obj[key];
    const emailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    const phoneFormat = /^\d{12}$/;
    const numberFormat = /^\d+$/;
    const dateFormat = /^(0[1-9]|[12]\d|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/;
    const numberItem = ["id", "price", "stock", "category_id", "discount", "product_id", "user_id", "quantity", "delivery_id", "minPrice", "maxPrice", "limit", "number"];
    const sortItem = ["id", "date", "birthday", "stock", "price", "total_price", "discount", "name", "product_name", "expired", "quantity"];

    if (numberItem.includes(key)) {
      Number(value);
      if (!value.match(numberFormat)) {
        valid = false;
        error = "Invalid Number Input";
      }
    }

    if (value === "") {
      valid = false;
      error = "Input cannot be empty";
    }

    if (key === "date_of_birth" || key === "expired_date") {
      if (!value.match(dateFormat)) {
        valid = false;
        error = "Invalid Date Input";
      }
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
      if (value.toLowerCase() !== "male" && value.toLowerCase() !== "female") {
        valid = false;
        error = "gender must be male or female";
      }
    }

    if (key === "order_status") {
      if (value.toLowerCase() !== "paid" && value.toLowerCase() !== "not paid") {
        valid = false;
        error = "order status must be paid or not paid";
      }
    }

    if (key === "delivery_method") {
      if (value.toLowerCase() !== "dine in" && value.toLowerCase() !== "door delivery") {
        valid = false;
        error = "delivery_method must be dine in or door delivery";
      }
    }

    if (key === "category") {
      if (value.toLowerCase() !== "foods" && value.toLowerCase() !== "beverages") {
        valid = false;
        error = "category must be foods or beverages";
      }
    }

    if (key === "sort") {
      if (!sortItem.includes(value)) {
        valid = false;
        error = "Invalid Sort value ";
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

module.exports = { valueValidator, duplicateValidator };
