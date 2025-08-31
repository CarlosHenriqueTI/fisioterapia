import React from 'react';
import { Text, View, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';

export default function CustomerDashboard() {
  const customerName = "João Silva"; // Viria do contexto/state

  const dashboardItems = [
    {
      title: "Meus Agendamentos",
      description: "Visualizar e gerenciar consultas",
      color: "bg-blue-500",
      icon: "📅"
    },
    {
      title: "Histórico Médico",
      description: "Consultar histórico de tratamentos",
      color: "bg-green-500",
      icon: "📋"
    },
    {
      title: "Perfil",
      description: "Atualizar dados pessoais",
      color: "bg-purple-500",
      icon: "👤"
    },
    {
      title: "Exercícios",
      description: "Programa de exercícios prescritos",
      color: "bg-orange-500",
      icon: "💪"
    }
  ];

  const handleLogout = () => {
    router.push('/selection');
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <ScrollView className="flex-1">
        {/* Header */}
        <View className="bg-white px-6 py-6 border-b border-gray-200">
          <View className="flex-row justify-between items-center">
            <View>
              <Text className="text-2xl font-bold text-gray-800">
                Olá, {customerName}!
              </Text>
              <Text className="text-gray-600 mt-1">
                Bem-vindo ao seu painel
              </Text>
            </View>
            <TouchableOpacity
              onPress={handleLogout}
              className="bg-red-100 px-3 py-2 rounded-lg"
            >
              <Text className="text-red-600 font-semibold">Sair</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Quick Stats */}
        <View className="px-6 py-4">
          <View className="bg-white p-4 rounded-xl shadow-sm">
            <Text className="text-lg font-semibold text-gray-800 mb-2">
              Próxima Consulta
            </Text>
            <Text className="text-gray-600">
              Terça-feira, 2 de Janeiro às 14:30
            </Text>
            <Text className="text-blue-600 font-medium mt-1">
              Dra. Maria Santos - Fisioterapia
            </Text>
          </View>
        </View>

        {/* Dashboard Grid */}
        <View className="px-6 pb-6">
          <Text className="text-lg font-semibold text-gray-800 mb-4">
            Acesso Rápido
          </Text>
          
          <View className="flex-row flex-wrap justify-between">
            {dashboardItems.map((item, index) => (
              <TouchableOpacity
                key={index}
                className={`${item.color} w-[48%] p-4 rounded-xl mb-4`}
              >
                <Text className="text-3xl mb-2">{item.icon}</Text>
                <Text className="text-white font-semibold text-lg mb-1">
                  {item.title}
                </Text>
                <Text className="text-white text-sm opacity-90">
                  {item.description}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Recent Activity */}
        <View className="px-6 pb-6">
          <Text className="text-lg font-semibold text-gray-800 mb-4">
            Atividade Recente
          </Text>
          
          <View className="bg-white rounded-xl shadow-sm">
            <View className="p-4 border-b border-gray-100">
              <Text className="font-medium text-gray-800">
                Consulta realizada
              </Text>
              <Text className="text-gray-600 text-sm mt-1">
                28 de Dezembro - Avaliação inicial
              </Text>
            </View>
            <View className="p-4 border-b border-gray-100">
              <Text className="font-medium text-gray-800">
                Exercícios atualizados
              </Text>
              <Text className="text-gray-600 text-sm mt-1">
                26 de Dezembro - Novos exercícios adicionados
              </Text>
            </View>
            <View className="p-4">
              <Text className="font-medium text-gray-800">
                Agendamento confirmado
              </Text>
              <Text className="text-gray-600 text-sm mt-1">
                25 de Dezembro - Consulta para 2 de Janeiro
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
