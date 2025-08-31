import React from 'react';
import { Stack } from 'expo-router';

export default function CustomersLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="(auth)" />
      <Stack.Screen name="users" />
    </Stack>
  );
}
