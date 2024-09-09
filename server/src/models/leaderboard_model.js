const mongoose = require("mongoose");

const LeaderboardSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Reference to the user
  generalHighScore: { type: Number, default: 0 }, // User's overall high score
  categoryScores: [
    {
      category: { type: String, required: true }, // Category name
      highScore: { type: Number, default: 0 }, // High score for the specific category
    },
  ],
  quizScores: [
    {
      quizId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Quiz",
        required: true,
      }, // Reference to the quiz
      score: { type: Number, default: 0 }, // High score for the specific quiz
    },
  ],
});

// Static method to update or create leaderboard entry
LeaderboardSchema.statics.updateScore = async function (
  userId,
  category,
  score,
  quizId
) {
  let leaderboard = await this.findOne({ user: userId });

  if (!leaderboard) {
    // Create a new leaderboard entry if none exists
    leaderboard = new this({
      user: userId,
      generalHighScore: score,
      categoryScores: [{ category, highScore: score }],
      quizScores: [{ quizId, score }], // Initialize with quiz score
    });
  } else {
    // Update general high score
    leaderboard.generalHighScore += score;

    // Check if a score exists for the category
    const categoryScore = leaderboard.categoryScores.find(
      (cs) => cs.category === category
    );
    if (categoryScore) {
      if (score > categoryScore.highScore) {
        categoryScore.highScore = score;
      }
    } else {
      leaderboard.categoryScores.push({ category, highScore: score });
    }

    // Check for quiz scores
    const quizScore = leaderboard.quizScores.find(
      (qs) => qs.quizId.toString() === quizId.toString()
    );
    if (quizScore) {
      // Update quiz high score if the new score is higher
      if (score > quizScore.score) {
        quizScore.score = score;
      }
    } else {
      // Add a new quiz score if not already present
      leaderboard.quizScores.push({ quizId, score });
    }
  }

  await leaderboard.save();
  return leaderboard;
};

module.exports = mongoose.model("Leaderboard", LeaderboardSchema);
