import React from 'react';
import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function AgendaTab() {
  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <View className="flex-1 justify-center items-center">
        <Text className="text-2xl font-bold text-gray-800 mb-4">
          📅 Agenda Geral
        </Text>
        <Text className="text-gray-600 text-center px-6">
          Esta é a agenda geral do sistema.{'\n'}
          Funcionalidades serão implementadas aqui.
        </Text>
      </View>
    </SafeAreaView>
  );
}
