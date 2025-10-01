import { LoadingSpinner } from "@/components";
import { theme } from "@/theme";
import { router } from "expo-router";
import { useEffect } from "react";
import { View } from "react-native";

export default function Index() {
  useEffect(() => {
    // Redireciona automaticamente para a página de seleção
    router.replace("/selection");
  }, []);

  return (
    <View style={{ 
      flex: 1, 
      justifyContent: "center", 
      alignItems: "center",
      backgroundColor: theme.semantic.background.primary
    }}>
      <LoadingSpinner size="large" color={theme.colors.primary[500]} />
    </View>
  );
}
