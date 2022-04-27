const db = require("../config/db.js");

const getPromoById = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const result = await db.query(
        "SELECT p.id,p.name,prod.name AS product_name,prod.price AS price,p.description,p.discount,to_char(p.expired_date,'Dy DD Mon YYYY') AS expired_date,p.coupon_code,c.name AS category,to_char(p.created_at::timestamp,'Dy DD Mon YYYY HH24:MI') AS created_at,to_char(p.updated_at,'Dy DD Mon YYYY HH24:MI') AS updated_at FROM promos p JOIN products prod ON p.product_id = prod.id JOIN category c ON p.category_id = c.id WHERE p.id = $1",
        [id]
      );
      if (result.rowCount === 0) {
        reject({ status: 404, error: "Promo Not Found" });
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

const getPromos = (query) => {
  return new Promise(async (resolve, reject) => {
    const { keyword, product_name, coupon_code, category, order, sort } = query;
    try {
      let parameterize = [];
      let sqlQuery =
        "SELECT p.id,p.name,prod.name AS product_name,prod.price AS price,p.description,p.discount,to_char(p.expired_date,'Dy DD Mon YYYY') AS expired_date,p.coupon_code,c.name AS category FROM promos p JOIN products prod on p.product_id = prod.id JOIN category c on p.category_id = c.id";
      if (keyword || product_name || coupon_code || category) {
        sqlQuery += " WHERE lower(c.name) = lower($1) OR lower(p.name) LIKE lower('%' || $2 || '%') OR lower(prod.name) LIKE lower('%' || $2 || '%') OR lower(prod.name) = $3 OR lower(p.coupon_code) = $4";
        parameterize.push(category, keyword, product_name, coupon_code);
      }
      if (order) {
        sqlQuery += " order by " + sort + " " + order;
      }
      const result = await db.query(sqlQuery, parameterize);
      if (result.rowCount === 0) {
        reject({ status: 404, error: "Promo Not Found" });
      }
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

const createPromo = (body) => {
  return new Promise(async (resolve, reject) => {
    const { name, description, discount, expired_date, category_id, product_id, coupon_code } = body;

    try {
      const query =
        "INSERT INTO promos(name,description,discount,expired_date,category_id,product_id,coupon_code) VALUES($1,$2,$3,$4,$5,$6,$7) RETURNING id,name,description,discount,to_char(expired_date,'Dy DD Mon YYYY') AS expired_date,coupon_code,to_char(created_at::timestamp,'Dy DD Mon YYYY HH24:MI') AS created_at";
      const result = await db.query(query, [name, description, discount, expired_date, category_id, product_id, coupon_code]);
      const response = { data: result.rows[0], message: "Successfully Created" };
      resolve(response);
    } catch (err) {
      reject({ status: 500, error: err.message });
    }
  });
};

const updatePromo = (body) => {
  return new Promise(async (resolve, reject) => {
    const { name, description, discount, expired_date, coupon_code, id, category_id, product_id } = body;
    try {
      const query =
        "UPDATE promos SET name = COALESCE(NULLIF($1, ''), name) , description = COALESCE(NULLIF($2, ''), description) , discount = COALESCE(NULLIF($3, '')::integer, discount) , expired_date = COALESCE(NULLIF($4, '')::date, expired_date) , coupon_code = COALESCE(NULLIF($5, ''), coupon_code),category_id = COALESCE(NULLIF($7, '')::integer, category_id),product_id = COALESCE(NULLIF($8, '')::integer, product_id), updated_at = now()  WHERE id = $6 RETURNING id,name,description,discount,to_char(expired_date,'Dy DD Mon YYYY') AS expired_date,coupon_code,to_char(updated_at::timestamp,'Dy DD Mon YYYY HH24:MI') AS updated_at ";
      const result = await db.query(query, [name, description, discount, expired_date, coupon_code, id, category_id, product_id]);
      if (result.rowCount === 0) {
        reject({ status: 404, error: "Promo Not Found" });
      }
      const response = { data: result.rows[0], message: "Successfully Updated" };
      resolve(response);
    } catch (err) {
      reject({ status: 500, error: err.message });
    }
  });
};

const deletePromo = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const query = "DELETE FROM promos WHERE id = $1 RETURNING id,name,description,discount,to_char(expired_date,'Dy DD Mon YYYY'),coupon_code";
      const result = await db.query(query, [id]);
      if (result.rowCount === 0) {
        reject({ status: 404, error: "Promo Not Found" });
      }
      const response = { data: result.rows[0], message: "Successfully Deleted" };
      resolve(response);
    } catch (err) {
      reject({ status: 500, error: err.message });
    }
  });
};

module.exports = { getPromos, createPromo, getPromoById, updatePromo, deletePromo };
