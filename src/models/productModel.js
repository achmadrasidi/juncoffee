const db = require("../config/db.js");

const getProductById = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const query =
        "SELECT p.id,p.name,p.price,p.description,p.stock,p.delivery_info,p.transaction_count,to_char(p.created_at::timestamp,'Dy DD Mon YYYY HH24:MI') AS created_at,to_char(p.updated_at::timestamp,'Dy DD Mon YYYY HH24:MI') AS updated_at,c.name AS category FROM products p JOIN category c ON p.category_id = c.id WHERE p.id = $1";
      const result = await db.query(query, [id]);
      if (result.rowCount === 0) {
        reject({ status: 404, error: "Product Not Found" });
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

const getProductByFav = (query) => {
  return new Promise(async (resolve, reject) => {
    const { category, order, sort } = query;
    try {
      let parameterize = [];
      let sqlQuery =
        "SELECT id,name,price,description,stock,delivery_info,transaction_count,created_at,category FROM (SELECT p.id,p.name,p.price,p.description,p.stock,p.delivery_info,p.transaction_count,to_char(p.created_at::timestamp,'Dy DD Mon YYYY HH24:MI') AS created_at,created_at AS created_date,c.name AS category FROM products p JOIN category c ON p.category_id = c.id WHERE p.transaction_count > 3) fp";
      if (category) {
        sqlQuery += " WHERE lower(category) = lower($1)";
        parameterize.push(category);
      }
      if (order) {
        sqlQuery += " order by " + sort + " " + order;
      }
      const result = await db.query(sqlQuery, parameterize);
      if (result.rowCount === 0) {
        reject({ status: 404, error: "Product Not Found" });
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

const getProducts = (query) => {
  return new Promise(async (resolve, reject) => {
    const { keyword, category, minPrice, maxPrice, order, sort } = query;
    try {
      let parameterize = [];
      let sqlQuery =
        "SELECT id,name,price,description,stock,delivery_info,transaction AS transaction_count,created_at,updated_at,category FROM (SELECT p.id,p.name,p.price,p.description,p.stock,p.delivery_info,p.transaction_count AS transaction,to_char(p.created_at::timestamp,'Dy DD Mon YYYY HH24:MI') AS created_at,created_at AS date,to_char(p.updated_at,'Dy DD Mon YYYY HH24:MI') AS updated_at,updated_at AS updated_date,c.name AS category FROM products p JOIN category c ON p.category_id = c.id) p ";

      if (keyword && !category && !minPrice) {
        sqlQuery += " WHERE lower(name) LIKE lower('%' || $1 || '%')";
        parameterize.push(keyword);
      }

      if (category && !keyword && !minPrice) {
        sqlQuery += " WHERE lower(category) = lower($1)";
        parameterize.push(category);
      }

      if (minPrice && !category && !keyword) {
        sqlQuery += " WHERE price >= $1 AND price <= $2";
        parameterize.push(minPrice, maxPrice);
      }

      if (keyword && category && !minPrice) {
        sqlQuery += " WHERE lower(category) = lower($2) AND lower(name) LIKE lower('%' || $1 || '%')";
        parameterize.push(keyword, category);
      }

      if (keyword && minPrice && !category) {
        sqlQuery += " WHERE lower(name) LIKE lower('%' || $1 || '%') AND price >= $2 AND price <= $3";
        parameterize.push(keyword, minPrice, maxPrice);
      }

      if (category && minPrice && !keyword) {
        sqlQuery += " WHERE lower(category) = lower($1) AND price >= $2 AND price <= $3";
        parameterize.push(category, minPrice, maxPrice);
      }

      if (keyword && category && minPrice) {
        sqlQuery += " WHERE lower(name) LIKE lower('%' || $1 || '%') AND lower(category) = lower($2) AND price >= $3 AND price <= $4";
        parameterize.push(keyword, category, minPrice, maxPrice);
      }

      if (order) {
        sqlQuery += " order by " + sort + " " + order;
      }

      const result = await db.query(sqlQuery, parameterize);
      if (result.rowCount === 0) {
        reject({ status: 404, error: "Product Not Found" });
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

const createProduct = (body) => {
  return new Promise(async (resolve, reject) => {
    const { name, price, description, stock, delivery_info, category_id } = body;

    try {
      const query =
        "INSERT INTO products(name,price,description,stock,delivery_info,category_id) VALUES($1,$2,$3,$4,$5,$6) RETURNING id,name,price,description,stock,delivery_info,to_char(created_at::timestamp,'Dy DD Mon YYYY HH24:MI') AS created_at";
      const result = await db.query(query, [name, price, description, stock, delivery_info, category_id]);
      const response = { data: result.rows[0], message: "Product Successfully Created" };
      resolve(response);
    } catch (err) {
      reject({ status: 500, error: err.message });
    }
  });
};

const updateProduct = (body, id) => {
  return new Promise(async (resolve, reject) => {
    const { name, price, description, stock, delivery_info, category_id } = body;
    try {
      const query =
        "UPDATE products SET name = COALESCE(NULLIF($1, ''), name), price = COALESCE(NULLIF($2, '')::integer, price), description = COALESCE(NULLIF($3, ''), description), stock = COALESCE(NULLIF($4, '')::integer, stock), delivery_info = COALESCE(NULLIF($5, ''), delivery_info),category_id = COALESCE(NULLIF($6, '')::integer, category_id),updated_at = now() WHERE id = $7 RETURNING id,name,price,description,stock,delivery_info,to_char(updated_at::timestamp,'Dy DD Mon YYYY HH24:MI') AS updated_at";
      const result = await db.query(query, [name, price, description, stock, delivery_info, category_id, id]);
      if (result.rowCount === 0) {
        reject({ status: 404, error: "Product Not Found" });
      }
      const response = { data: result.rows[0], message: "Product Successfully Updated" };
      resolve(response);
    } catch (err) {
      reject({ status: 500, error: err.message });
    }
  });
};

const deleteProduct = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const query = "DELETE FROM products WHERE id = $1 RETURNING id,name,price,description,stock,delivery_info";
      const result = await db.query(query, [id]);
      if (result.rowCount === 0) {
        reject({ status: 404, error: "Product Not Found" });
      }
      const response = { data: result.rows[0], message: "Product Successfully Deleted" };
      resolve(response);
    } catch (err) {
      reject({ status: 500, error: err.message });
    }
  });
};

module.exports = {
  getProducts,
  getProductById,
  getProductByFav,
  createProduct,
  updateProduct,
  deleteProduct,
};
