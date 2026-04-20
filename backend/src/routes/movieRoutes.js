const express = require("express");
const router = express.Router();

const {
  getTrendingMovies,
  searchMovies,
  getMovieDetails,
  getMovieCredits,
  getPopular,
  getTopRated,
  getGenres,
  getMoviesByGenre,
  getSearchSuggestions,
} = require("../controllers/movieController");

// 🔥 Home APIs
router.get("/trending", getTrendingMovies);
router.get("/popular", getPopular);
router.get("/top-rated", getTopRated);
router.get("/genres", getGenres);
router.get("/genre/:genreId", getMoviesByGenre);
router.get("/search", searchMovies);
router.get("/search/suggestions", getSearchSuggestions);

// 🔥 Search & Details
router.get("/search", searchMovies);
router.get("/:id", getMovieDetails);
router.get("/:id/credits", getMovieCredits);

module.exports = router;