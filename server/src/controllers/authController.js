const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

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

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
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
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = await User.create({ username, password: hashedPassword });
    res.status(201).send(user);
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
