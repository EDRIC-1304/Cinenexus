const tmdb = require("../utils/tmdb");
const {
  formatMovie,
  formatMovieDetails,
} = require("../utils/formatter");

// 🔥 TRENDING
const getTrendingMovies = async (req, res) => {
  try {
    const data = await tmdb.getTrending();
    res.json(data.results.map(formatMovie));
  } catch (err) {
    res.status(500).json({ message: "Error fetching trending movies" });
  }
};

// 🔥 SEARCH
const searchMovies = async (req, res) => {
  try {
    const q = req.query.q;
    const page = req.query.page || 1;

    console.log("QUERY:", q, "PAGE:", page);

    if (!q || q.trim().length < 2) {
      return res.status(400).json({
        message: "Query must be at least 2 characters",
      });
    }

    const data = await tmdb.searchMovies(q, page);

    const movies = data.results.map(formatMovie);

    res.json({
      query: q,
      page: Number(page),
      totalPages: data.total_pages,
      totalResults: data.total_results,
      results: movies,
    });
  } catch (err) {
    console.log("SEARCH ERROR:", err.message);
    res.status(500).json({ message: "Search failed" });
  }
};

// 🔥 DETAILS
const getMovieDetails = async (req, res) => {
  try {
    const data = await tmdb.getMovieDetails(req.params.id);
    res.json(formatMovieDetails(data));
  } catch (err) {
    res.status(500).json({ message: "Error fetching movie details" });
  }
};

// 🔥 CREDITS
const getMovieCredits = async (req, res) => {
  try {
    const data = await tmdb.getMovieCredits(req.params.id);

    const cast = data.cast.slice(0, 10).map((actor) => ({
      id: actor.id,
      name: actor.name,
      character: actor.character,
      profile: actor.profile_path
        ? `https://image.tmdb.org/t/p/w500${actor.profile_path}`
        : null,
    }));

    res.json(cast);
  } catch (err) {
    res.status(500).json({ message: "Error fetching credits" });
  }
};

// 🔥 POPULAR
const getPopular = async (req, res) => {
  try {
    const data = await tmdb.getPopular();
    res.json(data.results.map(formatMovie));
  } catch (err) {
    res.status(500).json({ message: "Error fetching popular movies" });
  }
};

// 🔥 TOP RATED
const getTopRated = async (req, res) => {
  try {
    const data = await tmdb.getTopRated();
    res.json(data.results.map(formatMovie));
  } catch (err) {
    res.status(500).json({ message: "Error fetching top rated movies" });
  }
};

// 🔥 GENRES
const getGenres = async (req, res) => {
  try {
    const data = await tmdb.getGenres();
    res.json(data.genres);
  } catch (err) {
    res.status(500).json({ message: "Error fetching genres" });
  }
};

// 🔥 MOVIES BY GENRE
const getMoviesByGenre = async (req, res) => {
  try {
    const data = await tmdb.getMoviesByGenre(req.params.genreId);
    res.json(data.results.map(formatMovie));
  } catch (err) {
    res.status(500).json({ message: "Error fetching genre movies" });
  }
};

const getSearchSuggestions = async (req, res) => {
  try {
    const q = req.query.q;

    if (!q || q.length < 2) {
      return res.json([]);
    }

    const data = await tmdb.searchMovies(q);

    const queryLower = q.toLowerCase();

    // 🔥 1. Filter relevant titles
    let filtered = data.results.filter((m) =>
      m.title?.toLowerCase().includes(queryLower)
    );

    // 🔥 2. Sort by popularity (better results first)
    filtered.sort((a, b) => b.popularity - a.popularity);

    // 🔥 3. Fallback if too few results
    if (filtered.length < 5) {
      filtered = data.results.sort((a, b) => b.popularity - a.popularity);
    }

    // 🔥 4. Clean output
    const suggestions = filtered.slice(0, 5).map((m) => ({
      id: m.id,
      title: m.title,
      year: m.release_date?.split("-")[0] || null,
    }));

    res.json(suggestions);
  } catch (err) {
    console.log("SUGGESTION ERROR:", err.message);
    res.status(500).json({ message: "Suggestion error" });
  }
};

module.exports = {
  getTrendingMovies,
  searchMovies,
  getMovieDetails,
  getMovieCredits,
  getPopular,
  getTopRated,
  getGenres,
  getMoviesByGenre,
  getSearchSuggestions,
};