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

const getProducts = (query) => {
  return new Promise(async (resolve, reject) => {
    const { keyword, category, minPrice, maxPrice, order, sort } = query;
    try {
      let sqlQuery =
        "SELECT p.id,p.name,p.price,p.description,p.stock,p.delivery_info,p.transaction_count,to_char(p.created_at::timestamp,'Dy DD Mon YYYY HH24:MI') AS created_at,to_char(p.updated_at,'Dy DD Mon YYYY HH24:MI') AS updated_at,c.name AS category FROM products p JOIN category c ON p.category_id = c.id WHERE lower(c.name) like lower($2) OR lower(p.name) LIKE lower('%' || $1 || '%') OR p.price >= $3 AND p.price <= $4  ";
      if (order) {
        sqlQuery += `order by ${sort} ${order}`;
      }
      const result = await db.query(sqlQuery, [keyword, category, minPrice, maxPrice]);
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
      const response = { data: result.rows[0], message: "Successfully Created" };
      resolve(response);
    } catch (err) {
      reject({ status: 500, error: err.message });
    }
  });
};

const updateProduct = (body) => {
  return new Promise(async (resolve, reject) => {
    const { name, price, description, stock, delivery_info, category_id, id } = body;
    try {
      const query =
        "UPDATE products SET name = COALESCE(NULLIF($1, ''), name), price = COALESCE(NULLIF($2, '')::integer, price), description = COALESCE(NULLIF($3, ''), description), stock = COALESCE(NULLIF($4, '')::integer, stock), delivery_info = COALESCE(NULLIF($5, ''), delivery_info),category_id = COALESCE(NULLIF($6, '')::integer, category_id),updated_at = now() WHERE id = $7 RETURNING id,name,price,description,stock,delivery_info,to_char(updated_at::timestamp,'Dy DD Mon YYYY HH24:MI') AS updated_at";
      const result = await db.query(query, [name, price, description, stock, delivery_info, category_id, id]);
      if (result.rowCount === 0) {
        reject({ status: 404, error: "Product Not Found" });
      }
      const response = { data: result.rows[0], message: "Successfully Updated" };
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
      const response = { data: result.rows[0], message: "Successfully Deleted" };
      resolve(response);
    } catch (err) {
      reject({ status: 500, error: err.message });
    }
  });
};

module.exports = { getProducts, getProductById, createProduct, updateProduct, deleteProduct };
