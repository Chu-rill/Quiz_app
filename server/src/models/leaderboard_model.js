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
});

// Static method to update or create leaderboard entry
LeaderboardSchema.statics.updateScore = async function (
  userId,
  category,
  score
) {
  let leaderboard = await this.findOne({ user: userId });

  if (!leaderboard) {
    // Create a new leaderboard entry if none exists
    leaderboard = new this({
      user: userId,
      generalHighScore: score,
      categoryScores: [{ category, highScore: score }],
    });
  } else {
    // Update general high score if the new score is higher
    // if (score > leaderboard.generalHighScore) {
    //   leaderboard.generalHighScore = score;
    // }
    leaderboard.generalHighScore = leaderboard.generalHighScore + score;

    // Check if a score exists for the category
    const categoryScore = leaderboard.categoryScores.find(
      (cs) => cs.category === category
    );
    if (categoryScore) {
      // Update category high score if the new score is higher
      if (score > categoryScore.highScore) {
        categoryScore.highScore = score;
      }
    } else {
      // Add a new category score if not already present
      leaderboard.categoryScores.push({ category, highScore: score });
    }
  }

  await leaderboard.save();
  return leaderboard;
};

module.exports = mongoose.model("Leaderboard", LeaderboardSchema);
