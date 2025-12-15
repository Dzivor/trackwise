const express = require("express");
const protect = require("../middleware/authMiddleware");
const authorize = require("../middleware/roleMiddleware");
const {
  getAllUsers,
  getAllExpenses,
} = require("../controllers/adminController");

const router = express.Router();

router.get("/users", protect, authorize("admin"), getAllUsers);
router.get("/expenses", protect, authorize("admin"), getAllExpenses);

module.exports = router;
