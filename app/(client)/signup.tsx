import React, { useState } from 'react';
import { Text, View, TextInput, TouchableOpacity, Alert, ActivityIndicator, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import BackButton from '@/components/BackButton';
import { useAuth } from '@/contexts/AuthContext';

export default function ClientSignup() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    nome: '',
    telefone: '',
    cpf: '',
    dataNascimento: '',
    endereco: ''
  });
  const [loading, setLoading] = useState(false);
  const { signUp } = useAuth();

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const validateForm = () => {
    if (!formData.email || !formData.password || !formData.nome) {
      Alert.alert('Erro', 'Por favor, preencha os campos obrigatórios (email, senha e nome)');
      return false;
    }

    if (formData.password !== formData.confirmPassword) {
      Alert.alert('Erro', 'As senhas não coincidem');
      return false;
    }

    if (formData.password.length < 6) {
      Alert.alert('Erro', 'A senha deve ter pelo menos 6 caracteres');
      return false;
    }

    // Validação básica de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      Alert.alert('Erro', 'Por favor, insira um email válido');
      return false;
    }

    return true;
  };

  const handleSignup = async () => {
    if (!validateForm()) return;

    setLoading(true);
    try {
      const { error } = await signUp(
        formData.email.trim(),
        formData.password,
        {
          tipo_usuario: 'cliente' as const,
          nome: formData.nome.trim(),
          telefone: formData.telefone.trim() || undefined,
          cpf: formData.cpf.trim() || undefined,
          data_nascimento: formData.dataNascimento ? new Date(formData.dataNascimento).toISOString().split('T')[0] : undefined,
          endereco: formData.endereco.trim() || undefined
        }
      );
      
      if (error) {
        Alert.alert('Erro no Cadastro', error.message || 'Falha ao criar conta');
        return;
      }

      Alert.alert(
        'Cadastro Realizado!', 
        'Sua conta foi criada com sucesso. Faça login para continuar.',
        [
          {
            text: 'OK',
            onPress: () => router.push('/(client)/login')
          }
        ]
      );
    } catch (error) {
      Alert.alert('Erro', 'Ocorreu um erro inesperado');
      console.error('Erro no cadastro:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <View className="px-6 pt-4">
        <BackButton 
          onPress={() => router.push('/selection')} 
          style="dark" 
        />
      </View>
      
      <ScrollView className="flex-1 px-6" showsVerticalScrollIndicator={false}>
        <View className="py-6">
          <View className="bg-white p-6 rounded-xl shadow-lg">
            <Text className="text-2xl font-bold text-center text-gray-800 mb-6">
              Cadastro de Cliente
            </Text>
            
            {/* Campos obrigatórios */}
            <Text className="text-sm font-medium text-gray-700 mb-2">
              Nome Completo *
            </Text>
            <TextInput
              className="border border-gray-300 rounded-lg px-4 py-3 mb-4"
              placeholder="Seu nome completo"
              value={formData.nome}
              onChangeText={(value) => handleInputChange('nome', value)}
              autoCapitalize="words"
              editable={!loading}
            />

            <Text className="text-sm font-medium text-gray-700 mb-2">
              Email *
            </Text>
            <TextInput
              className="border border-gray-300 rounded-lg px-4 py-3 mb-4"
              placeholder="seu@email.com"
              keyboardType="email-address"
              value={formData.email}
              onChangeText={(value) => handleInputChange('email', value)}
              autoCapitalize="none"
              autoCorrect={false}
              editable={!loading}
            />

            <Text className="text-sm font-medium text-gray-700 mb-2">
              Senha *
            </Text>
            <TextInput
              className="border border-gray-300 rounded-lg px-4 py-3 mb-4"
              placeholder="Mínimo 6 caracteres"
              secureTextEntry
              value={formData.password}
              onChangeText={(value) => handleInputChange('password', value)}
              editable={!loading}
            />

            <Text className="text-sm font-medium text-gray-700 mb-2">
              Confirmar Senha *
            </Text>
            <TextInput
              className="border border-gray-300 rounded-lg px-4 py-3 mb-4"
              placeholder="Digite a senha novamente"
              secureTextEntry
              value={formData.confirmPassword}
              onChangeText={(value) => handleInputChange('confirmPassword', value)}
              editable={!loading}
            />

            {/* Campos opcionais */}
            <Text className="text-sm font-medium text-gray-700 mb-2">
              Telefone
            </Text>
            <TextInput
              className="border border-gray-300 rounded-lg px-4 py-3 mb-4"
              placeholder="(11) 99999-9999"
              keyboardType="phone-pad"
              value={formData.telefone}
              onChangeText={(value) => handleInputChange('telefone', value)}
              editable={!loading}
            />

            <Text className="text-sm font-medium text-gray-700 mb-2">
              CPF
            </Text>
            <TextInput
              className="border border-gray-300 rounded-lg px-4 py-3 mb-4"
              placeholder="000.000.000-00"
              keyboardType="numeric"
              value={formData.cpf}
              onChangeText={(value) => handleInputChange('cpf', value)}
              editable={!loading}
            />

            <Text className="text-sm font-medium text-gray-700 mb-2">
              Data de Nascimento
            </Text>
            <TextInput
              className="border border-gray-300 rounded-lg px-4 py-3 mb-4"
              placeholder="DD/MM/AAAA"
              value={formData.dataNascimento}
              onChangeText={(value) => handleInputChange('dataNascimento', value)}
              editable={!loading}
            />

            <Text className="text-sm font-medium text-gray-700 mb-2">
              Endereço
            </Text>
            <TextInput
              className="border border-gray-300 rounded-lg px-4 py-3 mb-6"
              placeholder="Rua, número, bairro, cidade"
              multiline
              numberOfLines={2}
              value={formData.endereco}
              onChangeText={(value) => handleInputChange('endereco', value)}
              editable={!loading}
            />

            <TouchableOpacity
              onPress={handleSignup}
              className="bg-blue-600 py-3 rounded-lg mb-4"
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator size="small" color="white" />
              ) : (
                <Text className="text-white text-center font-semibold text-lg">
                  Criar Conta
                </Text>
              )}
            </TouchableOpacity>
            
            <TouchableOpacity
              onPress={() => router.push('/(client)/login')}
              className="py-2"
              disabled={loading}
            >
              <Text className="text-blue-600 text-center">
                Já tem conta? Faça login
              </Text>
            </TouchableOpacity>

            <Text className="text-xs text-gray-500 text-center mt-4">
              * Campos obrigatórios
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
