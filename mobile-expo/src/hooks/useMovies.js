import { useEffect, useState } from "react";
import API from "../api/api";

export const useMovies = () => {
  const [trending, setTrending] = useState([]);
  const [popular, setPopular] = useState([]);
  const [topRated, setTopRated] = useState([]);
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [selectedGenreMovies, setSelectedGenreMovies] = useState([]);

  useEffect(() => {
    fetchAll();
  }, []);

  const fetchAll = async () => {
    try {
      const [t, p, tr, g] = await Promise.all([
        API.get("/movies/trending"),
        API.get("/movies/popular"),
        API.get("/movies/top-rated"),
        API.get("/movies/genres"),
      ]);

      setTrending(t.data);
      setPopular(p.data);
      setTopRated(tr.data);
      setGenres(g.data);
    } catch (err) {
      console.log("FETCH ERROR:", err.message);
    }
  };

  const fetchByGenre = async (genre) => {
    try {
      setSelectedGenre(genre);

      const res = await API.get(`/movies/genre/${genre.id}`);
      setSelectedGenreMovies(res.data);
    } catch (err) {
      console.log("GENRE ERROR:", err.message);
    }
  };

  return {
    trending,
    popular,
    topRated,
    genres,
    selectedGenre,
    selectedGenreMovies,
    fetchByGenre,
  };
};