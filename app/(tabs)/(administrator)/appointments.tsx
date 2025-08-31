import React, { useState } from 'react';
import { Text, View, FlatList, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const mockAppointments = [
  { 
    id: '1', 
    client: 'João Silva', 
    date: '2025-01-02', 
    time: '14:30', 
    service: 'Fisioterapia',
    therapist: 'Dra. Maria Santos',
    status: 'Confirmado'
  },
  { 
    id: '2', 
    client: 'Maria Santos', 
    date: '2025-01-02', 
    time: '15:30', 
    service: 'Avaliação',
    therapist: 'Dr. Carlos Silva',
    status: 'Pendente'
  },
  { 
    id: '3', 
    client: 'Pedro Costa', 
    date: '2025-01-03', 
    time: '09:00', 
    service: 'Fisioterapia',
    therapist: 'Dra. Maria Santos',
    status: 'Confirmado'
  },
];

export default function AdminAppointments() {
  const [selectedDate, setSelectedDate] = useState('2025-01-02');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Confirmado': return 'bg-green-100 text-green-800';
      case 'Pendente': return 'bg-yellow-100 text-yellow-800';
      case 'Cancelado': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const renderAppointment = ({ item }: { item: any }) => (
    <View className="bg-white p-4 mb-3 mx-4 rounded-lg shadow-sm border border-gray-200">
      <View className="flex-row justify-between items-start mb-2">
        <Text className="text-lg font-semibold text-gray-800">{item.time}</Text>
        <View className={`px-2 py-1 rounded ${getStatusColor(item.status)}`}>
          <Text className="text-xs font-medium">{item.status}</Text>
        </View>
      </View>
      
      <Text className="text-gray-800 font-medium">{item.client}</Text>
      <Text className="text-gray-600 mt-1">{item.service}</Text>
      <Text className="text-gray-600">{item.therapist}</Text>
      
      <View className="flex-row mt-3 space-x-2">
        <TouchableOpacity className="bg-blue-500 px-3 py-2 rounded flex-1">
          <Text className="text-white text-center text-sm font-medium">Editar</Text>
        </TouchableOpacity>
        <TouchableOpacity className="bg-green-500 px-3 py-2 rounded flex-1">
          <Text className="text-white text-center text-sm font-medium">Confirmar</Text>
        </TouchableOpacity>
        <TouchableOpacity className="bg-red-500 px-3 py-2 rounded flex-1">
          <Text className="text-white text-center text-sm font-medium">Cancelar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <View className="flex-1">
        <View className="bg-white px-6 py-4 border-b border-gray-200">
          <Text className="text-2xl font-bold text-gray-800">
            Agendamentos
          </Text>
          <Text className="text-gray-600 mt-1">
            Gerenciar consultas e horários
          </Text>
        </View>

        {/* Filtro de Data */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} className="bg-white border-b border-gray-200">
          <View className="flex-row px-4 py-3">
            {['2025-01-02', '2025-01-03', '2025-01-04', '2025-01-05'].map((date) => (
              <TouchableOpacity
                key={date}
                onPress={() => setSelectedDate(date)}
                className={`px-4 py-2 rounded-lg mr-3 ${selectedDate === date ? 'bg-blue-500' : 'bg-gray-100'}`}
              >
                <Text className={`font-medium ${selectedDate === date ? 'text-white' : 'text-gray-700'}`}>
                  {new Date(date).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' })}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
        
        <FlatList
          data={mockAppointments.filter(apt => apt.date === selectedDate)}
          renderItem={renderAppointment}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ paddingVertical: 16 }}
          showsVerticalScrollIndicator={false}
        />
        
        <TouchableOpacity className="bg-blue-500 mx-4 mb-6 py-3 rounded-lg">
          <Text className="text-white text-center font-semibold text-lg">
            + Novo Agendamento
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
