const jwt = require("jsonwebtoken");
const { getUserByEmail } = require("../models/userModel.js");

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

module.exports = { duplicateValidator };
