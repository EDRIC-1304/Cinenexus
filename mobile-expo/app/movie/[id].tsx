import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import API from "../../src/api/api";
import { useWatchlist } from "../../src/components/WatchlistContext";
import Toast from "react-native-toast-message";
import { Stack } from "expo-router";

export default function MovieDetailsScreen() {
  const { id } = useLocalSearchParams();
  const movieId = Number(id);

  const [movie, setMovie] = useState<any>(null);

  const { addMovie, removeMovie, isInWatchlist } = useWatchlist();
  const added = isInWatchlist(movieId);

  const fetchDetails = async () => {
    try {
      const res = await API.get(`/movies/${movieId}`);
      setMovie(res.data);
    } catch (err) {
      console.log("DETAIL ERROR:", err.message);
    }
  };

  useEffect(() => {
    fetchDetails();
  }, []);

  const handleWatchlist = async () => {
    try {
      if (added) {
        await removeMovie(movieId);

        Toast.show({
          type: "success",
          text1: "Removed from Watchlist",
        });
      } else {
        await addMovie(movie);

        Toast.show({
          type: "success",
          text1: "Added to Watchlist",
        });
      }
    } catch (err) {
      Toast.show({
        type: "error",
        text1: "Something went wrong",
      });
    }
  };

  if (!movie) {
    return (
      <View style={styles.center}>
        <Text style={{ color: "#fff" }}>Loading...</Text>
      </View>
    );
  }

  <Stack.Screen options={{ title: movie?.title || "Movie" }} />
  
  return (
    
    <ScrollView style={styles.container}>
      <Image
        source={{ uri: movie.backdrop || movie.poster }}
        style={styles.banner}
      />

      <View style={styles.content}>
        <Text style={styles.title}>{movie.title}</Text>

        <Text style={styles.meta}>
          ⭐ {movie.rating} | 📅 {movie.releaseDate}
        </Text>

        <TouchableOpacity
          style={[styles.btn, added && styles.btnRemove]}
          onPress={handleWatchlist}
        >
          <Text style={styles.btnText}>
            {added ? "Remove from Watchlist" : "+ Add to Watchlist"}
          </Text>
        </TouchableOpacity>

        <Text style={styles.overview}>
          {movie.overview || "No description available"}
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
  },

  banner: {
    width: "100%",
    height: 250,
  },

  content: {
    padding: 15,
  },

  title: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "bold",
  },

  meta: {
    color: "#aaa",
    marginVertical: 8,
  },

  overview: {
    color: "#ddd",
    marginTop: 15,
    lineHeight: 20,
  },

  btn: {
    backgroundColor: "#E50914",
    padding: 10,
    borderRadius: 8,
    marginTop: 10,
  },

  btnRemove: {
    backgroundColor: "#444",
  },

  btnText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
  },

  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#121212",
  },
});