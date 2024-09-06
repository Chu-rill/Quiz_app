const express = require("express");
const app = express();
const cors = require("cors");
const authRoutes = require("./src/routes/authRoutes");
const quizRoutes = require("./src/routes/quizRoutes");
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const rateLimit = require("express-rate-limit");
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
const port = process.env.PORT;
const URI = process.env.MONGODB_URI || "mongodb://localhost:27017/quizapp";

let limiter = rateLimit({
  max: 1000,
  windowMs: 60 * 60 * 1000,
  message:
    "We have received too many requests from this IP. Please try again after one hour.",
});

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
  res.json({ success: true, message: "Backend Connected Successfully" });
});

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/quiz", quizRoutes);
