import React from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Tabs } from 'expo-router';

import Colors from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { useClientOnlyValue } from '@/hooks/useClientOnlyValue';

// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: (Colors as any)[colorScheme ?? 'light'].tint,
        headerShown: false,
        tabBarStyle: { display: 'none' }, // Esconde a tab bar vazia
      }}>
      <Tabs.Screen
        name="index"
        options={{
          href: null, // Esconde da tab bar
        }}
      />
      <Tabs.Screen
        name="(client)"
        options={{
          href: null, // Esconde da tab bar principal
        }}
      />
      <Tabs.Screen
        name="(administrator)"
        options={{
          href: null, // Esconde da tab bar principal  
        }}
      />
      <Tabs.Screen
        name="agenda"
        options={{
          href: null, // Esconde da tab bar
        }}
      />
    </Tabs>
  );
}
