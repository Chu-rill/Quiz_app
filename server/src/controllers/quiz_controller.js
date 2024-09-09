const {
  create_quiz,
  getAllQuizzes,
  getQuiz,
  getAllQuizzesByCategory,
  getAllQuizzesByLevel,
  deleteQuiz,
} = require("../logic/quiz_logic");

exports.create = async (req, res) => {
  try {
    const quiz_detail = req.body;

    const response = await create_quiz(quiz_detail);

    // Send the created quiz as a response
    res.status(response.statusCode).send(response);
  } catch (error) {
    console.error("Quiz creation error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
exports.getQuizzes = async (req, res) => {
  try {
    const response = await getAllQuizzes();
    res.status(response.statusCode).send(response);
  } catch (error) {
    console.error("Quiz creation error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
exports.getSingleQuiz = async (req, res) => {
  try {
    const quiz_id = req.params;
    const response = await getQuiz(quiz_id);
    res.status(response.statusCode).send(response);
  } catch (error) {
    console.error("Quiz creation error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
exports.getQuizzesByCategory = async (req, res) => {
  try {
    const category = req.query.category; // Get the category from the query string
    const response = await getAllQuizzesByCategory(category);
    res.status(response.statusCode).send(response);
  } catch (error) {
    console.error("Error fetching quizzes by category:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
exports.getQuizzesByLevel = async (req, res) => {
  try {
    const level = req.query.level; // Get the category from the query string
    const response = await getAllQuizzesByLevel(level);
    res.status(response.statusCode).send(response);
  } catch (error) {
    console.error("Error fetching quizzes by category:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
exports.deleteQuiz = async (req, res) => {
  // Get the user ID from request parameters
  const { quizId } = req.params;
  try {
    const response = await deleteQuiz(quizId);

    // Send the appropriate response to the client
    res.status(response.statusCode).send(response);
  } catch (error) {
    console.error(error); // Log the error for debugging
    res.status(500).json({ message: error.message });
  }
};
