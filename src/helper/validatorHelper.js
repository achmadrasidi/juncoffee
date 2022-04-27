const validatorHelper = (req, rules) => {
  let obj;

  if (Object.keys(req.body).length > 0) {
    obj = req.body;
  } else if (Object.keys(req.query).length > 0) {
    obj = req.query;
  } else {
    obj = req.params;
  }

  const method = req.method;

  const fields = Object.keys(obj);
  let valid;
  let error;

  if (method === "GET") {
    if ((fields.includes("order") && !fields.includes("sort")) || (fields.includes("sort") && !fields.includes("order"))) {
      return {
        valid: false,
        error: "Order and Sort are required each other",
      };
    }

    if ((fields.includes("minPrice") && !fields.includes("maxPrice")) || (fields.includes("maxPrice") && !fields.includes("minPrice"))) {
      return {
        valid: false,
        error: "minPrice and maxPrice are required each other",
      };
    }
  }

  if (method === "POST") {
    rules.forEach((val) => {
      if (!fields.includes(val)) {
        valid = false;
        error = "Missing Required Field(s)";
      }
    });
    return { error, valid };
  }

  if (method === "PUT" || method === "PATCH") {
    if (!fields.includes("id")) {
      return { valid: false, error: "Missing Required Field(s)" };
    }
    if (fields.length < 2) {
      return { valid: false, error: "Required at least 1 field to edit" };
    }
  }

  if (method === "DELETE") {
    if (!fields.includes("id")) {
      return { valid: false, error: "Missing Required Field(s)" };
    }
  }

  return true;
};

module.exports = validatorHelper;
