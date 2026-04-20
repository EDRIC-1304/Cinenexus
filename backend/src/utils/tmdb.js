const axios = require("axios");

const BASE_URL = process.env.TMDB_BASE_URL;
const API_KEY = process.env.TMDB_API_KEY;

// 🔥 Common request helper
const request = async (url, params = {}) => {
  const res = await axios.get(`${BASE_URL}${url}`, {
    params: {
      api_key: API_KEY,
      ...params,
    },
  });
  return res.data;
};

// Trending Movies
const getTrending = () => request("/trending/movie/week");

// Search Movies
const searchMovies = (query, page = 1) =>
  request("/search/movie", {
    query: query,
    page: page,
    include_adult: false,
  });

// Movie Details
const getMovieDetails = (id) =>
  request(`/movie/${id}`);

// Credits
const getMovieCredits = (id) =>
  request(`/movie/${id}/credits`);

// For watchlist enrichment
const getMovieById = (id) =>
  request(`/movie/${id}`);

// 🔥 NEW (Home APIs)
const getPopular = () => request("/movie/popular");

const getTopRated = () => request("/movie/top_rated");

const getGenres = () => request("/genre/movie/list");

const getMoviesByGenre = (genreId) =>
  request("/discover/movie", {
    with_genres: genreId,
  });

  const getRecommendationsByGenres = (genreIds) =>
  request("/discover/movie", {
    with_genres: genreIds.join(","),
    sort_by: "popularity.desc",
  });

module.exports = {
  getTrending,
  searchMovies,
  getMovieDetails,
  getMovieCredits,
  getMovieById,
  getPopular,
  getTopRated,
  getGenres,
  getMoviesByGenre,
  getRecommendationsByGenres,
};