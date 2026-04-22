import { ScrollView, Text, TouchableOpacity, StyleSheet } from "react-native";

export default function GenreList({ genres, onSelect, selectedGenre }) {
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      {genres.map((genre) => {
        const isActive = selectedGenre?.id === genre.id;

        return (
          <TouchableOpacity
            key={genre.id}
            style={[styles.btn, isActive && styles.activeBtn]}
            onPress={() => onSelect(genre)}
          >
            <Text style={[styles.text, isActive && styles.activeText]}>
              {genre.name}
            </Text>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  btn: {
    backgroundColor: "#333",
    padding: 10,
    borderRadius: 20,
    marginRight: 10,
  },
  activeBtn: {
    backgroundColor: "#e50914", // Netflix red
  },
  text: {
    color: "#fff",
  },
  activeText: {
    fontWeight: "bold",
  },
});