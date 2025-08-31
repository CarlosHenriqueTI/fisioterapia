import React from 'react';
import { Text, View, FlatList, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const mockClients = [
  { id: '1', name: 'João Silva', email: 'joao@email.com', phone: '(11) 99999-9999', status: 'Ativo' },
  { id: '2', name: 'Maria Santos', email: 'maria@email.com', phone: '(11) 88888-8888', status: 'Ativo' },
  { id: '3', name: 'Pedro Costa', email: 'pedro@email.com', phone: '(11) 77777-7777', status: 'Inativo' },
  { id: '4', name: 'Ana Lima', email: 'ana@email.com', phone: '(11) 66666-6666', status: 'Ativo' },
];

export default function AdminClients() {
  const renderClient = ({ item }: { item: any }) => (
    <View className="bg-white p-4 mb-3 mx-4 rounded-lg shadow-sm border border-gray-200">
      <View className="flex-row justify-between items-start">
        <View className="flex-1">
          <Text className="text-lg font-semibold text-gray-800">{item.name}</Text>
          <Text className="text-gray-600 mt-1">{item.email}</Text>
          <Text className="text-gray-600">{item.phone}</Text>
        </View>
        <View className={`px-2 py-1 rounded ${item.status === 'Ativo' ? 'bg-green-100' : 'bg-red-100'}`}>
          <Text className={`text-xs font-medium ${item.status === 'Ativo' ? 'text-green-800' : 'text-red-800'}`}>
            {item.status}
          </Text>
        </View>
      </View>
      
      <View className="flex-row mt-3 space-x-2">
        <TouchableOpacity className="bg-blue-500 px-3 py-2 rounded flex-1">
          <Text className="text-white text-center text-sm font-medium">Editar</Text>
        </TouchableOpacity>
        <TouchableOpacity className="bg-gray-500 px-3 py-2 rounded flex-1">
          <Text className="text-white text-center text-sm font-medium">Histórico</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <View className="flex-1">
        <View className="bg-white px-6 py-4 border-b border-gray-200">
          <Text className="text-2xl font-bold text-gray-800">
            Gerenciar Clientes
          </Text>
          <Text className="text-gray-600 mt-1">
            {mockClients.length} clientes cadastrados
          </Text>
        </View>
        
        <FlatList
          data={mockClients}
          renderItem={renderClient}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ paddingVertical: 16 }}
          showsVerticalScrollIndicator={false}
        />
        
        <TouchableOpacity className="bg-green-500 mx-4 mb-6 py-3 rounded-lg">
          <Text className="text-white text-center font-semibold text-lg">
            + Adicionar Cliente
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
