const express = require("express");
const router = express.Router();

const { getRecommendations } = require("../controllers/recommendationController");
const protect = require("../middleware/authMiddleware");

// 🔒 Protected route
router.get("/", protect, getRecommendations);

module.exports = router;