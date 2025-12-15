const User = require("../models/user");
const Expense = require("../models/expense");

// GET all users (admin only)
exports.getAllUsers = async (req, res) => {
  const users = await User.find().select("-password");
  res.json(users);
};

// GET all expenses (admin only)
exports.getAllExpenses = async (req, res) => {
  const expenses = await Expense.find().populate("user", "name email");
  res.json(expenses);
};
