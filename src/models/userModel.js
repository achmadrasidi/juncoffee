const db = require("../config/db.js");
const bcrypt = require("bcrypt");
const ErrorHandler = require("../helper/errorHandler");

const getUserById = async (id) => {
  try {
    const result = await db.query(
      "SELECT id,name,email,phone_number,address,role,to_char(date_of_birth,'dd-mm-yyyy') AS date_of_birth,gender,to_char(last_order::timestamp,'Dy DD Mon YYYY HH24:MI') AS last_order,to_char(created_at::timestamp,'Dy DD Mon YYYY HH24:MI') AS created_at, to_char(updated_at::timestamp,'Dy DD Mon YYYY HH24:MI') AS updated_at FROM users WHERE id = $1",
      [id]
    );
    if (result.rowCount === 0) {
      throw new ErrorHandler({ status: 404, message: "User Not Found" });
    }
    return {
      data: result.rows[0],
    };
  } catch (err) {
    throw new ErrorHandler({ status: err.status ? err.status : 500, message: err.message });
  }
};

const getUserHistory = async (id) => {
  try {
    let sqlQuery =
      "SELECT t.id AS order_id,u.name AS user_name,p.name AS product_name,p.price AS product_price,t.shipping_address,t.quantity,t.subtotal,d.method AS delivery_method,t.shipping_price,t.tax_price,t.total_price,t.order_status,to_char(t.created_at::timestamp,'Dy DD Mon YYYY HH24:MI') AS created_at FROM users u JOIN transactions t ON u.id = t.user_id JOIN products p ON t.product_id = p.id JOIN delivery d ON t.delivery_id = d.id WHERE u.id = $1";
    const result = await db.query(sqlQuery, [id]);
    if (result.rowCount === 0) {
      throw new ErrorHandler({ status: 404, message: "No History Found" });
    }
    return {
      total: result.rowCount,
      data: result.rows,
    };
  } catch (err) {
    throw new ErrorHandler({ status: err.status ? err.status : 500, message: err.message });
  }
};

const getUsers = async (query) => {
  const { keyword, email, gender, order, sort } = query;
  try {
    let parameterize = [];
    let sqlQuery =
      "SELECT id,name,email,phone_number,address,date_of_birth,gender,last_order,created_at,updated_at FROM(SELECT id,name,email,phone_number,address,to_char(date_of_birth,'dd-mm-yyyy') AS date_of_birth,date_of_birth AS birthday,gender,to_char(last_order::timestamp,'Dy DD Mon YYYY HH24:MI') AS last_order,to_char(created_at::timestamp,'Dy DD Mon YYYY HH24:MI') AS created_at, created_at AS date,to_char(updated_at::timestamp,'Dy DD Mon YYYY HH24:MI') AS updated_at FROM users) u ";

    if (keyword && !email && !gender) {
      sqlQuery += " WHERE lower(name) LIKE lower('%' || $1 || '%')  OR lower(address) LIKE lower('%' || $1 || '%')";
      parameterize.push(keyword);
    }

    if (email && !keyword && !gender) {
      sqlQuery += " WHERE lower(email) = lower($1)";
      parameterize.push(email);
    }

    if (gender && !keyword && !email) {
      sqlQuery += " WHERE lower(gender) = lower($1)";
      parameterize.push(gender);
    }

    if (gender && email && !keyword) {
      sqlQuery += " WHERE lower(name) LIKE lower('%' || $1 || '%') AND lower(email) = lower($2) AND lower(address) LIKE lower('%' || $1 || '%')";
      parameterize.push(gender, email);
    }

    if (keyword && email && !gender) {
      sqlQuery += " WHERE lower(name) LIKE lower('%' || $1 || '%') OR lower(address) LIKE lower('%' || $1 || '%') AND lower(email) = lower($2) ";
      parameterize.push(keyword, email);
    }

    if (keyword && gender && !email) {
      sqlQuery += " WHERE lower(name) LIKE lower('%' || $1 || '%') OR lower(address) LIKE lower('%' || $1 || '%') AND lower(gender) = lower($2) ";
      parameterize.push(keyword, gender);
    }

    if (keyword && gender && email) {
      sqlQuery += " WHERE lower(name) LIKE lower('%' || $1 || '%') OR lower(address) LIKE lower('%' || $1 || '%') AND lower(gender) = lower($2) AND lower(gender) = lower($3) ";
      parameterize.push(keyword, gender, email);
    }

    if (order) {
      sqlQuery += " order by " + sort + " " + order;
    }
    const result = await db.query(sqlQuery, parameterize);
    if (result.rowCount === 0) {
      throw new ErrorHandler({ status: 404, message: "User Not Found" });
    }
    return {
      total: result.rowCount,
      data: result.rows,
    };
  } catch (err) {
    throw new ErrorHandler({ status: err.status ? err.status : 500, message: err.message });
  }
};

const createUser = async (body) => {
  const { name, email, password, phone_number, address, date_of_birth, gender, role } = body;
  try {
    const hashedPassword = await bcrypt.hash(password, 12);
    const query =
      "INSERT INTO users(name,email,password,phone_number,address,date_of_birth,gender,role) VALUES($1,$2,$3,$4,$5,$6,$7,$8) RETURNING  id,name,email,password,phone_number,address,to_char(date_of_birth,'dd-mm-yyyy') AS date_of_birth,gender,to_char(created_at::timestamp,'Dy DD Mon YYYY HH24:MI') AS created_at";
    const result = await db.query(query, [name, email, hashedPassword, phone_number, address, date_of_birth, gender, role]);
    return { data: result.rows[0], message: "User Successfully Created" };
  } catch (err) {
    throw new ErrorHandler({ status: err.status ? err.status : 500, message: err.message });
  }
};

const updateUserProfile = async (body, id) => {
  const { name, email, phone_number, address, date_of_birth, gender } = body;
  try {
    const query =
      "UPDATE users SET name = COALESCE(NULLIF($1, ''), name),email = COALESCE(NULLIF($2, ''), email),phone_number = COALESCE(NULLIF($3, ''), phone_number),address = COALESCE(NULLIF($4, ''), address),date_of_birth = COALESCE(NULLIF($5, '')::date, date_of_birth),gender = COALESCE(NULLIF($6, ''), gender),updated_at = now() WHERE id = $7 RETURNING id,name,email,password,phone_number,address,to_char(date_of_birth,'dd-mm-yyyy') AS date_of_birth,gender,to_char(last_order::timestamp,'Dy DD Mon YYYY HH24:MI') AS last_order, to_char(updated_at::timestamp,'Dy DD Mon YYYY HH24:MI') AS updated_at ";
    const result = await db.query(query, [name, email, phone_number, address, date_of_birth, gender, id]);
    if (result.rowCount === 0) {
      throw new ErrorHandler({ status: 404, message: "User Not Found" });
    }
    return { data: result.rows[0], message: "User Profile Successfully Updated" };
  } catch (err) {
    throw new ErrorHandler({ status: err.status ? err.status : 500, message: err.message });
  }
};

const updateUserPassword = async ({ password }, id) => {
  try {
    const hashedPassword = await bcrypt.hash(password, 12);
    const query = "UPDATE users SET password = $1 , updated_at = now() WHERE id = $2 RETURNING id,name,password,to_char(updated_at::timestamp,'Dy DD Mon YYYY HH24:MI') AS updated_at ";
    const result = await db.query(query, [hashedPassword, id]);
    if (result.rowCount === 0) {
      throw new ErrorHandler({ status: 404, message: "User Not Found" });
    }
    return { data: result.rows[0], message: "User Password Successfully Updated" };
  } catch (err) {
    throw new ErrorHandler({ status: err.status ? err.status : 500, message: err.message });
  }
};

const deleteUser = async (id) => {
  try {
    const query = "DELETE FROM users WHERE id = $1 RETURNING id,name,email,password,phone_number,address,to_char(date_of_birth,'dd-mm-yyyy') AS date_of_birth,gender";
    const result = await db.query(query, [id]);
    if (result.rowCount === 0) {
      throw new ErrorHandler({ status: 404, message: "User Not Found" });
    }
    return { data: result.rows[0], message: "User Successfully Deleted" };
  } catch (err) {
    throw new ErrorHandler({ status: err.status ? err.status : 500, message: err.message });
  }
};

module.exports = {
  getUserById,
  createUser,
  deleteUser,
  updateUserProfile,
  updateUserPassword,
  getUsers,
  getUserHistory,
};
