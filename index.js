// module import...
const express = require("express");
const path = require("path");
const mongoose = require("mongoose");

// Model import...
const Product = require("./models/product");

// mongoose and mongoDB connection
mongoose
  .connect("mongodb://127.0.0.1:27017/farmStand")
  .then(() => console.log("Mongo Connection Open!!"))
  .catch((err) => console.log("Mongo connecting Error : ", err));

// define code....
const app = express();
const PORT = 3000;

// view setting
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// router
app.get("/", (req, res) => {
  res.send("<h1>HOME</h1>");
});

// server listening
app.listen(PORT, () => {
  console.log(`App is Listening on PORT : ${PORT}`);
});
