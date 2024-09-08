const User = require("../models/user_model");
const getRandomUrl = require("../models/profileImages");
const jwt = require("jsonwebtoken");
const { comparePassword, encrypt } = require("../utils/encryption");
const {
  passwordMismatchError,
  userNotExistError,
  defaultError,
  noDuplicateUserError,
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

const register_user = async (user_details) => {
  let { username, password } = user_details;
  try {
    let user = await User.findOne({ username });

    //if there is a user associated we return an error
    if (user) return noDuplicateUserError;

    // Hash the password
    const hashedPassword = await encrypt(password);

    // Get a random profile picture URL
    const profilePicture = await getRandomUrl();

    user = await User.create({
      username,
      password: hashedPassword,
      profilePicture: profilePicture || "",
    });

    return {
      status: "success",
      error: false,
      statusCode: 200,
      user: {
        username,
        profilePicture,
      },
    };
  } catch (error) {
    console.log(err);
    if (err.name === "ValidationError" && err.errors) {
      return handleValidationError(err);
    }

    // fallback error object
    return {
      ...defaultError,
      err_name_d: err.toString(),
      enr: process.env.MONGODB_URI || "grg",
    };
  }
};

module.exports = { login_user, register_user };
