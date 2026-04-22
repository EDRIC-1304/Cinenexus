import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

export default function SearchSuggestions({ data, onSelect }) {
  return (
    <View style={styles.container}>
      {data.map((item) => (
        <TouchableOpacity
          key={item.id}
          style={styles.item}
          onPress={() => onSelect(item.title)}
        >
          <Text style={styles.text}>{item.title}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#1a1a1a",
    borderRadius: 8,
    marginBottom: 10,
  },
  item: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#333",
  },
  text: {
    color: "#fff",
  },
});