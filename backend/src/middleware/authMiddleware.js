const jwt = require("jsonwebtoken");
const User = require("../models/User");

const protect = async (req, res, next) => {
  console.log("\n===== AUTH MIDDLEWARE START =====");

  try {
    console.log("HEADERS:", req.headers);

    const authHeader = req.headers.authorization;

    if (!authHeader) {
      console.log("❌ No Authorization header");
      return res.status(401).json({ message: "No token" });
    }

    console.log("AUTH HEADER:", authHeader);

    if (!authHeader.startsWith("Bearer ")) {
      console.log("❌ Invalid format (should be Bearer token)");
      return res.status(401).json({ message: "Invalid token format" });
    }

    const token = authHeader.split(" ")[1];

    console.log("TOKEN EXTRACTED:", token);

    if (!token) {
      console.log("❌ Token missing after split");
      return res.status(401).json({ message: "No token found" });
    }

    let decoded;

    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log("✅ TOKEN VERIFIED:", decoded);
    } catch (err) {
      console.log("❌ JWT ERROR:", err.message);
      return res.status(401).json({ message: "Invalid token" });
    }

    const user = await User.findById(decoded.id).select("-password");

    console.log("USER FROM DB:", user);

    if (!user) {
      console.log("❌ User not found in DB");
      return res.status(401).json({ message: "User not found" });
    }

    req.user = user;

    console.log("✅ AUTH SUCCESS → calling next()");
    console.log("===== AUTH MIDDLEWARE END =====\n");

    next();
  } catch (error) {
    console.log("❌ UNKNOWN ERROR:", error.message);
    return res.status(401).json({ message: "Not authorized" });
  }
};

module.exports = protect;