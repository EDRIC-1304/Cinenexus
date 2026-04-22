import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useAuth } from "../../src/components/AuthContext";

export default function ProfileScreen() {
  const { user, logout } = useAuth();

  return (
    <View style={styles.container}>
      <Text style={styles.name}>{user?.name}</Text>
      <Text style={styles.email}>{user?.email}</Text>

      {/* Dropdown Section */}
      <View style={styles.box}>
        <Text style={styles.section}>About</Text>
        <Text style={styles.text}>Movie streaming app built with React Native</Text>
      </View>

      <View style={styles.box}>
        <Text style={styles.section}>Services</Text>
        <Text style={styles.text}>Search, Watchlist, Recommendations</Text>
      </View>

      <TouchableOpacity style={styles.logout} onPress={logout}>
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#000", padding: 20 },
  name: { color: "#fff", fontSize: 22 },
  email: { color: "#aaa", marginBottom: 20 },
  box: { backgroundColor: "#111", padding: 10, marginBottom: 10 },
  section: { color: "#fff", fontSize: 16 },
  text: { color: "#aaa" },
  logout: { backgroundColor: "red", padding: 10, marginTop: 20 },
  logoutText: { color: "#fff", textAlign: "center" },
});