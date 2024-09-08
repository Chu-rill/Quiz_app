const login_user = require("../logic/auth_logic");
const { comparePassword, encrypt } = require("../utils/encryption");
// const getRandomUrl = require("../models/profileImages");
exports.login = async (req, res) => {
  try {
    const user_details = req.body;

    const response = await login_user(user_details);

    res.status(200).json(response);
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
