const jwt = require("jsonwebtoken");

// Function to generate a JWT token for a given user ID.

const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: "7d" });
};

module.exports = generateToken;
