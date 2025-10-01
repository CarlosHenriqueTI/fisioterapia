import { ClientAuthProvider } from '@/contexts/ClientAuthContext';
import { Stack } from 'expo-router';

export default function ClientLayout() {
  return (
    <ClientAuthProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="login" />
      </Stack>
    </ClientAuthProvider>
  );
}
      