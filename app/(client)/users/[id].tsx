import React from 'react';
import { Text, View, FlatList, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const mockUsers = [
  { id: '1', name: 'João Silva', email: 'joao@email.com', phone: '(11) 99999-9999' },
  { id: '2', name: 'Maria Santos', email: 'maria@email.com', phone: '(11) 88888-8888' },
  { id: '3', name: 'Pedro Costa', email: 'pedro@email.com', phone: '(11) 77777-7777' },
];

export default function UsersList() {
  const renderUser = ({ item }: { item: any }) => (
    <View className="bg-white p-4 mb-3 mx-4 rounded-lg shadow-sm border border-gray-200">
      <Text className="text-lg font-semibold text-gray-800">{item.name}</Text>
      <Text className="text-gray-600 mt-1">{item.email}</Text>
      <Text className="text-gray-600">{item.phone}</Text>
    </View>
  );

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <View className="flex-1">
        <View className="bg-white px-6 py-4 border-b border-gray-200">
          <Text className="text-2xl font-bold text-gray-800">
            Lista de Usuários
          </Text>
        </View>
        
        <FlatList
          data={mockUsers}
          renderItem={renderUser}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ paddingVertical: 16 }}
          showsVerticalScrollIndicator={false}
        />
        
        <TouchableOpacity className="bg-blue-500 mx-4 mb-6 py-3 rounded-lg">
          <Text className="text-white text-center font-semibold text-lg">
            Adicionar Usuário
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
