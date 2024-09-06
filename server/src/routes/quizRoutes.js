const express = require("express");
const quizRoutes = express.Router();
const { protect } = require("../middleWare/middleware");
const {
  create,
  getQuizzes,
  getSingleQuiz,
  getQuizzesByCategory,
} = require("../controllers/quizController");
quizRoutes.post("/create", protect, create);
quizRoutes.get("/getquizzes", protect, getQuizzes);
quizRoutes.get("/getsinglequiz/:id", protect, getSingleQuiz);
quizRoutes.get("/category", protect, getQuizzesByCategory);
module.exports = quizRoutes;
