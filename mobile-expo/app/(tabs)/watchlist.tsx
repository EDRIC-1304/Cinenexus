import React from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

import Toast from "react-native-toast-message";
import { useWatchlist } from "../../src/components/WatchlistContext";
import { useRouter } from "expo-router";

export default function WatchlistScreen() {
  const { watchlist, removeMovie } = useWatchlist();
  const router = useRouter();

  const handleRemove = async (id: number) => {
    try {
      await removeMovie(id);

      Toast.show({
        type: "success",
        text1: "Removed",
      });
    } catch {
      Toast.show({
        type: "error",
        text1: "Error removing movie",
      });
    }
  };

  const goToDetails = (id: number) => {
    router.push(`/movie/${id}`);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>My Watchlist</Text>

      {watchlist.length === 0 ? (
        <Text style={styles.text}>No movies in watchlist</Text>
      ) : (
        <FlatList
          data={watchlist}
          keyExtractor={(item) => item.id.toString()}
          numColumns={2}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <TouchableOpacity onPress={() => goToDetails(item.id)}>
                <Image source={{ uri: item.poster }} style={styles.poster} />
              </TouchableOpacity>

              {/* 🔥 FIXED STRUCTURE */}
              <View style={styles.info}>
                <Text style={styles.title} numberOfLines={2}>
                  {item.title}
                </Text>

                <TouchableOpacity
                  style={styles.removeBtn}
                  onPress={() => handleRemove(item.id)}
                >
                  <Text style={styles.removeText}>Remove</Text>
                </TouchableOpacity>
              </View>
            </View>
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
    padding: 10,
  },

  heading: {
    color: "#fff",
    fontSize: 22,
    marginBottom: 10,
  },

  text: {
    color: "#aaa",
  },

  card: {
    flex: 1,
    margin: 6,
  },

  poster: {
    width: "100%",
    height: 220,
    borderRadius: 10,
  },

  // 🔥 KEY FIX
  info: {
    height: 80,
    justifyContent: "space-between",
  },

  title: {
    color: "#fff",
    marginTop: 5,
  },

  removeBtn: {
    backgroundColor: "#E50914",
    padding: 6,
    borderRadius: 6,
  },

  removeText: {
    color: "#fff",
    textAlign: "center",
  },
});