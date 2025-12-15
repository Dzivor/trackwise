const Expense = require("../models/expense");

const createExpense = async (req, res) => {
  try {
    const { title, amount, category } = req.body;

    const expense = await Expense.create({
      user: req.user._id,
      title,
      amount,
      category,
    });

    res.status(201).json({
      message: "Expense created successfully",
      expense,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//Getting all expenses of a logged in user

exports.getExpenses = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  const query = { user: req.user._id };

  // Filter by category
  if (req.query.category) {
    query.category = req.query.category;
  }

  // Filter by date range
  if (req.query.startDate || req.query.endDate) {
    query.date = {};

    if (req.query.startDate) {
      query.date.$gte = new Date(req.query.startDate);
    }

    if (req.query.endDate) {
      query.date.$lte = new Date(req.query.endDate);
    }
  }

  const total = await Expense.countDocuments(query);

  const expenses = await Expense.find(query)
    .sort({ date: -1 })
    .skip(skip)
    .limit(limit);

  res.json({
    page,
    limit,
    total,
    pages: Math.ceil(total / limit),
    expenses,
  });
};

// Updating expenses

const updateExpense = async (req, res) => {
  try {
    const expense = await Expense.findById(req.params.id);

    if (!expense) {
      return res.status(404).json({ message: "Expense not found" });
    }

    // Make sure user owns this expense
    if (expense.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Unauthorized action" });
    }

    const updated = await Expense.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    res.json({
      message: "Expense updated successfully",
      updated,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//Deleting expenses

const deleteExpense = async (req, res) => {
  try {
    const expense = await Expense.findById(req.params.id);

    if (!expense) {
      return res.status(404).json({ message: "Expense not found" });
    }

    // Ensure owner is deleting
    if (expense.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Unauthorized action" });
    }

    await expense.deleteOne();
    res.json({ message: "Expense deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Export all functions as an object
module.exports = {
  createExpense,
  getExpenses,
  updateExpense,
  deleteExpense,
};
