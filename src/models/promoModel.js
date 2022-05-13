const db = require("../config/db.js");
const ErrorHandler = require("../helper/errorHandler.js");

const getPromoById = async (id) => {
  try {
    const result = await db.query(
      "SELECT p.id,p.name,prod.name AS product_name,prod.price AS price,p.description,p.discount,to_char(p.expired_date,'Dy DD Mon YYYY') AS expired_date,p.coupon_code,p.image,c.name AS category,to_char(p.created_at::timestamp,'Dy DD Mon YYYY HH24:MI') AS created_at,to_char(p.updated_at,'Dy DD Mon YYYY HH24:MI') AS updated_at FROM promos p JOIN products prod ON p.product_id = prod.id JOIN category c ON p.category_id = c.id WHERE p.id = $1",
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
  const { keyword, coupon_code, category, order, sort, limit, page = 1 } = query;
  try {
    let params = [];
    let totalParams = [];
    let totalQuery = "SELECT count(*) AS total FROM promos p JOIN products prod on p.product_id = prod.id JOIN category c ON p.category_id = c.id ";
    let sqlQuery =
      "SELECT id,name,product_name,price,description,discount,coupon_code,expired_date,image,category FROM (SELECT p.id,p.name,prod.name as product_name ,prod.price AS price,p.description,p.discount,p.image,to_char(p.expired_date,'Dy DD Mon YYYY') AS expired_date,expired_date AS expired,p.coupon_code,c.name AS category FROM promos p JOIN products prod on p.product_id = prod.id JOIN category c on p.category_id = c.id) promo ";

    if (keyword && !coupon_code && !category) {
      sqlQuery += " WHERE lower(name) LIKE lower('%' || $1 || '%') OR lower(product_name) LIKE lower('%' || $1 || '%') ";
      totalQuery += " WHERE lower(p.name) LIKE lower('%' || $1 || '%') OR lower(prod.name) LIKE lower('%' || $1 || '%') ";
      params.push(keyword);
      totalParams.push(keyword);
    }

    if (coupon_code && !keyword && !category) {
      sqlQuery += " WHERE lower(coupon_code) = lower($1) ";
      totalQuery += " WHERE lower(coupon_code) = lower($1) ";
      params.push(coupon_code);
      totalParams.push(coupon_code);
    }

    if (category && !keyword && !coupon_code) {
      sqlQuery += " WHERE lower(category) = lower($1) ";
      totalQuery += " WHERE lower(c.name) = lower($1) ";
      params.push(category);
      totalParams.push(category);
    }

    if (keyword && category && !coupon_code) {
      sqlQuery += " WHERE lower(product_name) LIKE lower('%' || $1 || '%') AND lower(category) = $2 ";
      totalQuery += " WHERE lower(prod.name) LIKE lower('%' || $1 || '%') AND lower(c.name) = $2 ";
      params.push(keyword, category);
      totalParams.push(keyword, category);
    }

    if (keyword && coupon_code && !category) {
      sqlQuery += " WHERE lower(product_name) LIKE lower('%' || $1 || '%') AND lower(coupon_code) = $2 ";
      totalQuery += " WHERE lower(prod.name) LIKE lower('%' || $1 || '%') AND lower(coupon_code) = $2 ";
      params.push(keyword, coupon_code);
      totalParams.push(keyword, coupon_code);
    }

    if (!keyword && coupon_code && category) {
      sqlQuery += " WHERE lower(category) = $1 AND lower(coupon_code) = $2 ";
      totalQuery += " WHERE lower(c.name) = $1 AND lower(coupon_code) = $2 ";
      params.push(category, coupon_code);
      totalParams.push(category, coupon_code);
    }

    if (keyword && coupon_code && category) {
      sqlQuery += " WHERE lower(product_name) LIKE lower('%' || $1 || '%') AND lower(coupon_code) = $2 AND lower(category) = $3 ";
      totalQuery += " WHERE lower(prod.name) LIKE lower('%' || $1 || '%') AND lower(coupon_code) = $2 AND lower(c.name) = $3 ";
      params.push(keyword, coupon_code, category);
      totalParams.push(keyword, coupon_code, category);
    }

    if (order) {
      switch (order) {
        case "asc":
          sqlQuery += " ORDER BY " + sort + " asc";
          break;
        case "desc":
          sqlQuery += " ORDER BY " + sort + " desc";
          break;
        default:
          throw new ErrorHandler({ status: 400, message: "Order must be asc or desc" });
      }
    }

    if (limit) {
      const offset = (Number(page) - 1) * Number(limit);

      sqlQuery += " LIMIT $" + (params.length + 1) + " OFFSET $" + (params.length + 2);
      params.push(Number(limit), Number(offset));
    }

    const result = await db.query(sqlQuery, params);
    if (result.rowCount === 0) {
      throw new ErrorHandler({ status: 404, message: "Promo Not Found" });
    }

    const dataPromos = await db.query(totalQuery, totalParams);
    const total = dataPromos.rows[0].total;

    return {
      totalPromo: Number(total),
      totalPage: limit ? Math.ceil(Number(total) / limit) : 1,
      data: result.rows,
    };
  } catch (err) {
    throw new ErrorHandler({ status: err.status ? err.status : 500, message: err.message });
  }
};

const createPromo = async (body, image) => {
  const { name, description, discount, expired_date, category_id, product_id, coupon_code } = body;

  try {
    const query =
      "INSERT INTO promos(name,description,discount,expired_date,category_id,product_id,coupon_code,image) VALUES($1,$2,$3,$4,$5,$6,$7,$8) RETURNING id,name,description,discount,to_char(expired_date,'Dy DD Mon YYYY') AS expired_date,coupon_code,image,to_char(created_at::timestamp,'Dy DD Mon YYYY HH24:MI') AS created_at";
    const result = await db.query(query, [name, description, discount, expired_date, category_id, product_id, coupon_code, image]);
    return { data: result.rows[0], message: "Promo Successfully Created" };
  } catch (err) {
    throw new ErrorHandler({ status: err.status ? err.status : 500, message: err.message });
  }
};

const updatePromo = async (body, id, image) => {
  const { name, description, discount, expired_date, coupon_code, category_id, product_id } = body;
  try {
    const query =
      "UPDATE promos SET name = COALESCE(NULLIF($1, ''), name) , description = COALESCE(NULLIF($2, ''), description) , discount = COALESCE(NULLIF($3, '')::integer, discount) , expired_date = COALESCE(NULLIF($4, '')::date, expired_date) , coupon_code = COALESCE(NULLIF($5, ''), coupon_code),category_id = COALESCE(NULLIF($7, '')::integer, category_id),product_id = COALESCE(NULLIF($8, '')::integer, product_id),image = COALESCE(NULLIF($9, ''), coupon_code), updated_at = now()  WHERE id = $6 RETURNING id,name,description,discount,to_char(expired_date,'Dy DD Mon YYYY') AS expired_date,coupon_code,image,to_char(updated_at::timestamp,'Dy DD Mon YYYY HH24:MI') AS updated_at ";
    const result = await db.query(query, [name, description, discount, expired_date, coupon_code, id, category_id, product_id, image]);
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
