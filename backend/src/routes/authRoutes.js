const express = require("express");
const {
  registerUser,
  loginUser,
} = require("../controllers/authController");

const { protect } = require("../middleware/authMiddleware"); // ✅ IMPORT THIS

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);

// 🔥 ADD THIS (CRITICAL)
router.get("/me", protect, (req, res) => {
  res.json({
    id: req.user._id,
    email: req.user.email,
    name: req.user.name,
    watchlist: req.user.watchlist || [],
  });
});

module.exports = router;