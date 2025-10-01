import { api } from '@/services/auth';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Link, router } from 'expo-router';
import { useState } from 'react';
import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';

import { Card, CustomButton, CustomInput } from '@/components';
import { theme } from '@/theme';
import { useErrorHandler } from '@/utils/errorHandler';
import { validationSchemas } from '@/utils/validation';

export const CLIENT_SESSION_KEY = '@client_session';

export default function ClientLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const { handleError } = useErrorHandler();

  const handleLogin = async () => {
    // Validar formulário
    const validation = validationSchemas.login.validate({ email, password });
    
    if (!validation.isValid) {
      const errorMap: { [key: string]: string } = {};
      validation.errors.forEach((error) => {
        errorMap[error.field] = error.message;
      });
      setErrors(errorMap);
      return;
    }

    setErrors({});
    setIsLoading(true);
    
    try {
      const response = await api.get('/clients', {
        params: { email, password },
      });

      if (response.data.length > 0) {
        const client = response.data[0];
        await AsyncStorage.setItem(CLIENT_SESSION_KEY, JSON.stringify(client));
        router.replace('/(tabs)/(customers)/dashboard');
      } else {
        Toast.show({ type: 'error', text1: 'Erro', text2: 'Credenciais inválidas' });
      }
    } catch (error) {
      handleError(error, 'ClientLogin');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <SafeAreaView style={{ 
        flex: 1, 
        backgroundColor: theme.semantic.background.secondary 
      }}>
        <View style={{ 
          flex: 1, 
          padding: theme.spacing[6],
          justifyContent: 'center'
        }}>
          {/* Header Card */}
          <Card 
            variant="elevated" 
            padding="xl" 
            style={{ marginBottom: theme.spacing[8] }}
          >
            <View style={{ alignItems: 'center' }}>
              <View style={{ 
                backgroundColor: theme.colors.secondary[50],
                padding: theme.spacing[4],
                borderRadius: theme.borderRadius.full,
                marginBottom: theme.spacing[4]
              }}>
                <Ionicons 
                  name="person-circle" 
                  size={48} 
                  color={theme.colors.secondary[500]} 
                />
              </View>
              <Text style={{
                fontSize: theme.typography.fontSize['3xl'],
                fontWeight: '700' as any,
                color: theme.semantic.text.primary,
                textAlign: 'center',
                marginBottom: theme.spacing[2]
              }}>
                Área do Cliente
              </Text>
              <Text style={{
                fontSize: theme.typography.fontSize.base,
                color: theme.semantic.text.secondary,
                textAlign: 'center'
              }}>
                Acesse sua conta para agendar consultas
              </Text>
            </View>
          </Card>

          {/* Form Card */}
          <Card variant="elevated" padding="lg">
            <CustomInput
              label="Email"
              type="email"
              placeholder="seu@email.com"
              value={email}
              onChangeText={setEmail}
              error={errors.email}
              required
            />

            <CustomInput
              label="Senha"
              type="password"
              placeholder="Digite sua senha"
              value={password}
              onChangeText={setPassword}
              error={errors.password}
              required
            />

            <CustomButton
              title={isLoading ? 'Entrando...' : 'Entrar'}
              onPress={handleLogin}
              disabled={isLoading}
              loading={isLoading}
              size="large"
              variant="secondary"
              style={{ marginBottom: theme.spacing[4] }}
            />

            <View style={{ alignItems: 'center' }}>
              <Link href="/selection" asChild>
                <CustomButton
                  title="Voltar à seleção de área"
                  variant="ghost"
                  onPress={() => {}}
                />
              </Link>
            </View>
          </Card>
        </View>
      </SafeAreaView>
      <Toast />
    </>
  );
}