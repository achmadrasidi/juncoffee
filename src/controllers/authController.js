const { createUser } = require("../models/userModel.js");

const register = async (req, res) => {
  try {
    const { data } = await createUser(req.body);
    res.status(201).json({
      data: {
        id: data.id,
        email: data.email,
        password: data.password,
        register_at: data.created_at,
      },
      message: "Register Success",
    });
  } catch (err) {
    const { message, status } = err;
    res.status(status).json({
      error: message,
    });
  }
};

module.exports = { register };
