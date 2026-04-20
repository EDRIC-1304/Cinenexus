const express = require("express");
const router = express.Router();
console.log("Watchlist routes loaded");

const protect = require("../middleware/authMiddleware");

const {
  addToWatchlist,
  removeFromWatchlist,
  getWatchlist,
} = require("../controllers/watchlistController");

// ✅ Routes
router.post("/add", protect, addToWatchlist);
router.delete("/remove/:movieId", protect, removeFromWatchlist);
router.get("/", protect, getWatchlist);

module.exports = router;