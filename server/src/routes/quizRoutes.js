const express = require("express");
const quizRoutes = express.Router();
const { protect } = require("../middleWare/middleware");
const { create, getQuizzes } = require("../controllers/quizController");
quizRoutes.post("/create", protect, create);
quizRoutes.get("/getquizzes", protect, getQuizzes);
module.exports = quizRoutes;
