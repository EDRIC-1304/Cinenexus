import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { useState } from "react";
import { useAuth } from "../../src/components/AuthContext";
import { useRouter } from "expo-router";
import Toast from "react-native-toast-message";

export default function SignupScreen() {
  const { signup } = useAuth();
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async () => {
    try {
      await signup(name, email, password);

      Toast.show({
        type: "success",
        text1: "Account Created",
      });

      router.replace("/");
    } catch (err) {
      Toast.show({
        type: "error",
        text1: "Signup Failed",
        text2: "Try different email",
      });
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create Account 🚀</Text>

      <TextInput
        placeholder="Name"
        placeholderTextColor="#888"
        onChangeText={setName}
        style={styles.input}
      />

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

      <TouchableOpacity style={styles.btn} onPress={handleSignup}>
        <Text style={styles.btnText}>Sign Up</Text>
      </TouchableOpacity>

      {/* 🔥 LOGIN NAV */}
      <TouchableOpacity onPress={() => router.push("/auth/login")}>
        <Text style={styles.link}>
          Already have an account? <Text style={{ color: "#E50914" }}>Login</Text>
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