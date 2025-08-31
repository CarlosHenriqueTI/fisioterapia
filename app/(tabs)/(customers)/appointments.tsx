import React from 'react';
import { Text, View, FlatList, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const mockAppointments = [
  { 
    id: '1', 
    date: '2025-01-02', 
    time: '14:30', 
    service: 'Fisioterapia',
    therapist: 'Dra. Maria Santos',
    status: 'Confirmado',
    location: 'Sala 2'
  },
  { 
    id: '2', 
    date: '2025-01-09', 
    time: '15:30', 
    service: 'Avaliação',
    therapist: 'Dr. Carlos Silva',
    status: 'Agendado',
    location: 'Sala 1'
  },
  { 
    id: '3', 
    date: '2025-01-16', 
    time: '14:30', 
    service: 'Fisioterapia',
    therapist: 'Dra. Maria Santos',
    status: 'Agendado',
    location: 'Sala 2'
  },
];

export default function CustomerAppointments() {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Confirmado': return 'bg-green-100 text-green-800';
      case 'Agendado': return 'bg-blue-100 text-blue-800';
      case 'Finalizado': return 'bg-gray-100 text-gray-800';
      case 'Cancelado': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const renderAppointment = ({ item }: { item: any }) => (
    <View className="bg-white p-4 mb-3 mx-4 rounded-lg shadow-sm border border-gray-200">
      <View className="flex-row justify-between items-start mb-3">
        <View>
          <Text className="text-lg font-semibold text-gray-800">
            {new Date(item.date).toLocaleDateString('pt-BR', { 
              weekday: 'long', 
              day: '2-digit', 
              month: 'long' 
            })}
          </Text>
          <Text className="text-xl font-bold text-blue-600 mt-1">{item.time}</Text>
        </View>
        <View className={`px-3 py-1 rounded ${getStatusColor(item.status)}`}>
          <Text className="text-sm font-medium">{item.status}</Text>
        </View>
      </View>
      
      <View className="border-t border-gray-100 pt-3">
        <Text className="text-gray-800 font-medium">{item.service}</Text>
        <Text className="text-gray-600 mt-1">{item.therapist}</Text>
        <Text className="text-gray-600">{item.location}</Text>
      </View>
      
      {item.status === 'Agendado' && (
        <View className="flex-row mt-3 space-x-2">
          <TouchableOpacity className="bg-red-100 px-4 py-2 rounded flex-1">
            <Text className="text-red-700 text-center text-sm font-medium">Cancelar</Text>
          </TouchableOpacity>
          <TouchableOpacity className="bg-blue-100 px-4 py-2 rounded flex-1">
            <Text className="text-blue-700 text-center text-sm font-medium">Reagendar</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <View className="flex-1">
        <View className="bg-white px-6 py-4 border-b border-gray-200">
          <Text className="text-2xl font-bold text-gray-800">
            Meus Agendamentos
          </Text>
          <Text className="text-gray-600 mt-1">
            {mockAppointments.length} consultas marcadas
          </Text>
        </View>
        
        <FlatList
          data={mockAppointments}
          renderItem={renderAppointment}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ paddingVertical: 16 }}
          showsVerticalScrollIndicator={false}
        />
        
        <TouchableOpacity className="bg-blue-500 mx-4 mb-6 py-3 rounded-lg">
          <Text className="text-white text-center font-semibold text-lg">
            + Agendar Consulta
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
