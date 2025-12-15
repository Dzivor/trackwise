const express = require("express");
const protect = require("../middleware/authMiddleware");
const {
  getTotalExpenses,
  getMonthlyExpenses,
  getCategoryExpenses,
} = require("../controllers/analyticsController");

const router = express.Router();

router.get("/total", protect, getTotalExpenses);
router.get("/monthly", protect, getMonthlyExpenses);
router.get("/category", protect, getCategoryExpenses);

module.exports = router;
