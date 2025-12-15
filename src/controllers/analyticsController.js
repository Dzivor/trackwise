const Expense = require("../models/expense");
const mongoose = require("mongoose");

/**
 * GET /api/analytics/total
 * Returns total expenses for logged-in user
 */
exports.getTotalExpenses = async (req, res) => {
  const userId = req.user._id;

  const result = await Expense.aggregate([
    { $match: { user: new mongoose.Types.ObjectId(userId) } },
    {
      $group: {
        _id: null,
        totalAmount: { $sum: "$amount" },
      },
    },
  ]);

  res.json({
    total: result[0]?.totalAmount || 0,
  });
};

/**
 * GET /api/analytics/monthly
 * Returns monthly expense summary
 */
exports.getMonthlyExpenses = async (req, res) => {
  const userId = req.user._id;

  const result = await Expense.aggregate([
    { $match: { user: new mongoose.Types.ObjectId(userId) } },
    {
      $group: {
        _id: {
          year: { $year: "$date" },
          month: { $month: "$date" },
        },
        total: { $sum: "$amount" },
        count: { $sum: 1 },
      },
    },
    { $sort: { "_id.year": -1, "_id.month": -1 } },
  ]);

  res.json(result);
};

/**
 * GET /api/analytics/category
 * Returns category-wise breakdown
 */
exports.getCategoryExpenses = async (req, res) => {
  const userId = req.user._id;

  const result = await Expense.aggregate([
    { $match: { user: new mongoose.Types.ObjectId(userId) } },
    {
      $group: {
        _id: "$category",
        total: { $sum: "$amount" },
      },
    },
    { $sort: { total: -1 } },
  ]);

  res.json(result);
};
