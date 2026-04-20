const BASE_IMAGE_URL = "https://image.tmdb.org/t/p/w500";

const formatMovie = (movie) => {
  return {
    id: movie.id,
    title: movie.title || movie.name,
    poster: movie.poster_path
      ? `${BASE_IMAGE_URL}${movie.poster_path}`
      : null,
    backdrop: movie.backdrop_path
      ? `${BASE_IMAGE_URL}${movie.backdrop_path}`
      : null,
    rating: movie.vote_average,
    releaseDate: movie.release_date || null,
  };
};

const formatMovieDetails = (movie) => {
  return {
    id: movie.id,
    title: movie.title,
    overview: movie.overview,
    poster: movie.poster_path
      ? `${BASE_IMAGE_URL}${movie.poster_path}`
      : null,
    backdrop: movie.backdrop_path
      ? `${BASE_IMAGE_URL}${movie.backdrop_path}`
      : null,
    rating: movie.vote_average,
    runtime: movie.runtime,
    genres: movie.genres?.map((g) => g.name),
    releaseDate: movie.release_date,
  };
};

module.exports = {
  formatMovie,
  formatMovieDetails,
};