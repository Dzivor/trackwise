const mongoose = require("mongoose");

// User schema: represents application users and their access role.
// Includes basic identity fields (name, email), credentials (password),
// authorization role, and creation timestamp.
const userSchema = new mongoose.Schema({
  // Full display name of the user.
  // Required and trimmed to remove leading/trailing spaces.
  name: {
    type: String,
    required: true,
    trim: true,
  },

  // Unique email used for login and contact.
  // Stored lowercase, required, and trimmed.
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },

  // Hashed password string.
  // Required with a minimum length for basic strength.
  password: {
    type: String,
    required: true,
    minlength: 8,
  },

  // Authorization role determining access level.
  // Defaults to "user"; "admin" grants elevated permissions.
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },

  // Timestamp for when the user document was created.
  // Automatically set to the current date/time.
  createdAt: {
    type: Date,
    default: Date.now,
  },

  // Adding roles allows for differentiated access control,
  // enabling features like admin dashboards or user management.
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
});
// Export the Mongoose model for the "user" collection.
module.exports = mongoose.model("user", userSchema);
