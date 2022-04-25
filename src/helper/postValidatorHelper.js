const postValidatorHelper = (body, length) => {
  const key = Object.keys(body);
  const value = Object.values(body);
  if (key.length < length) {
    return {
      error: "Missing Required Field(s)",
      valid: false,
    };
  }

  if (value.includes("")) {
    return {
      error: "Field(s) cannot be empty",
      valid: false,
    };
  }
};

module.exports = postValidatorHelper;
