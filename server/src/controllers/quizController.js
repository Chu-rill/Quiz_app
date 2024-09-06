const Quiz = require("../models/quizModel");

exports.create = async (req, res) => {
  try {
    const { title, category, questions } = req.body;

    // Check if the required fields are provided
    if (!title || !category || !questions) {
      return res.status(400).json({
        message: "Title, category, and exactly 4 questions are required",
      });
    }

    // Validate that each question has exactly 4 options
    for (const question of questions) {
      if (question.options.length !== 4) {
        return res.status(400).json({
          message: "Each question must have exactly 4 options",
        });
      }
    }

    // Create the quiz
    const quiz = await Quiz.create({
      title,
      category,
      questions,
    });

    // Send the created quiz as a response
    res.status(201).json(quiz);
  } catch (error) {
    console.error("Quiz creation error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
exports.getQuizzes = async (req, res) => {
  try {
    const quizzes = await Quiz.find();

    res.json(quizzes);
  } catch (error) {
    console.error("Quiz creation error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
exports.getSingleQuiz = async (req, res) => {
  try {
    const { id } = req.params;
    const quiz = await Quiz.findById(id);
    res.send({ quiz });
  } catch (error) {
    console.error("Quiz creation error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
