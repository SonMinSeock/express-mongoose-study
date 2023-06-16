const express = require("express");
const path = require("path");

const app = express();
const PORT = 3000;

// view setting
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.send("<h1>HOME</h1>");
});

app.listen(PORT, () => {
  console.log(`App is Listening on PORT : ${PORT}`);
});
