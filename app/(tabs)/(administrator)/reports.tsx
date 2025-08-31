import React from 'react';
import { Text, View, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function AdminReports() {
  const stats = [
    { title: 'Clientes Ativos', value: '127', change: '+8%', color: 'text-green-600' },
    { title: 'Consultas Mês', value: '342', change: '+12%', color: 'text-green-600' },
    { title: 'Receita Mensal', value: 'R$ 25.680', change: '+5%', color: 'text-green-600' },
    { title: 'Taxa Ocupação', value: '85%', change: '-2%', color: 'text-red-600' },
  ];

  const reports = [
    { title: 'Relatório Financeiro', description: 'Receitas e despesas do mês', icon: '💰' },
    { title: 'Relatório de Pacientes', description: 'Estatísticas de atendimento', icon: '👥' },
    { title: 'Relatório de Funcionários', description: 'Performance da equipe', icon: '👨‍⚕️' },
    { title: 'Relatório de Equipamentos', description: 'Uso e manutenção', icon: '🏥' },
  ];

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <ScrollView className="flex-1">
        <View className="bg-white px-6 py-4 border-b border-gray-200">
          <Text className="text-2xl font-bold text-gray-800">
            Relatórios
          </Text>
          <Text className="text-gray-600 mt-1">
            Análises e estatísticas da clínica
          </Text>
        </View>

        {/* Estatísticas Principais */}
        <View className="px-6 py-4">
          <Text className="text-lg font-semibold text-gray-800 mb-4">
            Estatísticas Gerais
          </Text>
          
          <View className="flex-row flex-wrap justify-between">
            {stats.map((stat, index) => (
              <View key={index} className="bg-white p-4 rounded-xl shadow-sm w-[48%] mb-4">
                <Text className="text-2xl font-bold text-gray-800">{stat.value}</Text>
                <Text className="text-gray-600 text-sm mt-1">{stat.title}</Text>
                <Text className={`text-sm font-medium mt-1 ${stat.color}`}>{stat.change}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Relatórios Disponíveis */}
        <View className="px-6 pb-6">
          <Text className="text-lg font-semibold text-gray-800 mb-4">
            Relatórios Disponíveis
          </Text>
          
          {reports.map((report, index) => (
            <TouchableOpacity key={index} className="bg-white p-4 rounded-lg shadow-sm mb-3 border border-gray-200">
              <View className="flex-row items-center">
                <Text className="text-3xl mr-4">{report.icon}</Text>
                <View className="flex-1">
                  <Text className="text-lg font-semibold text-gray-800">{report.title}</Text>
                  <Text className="text-gray-600 mt-1">{report.description}</Text>
                </View>
                <View className="bg-blue-500 px-3 py-2 rounded">
                  <Text className="text-white text-sm font-medium">Gerar</Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Gráficos Resumo */}
        <View className="px-6 pb-6">
          <Text className="text-lg font-semibold text-gray-800 mb-4">
            Resumo Visual
          </Text>
          
          <View className="bg-white p-6 rounded-xl shadow-sm">
            <Text className="text-center text-gray-600 text-lg">
              📊
            </Text>
            <Text className="text-center text-gray-600 mt-2">
              Gráficos e visualizações serão implementados aqui
            </Text>
            <Text className="text-center text-gray-500 text-sm mt-2">
              Dashboard de métricas em tempo real
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
