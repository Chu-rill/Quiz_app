const User = require("../models/user_model");
const getRandomUrl = require("../models/profileImages");
const jwt = require("jsonwebtoken");
const { comparePassword, encrypt } = require("../utils/encryption");

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res
        .status(400)
        .json({ message: "Username and password are required" });
    }

    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ message: "Invalid Username or Password" });
    }

    const isPasswordCorrect = await comparePassword(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Invalid Username or Password" });
    }

    const token = jwt.sign({ username, id: user._id }, process.env.JWT_SECRET);
    res.json({ id: user._id, username, token });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.signup = async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res
        .status(400)
        .json({ message: "Username and password are required" });
    }
    // Hash the password
    const hashedPassword = await encrypt(password);

    // Get a random profile picture URL
    const profilePicture = await getRandomUrl();

    const user = await User.create({
      username,
      password: hashedPassword,
      profilePicture: profilePicture || "",
    });
    res.status(201).send(user);
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
