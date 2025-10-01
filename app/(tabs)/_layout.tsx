import { theme } from '@/theme';
import { Slot } from 'expo-router';
import { View } from 'react-native';

export default function TabsContainerLayout() {
  return (
    <View style={{ 
      flex: 1, 
      backgroundColor: theme.semantic.background.primary 
    }}>
      <Slot />
    </View>
  );
}