const { login_user, register_user } = require("../logic/auth_logic");
//
exports.login = async (req, res) => {
  try {
    const user_details = req.body;

    const response = await login_user(user_details);

    res.send(response);
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.signup = async (req, res) => {
  try {
    const user_details = req.body;

    const response = await register_user(user_details);

    res.status(201).send(response);
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
