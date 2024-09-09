const { submit_score, get_scores } = require("../logic/leaderboard_logic");

exports.submitScore = async (req, res) => {
  try {
    const { score, category, quizId } = req.body;
    const userId = req.user._id; // Assuming the user is authenticated

    // Update or create the leaderboard entry
    const response = await submit_score(userId, category, score, quizId);

    res.status(response.statusCode).send(response);
    // res.status(200).json({ message: "Score updated", leaderboard });
  } catch (error) {
    console.error("Error updating leaderboard:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.getAllScore = async (req, res) => {
  try {
    const response = await get_scores();
    res.status(response.statusCode).send(response);
  } catch (error) {
    console.error("Error updating leaderboard:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
