import { ThemeProvider } from "@/contexts/ThemeContext";
import { Stack } from "expo-router";
import { ActivityIndicator, View } from "react-native";
import "../global.css";
import { useAuth } from "../hooks/useAuth";

export default function RootLayout() {
  const { isLoading } = useAuth();

  if (isLoading) {
    return (
      <ThemeProvider>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size="large" color="#1a237e" />
        </View>
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="selection" />
        <Stack.Screen name="(administrator)" options={{ headerShown: false }} />
        <Stack.Screen name="(client)" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
    </ThemeProvider>
  );
}
