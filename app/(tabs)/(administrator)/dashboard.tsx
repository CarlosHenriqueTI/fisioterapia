import React from 'react';
import { Text, View, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';

export default function AdminDashboard() {
  const adminName = "Dr. Carlos Silva"; // Viria do contexto/state

  const adminMenuItems = [
    {
      title: "Cadastrar Cliente",
      description: "Adicionar novo paciente ao sistema",
      color: "bg-green-500",
      icon: "👤",
      action: () => router.push('/(tabs)/(administrator)/register-client')
    },
    {
      title: "Gerenciar Clientes",
      description: "Visualizar e editar clientes",
      color: "bg-blue-500",
      icon: "👥",
      action: () => router.push('/users')
    },
    {
      title: "Agendamentos",
      description: "Gerenciar consultas e horários",
      color: "bg-purple-500",
      icon: "📅",
      action: () => console.log('Agendamentos')
    },
    {
      title: "Relatórios",
      description: "Relatórios e estatísticas",
      color: "bg-orange-500",
      icon: "📊",
      action: () => console.log('Relatórios')
    },
    {
      title: "Configurações",
      description: "Configurações do sistema",
      color: "bg-gray-600",
      icon: "⚙️",
      action: () => console.log('Configurações')
    },
    {
      title: "Funcionários",
      description: "Gerenciar equipe da clínica",
      color: "bg-indigo-500",
      icon: "👨‍⚕️",
      action: () => console.log('Funcionários')
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
                Dashboard Administrativo
              </Text>
              <Text className="text-gray-600 mt-1">
                Bem-vindo, {adminName}
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

        {/* Stats Cards */}
        <View className="px-6 py-4">
          <View className="flex-row justify-between">
            <View className="bg-white p-4 rounded-xl shadow-sm flex-1 mr-2">
              <Text className="text-2xl font-bold text-blue-600">127</Text>
              <Text className="text-gray-600 text-sm">Clientes Ativos</Text>
            </View>
            <View className="bg-white p-4 rounded-xl shadow-sm flex-1 ml-2">
              <Text className="text-2xl font-bold text-green-600">23</Text>
              <Text className="text-gray-600 text-sm">Consultas Hoje</Text>
            </View>
          </View>
        </View>

        {/* Menu Grid */}
        <View className="px-6 pb-6">
          <Text className="text-lg font-semibold text-gray-800 mb-4">
            Painel de Controle
          </Text>
          
          <View className="flex-row flex-wrap justify-between">
            {adminMenuItems.map((item, index) => (
              <TouchableOpacity
                key={index}
                onPress={item.action}
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
            Atividades Recentes
          </Text>
          
          <View className="bg-white rounded-xl shadow-sm">
            <View className="p-4 border-b border-gray-100">
              <Text className="font-medium text-gray-800">
                Novo cliente cadastrado
              </Text>
              <Text className="text-gray-600 text-sm mt-1">
                Maria Santos - há 2 horas
              </Text>
            </View>
            <View className="p-4 border-b border-gray-100">
              <Text className="font-medium text-gray-800">
                Consulta finalizada
              </Text>
              <Text className="text-gray-600 text-sm mt-1">
                João Silva - Fisioterapia - há 3 horas
              </Text>
            </View>
            <View className="p-4">
              <Text className="font-medium text-gray-800">
                Agendamento criado
              </Text>
              <Text className="text-gray-600 text-sm mt-1">
                Pedro Costa - 2 de Janeiro às 14:30
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
