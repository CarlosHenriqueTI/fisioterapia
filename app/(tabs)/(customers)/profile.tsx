import React, { useState } from 'react';
import { Text, View, ScrollView, TouchableOpacity, TextInput, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';

export default function CustomerProfile() {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: 'João Silva',
    email: 'joao@email.com',
    phone: '(11) 99999-9999',
    cpf: '123.456.789-00',
    dateOfBirth: '15/03/1985',
    address: 'Rua das Flores, 123 - São Paulo/SP',
    emergencyContact: 'Maria Silva - (11) 88888-8888',
    healthPlan: 'Unimed',
    allergies: 'Nenhuma alergia conhecida',
  });

  const handleSave = () => {
    Alert.alert('Sucesso', 'Perfil atualizado com sucesso!');
    setIsEditing(false);
  };

  const handleLogout = () => {
    Alert.alert(
      'Sair',
      'Tem certeza que deseja sair?',
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Sair', onPress: () => router.push('/selection') }
      ]
    );
  };

  const updateField = (field: string, value: string) => {
    setProfileData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <ScrollView className="flex-1">
        <View className="bg-white px-6 py-4 border-b border-gray-200">
          <View className="flex-row justify-between items-center">
            <View>
              <Text className="text-2xl font-bold text-gray-800">
                Meu Perfil
              </Text>
              <Text className="text-gray-600 mt-1">
                Gerencie suas informações pessoais
              </Text>
            </View>
            <TouchableOpacity
              onPress={() => setIsEditing(!isEditing)}
              className={`px-4 py-2 rounded-lg ${isEditing ? 'bg-gray-100' : 'bg-blue-100'}`}
            >
              <Text className={`font-medium ${isEditing ? 'text-gray-700' : 'text-blue-700'}`}>
                {isEditing ? 'Cancelar' : 'Editar'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <View className="px-6 py-6">
          {/* Dados Pessoais */}
          <View className="bg-white p-6 rounded-xl shadow-sm mb-4">
            <Text className="text-lg font-semibold text-gray-800 mb-4">
              Dados Pessoais
            </Text>

            <View className="space-y-4">
              <View>
                <Text className="text-gray-600 text-sm mb-1">Nome Completo</Text>
                {isEditing ? (
                  <TextInput
                    className="border border-gray-300 rounded-lg px-3 py-2"
                    value={profileData.name}
                    onChangeText={(value) => updateField('name', value)}
                  />
                ) : (
                  <Text className="text-gray-800 font-medium">{profileData.name}</Text>
                )}
              </View>

              <View>
                <Text className="text-gray-600 text-sm mb-1">Email</Text>
                {isEditing ? (
                  <TextInput
                    className="border border-gray-300 rounded-lg px-3 py-2"
                    value={profileData.email}
                    onChangeText={(value) => updateField('email', value)}
                    keyboardType="email-address"
                  />
                ) : (
                  <Text className="text-gray-800 font-medium">{profileData.email}</Text>
                )}
              </View>

              <View>
                <Text className="text-gray-600 text-sm mb-1">Telefone</Text>
                {isEditing ? (
                  <TextInput
                    className="border border-gray-300 rounded-lg px-3 py-2"
                    value={profileData.phone}
                    onChangeText={(value) => updateField('phone', value)}
                    keyboardType="phone-pad"
                  />
                ) : (
                  <Text className="text-gray-800 font-medium">{profileData.phone}</Text>
                )}
              </View>

              <View>
                <Text className="text-gray-600 text-sm mb-1">CPF</Text>
                <Text className="text-gray-800 font-medium">{profileData.cpf}</Text>
              </View>

              <View>
                <Text className="text-gray-600 text-sm mb-1">Data de Nascimento</Text>
                <Text className="text-gray-800 font-medium">{profileData.dateOfBirth}</Text>
              </View>

              <View>
                <Text className="text-gray-600 text-sm mb-1">Endereço</Text>
                {isEditing ? (
                  <TextInput
                    className="border border-gray-300 rounded-lg px-3 py-2"
                    value={profileData.address}
                    onChangeText={(value) => updateField('address', value)}
                    multiline
                  />
                ) : (
                  <Text className="text-gray-800 font-medium">{profileData.address}</Text>
                )}
              </View>
            </View>
          </View>

          {/* Informações Médicas */}
          <View className="bg-white p-6 rounded-xl shadow-sm mb-4">
            <Text className="text-lg font-semibold text-gray-800 mb-4">
              Informações Médicas
            </Text>

            <View className="space-y-4">
              <View>
                <Text className="text-gray-600 text-sm mb-1">Plano de Saúde</Text>
                {isEditing ? (
                  <TextInput
                    className="border border-gray-300 rounded-lg px-3 py-2"
                    value={profileData.healthPlan}
                    onChangeText={(value) => updateField('healthPlan', value)}
                  />
                ) : (
                  <Text className="text-gray-800 font-medium">{profileData.healthPlan}</Text>
                )}
              </View>

              <View>
                <Text className="text-gray-600 text-sm mb-1">Alergias</Text>
                {isEditing ? (
                  <TextInput
                    className="border border-gray-300 rounded-lg px-3 py-2"
                    value={profileData.allergies}
                    onChangeText={(value) => updateField('allergies', value)}
                    multiline
                  />
                ) : (
                  <Text className="text-gray-800 font-medium">{profileData.allergies}</Text>
                )}
              </View>

              <View>
                <Text className="text-gray-600 text-sm mb-1">Contato de Emergência</Text>
                {isEditing ? (
                  <TextInput
                    className="border border-gray-300 rounded-lg px-3 py-2"
                    value={profileData.emergencyContact}
                    onChangeText={(value) => updateField('emergencyContact', value)}
                  />
                ) : (
                  <Text className="text-gray-800 font-medium">{profileData.emergencyContact}</Text>
                )}
              </View>
            </View>
          </View>

          {/* Botões de Ação */}
          {isEditing ? (
            <TouchableOpacity
              onPress={handleSave}
              className="bg-green-500 py-3 rounded-lg mb-4"
            >
              <Text className="text-white text-center font-semibold text-lg">
                Salvar Alterações
              </Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              onPress={() => Alert.alert('Em Breve', 'Funcionalidade de alterar senha em desenvolvimento')}
              className="bg-blue-500 py-3 rounded-lg mb-4"
            >
              <Text className="text-white text-center font-semibold text-lg">
                Alterar Senha
              </Text>
            </TouchableOpacity>
          )}

          <TouchableOpacity
            onPress={handleLogout}
            className="bg-red-500 py-3 rounded-lg"
          >
            <Text className="text-white text-center font-semibold text-lg">
              Sair da Conta
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
