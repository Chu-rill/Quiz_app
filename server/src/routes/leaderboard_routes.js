const express = require("express");
const leaderboardRoutes = express.Router();
const { protect } = require("../middleWare/jwt");
const {
  submitScore,
  getAllScore,
} = require("../controllers/leaderboard_controller");
leaderboardRoutes.post("/submitquiz", protect, submitScore);
leaderboardRoutes.get("/quizscore", protect, getAllScore);
module.exports = leaderboardRoutes;
