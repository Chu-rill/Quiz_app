const mongoose = require("mongoose");

const URI = process.env.MONGODB_URI || "mongodb://localhost:27017/quizapp";

function connectDB() {
  mongoose
    .connect(URI, {
      // serverSelectionTimeoutMS: 3000000,
    })
    .then(() => {
      console.log("Connected to the database");
    })
    .catch((error) => {
      console.log("Connection failed");
      console.error("Connection failed", error);
    });
}
module.exports = { connectDB };
