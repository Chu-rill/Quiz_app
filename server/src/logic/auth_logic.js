const User = require("../models/user_model");
const jwt = require("jsonwebtoken");
const { comparePassword } = require("../utils/encryption");
const {
  passwordMismatchError,
  userNotExistError,
  defaultError,
} = require("../error/error");

const login_user = async (user_details) => {
  let { username, password } = user_details;
  try {
    // Find the user by username
    const user = await User.findOne({ username });

    // If user not found, send an error response
    if (!user) return userNotExistError;

    //the we fetch and compare passwords with bcrypt
    const user_hashed_password = user.password;
    const isPasswordCorrect = await comparePassword(
      password,
      user_hashed_password
    );

    // If password does not match, send an error response
    if (!isPasswordCorrect) return passwordMismatchError;

    //create payload for the token
    const payload = { username: user.username, id: user._id };
    // Generate a JWT token with the user's username and ID
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_LIFETIME, // Token will expire in 1 hour
    });
    // console.log(payload, token);
    // Send user data and token as the response
    return {
      status: "success",
      error: false,
      statusCode: 200,
      user: {
        username: user.username,
        id: user._id,
      },
      token,
    };
  } catch (error) {
    //we return a default error
    return defaultError(error);
  }
};

module.exports = login_user;
