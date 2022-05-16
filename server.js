require("dotenv").config();
const express = require("express");
const path = require("path");
const cors = require("cors");

const mainRouter = require("./src/routes/index.js");
const { dbConn } = require("./src/config/db.js");

const { notFound, errorHandling } = require("./src/middleware/errorHandler.js");

dbConn();
const app = express();
const PORT = process.env.PORT;

const originList = ["http://localhost/", "http://127.0.0.1/", "::1"];

const corsOption = {
  origin: (origin, callback) => {
    if (originList.includes(origin) || !origin) return callback(null, true);
    return callback(new Error("Forbidden Origin"));
  },
  optionsSuccessStatus: 200,
  methods: ["GET", "POST", "PATCH", "DELETE"],
};

app.use(cors(corsOption));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, "public")));

app.use(mainRouter);

app.use(errorHandling);
app.use(notFound);

app.listen(PORT, console.log(`Server is Running at port ${PORT}`));
