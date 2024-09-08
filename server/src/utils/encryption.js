const bcrypt = require("bcryptjs");

// Function to encrypt a password
const encrypt = async (plainPassword) => {
  const salt = await bcrypt.genSalt(10); // Generate a salt with 10 rounds
  const hashedPassword = await bcrypt.hash(plainPassword, salt); // Hash the password with the salt
  return hashedPassword;
};

// Function to compare a password with a hashed one
const comparePassword = async (plainPassword, hashedPassword) => {
  const isMatch = await bcrypt.compare(plainPassword, hashedPassword); // Compare the passwords
  return isMatch; // Returns true if passwords match, false otherwise
};

module.exports = { encrypt, comparePassword };
