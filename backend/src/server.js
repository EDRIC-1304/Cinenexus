require("dotenv").config();
const express = require("express");
const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const watchlistRoutes = require("./routes/watchlistRoutes");
const movieRoutes = require("./routes/movieRoutes");
const recommendationRoutes = require("./routes/recommendationRoutes");

const app = express();

// ✅ Middleware
app.use(express.json());

// ✅ DB Connection
connectDB();

// ✅ Routes
app.use("/api/auth", authRoutes);
app.use("/api/watchlist", watchlistRoutes);
app.use("/api/movies", movieRoutes);
app.use("/api/recommendations", recommendationRoutes);

// ✅ Server
const PORT = process.env.PORT || 5000;

console.log("Registering routes...");
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});