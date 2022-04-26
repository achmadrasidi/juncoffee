const getValidator = (req, res, next) => {
  const query = req.query;
  const key = Object.keys(query);
  if (key.length < 1) {
    res.status(400).json({
      error: "Missing Required Field(s)",
    });
    return;
  }
  next();
};

module.exports = getValidator;
