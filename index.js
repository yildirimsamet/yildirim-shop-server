require("dotenv").config();
const express = require("express");
const cors = require("cors");
const PORT = process.env.PORT || 5000;
const app = express();
const user = require("./routers/user");
const products = require("./routers/products");
app.use(cors());
app.use(express.json());
app.use("/user", user);
app.use("/products", products);
app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(PORT, (err) => {
  if (err) throw err;
  console.log(`Server running on http://localhost:${PORT}`);
});
