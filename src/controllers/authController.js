const { getPassByEmail, registerUser } = require("../models/authModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { removeAccess } = require("../middleware/authValidator");
const { userStorage } = require("../config/cache");
const { client } = require("../config/redis");

const register = async (req, res) => {
  try {
    const { file } = req;
    let image = null;
    if (file) {
      image = file.path.replace("public", "").replace(/\\/g, "/");
      const imageDirCache = image.split("/")[3].split(".")[0];
      const imageCache = image.split("/")[3];
      userStorage.setItem(imageDirCache, imageCache);
    }
    await registerUser(req.body, image);
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

    await client.set(`jwt${data.id}`, token);
    res.status(200).json({
      email,
      token,
      message: "Login Successful",
    });
  } catch (err) {
    const { message } = err;
    const status = err.status ? err.status : 500;
    res.status(status).json({
      error: message,
    });
  }
};

const logout = async (req, res) => {
  try {
    await removeAccess(req.userPayload.id);

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
