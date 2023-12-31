// module import...
const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const methodOverride = require("method-override");

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
const categories = ["fruit", "vegetable", "dairy"];

// view setting
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// setting...
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

// router
app.get("/products", async (req, res) => {
  const {
    query: { category },
  } = req;

  if (category) {
    const products = await Product.find({ category: category });
    res.render("products/index", { products, category });
  } else {
    const products = await Product.find({});
    res.render("products/index", { products, category: "All" });
  }
});

app.post("/products", async (req, res) => {
  const { name, price, category } = req.body;

  const newProduct = new Product({ name, price: +price, category });
  await newProduct.save();

  res.redirect(`/products/${newProduct._id}`);
});

app.get("/products/new", (req, res) => {
  res.render("products/new", { categories });
});

app.get("/products/:id", async (req, res) => {
  const {
    params: { id },
  } = req;

  const product = await Product.findById(id);

  res.render("products/show", { product });
});

app.get("/products/:id/edit", async (req, res) => {
  const {
    params: { id },
  } = req;
  const product = await Product.findById(id);
  res.render("products/edit", { product, categories });
});

app.put("/products/:id", async (req, res) => {
  const {
    params: { id },
    body: { name, price, category },
  } = req;

  const product = await Product.findByIdAndUpdate(
    id,
    {
      name,
      price: +price,
      category,
    },
    { runValidators: true, new: true }
  );

  res.redirect(`/products/${product._id}`);
});

app.delete("/products/:id", async (req, res) => {
  const {
    params: { id },
  } = req;

  const deletedProduct = await Product.findByIdAndDelete(id);

  res.redirect("/products");
});

app.listen(PORT, () => {
  console.log(`App is Listening on PORT : ${PORT}`);
});
