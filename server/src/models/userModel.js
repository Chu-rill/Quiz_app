const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid"); // Import the UUID function

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  password: { type: String, required: true },
  userId: {
    type: String,
    default: uuidv4, // Generates a random UUID for each user
    unique: true, // Ensure that the random ID is unique
  },
});

module.exports = mongoose.model("User", UserSchema);
