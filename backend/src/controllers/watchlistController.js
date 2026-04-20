const User = require("../models/User");
const tmdb = require("../utils/tmdb");
const { formatMovie } = require("../utils/formatter");

// ADD
const addToWatchlist = async (req, res) => {
  try {
    const movieId = Number(req.body.movieId);

    if (!movieId || isNaN(movieId)) {
      return res.status(400).json({ message: "Invalid movieId" });
    }

    const user = await User.findById(req.user._id);

    user.watchlist = user.watchlist.filter((id) => id !== null);

    if (!user.watchlist.includes(movieId)) {
      user.watchlist.push(movieId);
      await user.save();
    }

    res.json({
      message: "Added to watchlist",
      watchlist: user.watchlist,
    });
  } catch (error) {
    console.log("ADD ERROR:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};

// REMOVE
const removeFromWatchlist = async (req, res) => {
  try {
    const movieId = Number(req.params.movieId);

    const user = await User.findById(req.user._id);

    user.watchlist = user.watchlist.filter(
      (id) => id !== movieId && id !== null
    );

    await user.save();

    res.json({
      message: "Removed from watchlist",
      watchlist: user.watchlist,
    });
  } catch (error) {
    console.log("REMOVE ERROR:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};

// GET (ENRICHED)
const getWatchlist = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    const watchlistIds = user.watchlist || [];

    const movies = await Promise.all(
      watchlistIds.map(async (id) => {
        try {
          const movie = await tmdb.getMovieById(id);
          return formatMovie(movie);
        } catch (err) {
          console.log("Error fetching movie:", id);
          return null;
        }
      })
    );

    const filteredMovies = movies.filter((m) => m !== null);

    res.json(filteredMovies);
  } catch (err) {
    console.log("❌ GET WATCHLIST ERROR:", err.message);
    res.status(500).json({ message: "Error fetching watchlist" });
  }
};

module.exports = {
  addToWatchlist,
  removeFromWatchlist,
  getWatchlist,
};