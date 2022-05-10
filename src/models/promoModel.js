const db = require("../config/db.js");
const ErrorHandler = require("../helper/errorHandler.js");

const getPromoById = async (id) => {
  try {
    const result = await db.query(
      "SELECT p.id,p.name,prod.name AS product_name,prod.price AS price,p.description,p.discount,to_char(p.expired_date,'Dy DD Mon YYYY') AS expired_date,p.coupon_code,c.name AS category,to_char(p.created_at::timestamp,'Dy DD Mon YYYY HH24:MI') AS created_at,to_char(p.updated_at,'Dy DD Mon YYYY HH24:MI') AS updated_at FROM promos p JOIN products prod ON p.product_id = prod.id JOIN category c ON p.category_id = c.id WHERE p.id = $1",
      [id]
    );
    if (result.rowCount === 0) {
      throw new ErrorHandler({ status: 404, message: "Promo Not Found" });
    }
    return {
      data: result.rows[0],
    };
  } catch (err) {
    throw new ErrorHandler({ status: err.status ? err.status : 500, message: err.message });
  }
};

const getPromos = async (query) => {
  const { keyword, product_name, coupon_code, category, order, sort } = query;
  try {
    let parameterize = [];
    let sqlQuery =
      "SELECT id,name,product_name,price,description,discount,coupon_code,expired_date,category FROM (SELECT p.id,p.name,prod.name AS product_name,prod.price AS price,p.description,p.discount,to_char(p.expired_date,'Dy DD Mon YYYY') AS expired_date,expired_date AS expired,p.coupon_code,c.name AS category FROM promos p JOIN products prod on p.product_id = prod.id JOIN category c on p.category_id = c.id) promo";
    if (keyword || product_name || coupon_code || category) {
      sqlQuery += " WHERE lower(category) = lower($1) OR lower(name) LIKE lower('%' || $2 || '%') OR lower(product_name) LIKE lower('%' || $2 || '%') OR lower(product_name) = $3 OR lower(coupon_code) = $4";
      parameterize.push(category, keyword, product_name, coupon_code);
    }
    if (order) {
      sqlQuery += " order by " + sort + " " + order;
    }
    const result = await db.query(sqlQuery, parameterize);
    if (result.rowCount === 0) {
      throw new ErrorHandler({ status: 404, message: "Promo Not Found" });
    }
    return {
      total: result.rowCount,
      data: result.rows,
    };
  } catch (err) {
    throw new ErrorHandler({ status: err.status ? err.status : 500, message: err.message });
  }
};

const createPromo = async (body) => {
  const { name, description, discount, expired_date, category_id, product_id, coupon_code } = body;

  try {
    const query =
      "INSERT INTO promos(name,description,discount,expired_date,category_id,product_id,coupon_code) VALUES($1,$2,$3,$4,$5,$6,$7) RETURNING id,name,description,discount,to_char(expired_date,'Dy DD Mon YYYY') AS expired_date,coupon_code,to_char(created_at::timestamp,'Dy DD Mon YYYY HH24:MI') AS created_at";
    const result = await db.query(query, [name, description, discount, expired_date, category_id, product_id, coupon_code]);
    return { data: result.rows[0], message: "Promo Successfully Created" };
  } catch (err) {
    throw new ErrorHandler({ status: err.status ? err.status : 500, message: err.message });
  }
};

const updatePromo = async (body, id) => {
  const { name, description, discount, expired_date, coupon_code, category_id, product_id } = body;
  try {
    const query =
      "UPDATE promos SET name = COALESCE(NULLIF($1, ''), name) , description = COALESCE(NULLIF($2, ''), description) , discount = COALESCE(NULLIF($3, '')::integer, discount) , expired_date = COALESCE(NULLIF($4, '')::date, expired_date) , coupon_code = COALESCE(NULLIF($5, ''), coupon_code),category_id = COALESCE(NULLIF($7, '')::integer, category_id),product_id = COALESCE(NULLIF($8, '')::integer, product_id), updated_at = now()  WHERE id = $6 RETURNING id,name,description,discount,to_char(expired_date,'Dy DD Mon YYYY') AS expired_date,coupon_code,to_char(updated_at::timestamp,'Dy DD Mon YYYY HH24:MI') AS updated_at ";
    const result = await db.query(query, [name, description, discount, expired_date, coupon_code, id, category_id, product_id]);
    if (result.rowCount === 0) {
      throw new ErrorHandler({ status: 404, message: "Promo Not Found" });
    }
    return { data: result.rows[0], message: "Promo Successfully Updated" };
  } catch (err) {
    throw new ErrorHandler({ status: err.status ? err.status : 500, message: err.message });
  }
};

const deletePromo = async (id) => {
  try {
    const query = "DELETE FROM promos WHERE id = $1 RETURNING id,name,description,discount,to_char(expired_date,'Dy DD Mon YYYY'),coupon_code";
    const result = await db.query(query, [id]);
    if (result.rowCount === 0) {
      throw new ErrorHandler({ status: 404, message: "Promo Not Found" });
    }
    return { data: result.rows[0], message: "Promo Successfully Deleted" };
  } catch (err) {
    throw new ErrorHandler({ status: err.status ? err.status : 500, message: err.message });
  }
};

module.exports = { getPromos, createPromo, getPromoById, updatePromo, deletePromo };
