import { Card, CustomButton, ThemeToggle } from '@/components';
import { useTheme } from '@/contexts/ThemeContext';
import { theme } from '@/theme';
import { LinearGradient } from 'expo-linear-gradient';
import { Link } from 'expo-router';
import { useEffect, useRef } from 'react';
import { Animated, Dimensions, Image, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');

export default function SelectionScreen() {
  const { isDark, colors } = useTheme();
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

  return (
    <View style={{ flex: 1 }}>
      {/* Background Gradient */}
      <LinearGradient
        colors={isDark 
          ? ['#0F172A', '#1E293B', '#334155'] 
          : ['#0ea5e9', '#3b82f6', '#8b5cf6']
        }
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
        {/* Theme Toggle Button */}
        <View style={{ 
          position: 'absolute', 
          top: theme.spacing[4], 
          right: theme.spacing[4],
          zIndex: 10,
        }}>
          <ThemeToggle />
        </View>

        <View style={{ 
          flex: 1, 
          justifyContent: 'center', 
          alignItems: 'center', 
          padding: theme.spacing[6] 
        }}>
          {/* Logo Card com animação */}
          <Animated.View
            style={{
              width: '100%',
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
              marginBottom: theme.spacing[8],
            }}
          >
            <Card 
              variant="glass" 
              padding="xl"
              style={{ 
                backgroundColor: isDark ? colors.glass : 'rgba(255, 255, 255, 0.95)',
                backdropFilter: 'blur(20px)',
              }}
            >
              <View style={{ alignItems: 'center' }}>
                <View style={{
                  backgroundColor: isDark ? colors.card : theme.colors.white,
                  borderRadius: theme.borderRadius['2xl'],
                  padding: theme.spacing[2],
                  marginBottom: theme.spacing[4],
                  shadowColor: isDark ? '#000' : '#000',
                  shadowOffset: { width: 0, height: 10 },
                  shadowOpacity: isDark ? 0.3 : 0.15,
                  shadowRadius: 20,
                  elevation: 10,
                }}>
                  <Image
                    source={require('../assets/images/logo.jpeg')}
                    style={{ 
                      width: 140, 
                      height: 140, 
                      borderRadius: theme.borderRadius.xl,
                    }}
                    resizeMode="cover"
                    accessibilityLabel="Logo BM Espaço Saúde"
                  />
                </View>
                <Text style={{
                  fontSize: theme.typography.fontSize['2xl'],
                  fontWeight: '800' as any,
                  color: isDark ? colors.text : theme.semantic.text.primary,
                  textAlign: 'center',
                  marginBottom: theme.spacing[2],
                }}>
                  BM Espaço Saúde
                </Text>
                <Text style={{
                  fontSize: theme.typography.fontSize.base,
                  color: isDark ? colors.textSecondary : theme.semantic.text.secondary,
                  textAlign: 'center',
                }}>
                  Cuidando de você com dedicação
                </Text>
              </View>
            </Card>
          </Animated.View>

          {/* Botões de seleção com animação */}
          <Animated.View
            style={{
              width: '100%',
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
              <Text style={{
                fontSize: theme.typography.fontSize.xl,
                fontWeight: '700' as any,
                color: theme.semantic.text.primary,
                textAlign: 'center',
                marginBottom: theme.spacing[2],
              }}>
                Bem-vindo! 👋
              </Text>
              
              <Text style={{
                fontSize: theme.typography.fontSize.sm,
                color: theme.semantic.text.secondary,
                textAlign: 'center',
                marginBottom: theme.spacing[6],
              }}>
                Selecione como deseja acessar o sistema
              </Text>
              
              <View style={{ gap: theme.spacing[4] }}>
                <Link href="/(administrator)/login" asChild>
                  <CustomButton
                    title="Área do Administrador"
                    variant="gradient"
                    size="large"
                    icon="shield-checkmark"
                    gradient={['#0ea5e9', '#3b82f6']}
                    onPress={() => {}}
                    style={{
                      shadowColor: '#0ea5e9',
                      shadowOffset: { width: 0, height: 6 },
                      shadowOpacity: 0.4,
                      shadowRadius: 12,
                      elevation: 8,
                    }}
                  />
                </Link>

                <Link href="/(client)/login" asChild>
                  <CustomButton
                    title="Área do Cliente"
                    variant="gradient"
                    size="large"
                    icon="person"
                    gradient={['#22c55e', '#16a34a']}
                    onPress={() => {}}
                    style={{
                      shadowColor: '#22c55e',
                      shadowOffset: { width: 0, height: 6 },
                      shadowOpacity: 0.4,
                      shadowRadius: 12,
                      elevation: 8,
                    }}
                  />
                </Link>
              </View>
              
              <Text style={{
                fontSize: theme.typography.fontSize.xs,
                color: theme.semantic.text.tertiary,
                textAlign: 'center',
                marginTop: theme.spacing[6],
                fontStyle: 'italic',
              }}>
                🔒 Acesso seguro e protegido
              </Text>
            </Card>
          </Animated.View>
        </View>
      </SafeAreaView>
    </View>
  );
}
