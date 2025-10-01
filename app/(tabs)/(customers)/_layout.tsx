import { ClientAuthProvider } from '@/contexts/ClientAuthContext';
import { theme } from '@/theme';
import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';

export default function CustomerTabsLayout() {
  return (
    <ClientAuthProvider>
      <Tabs
        screenOptions={{
          tabBarStyle: {
            backgroundColor: theme.colors.white,
            height: 70,
            paddingBottom: 12,
            paddingTop: 12,
            borderTopWidth: 0,
            borderTopColor: 'transparent',
            borderWidth: 0,
            elevation: 0,
            shadowOpacity: 0,
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
          },
          tabBarLabelStyle: {
            fontSize: theme.typography.fontSize.xs,
            fontWeight: '600' as any,
            marginTop: 2,
            marginBottom: 4,
          },
          tabBarIconStyle: {
            marginTop: -8,
            marginBottom: 0,
          },
          tabBarActiveTintColor: theme.colors.secondary[500],
          tabBarInactiveTintColor: theme.colors.gray[400],
          headerShown: false,
        }}
      >
        <Tabs.Screen
          name="dashboard"
          options={{
            title: 'Início',
            tabBarIcon: ({ color, size }: { color: string; size: number }) => (
              <Ionicons name="home" size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="appointments"
          options={{
            title: 'Consultas',
            tabBarIcon: ({ color, size }: { color: string; size: number }) => (
              <Ionicons name="calendar" size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="history"
          options={{
            title: 'Histórico',
            tabBarIcon: ({ color, size }: { color: string; size: number }) => (
              <Ionicons name="library" size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            title: 'Perfil',
            tabBarIcon: ({ color, size }: { color: string; size: number }) => (
              <Ionicons name="person" size={size} color={color} />
            ),
          }}
        />
      </Tabs>
    </ClientAuthProvider>
  );
}
