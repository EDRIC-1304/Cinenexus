import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { useState } from "react";
import { useAuth } from "../../src/components/AuthContext";
import { useRouter } from "expo-router";
import Toast from "react-native-toast-message";

export default function LoginScreen() {
  const { login } = useAuth();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      await login(email, password);

      Toast.show({
        type: "success",
        text1: "Login Successful",
      });

      router.replace("/"); // go to home
    } catch (err) {
      Toast.show({
        type: "error",
        text1: "Login Failed",
        text2: "Invalid credentials",
      });
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome Back 👋</Text>

      <TextInput
        placeholder="Email"
        placeholderTextColor="#888"
        onChangeText={setEmail}
        style={styles.input}
      />

      <TextInput
        placeholder="Password"
        placeholderTextColor="#888"
        secureTextEntry
        onChangeText={setPassword}
        style={styles.input}
      />

      <TouchableOpacity style={styles.btn} onPress={handleLogin}>
        <Text style={styles.btnText}>Login</Text>
      </TouchableOpacity>

      {/* 🔥 SIGNUP NAV */}
      <TouchableOpacity onPress={() => router.push("/auth/signup")}>
        <Text style={styles.link}>
          Don't have an account? <Text style={{ color: "#E50914" }}>Sign Up</Text>
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    justifyContent: "center",
    padding: 20,
  },

  title: {
    color: "#fff",
    fontSize: 26,
    marginBottom: 20,
  },

  input: {
    backgroundColor: "#1a1a1a",
    color: "#fff",
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
  },

  btn: {
    backgroundColor: "#E50914",
    padding: 12,
    borderRadius: 8,
  },

  btnText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
  },

  link: {
    color: "#aaa",
    marginTop: 15,
    textAlign: "center",
  },
});