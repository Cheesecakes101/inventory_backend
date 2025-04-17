const express = require("express");
const dashboardRoute = require("./controller/dashboardRoute");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

// MongoDB Connection
mongoose.set("strictQuery", true);
console.log(process.env.MONGODB_URL);
mongoose.connect(process.env.MONGODB_URL)
  .then(() => console.log("mongodb connected"))
  .catch((error) => {
    console.log(error);
    console.log("failed");
  });

// Schema & Model
const newSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
});

const collection = mongoose.model("collection", newSchema);

// Password Validation Function
const isValidPassword = (password) => {
  const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
  return regex.test(password);
};

// Routes
app.get("/", (req, res) => {
  res.send("Welcome to the Inventory Management System Backend");
});

// Login Route
app.post("/", async (req, res) => {
  const { username, password } = req.body;

  try {
    const check = await collection.findOne({ username, password });

    if (check) {
      res.json("exist");
    } else {
      res.json("not exist");
    }
  } catch (error) {
    console.log(error);
    res.json("not exist");
  }
});

// Register Route with Password Validation
app.post("/register", async (req, res) => {
  const { username, password } = req.body;

  if (!isValidPassword(password)) {
    return res.status(400).json("Password does not meet complexity requirements");
  }

  try {
    const check = await collection.findOne({ username });

    if (check) {
      res.json("exist");
    } else {
      await collection.insertMany([{ username, password }]);
      res.json("not exist");
    }
  } catch (error) {
    console.log(error);
    res.json("not exist");
  }
});

// Dashboard Route
app.use("/dashboardRoute", dashboardRoute);

// Server Listen
app.listen(3000, () => {
  console.log("port connected");
});
