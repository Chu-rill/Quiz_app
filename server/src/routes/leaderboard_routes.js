const express = require("express");
const leaderboardRoutes = express.Router();
const { protect } = require("../middleWare/jwt");
const { submitScore } = require("../controllers/leaderboard_controller");
leaderboardRoutes.post("/submitquiz", protect, submitScore);
module.exports = leaderboardRoutes;
