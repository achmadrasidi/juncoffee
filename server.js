require("dotenv").config();
const express = require("express");

const mainRouter = require("./src/routes/index.js");
const db = require("./src/config/db.js");
const logger = require("morgan");
const path = require("path");

const app = express();
const PORT = process.env.PORT;

db.connect()
  .then(() => {
    console.log("DB connected");

    app.use(logger(":method :url :status :res[content-length] - :response-time ms"));
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    app.use(express.static(path.join(__dirname, "public")));

    app.use(mainRouter);

    app.listen(PORT, () => {
      console.log(`Server is Running at port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err.message);
  });
