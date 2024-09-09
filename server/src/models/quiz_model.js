const mongoose = require("mongoose");

const OptionSchema = new mongoose.Schema({
  text: { type: String, required: true }, // Option text
  isCorrect: { type: Boolean, default: false }, // Whether this option is the correct one
});

const QuestionSchema = new mongoose.Schema({
  questionText: { type: String, required: true }, // The question itself
  options: {
    type: [OptionSchema],
    required: true,
    validate: [optionsLimit, "Each question must have exactly 4 options"],
  }, // 4 options
});

// Custom validator to ensure 4 options per question
function optionsLimit(val) {
  return val.length === 4;
}

const QuizSchema = new mongoose.Schema({
  title: { type: String, required: true }, // Quiz title
  category: { type: String, required: true }, // Category of the quiz
  level: { type: String, required: true }, // level of difficulty of the quiz
  questions: { type: [QuestionSchema], required: true }, // Array of questions
});

module.exports = mongoose.model("Quiz", QuizSchema);
