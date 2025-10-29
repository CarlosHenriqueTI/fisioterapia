import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { useEffect, useRef } from 'react';
import { Alert, Animated, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Avatar, Badge, Card, CustomButton, ThemeToggle } from '@/components';
import { useTheme } from '@/contexts/ThemeContext';
import { theme } from '@/theme';

export default function AdminDashboard() {
  const { isDark, colors } = useTheme();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.spring(slideAnim, {
        toValue: 0,
        friction: 8,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const stats = [
    { title: 'Consultas Hoje', value: '8', icon: 'calendar', gradient: ['#3b82f6', '#2563eb'] as const, trend: '+12%' },
    { title: 'Clientes Ativos', value: '156', icon: 'people', gradient: ['#10b981', '#059669'] as const, trend: '+8%' },
    { title: 'Faturamento', value: 'R$ 15.280', icon: 'cash', gradient: ['#f59e0b', '#d97706'] as const, trend: '+23%' },
    { title: 'Taxa Ocupação', value: '87%', icon: 'trending-up', gradient: ['#8b5cf6', '#7c3aed'] as const, trend: '+5%' },
  ];

  const recentAppointments = [
    { id: 1, patient: 'João Silva', time: '09:00', type: 'Fisioterapia', status: 'confirmed' },
    { id: 2, patient: 'Maria Santos', time: '10:30', type: 'RPG', status: 'confirmed' },
    { id: 3, patient: 'Pedro Lima', time: '14:00', type: 'Pilates', status: 'pending' },
    { id: 4, patient: 'Ana Costa', time: '15:30', type: 'Fisioterapia', status: 'confirmed' },
  ];

  const quickActions = [
    { icon: 'person-add', label: 'Novo Cliente', gradient: ['#3b82f6', '#2563eb'] as const },
    { icon: 'calendar', label: 'Agendar', gradient: ['#10b981', '#059669'] as const },
    { icon: 'document-text', label: 'Relatórios', gradient: ['#f59e0b', '#d97706'] as const },
    { icon: 'settings', label: 'Configurações', gradient: ['#8b5cf6', '#7c3aed'] as const },
  ];

  const handleLogout = () => {
    Alert.alert(
      'Sair',
      'Tem certeza que deseja sair da sua conta?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Sair',
          style: 'destructive',
          onPress: () => {
            // Limpar autenticação e redirecionar para login
            router.replace('/(administrator)/login');
          }
        }
      ]
    );
  };

  return (
    <SafeAreaView style={{ 
      flex: 1, 
      backgroundColor: isDark ? colors.background : '#f8fafc'
    }}>
      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 80 }}
      >
        {/* Header com Gradiente */}
        <LinearGradient
          colors={isDark ? ['#1E293B', '#334155'] : ['#0ea5e9', '#3b82f6']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={{
            paddingHorizontal: theme.spacing[4],
            paddingTop: theme.spacing[4],
            paddingBottom: theme.spacing[8],
            borderBottomLeftRadius: 30,
            borderBottomRightRadius: 30,
          }}
        >
          <Animated.View
            style={{
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            }}
          >
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap' }}>
              <View style={{ flex: 1, minWidth: 150 }}>
                <Text style={{
                  fontSize: theme.typography.fontSize.xl,
                  fontWeight: '800' as any,
                  color: theme.colors.white,
                }}>
                  Dashboard
                </Text>
                <Text style={{
                  fontSize: theme.typography.fontSize.xs,
                  color: 'rgba(255, 255, 255, 0.9)',
                  marginTop: theme.spacing[1],
                }}>
                  Visão geral do sistema
                </Text>
              </View>
              <View style={{ flexDirection: 'row', gap: theme.spacing[2], alignItems: 'center' }}>
                <ThemeToggle />
                <TouchableOpacity>
                  <View style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.2)',
                    padding: theme.spacing[2],
                    borderRadius: theme.borderRadius.full,
                  }}>
                    <Ionicons name="notifications" size={22} color={theme.colors.white} />
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </Animated.View>
        </LinearGradient>

        <View style={{ paddingHorizontal: theme.spacing[4], paddingVertical: theme.spacing[4], marginTop: theme.spacing[4] }}>
          {/* Stats Grid com Gradientes */}
          <Animated.View
            style={{
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            }}
          >
            <View style={{ 
              flexDirection: 'row', 
              flexWrap: 'wrap', 
              justifyContent: 'space-between',
              marginBottom: theme.spacing[4] 
            }}>
              {stats.map((stat, index) => (
                <Animated.View
                  key={index}
                  style={{
                    width: '48%',
                    marginBottom: theme.spacing[3],
                    opacity: fadeAnim,
                    transform: [{ 
                      translateY: slideAnim.interpolate({
                        inputRange: [0, 30],
                        outputRange: [0, 30 + index * 10],
                      })
                    }],
                  }}
                >
                  <TouchableOpacity activeOpacity={0.8}>
                    <LinearGradient
                      colors={stat.gradient}
                      start={{ x: 0, y: 0 }}
                      end={{ x: 1, y: 1 }}
                      style={{
                        borderRadius: theme.borderRadius.xl,
                        padding: theme.spacing[3],
                        minHeight: 120,
                        shadowColor: stat.gradient[0],
                        shadowOffset: { width: 0, height: 4 },
                        shadowOpacity: 0.3,
                        shadowRadius: 8,
                        elevation: 6,
                      }}
                    >
                      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: theme.spacing[2] }}>
                        <View style={{
                          backgroundColor: 'rgba(255, 255, 255, 0.2)',
                          padding: theme.spacing[2],
                          borderRadius: theme.borderRadius.md,
                        }}>
                          <Ionicons name={stat.icon as any} size={20} color={theme.colors.white} />
                        </View>
                        <Badge label={stat.trend} variant="success" size="sm" />
                      </View>
                      <Text style={{ 
                        fontSize: theme.typography.fontSize['2xl'], 
                        fontWeight: '800' as any, 
                        color: theme.colors.white,
                        marginTop: theme.spacing[1],
                      }}>
                        {stat.value}
                      </Text>
                      <Text 
                        style={{ 
                          fontSize: theme.typography.fontSize.xs, 
                          color: 'rgba(255, 255, 255, 0.9)',
                          fontWeight: '600' as any,
                          marginTop: theme.spacing[1],
                        }}
                        numberOfLines={1}
                      >
                        {stat.title}
                      </Text>
                    </LinearGradient>
                  </TouchableOpacity>
                </Animated.View>
              ))}
            </View>
          </Animated.View>

          {/* Recent Appointments com Animação */}
          <Card
            variant="elevated"
            padding="md"
            style={{ 
              marginBottom: theme.spacing[4],
              backgroundColor: isDark ? colors.card : theme.colors.white,
            }}
          >
            <View style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginBottom: theme.spacing[3]
            }}>
              <LinearGradient
                colors={['#3b82f6', '#2563eb']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={{
                  padding: theme.spacing[2],
                  borderRadius: theme.borderRadius.md,
                  marginRight: theme.spacing[2],
                }}
              >
                <Ionicons 
                  name="calendar-outline" 
                  size={18} 
                  color={theme.colors.white} 
                />
              </LinearGradient>
              <Text style={{ 
                fontSize: theme.typography.fontSize.lg, 
                fontWeight: '700' as any, 
                color: isDark ? colors.text : theme.semantic.text.primary,
                flex: 1,
              }}>
                Próximas Consultas
              </Text>
            </View>
            
            {recentAppointments.map((appointment, index) => (
              <Animated.View
                key={appointment.id}
                style={{
                  opacity: fadeAnim,
                  transform: [{ 
                    translateX: slideAnim.interpolate({
                      inputRange: [0, 30],
                      outputRange: [0, -20],
                    })
                  }],
                }}
              >
                <TouchableOpacity
                  activeOpacity={0.7}
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    paddingVertical: theme.spacing[2],
                    paddingHorizontal: theme.spacing[2],
                    borderRadius: theme.borderRadius.lg,
                    marginBottom: theme.spacing[2],
                    backgroundColor: isDark 
                      ? (index % 2 === 0 ? colors.backgroundSecondary : colors.card)
                      : (index % 2 === 0 ? '#f8fafc' : theme.colors.white),
                  }}
                >
                  <Avatar name={appointment.patient} size="sm" showBadge={appointment.status === 'confirmed'} badgeColor="#22c55e" />
                  <View style={{ flex: 1, marginLeft: theme.spacing[2], marginRight: theme.spacing[2] }}>
                    <Text 
                      style={{ 
                        fontSize: theme.typography.fontSize.sm, 
                        fontWeight: '600' as any, 
                        color: isDark ? colors.text : theme.semantic.text.primary 
                      }}
                      numberOfLines={1}
                    >
                      {appointment.patient}
                    </Text>
                    <Text 
                      style={{ 
                        fontSize: theme.typography.fontSize.xs, 
                        color: isDark ? colors.textSecondary : theme.semantic.text.secondary,
                        marginTop: 2,
                      }}
                      numberOfLines={1}
                    >
                      {appointment.type}
                    </Text>
                  </View>
                  <View style={{ alignItems: 'flex-end' }}>
                    <View style={{
                      backgroundColor: theme.colors.primary[50],
                      paddingHorizontal: theme.spacing[2],
                      paddingVertical: theme.spacing[1],
                      borderRadius: theme.borderRadius.md,
                      marginBottom: theme.spacing[1],
                    }}>
                      <Text style={{ 
                        fontSize: theme.typography.fontSize.xs, 
                        fontWeight: '700' as any, 
                        color: theme.colors.primary[700] 
                      }}>
                        {appointment.time}
                      </Text>
                    </View>
                    <Badge 
                      label={appointment.status === 'confirmed' ? 'Confirmado' : 'Pendente'} 
                      variant={appointment.status === 'confirmed' ? 'success' : 'warning'} 
                      size="sm" 
                    />
                  </View>
                </TouchableOpacity>
              </Animated.View>
            ))}
          </Card>

          {/* Quick Actions com Gradientes */}
          <Card variant="elevated" padding="md" style={{ backgroundColor: isDark ? colors.card : theme.colors.white }}>
            <View style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginBottom: theme.spacing[3]
            }}>
              <LinearGradient
                colors={['#10b981', '#059669']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={{
                  padding: theme.spacing[2],
                  borderRadius: theme.borderRadius.md,
                  marginRight: theme.spacing[2],
                }}
              >
                <Ionicons 
                  name="flash" 
                  size={18} 
                  color={theme.colors.white} 
                />
              </LinearGradient>
              <Text style={{ 
                fontSize: theme.typography.fontSize.lg, 
                fontWeight: '700' as any, 
                color: isDark ? colors.text : theme.semantic.text.primary,
                flex: 1,
              }}>
                Ações Rápidas
              </Text>
            </View>
            
            <View style={{ 
              flexDirection: 'row', 
              flexWrap: 'wrap', 
              justifyContent: 'space-between',
            }}>
              {quickActions.map((action, index) => (
                <Animated.View
                  key={index}
                  style={{
                    width: '48%',
                    marginBottom: theme.spacing[3],
                    opacity: fadeAnim,
                    transform: [{ scale: fadeAnim }],
                  }}
                >
                  <TouchableOpacity activeOpacity={0.8}>
                    <LinearGradient
                      colors={action.gradient}
                      start={{ x: 0, y: 0 }}
                      end={{ x: 1, y: 1 }}
                      style={{
                        borderRadius: theme.borderRadius.lg,
                        padding: theme.spacing[3],
                        alignItems: 'center',
                        justifyContent: 'center',
                        minHeight: 90,
                        shadowColor: action.gradient[0],
                        shadowOffset: { width: 0, height: 4 },
                        shadowOpacity: 0.2,
                        shadowRadius: 6,
                        elevation: 4,
                      }}
                    >
                      <View style={{
                        backgroundColor: 'rgba(255, 255, 255, 0.2)',
                        padding: theme.spacing[2],
                        borderRadius: theme.borderRadius.full,
                        marginBottom: theme.spacing[2],
                      }}>
                        <Ionicons name={action.icon as any} size={24} color={theme.colors.white} />
                      </View>
                      <Text 
                        style={{ 
                          color: theme.colors.white, 
                          fontWeight: '700' as any,
                          fontSize: theme.typography.fontSize.xs,
                          textAlign: 'center',
                        }}
                        numberOfLines={2}
                      >
                        {action.label}
                      </Text>
                    </LinearGradient>
                  </TouchableOpacity>
                </Animated.View>
              ))}
            </View>
          </Card>

          {/* Logout Button */}
          <Card 
            variant="elevated" 
            padding="lg" 
            style={{ 
              marginTop: theme.spacing[4],
              backgroundColor: isDark ? colors.card : theme.colors.white,
            }}
          >
            <View style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginBottom: theme.spacing[3]
            }}>
              <View style={{
                backgroundColor: theme.colors.error[50],
                padding: theme.spacing[2],
                borderRadius: theme.borderRadius.md,
                marginRight: theme.spacing[2],
              }}>
                <Ionicons 
                  name="log-out" 
                  size={18} 
                  color={theme.colors.error[500]} 
                />
              </View>
              <Text style={{ 
                fontSize: theme.typography.fontSize.lg, 
                fontWeight: '700' as any, 
                color: isDark ? colors.text : theme.semantic.text.primary,
                flex: 1,
              }}>
                Conta
              </Text>
            </View>
            
            <CustomButton
              title="Sair da Conta"
              onPress={handleLogout}
              variant="outline"
              size="large"
              icon="log-out"
              style={{ 
                borderColor: theme.colors.error[500],
                backgroundColor: theme.colors.error[50]
              }}
            />
          </Card>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
