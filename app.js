const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const rateLimit = require("express-rate-limit");

require("dotenv").config();

const database = require("./config/database");

const app = express();
app.set("trust proxy", 1);
var limiter = new rateLimit({
  windowMs: 1 * 60 * 1000,
  max: 60,
  message:
    "Too many requests created from this IP, please try again after an hour",
});
app.use(limiter);

app.use(bodyParser.urlencoded({ limit: "100mb", extended: false }));
app.use(bodyParser.json("100mb"));

// app.use((req,res,next)=>{
//     res.header("Access")
// })

app.use(cors());

app.get("/checkServer", (req, res) => {
  return res.status(200).json({
    message: "Server is up and running",
  });
});

app.use("/api", require("./routes"));

app.use((req, res, next) => {
  const error = new Error("Route not found");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    success: false,
    message: error.message || "Something went wrong",
  });
});

const PORT = process.env.PORT || 3000;

//Start server
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
