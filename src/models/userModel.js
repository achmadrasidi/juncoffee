const db = require("../config/db.js");
const bcrypt = require("bcrypt");

const getUserById = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const result = await db.query(
        "SELECT id,name,email,password,phone_number,address,to_char(date_of_birth,'dd-mm-yyyy') AS date_of_birth,gender,to_char(history_order::timestamp,'Dy DD Mon YYYY HH24:MI') AS history_order,to_char(created_at::timestamp,'Dy DD Mon YYYY HH24:MI') AS created_at, to_char(updated_at::timestamp,'Dy DD Mon YYYY HH24:MI') AS updated_at FROM users WHERE id = $1",
        [id]
      );
      if (result.rowCount === 0) {
        reject({ status: 404, error: "User Not Found" });
      }
      const response = {
        data: result.rows[0],
      };
      resolve(response);
    } catch (err) {
      reject({ status: 500, error: err.message });
    }
  });
};

const getUsers = (query) => {
  return new Promise(async (resolve, reject) => {
    const { keyword, email, gender, order, sort } = query;
    try {
      let sqlQuery =
        "SELECT id,name,email,password,phone_number,address,to_char(date_of_birth,'dd-mm-yyyy') AS date_of_birth,gender,to_char(history_order::timestamp,'Dy DD Mon YYYY HH24:MI') AS history_order,to_char(created_at::timestamp,'Dy DD Mon YYYY HH24:MI') AS created_at, to_char(updated_at::timestamp,'Dy DD Mon YYYY HH24:MI') AS updated_at FROM users WHERE lower(name) LIKE lower('%' || $1 || '%') OR lower(email) = lower($2) OR lower(address) LIKE lower('%' || $1 || '%') OR lower(gender) = $3";
      if (order) {
        sqlQuery += `order by ${sort} ${order}`;
      }
      const result = await db.query(sqlQuery, [keyword, email, gender]);
      if (result.rowCount === 0) {
        reject({ status: 404, error: "User Not Found" });
      }
      console.log(result);
      const response = {
        total: result.rowCount,
        data: result.rows,
      };
      resolve(response);
    } catch (err) {
      reject({ status: 500, error: err.message });
    }
  });
};

const createUser = (body) => {
  return new Promise(async (resolve, reject) => {
    const { name, email, password, phone_number, address, date_of_birth, gender } = body;

    try {
      const hashedPassword = await bcrypt.hash(password, 12);
      const query =
        "INSERT INTO users(name,email,password,phone_number,address,date_of_birth,gender) VALUES($1,$2,$3,$4,$5,$6,$7) RETURNING  id,name,email,password,phone_number,address,to_char(date_of_birth,'dd-mm-yyyy') AS date_of_birth,gender,to_char(created_at::timestamp,'Dy DD Mon YYYY HH24:MI') AS created_at";
      const result = await db.query(query, [name, email, hashedPassword, phone_number, address, date_of_birth, gender]);
      const response = { data: result.rows[0], message: "Successfully Created" };
      resolve(response);
    } catch (err) {
      reject({ status: 500, error: err.message });
    }
  });
};

const updateUserProfile = (body) => {
  return new Promise(async (resolve, reject) => {
    const { id, name, email, phone_number, address, date_of_birth, gender } = body;
    try {
      const query =
        "UPDATE users SET name = COALESCE(NULLIF($1, ''), name),email = COALESCE(NULLIF($2, ''), email),phone_number = COALESCE(NULLIF($3, ''), phone_number),address = COALESCE(NULLIF($4, ''), address),date_of_birth = COALESCE(NULLIF($5, '')::date, date_of_birth),gender = COALESCE(NULLIF($6, ''), gender),updated_at = now() WHERE id = $7 RETURNING id,name,email,password,phone_number,address,to_char(date_of_birth,'dd-mm-yyyy') AS date_of_birth,gender,to_char(history_order::timestamp,'Dy DD Mon YYYY HH24:MI') AS history_order, to_char(updated_at::timestamp,'Dy DD Mon YYYY HH24:MI') AS updated_at ";
      const result = await db.query(query, [name, email, phone_number, address, date_of_birth, gender, id]);
      if (result.rowCount === 0) {
        reject({ status: 404, error: "User Not Found" });
      }
      const response = { data: result.rows[0], message: "Successfully Updated" };
      resolve(response);
    } catch (err) {
      reject({ status: 500, error: err.message });
    }
  });
};

const updateUserPassword = ({ password, id }) => {
  return new Promise(async (resolve, reject) => {
    try {
      const hashedPassword = await bcrypt.hash(password, 12);
      const query = "UPDATE users SET password = $1 , updated_at = now() WHERE id = $2 RETURNING id,name,password,to_char(updated_at::timestamp,'Dy DD Mon YYYY HH24:MI') AS updated_at ";
      const result = await db.query(query, [hashedPassword, id]);
      if (result.rowCount === 0) {
        reject({ status: 404, error: "User Not Found" });
      }
      const response = { data: result.rows[0], message: "Successfully Updated" };
      resolve(response);
    } catch (err) {
      reject({ status: 500, error: err.message });
    }
  });
};

const deleteUser = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const query = "DELETE FROM users WHERE id = $1 RETURNING id,name,email,password,phone_number,address,to_char(date_of_birth,'dd-mm-yyyy') AS date_of_birth,gender";
      const result = await db.query(query, [id]);
      if (result.rowCount === 0) {
        reject({ status: 404, error: "User Not Found" });
      }
      const response = { data: result.rows[0], message: "Successfully Deleted" };
      resolve(response);
    } catch (err) {
      reject({ status: 500, error: err.message });
    }
  });
};

module.exports = { getUserById, createUser, deleteUser, updateUserProfile, updateUserPassword, getUsers };
