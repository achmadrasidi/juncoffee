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

const userPutValidator = (req, res, next) => {
  const obj = req.body;
  let error;
  let valid = true;
  const body = Object.keys(obj);

  if (body.length < 2) {
    valid = false;
    error = "Require at least one input";
  }

  for (const key in obj) {
    const value = obj[key];
    const emailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    const phoneFormat = /^\d{12}$/;

    if (value === "") {
      valid = false;
      error = "FIeld cannot be empty";
    }

    if (key === "email") {
      if (!value.match(emailFormat)) {
        valid = false;
        error = "Invalid Email Input";
      }
    }

    if (key === "phone_number") {
      Number(value);
      if (!value.match(phoneFormat)) {
        valid = false;
        error = "Invalid Phone Input";
      }
    }

    if (key === "gender") {
      if (value !== "male" && value !== "female") {
        valid = false;
        error = "gender must be male or female";
      }
    }
  }
  if (valid === false) {
    res.status(400).json({
      error,
    });
    return;
  }
  next();
};

module.exports = { putValidator, userPutValidator };
