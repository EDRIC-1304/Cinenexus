import { View, ScrollView, StyleSheet } from "react-native";
import { useMovies } from "../../src/hooks/useMovies";
import MovieList from "../../src/components/MovieList";
import GenreList from "../../src/components/GenreList";
import HeroBanner from "../../src/components/HeroBanner";

export default function HomeScreen() {
  const {
    trending,
    popular,
    topRated,
    genres,
    selectedGenre,
    selectedGenreMovies,
    fetchByGenre,
  } = useMovies();

  return (
    <View style={styles.container}>
      <ScrollView>

        <HeroBanner movie={trending[0]} />

        <MovieList title="🔥 Trending" data={trending} />
        <MovieList title="⭐ Popular" data={popular} />
        <MovieList title="🏆 Top Rated" data={topRated} />

        <GenreList
          genres={genres}
          onSelect={fetchByGenre}
          selectedGenre={selectedGenre}
        />

        {selectedGenre && (
  <MovieList
    title={`🎬 ${selectedGenre?.name}`}
    data={selectedGenreMovies}
  />
)}

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
    padding: 10,
  },
});