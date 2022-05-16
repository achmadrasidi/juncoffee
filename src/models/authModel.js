const { db } = require("../config/db.js");
const { ErrorHandler } = require("../middleware/errorHandler");
const bcrypt = require("bcrypt");

const registerUser = async (body, image) => {
  const { name, address, date_of_birth, gender, email, password, phone_number } = body;
  try {
    const hashedPassword = await bcrypt.hash(password, 12);
    const query =
      "INSERT INTO users(email,password,phone_number,role,name,address,date_of_birth,gender,image) VALUES($1,$2,$3,'user',$4,$5,$6,$7,$8) RETURNING id,email,password,phone_number,to_char(created_at::timestamp,'Dy DD Mon YYYY HH24:MI') AS created_at";
    const result = await db.query(query, [email, hashedPassword, phone_number, name, address, date_of_birth, gender, image]);
    return { data: result.rows[0], message: "User Successfully Created" };
  } catch (err) {
    throw new ErrorHandler({ status: err.status ? err.status : 500, message: err.message });
  }
};

const getUserByEmail = async (email) => {
  try {
    return await db.query("SELECT email FROM users WHERE email = $1", [email]);
  } catch (err) {
    throw new ErrorHandler({ status: err.status ? err.status : 500, message: err.message });
  }
};

const getPassByEmail = async (email) => {
  try {
    const result = await db.query("SELECT id,password,role FROM users WHERE email = $1", [email]);
    if (!result.rowCount) {
      throw new ErrorHandler({ status: 400, message: "Email is Not Registered" });
    }
    return {
      data: result.rows[0],
    };
  } catch (err) {
    throw new ErrorHandler({ status: err.status ? err.status : 500, message: err.message });
  }
};

module.exports = { getPassByEmail, getUserByEmail, registerUser };
