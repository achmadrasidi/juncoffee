const inputFormatter = (req, res, next) => {
  const obj = req.body;
  let valid = true;
  let error;
  for (const key in obj) {
    const value = obj[key];
    const emailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    const phoneFormat = /^\d{12}$/;

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

module.exports = inputFormatter;
