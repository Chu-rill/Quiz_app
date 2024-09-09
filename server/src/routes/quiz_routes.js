const express = require("express");
const quizRoutes = express.Router();
const { protect } = require("../middleWare/jwt");
const {
  create,
  getQuizzes,
  getSingleQuiz,
  getQuizzesByCategory,
  getQuizzesByLevel,
  deleteQuiz,
} = require("../controllers/quiz_controller");
quizRoutes.post("/create", protect, create);
quizRoutes.get("/getquizzes", protect, getQuizzes);
quizRoutes.get("/getsinglequiz/:id", protect, getSingleQuiz);
quizRoutes.get("/category", protect, getQuizzesByCategory);
quizRoutes.get("/level", protect, getQuizzesByLevel);
quizRoutes.post("/deleteQuiz/:quizId", protect, deleteQuiz);
module.exports = quizRoutes;
