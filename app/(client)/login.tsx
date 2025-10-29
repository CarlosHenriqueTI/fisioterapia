import { api } from '@/services/auth';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LinearGradient } from 'expo-linear-gradient';
import { Link, router } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import { Animated, Text, View } from 'react-native';
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

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.spring(slideAnim, {
        toValue: 0,
        friction: 8,
        tension: 40,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

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
      <View style={{ flex: 1 }}>
        {/* Background Gradient */}
        <LinearGradient
          colors={['#22c55e', '#16a34a', '#059669']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            top: 0,
            height: '100%',
          }}
        />

        <SafeAreaView style={{ flex: 1 }}>
          <View style={{ 
            flex: 1, 
            padding: theme.spacing[6],
            justifyContent: 'center'
          }}>
            {/* Header Card com animação */}
            <Animated.View
              style={{
                opacity: fadeAnim,
                transform: [{ translateY: slideAnim }],
                marginBottom: theme.spacing[8],
              }}
            >
              <Card 
                variant="glass" 
                padding="xl" 
                style={{ 
                  backgroundColor: 'rgba(255, 255, 255, 0.95)',
                  backdropFilter: 'blur(20px)',
                }}
              >
                <View style={{ alignItems: 'center' }}>
                  <View style={{ 
                    backgroundColor: 'rgba(34, 197, 94, 0.1)',
                    padding: theme.spacing[5],
                    borderRadius: theme.borderRadius.full,
                    marginBottom: theme.spacing[4],
                  }}>
                    <LinearGradient
                      colors={['#22c55e', '#16a34a']}
                      start={{ x: 0, y: 0 }}
                      end={{ x: 1, y: 1 }}
                      style={{
                        padding: theme.spacing[4],
                        borderRadius: theme.borderRadius.full,
                      }}
                    >
                      <Ionicons 
                        name="person-circle" 
                        size={48} 
                        color={theme.colors.white} 
                      />
                    </LinearGradient>
                  </View>
                  <Text style={{
                    fontSize: theme.typography.fontSize['3xl'],
                    fontWeight: '800' as any,
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
            </Animated.View>

            {/* Form Card com animação */}
            <Animated.View
              style={{
                opacity: fadeAnim,
                transform: [{ translateY: slideAnim }],
              }}
            >
              <Card 
                variant="glass" 
                padding="xl"
                style={{ 
                  backgroundColor: 'rgba(255, 255, 255, 0.95)',
                  backdropFilter: 'blur(20px)',
                }}
              >
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
                  variant="gradient"
                  gradient={['#22c55e', '#16a34a']}
                  size="large"
                  icon="arrow-forward"
                  style={{ 
                    marginBottom: theme.spacing[4],
                    shadowColor: '#22c55e',
                    shadowOffset: { width: 0, height: 6 },
                    shadowOpacity: 0.4,
                    shadowRadius: 12,
                    elevation: 8,
                  }}
                />

                <View style={{ alignItems: 'center' }}>
                  <Link href="/selection" asChild>
                    <CustomButton
                      title="Voltar à seleção"
                      variant="ghost"
                      icon="arrow-back"
                      onPress={() => {}}
                    />
                  </Link>
                </View>
              </Card>
            </Animated.View>
          </View>
        </SafeAreaView>
      </View>
      <Toast />
    </>
  );
}
