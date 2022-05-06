const db = require("../config/db.js");

const getOrderById = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const query =
        "SELECT t.id,u.name AS user_name,p.name AS product_name,p.price AS product_price,t.shipping_address,t.quantity,t.subtotal,d.method AS delivery_method,t.shipping_price,t.tax_price,t.total_price,t.order_status,to_char(t.created_at::timestamp,'Dy DD Mon YYYY HH24:MI') AS created_at,to_char(t.updated_at::timestamp,'Dy DD Mon YYYY HH24:MI') AS updated_at FROM transactions t JOIN users u on t.user_id = u.id JOIN products p on t.product_id = p.id JOIN delivery d on t.delivery_id = d.id WHERE t.id = $1";
      const result = await db.query(query, [id]);
      if (result.rowCount === 0) {
        reject({ status: 404, error: "Transactions Not Found" });
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

const findTransaction = (query) => {
  return new Promise(async (resolve, reject) => {
    const { keyword, delivery_method, order_status, order, sort } = query;
    try {
      let parameterize = [];
      let sqlQuery =
        "SELECT id,user_name,product_name,product_price,shipping_address,quantity,subtotal,delivery_method,shipping_price,tax_price,total_price,created_at,order_status FROM(SELECT t.id,u.name AS user_name,p.name AS product_name,p.price AS product_price,t.shipping_address,t.quantity,t.subtotal,d.method AS delivery_method,t.shipping_price,t.tax_price,t.total_price,to_char(t.created_at::timestamp,'Dy DD Mon YYYY HH24:MI') AS created_at,t.created_at AS date,t.order_status FROM transactions t JOIN users u on t.user_id = u.id JOIN products p on t.product_id = p.id JOIN delivery d on t.delivery_id = d.id) td";
      if (keyword || delivery_method || order_status) {
        sqlQuery +=
          " WHERE lower(order_status) = lower($3) OR lower(user_name) LIKE lower('%' || $1 || '%') OR lower(product_name) LIKE lower('%' || $1 || '%') OR lower(delivery_method) = lower($2) OR lower(order_status) LIKE lower('%' || $1 || '%')";
        parameterize.push(keyword, delivery_method, order_status);
      }
      if (order) {
        sqlQuery += " order by " + sort + " " + order;
      }
      const result = await db.query(sqlQuery, parameterize);
      if (result.rowCount === 0) {
        reject({ status: 404, error: "Transaction Not Found" });
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

const createTransaction = (body) => {
  return new Promise(async (resolve, reject) => {
    const { user_id, product_id, delivery_id, shipping_address, coupon_code, quantity } = body;
    try {
      await db.query("BEGIN");
      const queryProduct = "SELECT price FROM products WHERE id = $1";
      const product = await db.query(queryProduct, [product_id]);

      const price = product.rows[0].price;

      let shipping_price;
      let address;

      const subtotal = price * quantity;
      const tax_price = 0.05 * subtotal;

      const delivery = Number(delivery_id);
      switch (delivery) {
        case 1:
          shipping_price = 0;
          address = null;
          break;
        case 2:
          shipping_price = 15000;
          address = shipping_address;
          break;
        default:
          reject({ status: 400, error: "Wrong Input Value delivery_id" });
      }

      const total_price = subtotal + tax_price + shipping_price;

      const updateQUery =
        "WITH p AS (UPDATE products SET stock = stock - $7,transaction_count = transaction_count + 1,updated_at = now() WHERE id = $2 RETURNING *), u AS (UPDATE users SET last_order = now() WHERE id = $1 RETURNING *),t AS (INSERT INTO transactions(user_id,product_id,delivery_id,shipping_address,shipping_price,tax_price,subtotal,total_price,coupon_code,quantity) values($1,$2,$9,$8,$4,$5,$3,$6,$10,$7) RETURNING *) SELECT t.id,u.name AS user_name,p.name AS product_name,p.price AS product_price,t.shipping_address,t.quantity,t.subtotal,d.method,t.shipping_price,t.tax_price,t.total_price,t.order_status,to_char(t.created_at::timestamp,'Dy DD Mon YYYY HH24:MI') AS created_at FROM p,u,t JOIN delivery d ON t.delivery_id = d.id";

      const result = await db.query(updateQUery, [user_id, product_id, subtotal, shipping_price, tax_price, total_price, quantity, address, delivery_id, coupon_code]);
      await db.query("COMMIT");
      const response = { data: result.rows[0], message: "Transaction Successfully Created" };
      resolve(response);
    } catch (err) {
      await db.query("ROLLBACK");
      reject({ status: 500, error: err.message });
    }
  });
};

const updateTransaction = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const query = "UPDATE transactions SET order_status = 'PAID', updated_at = now()  WHERE id = $1 RETURNING id,order_status,to_char(updated_at::timestamp,'Dy DD Mon YYYY HH24:MI') AS updated_at";
      const result = await db.query(query, [id]);
      if (result.rowCount === 0) {
        reject({ status: 404, error: "transaction Not Found" });
      }

      const response = { data: result.rows[0], message: "Transaction Successfully Updated" };
      resolve(response);
    } catch (err) {
      reject({ status: 500, error: err.message });
    }
  });
};

const deleteTransaction = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const query = "DELETE FROM transactions WHERE id = $1 RETURNING id,user_id,product_id,delivery_id,shipping_address,quantity,subtotal,tax_price,shipping_price,total_price,order_status";
      const result = await db.query(query, [id]);
      if (result.rowCount === 0) {
        reject({ status: 404, error: "Transaction Not Found" });
      }
      const response = { data: result.rows[0], message: "Transaction Successfully Deleted" };
      resolve(response);
    } catch (err) {
      reject({ status: 500, error: err.message });
    }
  });
};

module.exports = { getOrderById, createTransaction, findTransaction, updateTransaction, deleteTransaction };
