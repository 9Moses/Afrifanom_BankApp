const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");

const authRoutes = require("./src/server/server");

const port = 5000; // You can change this to your preferred port

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/auth", authRoutes);

app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});
