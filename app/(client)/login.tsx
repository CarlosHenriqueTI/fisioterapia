import React, { useState } from 'react';
import { Text, View, TextInput, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import BackButton from '@/components/BackButton';
import { useAuth } from '@/contexts/AuthContext';

export default function CustomerLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { signIn } = useAuth();

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos');
      return;
    }

    setLoading(true);
    try {
      const { error } = await signIn(email, password);
      
      if (error) {
        Alert.alert('Erro no Login', error.message || 'Falha na autenticação');
        return;
      }

      // Verificar se é um primeiro acesso (senha provisória)
      // Na implementação real, você pode verificar isso através de um campo no banco
      const isFirstLogin = password === 'temp123'; // Exemplo para demonstração
      
      if (isFirstLogin) {
        // TODO: Implementar mudança de senha obrigatória
        Alert.alert('Aviso', 'Senha temporária detectada. Entre em contato com a clínica para alterar.');
        // Por enquanto, vai direto para o dashboard
        router.push('/(tabs)/(customers)/dashboard');
      } else {
        // Vai para as tabs do cliente
        router.push('/(tabs)/(customers)/dashboard');
      }
    } catch (error) {
      Alert.alert('Erro', 'Ocorreu um erro inesperado');
      console.error('Erro no login:', error);
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
      <View className="flex-1 justify-center px-6">
        <View className="bg-white p-6 rounded-xl shadow-lg">
          <Text className="text-2xl font-bold text-center text-gray-800 mb-6">
            Login Cliente
          </Text>
          
          <Text className="text-sm text-gray-600 mb-4 text-center">
            Use o email e senha enviados pela clínica
          </Text>
          
          <TextInput
            className="border border-gray-300 rounded-lg px-4 py-3 mb-4"
            placeholder="Email"
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            autoCorrect={false}
            editable={!loading}
          />
          
          <TextInput
            className="border border-gray-300 rounded-lg px-4 py-3 mb-6"
            placeholder="Senha"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
            editable={!loading}
          />
          
          <TouchableOpacity
            onPress={handleLogin}
            className="bg-blue-500 py-3 rounded-lg mb-4"
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator size="small" color="white" />
            ) : (
              <Text className="text-white text-center font-semibold text-lg">
                Entrar
              </Text>
            )}
          </TouchableOpacity>
          
          <View className="py-2 mb-4">
            <Text className="text-gray-500 text-center text-sm">
              Não tem acesso? Entre em contato com a clínica
            </Text>
          </View>

          {/* Dica para teste */}
          <View className="mt-4 bg-blue-50 p-3 rounded-lg border border-blue-200">
            <Text className="text-blue-800 text-xs text-center font-medium">
              💡 Suas credenciais são fornecidas pela clínica
            </Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}