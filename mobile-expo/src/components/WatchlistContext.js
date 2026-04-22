import { createContext, useContext, useState, useEffect } from "react";
import API from "../api/api";

const WatchlistContext = createContext();

export const WatchlistProvider = ({ children }) => {
  const [watchlist, setWatchlist] = useState([]);

  // 🔥 FETCH WATCHLIST
  const fetchWatchlist = async () => {
    try {
      const res = await API.get("/watchlist");
      setWatchlist(res.data || []);
    } catch (err) {
      console.log("WATCHLIST CTX ERROR:", err.message);
    }
  };

  useEffect(() => {
    fetchWatchlist();
  }, []);

  // ✅ ADD
  const addMovie = async (movie) => {
    await API.post("/watchlist/add", {
      movieId: movie.id,
    });

    setWatchlist((prev) => [...prev, movie]);
  };

  // ✅ REMOVE
  const removeMovie = async (id) => {
    await API.delete(`/watchlist/remove/${id}`);

    setWatchlist((prev) => prev.filter((m) => m.id !== id));
  };

  // ✅ CHECK
  const isInWatchlist = (id) => {
    return watchlist.some((m) => m.id === id);
  };

  return (
    <WatchlistContext.Provider
      value={{
        watchlist,
        addMovie,
        removeMovie,
        isInWatchlist,
        refresh: fetchWatchlist,
      }}
    >
      {children}
    </WatchlistContext.Provider>
  );
};

export const useWatchlist = () => useContext(WatchlistContext);