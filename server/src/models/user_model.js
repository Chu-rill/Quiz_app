const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  leaderboardEntries: [
    { type: mongoose.Schema.Types.ObjectId, ref: "Leaderboard" },
  ],
  profilePicture: {
    type: String,
    default: "", // URL to the profile picture
  },
  // userId: {
  //   type: String,
  //   default: uuidv4, // Generates a random UUID for each user
  //   unique: true, // Ensure that the random ID is unique
  // },
});

module.exports = mongoose.model("User", UserSchema);
