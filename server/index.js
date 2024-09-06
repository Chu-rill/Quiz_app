const express = require("express");
const app = express();
const cors = require("cors");
const authRoutes = require("./src/routes/authRoutes");
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
const port = process.env.PORT;
const URI = process.env.MONGODB_URI || "mongodb://localhost:27017/quizapp";
mongoose
  .connect(URI, {
    // serverSelectionTimeoutMS: 3000000,
  })
  .then(() => {
    console.log("Connected to the database");
    app.listen(port, () => {
      console.log(`Server started on port ${port}`);
    });
  })
  .catch((error) => {
    console.log("Connection failed");
    console.error("Connection failed", error);
  });

app.get("/", async (req, res) => {
  res.json({ message: "success" });
});

app.use("/api/v1/auth", authRoutes);
// app.use("/auth", authRoutes);
