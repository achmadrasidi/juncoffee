const { getPassByEmail, registerUser } = require("../models/authModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { removeAccess } = require("../middleware/authValidator");
const cache = require("../config/cache");

const register = async (req, res) => {
  try {
    await registerUser(req.body);
    res.status(201).json({
      message: "Register Success",
    });
  } catch (err) {
    const { message, status } = err;
    res.status(status).json({
      error: message,
    });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const { data } = await getPassByEmail(email);
    const result = await bcrypt.compare(password, data.password);
    if (!result) {
      res.status(400).json({
        error: "Invalid Password",
      });
      return;
    }
    const payload = {
      id: data.id,
      email,
      role: data.role,
    };
    const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, { issuer: process.env.JWT_ISSUER, expiresIn: "12h" });
    cache.setItem(`jwt${data.id}`, token);
    res.status(200).json({
      email,
      token,
      message: "Login Successful",
    });
  } catch (err) {
    const { message, status } = err;
    res.status(status).json({
      error: message,
    });
  }
};

const logout = async (req, res) => {
  try {
    removeAccess(req.userPayload.id);

    res.status(200).json({
      message: "You are logout",
    });
  } catch (err) {
    const { message, status } = err;
    res.status(status).json({
      error: message,
    });
  }
};

module.exports = { register, login, logout };
