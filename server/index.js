const express = require("express");
const app = express();
const cors = require("cors");
const authRoutes = require("./src/routes/auth_routes");
const quizRoutes = require("./src/routes/quiz_routes");
const leaderboardRoutes = require("./src/routes/leaderboard_routes");
const dotenv = require("dotenv").config();
const { connectDB } = require("./src/utils/db");
const rateLimit = require("express-rate-limit");
const port = process.env.PORT;
app.use(
  cors({
    origin: [process.env.ALLOWED_URL],
    methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
    allowedHeaders: [
      "Origin",
      "X-Requested-With",
      "Content-Type",
      "Accept",
      "Authorization",
    ],
    // exposedHeaders: ["Authorization", "Set-Cookie"],
    // credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
let limiter = rateLimit({
  max: 1000,
  windowMs: 60 * 60 * 1000,
  message:
    "We have received too many requests from this IP. Please try again after one hour.",
});

app.get("/", async (req, res) => {
  res.json({ success: true, message: "Backend Connected Successfully" });
});

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/quiz", quizRoutes);
app.use("/api/v1/leaderboard", leaderboardRoutes);

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
  //connect to db
  connectDB();
});
