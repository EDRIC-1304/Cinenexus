const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  watchlist: [
    {
      type: Number,
      default: [], // TMDb movie IDs
    },
  ],
  ratings: [
    {
      movieId: Number,
      rating: Number,
    },
  ],
}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);