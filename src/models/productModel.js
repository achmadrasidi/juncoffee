const db = require("../config/db.js");
const ErrorHandler = require("../helper/errorHandler.js");

const getProductById = async (id) => {
  try {
    const query =
      "SELECT p.id,p.name,p.price,p.description,p.stock,p.delivery_info,to_char(p.created_at::timestamp,'Dy DD Mon YYYY HH24:MI') AS created_at,to_char(p.updated_at::timestamp,'Dy DD Mon YYYY HH24:MI') AS updated_at,c.name AS category FROM products p JOIN category c ON p.category_id = c.id WHERE p.id = $1";
    const result = await db.query(query, [id]);
    if (result.rowCount === 0) {
      throw new ErrorHandler({ status: 404, message: "Product Not Found" });
    }
    return {
      data: result.rows[0],
    };
  } catch (err) {
    throw new ErrorHandler({ status: err.status ? err.status : 500, message: err.message });
  }
};

const getProductByFav = async (query) => {
  const { category, order, sort } = query;
  try {
    let parameterize = [];
    let sqlQuery =
      "select id,name,price,description,stock,delivery_info,created_at,category from (select product_id AS id,p.name AS name,p.price AS price,p.description AS description,p.stock AS stock,p.delivery_info AS delivery_info,to_char(p.created_at::timestamp,'Dy DD Mon YYYY HH24:MI') AS created_at, p.created_at AS date,c.name AS category from transactions t join products p on t.product_id = p.id join category c on p.category_id = c.id group by t.product_id,p.name,p.price,p.stock,p.description,p.delivery_info,p.created_at,c.name having count(*) > 1) AS fp";
    if (category) {
      sqlQuery += " WHERE lower(category) = lower($1)";
      parameterize.push(category);
    }
    if (order) {
      sqlQuery += " order by " + sort + " " + order;
    }
    const result = await db.query(sqlQuery, parameterize);
    if (result.rowCount === 0) {
      throw new ErrorHandler({ status: 404, message: "Product Not Found" });
    }

    return {
      total: result.rowCount,
      data: result.rows,
    };
  } catch (err) {
    throw new ErrorHandler({ status: err.status ? err.status : 500, message: err.message });
  }
};

const getProducts = async (query) => {
  const { keyword, category, minPrice, maxPrice, order, sort } = query;
  try {
    let parameterize = [];
    let sqlQuery =
      "SELECT id,name,price,description,stock,delivery_info,created_at,updated_at,category FROM (SELECT p.id,p.name,p.price,p.description,p.stock,p.delivery_info,to_char(p.created_at::timestamp,'Dy DD Mon YYYY HH24:MI') AS created_at,created_at AS date,to_char(p.updated_at,'Dy DD Mon YYYY HH24:MI') AS updated_at,updated_at AS updated_date,c.name AS category FROM products p JOIN category c ON p.category_id = c.id) p ";

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

    // switch case
    if (order) {
      sqlQuery += " order by " + sort + " " + order;
    }

    const result = await db.query(sqlQuery, parameterize);
    if (result.rowCount === 0) {
      throw new ErrorHandler({ status: 404, message: "Product Not Found" });
    }
    return {
      total: result.rowCount,
      data: result.rows,
    };
  } catch (err) {
    throw new ErrorHandler({ status: err.status ? err.status : 500, message: err.message });
  }
};

const createProduct = async (body) => {
  const { name, price, description, stock, delivery_info, category_id } = body;

  try {
    const query =
      "INSERT INTO products(name,price,description,stock,delivery_info,category_id) VALUES($1,$2,$3,$4,$5,$6) RETURNING id,name,price,description,stock,delivery_info,to_char(created_at::timestamp,'Dy DD Mon YYYY HH24:MI') AS created_at";
    const result = await db.query(query, [name, price, description, stock, delivery_info, category_id]);
    return { data: result.rows[0], message: "Product Successfully Created" };
  } catch (err) {
    throw new ErrorHandler({ status: err.status ? err.status : 500, message: err.message });
  }
};

const updateProduct = async (body, id) => {
  const { name, price, description, stock, delivery_info, category_id } = body;
  try {
    const query =
      "UPDATE products SET name = COALESCE(NULLIF($1, ''), name), price = COALESCE(NULLIF($2, '')::integer, price), description = COALESCE(NULLIF($3, ''), description), stock = COALESCE(NULLIF($4, '')::integer, stock), delivery_info = COALESCE(NULLIF($5, ''), delivery_info),category_id = COALESCE(NULLIF($6, '')::integer, category_id),updated_at = now() WHERE id = $7 RETURNING id,name,price,description,stock,delivery_info,to_char(updated_at::timestamp,'Dy DD Mon YYYY HH24:MI') AS updated_at";
    const result = await db.query(query, [name, price, description, stock, delivery_info, category_id, id]);
    if (result.rowCount === 0) {
      throw new ErrorHandler({ status: 404, message: "Product Not Found" });
    }
    return { data: result.rows[0], message: "Product Successfully Updated" };
  } catch (err) {
    throw new ErrorHandler({ status: err.status ? err.status : 500, message: err.message });
  }
};

const deleteProduct = async (id) => {
  try {
    const query = "DELETE FROM products WHERE id = $1 RETURNING id,name,price,description,stock,delivery_info";
    const result = await db.query(query, [id]);
    if (result.rowCount === 0) {
      throw new ErrorHandler({ status: 404, message: "Product Not Found" });
    }
    return { data: result.rows[0], message: "Product Successfully Deleted" };
  } catch (err) {
    throw new ErrorHandler({ status: err.status ? err.status : 500, message: err.message });
  }
};

module.exports = {
  getProducts,
  getProductById,
  getProductByFav,
  createProduct,
  updateProduct,
  deleteProduct,
};
