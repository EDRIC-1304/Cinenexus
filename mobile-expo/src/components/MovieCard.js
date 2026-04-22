import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import Toast from "react-native-toast-message";
import { useWatchlist } from "../components/WatchlistContext";
import { useRouter } from "expo-router";

export default function MovieCard({ movie }) {
  const { addMovie, isInWatchlist } = useWatchlist();
  const router = useRouter();

  const added = isInWatchlist(movie.id);

  const addToWatchlist = async () => {
    if (added) return;

    try {
      await addMovie(movie);

      Toast.show({
        type: "success",
        text1: "Added to Watchlist",
        text2: movie.title,
      });
    } catch (err) {
      console.log("ADD ERROR:", err.message);

      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Could not add movie",
      });
    }
  };

  return (
    <TouchableOpacity
      onPress={() => router.push(`/movie/${movie.id}`)}
      activeOpacity={0.8}
    >
      <View style={styles.card}>
        <Image source={{ uri: movie.poster }} style={styles.poster} />

        <View style={styles.info}>
          <Text style={styles.title} numberOfLines={2}>
            {movie.title}
          </Text>

          <TouchableOpacity
            style={[styles.btn, added && styles.btnDisabled]}
            onPress={addToWatchlist}
            disabled={added}
          >
            <Text style={styles.btnText}>
              {added ? "✓ Added" : "+ Watchlist"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    width: 140,
    marginRight: 10,
  },

  poster: {
    width: "100%",
    height: 200,
    borderRadius: 10,
  },

  info: {
    height: 85,
    justifyContent: "space-between",
  },

  title: {
    color: "#fff",
    marginTop: 5,
  },

  btn: {
    backgroundColor: "#E50914",
    padding: 6,
    borderRadius: 6,
  },

  btnDisabled: {
    backgroundColor: "#444",
  },

  btnText: {
    color: "#fff",
    textAlign: "center",
    fontSize: 12,
  },
});