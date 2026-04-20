const User = require("../models/User");
const tmdb = require("../utils/tmdb");
const { formatMovie } = require("../utils/formatter");

// 🔥 GET RECOMMENDATIONS
const getRecommendations = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (!user.watchlist || user.watchlist.length === 0) {
      return res.status(400).json({
        message: "Watchlist is empty",
      });
    }

    // 1. Fetch movie details
    const movies = await Promise.all(
      user.watchlist.map((id) => tmdb.getMovieById(id))
    );

    // 2. Extract genres
    const genreCount = {};

    movies.forEach((movie) => {
      movie.genres.forEach((g) => {
        genreCount[g.id] = (genreCount[g.id] || 0) + 1;
      });
    });

    // 3. Get top genres
    const sortedGenres = Object.entries(genreCount)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3) // top 3 genres
      .map((g) => g[0]);

    // 4. Fetch recommendations
    const data = await tmdb.getRecommendationsByGenres(sortedGenres);

    const recommendations = data.results.map(formatMovie);

    res.json({
      basedOnGenres: sortedGenres,
      results: recommendations,
    });
  } catch (err) {
    console.log("RECOMMENDATION ERROR:", err.message);
    res.status(500).json({ message: "Error generating recommendations" });
  }
};

module.exports = { getRecommendations };