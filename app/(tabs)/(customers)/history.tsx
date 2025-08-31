import React from 'react';
import { Text, View, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function CustomerHistory() {
  const medicalHistory = [
    {
      id: '1',
      date: '2024-12-28',
      type: 'Consulta',
      therapist: 'Dra. Maria Santos',
      description: 'Avaliação inicial - Dor lombar',
      observations: 'Paciente apresenta limitação de movimento. Recomendado início de fisioterapia.'
    },
    {
      id: '2',
      date: '2024-12-20',
      type: 'Exame',
      therapist: 'Dr. Carlos Silva',
      description: 'Raio-X da coluna lombar',
      observations: 'Estrutura óssea normal. Sem sinais de fraturas ou alterações significativas.'
    },
    {
      id: '3',
      date: '2024-12-15',
      type: 'Consulta',
      therapist: 'Dra. Ana Costa',
      description: 'Primeira consulta',
      observations: 'Histórico de dor lombar há 3 meses. Encaminhado para fisioterapia.'
    },
  ];

  const exercises = [
    {
      id: '1',
      name: 'Alongamento de isquiotibiais',
      frequency: '3x ao dia',
      duration: '30 segundos',
      status: 'Ativo'
    },
    {
      id: '2',
      name: 'Fortalecimento do core',
      frequency: '2x ao dia',
      duration: '10 repetições',
      status: 'Ativo'
    },
    {
      id: '3',
      name: 'Caminhada leve',
      frequency: 'Diário',
      duration: '20 minutos',
      status: 'Concluído'
    },
  ];

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'Consulta': return 'bg-blue-100 text-blue-800';
      case 'Exame': return 'bg-purple-100 text-purple-800';
      case 'Procedimento': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <ScrollView className="flex-1">
        <View className="bg-white px-6 py-4 border-b border-gray-200">
          <Text className="text-2xl font-bold text-gray-800">
            Histórico Médico
          </Text>
          <Text className="text-gray-600 mt-1">
            Consultas, exames e tratamentos
          </Text>
        </View>

        {/* Exercícios Prescritos */}
        <View className="px-6 py-4">
          <Text className="text-lg font-semibold text-gray-800 mb-4">
            Exercícios Prescritos
          </Text>
          
          {exercises.map((exercise) => (
            <View key={exercise.id} className="bg-white p-4 rounded-lg shadow-sm mb-3 border border-gray-200">
              <View className="flex-row justify-between items-start">
                <View className="flex-1">
                  <Text className="text-lg font-semibold text-gray-800">{exercise.name}</Text>
                  <Text className="text-gray-600 mt-1">Frequência: {exercise.frequency}</Text>
                  <Text className="text-gray-600">Duração: {exercise.duration}</Text>
                </View>
                <View className={`px-2 py-1 rounded ${exercise.status === 'Ativo' ? 'bg-green-100' : 'bg-gray-100'}`}>
                  <Text className={`text-xs font-medium ${exercise.status === 'Ativo' ? 'text-green-800' : 'text-gray-800'}`}>
                    {exercise.status}
                  </Text>
                </View>
              </View>
            </View>
          ))}
        </View>

        {/* Histórico de Consultas */}
        <View className="px-6 pb-6">
          <Text className="text-lg font-semibold text-gray-800 mb-4">
            Histórico de Consultas
          </Text>
          
          {medicalHistory.map((record) => (
            <View key={record.id} className="bg-white p-4 rounded-lg shadow-sm mb-3 border border-gray-200">
              <View className="flex-row justify-between items-start mb-2">
                <View className="flex-1">
                  <Text className="text-lg font-semibold text-gray-800">{record.description}</Text>
                  <Text className="text-gray-600 mt-1">{record.therapist}</Text>
                  <Text className="text-gray-500 text-sm">
                    {new Date(record.date).toLocaleDateString('pt-BR')}
                  </Text>
                </View>
                <View className={`px-2 py-1 rounded ${getTypeColor(record.type)}`}>
                  <Text className="text-xs font-medium">{record.type}</Text>
                </View>
              </View>
              
              <View className="border-t border-gray-100 pt-2 mt-2">
                <Text className="text-gray-700">{record.observations}</Text>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
