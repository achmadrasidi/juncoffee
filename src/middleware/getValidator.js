const getValidator = (req, res, next) => {
  const query = req.query;
  const key = Object.keys(query);

  if (!key.includes("order") || !key.includes("sort")) {
    res.status(400).json({
      error: "Missing Required Field(s)",
    });
    return;
  }
  if (key.length < 3) {
    res.status(400).json({
      error: "Required at least 1 query to search",
    });
    return;
  }
  next();
};

module.exports = getValidator;
