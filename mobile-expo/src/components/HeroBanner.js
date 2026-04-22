import { View, Text, ImageBackground, StyleSheet } from "react-native";

export default function HeroBanner({ movie }) {
  if (!movie) return null;

  return (
    <ImageBackground
      source={{ uri: movie.backdrop || movie.poster }}
      style={styles.banner}
    >
      <View style={styles.overlay}>
        <Text style={styles.title}>{movie.title}</Text>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  banner: {
    height: 220,
    justifyContent: "flex-end",
    marginBottom: 20,
  },
  overlay: {
    backgroundColor: "rgba(0,0,0,0.5)",
    padding: 10,
  },
  title: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "bold",
  },
});