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
app.get("/products", async (req, res) => {
  const products = await Product.find({});
  console.log("read products : ", products);

  res.render("products/index", { products });
});

app.get("/products/:id", async (req, res) => {
  const {
    params: { id },
  } = req;

  const product = await Product.findById(id);

  res.render("products/show", { product });
});

// server listening
app.listen(PORT, () => {
  console.log(`App is Listening on PORT : ${PORT}`);
});
