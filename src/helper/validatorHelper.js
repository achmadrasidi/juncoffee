const validatorHelper = (req, rules) => {
  let obj;
  if (Object.keys(req.body).length) {
    obj = req.body;
  } else if (Object.keys(req.query).length) {
    obj = req.query;
  } else {
    obj = req.params;
  }
  const method = req.method;
  const path = req.baseUrl;
  const fields = Object.keys(obj);
  console.log(fields);

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
    let valid;
    let error;
    rules.forEach((val) => {
      if (!fields.includes(val)) {
        valid = false;
        error = "Missing Required Field(s)";
      }
    });
    return { error, valid };
  }

  if (method === "PATCH" && path !== "/transaction") {
    if (!fields.length && !fields.includes("id")) {
      if (req.file) {
        return true;
      }
      return { valid: false, error: "Required at least 1 field to edit" };
    }
    if (fields.includes("id")) {
      if (fields.length < 2) {
        if (req.file) {
          return true;
        }
        return { valid: false, error: "Required at least 1 field to edit" };
      }
    }
  }

  return true;
};

module.exports = validatorHelper;
