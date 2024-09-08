const Leaderboard = require("../models/leaderboard_model");

exports.submitQuiz = async (req, res) => {
  try {
    const { score, category } = req.body;
    const userId = req.user._id; // Assuming the user is authenticated

    // Update or create the leaderboard entry
    const leaderboard = await Leaderboard.updateScore(userId, category, score);

    res.status(200).json({ message: "Score updated", leaderboard });
  } catch (error) {
    console.error("Error updating leaderboard:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
