const express = require("express");
const quizRoutes = express.Router();
const { protect } = require("../middleWare/middleware");
const {
  create,
  getQuizzes,
  getSingleQuiz,
} = require("../controllers/quizController");
quizRoutes.post("/create", protect, create);
quizRoutes.get("/getquizzes", protect, getQuizzes);
quizRoutes.get("/getsinglequiz/:id", protect, getSingleQuiz);
module.exports = quizRoutes;
