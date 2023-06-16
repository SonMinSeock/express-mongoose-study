const Product = require("./models/product");
const mongoose = require("mongoose");

// mongoose and mongoDB connection
mongoose
  .connect("mongodb://127.0.0.1:27017/farmStand")
  .then(() => console.log("Mongo Connection Open!!"))
  .catch((err) => console.log("Mongo connecting Error : ", err));

// 1. fruit create
// const p = new Product({
//   name: "Ruby Grapefruit",
//   price: 1.99,
//   category: "fruit",
// });

// p.save()
//   .then((data) => console.log(data))
//   .catch((err) => console.log("Error : ", err));

const seedProducts = [
  {
    name: "Fairy Eggplant",
    price: 1.0,
    category: "vegetable",
  },
  {
    name: "Organic Goddess Melon",
    price: 4.99,
    category: "fruit",
  },
  {
    name: "Organic Mini Seedless Watermelon",
    price: 3.99,
    category: "fruit",
  },
  {
    name: "Organic Celery",
    price: 1.5,
    category: "vegetable",
  },
  {
    name: "Chocolate Whole Milk",
    price: 2.69,
    category: "dairy",
  },
];

Product.insertMany(seedProducts)
  .then((res) => console.log(res))
  .catch((err) => console.log(err));
