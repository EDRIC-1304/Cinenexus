import { View, Text, FlatList, StyleSheet } from "react-native";
import MovieCard from "./MovieCard";

export default function MovieList({ title, data = [] }) {
  if (!data || data.length === 0) return null;

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>{title}</Text>

      <FlatList
        data={data}
        horizontal
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <MovieCard movie={item} />}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  heading: {
    color: "#fff",
    fontSize: 18,
    marginBottom: 10,
  },
});