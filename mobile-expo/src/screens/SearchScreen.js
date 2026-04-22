import { useState, useEffect } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  FlatList,
  Keyboard,
  Text,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import API from "../api/api";
import SearchSuggestions from "../components/SearchSuggestions";
import MovieCard from "../components/MovieCard";
import Toast from "react-native-toast-message";

export default function SearchScreen() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [genres, setGenres] = useState([]);

  // 🔥 FETCH GENRES
  useEffect(() => {
    fetchGenres();
  }, []);

  const fetchGenres = async () => {
    try {
      const res = await API.get("/movies/genres");
      setGenres(res.data || []);
    } catch (err) {
      console.log("GENRE ERROR:", err.message);
    }
  };

  const handleSearch = async (text) => {
    setQuery(text);

    if (text.length < 3) {
      setSuggestions([]);
      return;
    }

    try {
      const res = await API.get(`/movies/search/suggestions?q=${text}`);
      setSuggestions(res.data || []);
    } catch (err) {
      console.log("SUGGESTION ERROR:", err?.message);
    }
  };

  const triggerSearch = async (text) => {
    if (!text || text.length < 2) return;

    Keyboard.dismiss();

    try {
      const res = await API.get(`/movies/search?q=${text}`);
      setResults(res.data?.results || []);
      setSuggestions([]);
    } catch (err) {
      Toast.show({
        type: "error",
        text1: "Search Failed",
      });
    }
  };

  const selectSuggestion = (title) => {
    setQuery(title);
    setSuggestions([]);
    triggerSearch(title);
  };

  // 🔥 GENRE CLICK → search by genre
  const selectGenre = async (genre) => {
    try {
      const res = await API.get(`/movies/genre/${genre.id}`);
      setResults(res.data || []);
      setQuery(genre.name);
    } catch (err) {
      console.log("GENRE SELECT ERROR:", err.message);
    }
  };

  return (
    <View style={styles.container}>
      {/* 🔍 SEARCH BAR */}
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="#aaa" />

        <TextInput
          placeholder="Search movies..."
          placeholderTextColor="#888"
          value={query}
          onChangeText={handleSearch}
          onSubmitEditing={() => triggerSearch(query)}
          returnKeyType="search"
          style={styles.input}
        />
      </View>

      {/* ⚡ Suggestions */}
      {suggestions.length > 0 && (
        <SearchSuggestions
          data={suggestions}
          onSelect={selectSuggestion}
        />
      )}

      {/* 🎬 RESULTS */}
      {results.length > 0 ? (
        <FlatList
          data={results}
          keyExtractor={(item) => item.id.toString()}
          numColumns={3}
          renderItem={({ item }) => (
            <View style={styles.gridItem}>
              <MovieCard movie={item} />
            </View>
          )}
        />
      ) : (
        // 🔥 GENRE GRID (SPOTIFY STYLE)
        <FlatList
          data={genres}
          keyExtractor={(item) => item.id.toString()}
          numColumns={2}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.genreCard}
              onPress={() => selectGenre(item)}
            >
              <Text style={styles.genreText}>{item.name}</Text>
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
    padding: 10,
  },

  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#222",
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginBottom: 10,
  },

  input: {
    flex: 1,
    color: "#fff",
    marginLeft: 10,
  },

  gridItem: {
    flex: 1,
    margin: 5,
  },

  // 🔥 GENRE UI
  genreCard: {
    flex: 1,
    margin: 8,
    backgroundColor: "#1DB954",
    borderRadius: 12,
    padding: 20,
    justifyContent: "center",
  },

  genreText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});