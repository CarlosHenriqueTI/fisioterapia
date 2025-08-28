import { ScrollView, Text, View, TouchableOpacity } from 'react-native';

export default function TabTwoScreen() {
  return (
    <ScrollView className="flex-1 bg-gray-100">
      <View className="p-6">
        <Text className="text-2xl font-bold text-gray-900 mb-6 text-center">
          🩺 Painel de Fisioterapia
        </Text>
        
        {/* Cards de funcionalidades */}
        <View className="space-y-4 mb-6">
          <TouchableOpacity className="bg-white p-4 rounded-lg shadow-md border-l-4 border-blue-500">
            <Text className="text-lg font-semibold text-blue-700 mb-2">
              📋 Pacientes
            </Text>
            <Text className="text-gray-600">
              Gerencie informações dos pacientes
            </Text>
          </TouchableOpacity>

          <TouchableOpacity className="bg-white p-4 rounded-lg shadow-md border-l-4 border-green-500">
            <Text className="text-lg font-semibold text-green-700 mb-2">
              📅 Agendamentos
            </Text>
            <Text className="text-gray-600">
              Controle de consultas e sessões
            </Text>
          </TouchableOpacity>

          <TouchableOpacity className="bg-white p-4 rounded-lg shadow-md border-l-4 border-purple-500">
            <Text className="text-lg font-semibold text-purple-700 mb-2">
              📊 Relatórios
            </Text>
            <Text className="text-gray-600">
              Acompanhamento e evolução
            </Text>
          </TouchableOpacity>
        </View>

        {/* Status */}
        <View className="bg-gradient-to-r from-indigo-500 to-purple-600 p-6 rounded-xl">
          <Text className="text-white text-xl font-bold text-center mb-2">
            ✨ Status do Sistema
          </Text>
          <View className="flex-row justify-center space-x-4">
            <View className="bg-white/20 px-4 py-2 rounded-full">
              <Text className="text-white font-medium">Online</Text>
            </View>
            <View className="bg-white/20 px-4 py-2 rounded-full">
              <Text className="text-white font-medium">Sincronizado</Text>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
