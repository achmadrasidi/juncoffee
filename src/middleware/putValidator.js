const putValidator = (req, res, next) => {
  const obj = req.body;
  let error;
  let valid = true;
  const key = Object.keys(obj);
  const value = Object.values(obj);

  if (key.length < 2) {
    valid = false;
    error = "Require at least one input";
  }

  if (value.includes("")) {
    valid = false;
    error = "Field cannot be empty";
  }

  if (valid === false) {
    res.status(400).json({
      error,
    });
    return;
  }
  next();
};

module.exports = { putValidator };
