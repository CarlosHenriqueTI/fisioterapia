import { Ionicons } from '@expo/vector-icons';
import { Link, router } from 'expo-router';
import { useState } from 'react';
import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';

import { Card, CustomButton, CustomInput } from '@/components';
import { useAuthStore } from '@/stores';
import { theme } from '@/theme';
import { useErrorHandler } from '@/utils/errorHandler';
import { validationSchemas } from '@/utils/validation';

export default function AdministratorLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const { login, isLoading } = useAuthStore();
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

    try {
      await login({ email, password });
      router.replace('/(tabs)/(administrator)/dashboard');
    } catch (error) {
      handleError(error, 'AdministratorLogin');
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
                backgroundColor: theme.colors.primary[50],
                padding: theme.spacing[4],
                borderRadius: theme.borderRadius.full,
                marginBottom: theme.spacing[4]
              }}>
                <Ionicons 
                  name="medical" 
                  size={48} 
                  color={theme.colors.primary[500]} 
                />
              </View>
              <Text style={{
                fontSize: theme.typography.fontSize['3xl'],
                fontWeight: '700' as any,
                color: theme.semantic.text.primary,
                textAlign: 'center',
                marginBottom: theme.spacing[2]
              }}>
                Área do Administrador
              </Text>
              <Text style={{
                fontSize: theme.typography.fontSize.base,
                color: theme.semantic.text.secondary,
                textAlign: 'center'
              }}>
                Faça login para acessar o painel administrativo
              </Text>
            </View>
          </Card>

          {/* Form Card */}
          <Card variant="elevated" padding="lg">
            <CustomInput
              label="Email"
              type="email"
              placeholder="admin@bmespaco.com"
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
