import { DarkTheme, DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { Stack, useRouter, useSegments } from "expo-router";
import { StatusBar } from "expo-status-bar";
import Toast from "react-native-toast-message";
import { useEffect } from "react";

import { useColorScheme } from "@/hooks/use-color-scheme";
import { WatchlistProvider } from "../src/components/WatchlistContext";
import { AuthProvider, useAuth } from "../src/components/AuthContext";

// 🔥 AUTH NAVIGATION CONTROLLER
function RootNavigation() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const segments = useSegments();

  useEffect(() => {
    if (loading) return;

    const inAuthGroup = segments[0] === "auth";

    // 🚨 NOT LOGGED IN → GO TO LOGIN
    if (!user && !inAuthGroup) {
      router.replace("/auth/login");
    }

    // ✅ LOGGED IN → GO TO HOME
    if (user && inAuthGroup) {
      router.replace("/");
    }
  }, [user, loading]);

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="auth/login" />
      <Stack.Screen name="auth/signup" />
      <Stack.Screen name="(tabs)" />
    </Stack>
  );
}

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <AuthProvider>
      <WatchlistProvider>
        <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
          <RootNavigation />
          <StatusBar style="auto" />
          <Toast />
        </ThemeProvider>
      </WatchlistProvider>
    </AuthProvider>
  );
}