const jwt = require("jsonwebtoken");
const cache = require("../config/cache.js");

const checkToken = (req, res, next) => {
  const bearerToken = req.header("Authorization");
  if (!bearerToken) {
    res.status(401).json({
      error: "Please Login First",
    });
    return;
  }

  const token = bearerToken.split(" ")[1];
  jwt.verify(token, process.env.JWT_SECRET_KEY, { issuer: process.env.JWT_ISSUER }, (err, payload) => {
    if (err && err.name === "TokenExpiredError") {
      res.status(403).json({
        error: "Please Login Again",
      });
      return;
    }
    if (err) {
      res.status(401).json({
        error: "Token Authorization Failed",
      });
      return;
    }

    const cachedToken = cache.getItem(`jwt${payload.id}`) || false;
    if (!cachedToken) {
      res.status(403).json({
        error: "Please Login First",
      });
      return;
    }

    if (!cachedToken || cachedToken !== token) {
      res.status(403).json({
        error: "Token Unauthorize, please login again",
      });
      return;
    }

    req.userPayload = payload;
    next();
  });
};

const checkRole = (role) => (req, res, next) => {
  if (!req.userPayload) {
    res.status(500).json({ error: "Something went wrong when trying to retrieve the user from the request" });
    return;
  }
  const roleRules = { admin: "user", user: "user" };

  if (req.userPayload.role === role || roleRules[req.userPayload.role] === role) {
    next();
    return;
  }

  res.status(403).json({ message: "Forbidden Access" });
};

const isLoggedIn = (req, res, next) => {
  const bearerToken = req.header("Authorization");
  if (!bearerToken) {
    next();
    return;
  }

  const token = bearerToken.split(" ")[1];
  jwt.verify(token, process.env.JWT_SECRET_KEY, { issuer: process.env.JWT_ISSUER }, (err, payload) => {
    if (err) {
      next();
      return;
    }
    const cachedToken = cache.getItem(`jwt${payload.id}`) || false;
    if (!cachedToken) {
      next();
      return;
    }
    if (!cachedToken || cachedToken !== token) {
      next();
      return;
    }

    res.status(403).json({
      error: "You Already Logged In",
    });
  });
};

const removeAccess = (id) => {
  const cachedToken = cache.getItem(`jwt${id}`) || false;
  if (cachedToken) {
    cache.removeItem(`jwt${id}`);
  }
};

module.exports = { checkToken, checkRole, removeAccess, isLoggedIn };
