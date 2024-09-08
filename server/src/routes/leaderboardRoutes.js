const express = require("express");
const leaderboardRoutes = express.Router();
const { protect } = require("../middleWare/jwt");
const { submitQuiz } = require("../controllers/leaderboardController");
leaderboardRoutes.post("/submitquiz", protect, submitQuiz);
module.exports = leaderboardRoutes;
