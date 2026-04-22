import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  Keyboard,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import API from "../../src/api/api";
import MovieCard from "../../src/components/MovieCard";

export default function SearchScreen() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [genres, setGenres] = useState<any[]>([]);

  // 🎯 FETCH GENRES
  useEffect(() => {
    fetchGenres();
  }, []);

  const fetchGenres = async () => {
    try {
      const res = await API.get("/movies/genres");
      setGenres(res.data || []);
    } catch (err) {
      console.log("GENRE ERROR:", (err as any).message);
    }
  };

  // 🔍 Suggestions
  const fetchSuggestions = async (text: string) => {
    setQuery(text);

    if (text.length < 2) {
      setSuggestions([]);
      return;
    }

    try {
      const res = await API.get(`/movies/search/suggestions?q=${text}`);
      setSuggestions(res.data || []);
    } catch (err) {
      console.log("Suggestion error:", (err as any).message);
    }
  };

  // 🔍 Full Search
  const triggerSearch = async (text?: string) => {
    const searchText = text || query;

    if (!searchText || searchText.length < 2) return;

    Keyboard.dismiss();

    try {
      const res = await API.get(`/movies/search?q=${searchText}`);
      setResults(res.data.results || []);
      setSuggestions([]);
    } catch (err) {
      console.log("SEARCH ERROR:", (err as any).message);
    }
  };

  // 🎯 Suggestion click
  const handleSuggestionClick = (item: any) => {
    setQuery(item.title);
    triggerSearch(item.title);
  };

  // 🎬 Genre click
  const selectGenre = async (genre: any) => {
    try {
      const res = await API.get(`/movies/genre/${genre.id}`);
      setResults(res.data || []);
      setQuery(genre.name);
    } catch (err) {
      console.log("GENRE SELECT ERROR:", (err as any).message);
    }
  };

  return (
    <View style={styles.container}>
      {/* 🔍 SEARCH BAR */}
      <View style={styles.searchBar}>
        <Ionicons name="search" size={20} color="#aaa" />

        <TextInput
          placeholder="Search movies..."
          placeholderTextColor="#888"
          value={query}
          onChangeText={fetchSuggestions}
          onSubmitEditing={() => triggerSearch()}
          style={styles.input}
        />
      </View>

      {/* 🔽 Suggestions */}
      {suggestions.length > 0 && (
        <View style={styles.suggestionsBox}>
          {suggestions.map((item) => (
            <Text
              key={item.id}
              style={styles.suggestionText}
              onPress={() => handleSuggestionClick(item)}
            >
              {item.title}
            </Text>
          ))}
        </View>
      )}

      {/* 🎬 RESULTS */}
      {results.length > 0 ? (
        <FlatList
          data={results}
          keyExtractor={(item) => item.id.toString()}
          numColumns={2} // ✅ FIXED
          contentContainerStyle={{ paddingBottom: 100 }}
          renderItem={({ item }) => (
            <View style={styles.gridItem}>
              <MovieCard movie={item} />
            </View>
          )}
        />
      ) : (
        // 🎧 GENRE GRID (Spotify style)
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
    backgroundColor: "#000",
    paddingTop: 50,
    paddingHorizontal: 12,
  },

  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1a1a1a",
    paddingHorizontal: 12,
    borderRadius: 10,
    marginBottom: 10,
  },

  input: {
    flex: 1,
    color: "#fff",
    marginLeft: 10,
    paddingVertical: 10,
  },

  suggestionsBox: {
    backgroundColor: "#111",
    borderRadius: 10,
    marginBottom: 10,
    padding: 10,
  },

  suggestionText: {
    color: "#fff",
    paddingVertical: 6,
  },

  gridItem: {
    flex: 1,
    margin: 6,
  },

  // 🎧 GENRE UI
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