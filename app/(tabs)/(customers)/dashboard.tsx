import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useEffect, useRef } from 'react';
import { Animated, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Avatar, Badge, Card, ThemeToggle } from '@/components';
import { useTheme } from '@/contexts/ThemeContext';
import { theme } from '@/theme';

export default function CustomerDashboard() {
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

  const nextAppointments = [
    { 
      id: 1, 
      date: '15/12/2024', 
      time: '14:30', 
      type: 'Fisioterapia', 
      doctor: 'Dr. João Silva',
      status: 'confirmed',
      location: 'Sala 101'
    },
    { 
      id: 2, 
      date: '18/12/2024', 
      time: '09:00', 
      type: 'RPG', 
      doctor: 'Dra. Maria Santos',
      status: 'confirmed',
      location: 'Sala 203'
    },
    { 
      id: 3, 
      date: '22/12/2024', 
      time: '16:00', 
      type: 'Pilates', 
      doctor: 'Dra. Ana Costa',
      status: 'pending',
      location: 'Sala 305'
    },
  ];

  const quickActions = [
    { title: 'Agendar', icon: 'calendar', gradient: ['#10b981', '#059669'] as const },
    { title: 'Histórico', icon: 'time', gradient: ['#3b82f6', '#2563eb'] as const },
    { title: 'Perfil', icon: 'person', gradient: ['#8b5cf6', '#7c3aed'] as const },
    { title: 'Contato', icon: 'call', gradient: ['#f59e0b', '#d97706'] as const },
  ];

  const healthStats = [
    { label: 'Consultas', value: '12', icon: 'calendar', color: '#3b82f6' },
    { label: 'Em Dia', value: '100%', icon: 'checkmark-circle', color: '#10b981' },
  ];

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: isDark ? colors.background : '#f8fafc' }}>
      <ScrollView 
        contentContainerStyle={{ flexGrow: 1, paddingBottom: 80 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Header com Gradiente */}
        <LinearGradient
          colors={isDark ? ['#1E293B', '#334155'] : ['#22c55e', '#16a34a']}
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
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: theme.spacing[3], flexWrap: 'wrap' }}>
              <View style={{ flex: 1, minWidth: 150 }}>
                <Text style={{
                  fontSize: theme.typography.fontSize.xl,
                  fontWeight: '800' as any,
                  color: theme.colors.white,
                }}>
                  Olá, Cliente! 👋
                </Text>
                <Text style={{
                  fontSize: theme.typography.fontSize.xs,
                  color: 'rgba(255, 255, 255, 0.9)',
                  marginTop: theme.spacing[1],
                }}>
                  Bem-vindo ao BM Espaço Saúde
                </Text>
              </View>
              <View style={{ flexDirection: 'row', gap: theme.spacing[2], alignItems: 'center', marginTop: theme.spacing[2] }}>
                <ThemeToggle />
                <Avatar name="Cliente" size="md" showBadge badgeColor="#22c55e" />
              </View>
            </View>

            {/* Health Stats */}
            <View style={{ flexDirection: 'row', gap: theme.spacing[2] }}>
              {healthStats.map((stat, index) => (
                <View
                  key={index}
                  style={{
                    flex: 1,
                    backgroundColor: 'rgba(255, 255, 255, 0.2)',
                    borderRadius: theme.borderRadius.xl,
                    padding: theme.spacing[3],
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}
                >
                  <View style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.3)',
                    padding: theme.spacing[2],
                    borderRadius: theme.borderRadius.md,
                    marginRight: theme.spacing[2],
                  }}>
                    <Ionicons name={stat.icon as any} size={18} color={theme.colors.white} />
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={{ fontSize: theme.typography.fontSize.xl, fontWeight: '800' as any, color: theme.colors.white }}>
                      {stat.value}
                    </Text>
                    <Text style={{ fontSize: theme.typography.fontSize.xs, color: 'rgba(255, 255, 255, 0.9)' }} numberOfLines={1}>
                      {stat.label}
                    </Text>
                  </View>
                </View>
              ))}
            </View>
          </Animated.View>
        </LinearGradient>

        <View style={{ paddingHorizontal: theme.spacing[4], paddingVertical: theme.spacing[4], marginTop: theme.spacing[4] }}>
          {/* Next Appointments */}
          <Animated.View
            style={{
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            }}
          >
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
              
              {nextAppointments.length > 0 ? (
                nextAppointments.map((appointment, index) => (
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
                        borderRadius: theme.borderRadius.lg,
                        padding: theme.spacing[3],
                        marginBottom: theme.spacing[2],
                        borderLeftWidth: 4,
                        borderLeftColor: appointment.status === 'confirmed' ? '#10b981' : '#f59e0b',
                        backgroundColor: isDark 
                          ? (index % 2 === 0 ? colors.backgroundSecondary : colors.card)
                          : (index % 2 === 0 ? '#f8fafc' : theme.colors.white),
                        shadowColor: isDark ? '#000' : '#000',
                        shadowOffset: { width: 0, height: 2 },
                        shadowOpacity: isDark ? 0.3 : 0.05,
                        shadowRadius: 4,
                        elevation: 2,
                      }}
                    >
                      <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: theme.spacing[2], flexWrap: 'wrap' }}>
                        <View style={{ flex: 1, marginRight: theme.spacing[2], minWidth: 150 }}>
                          <Text 
                            style={{ 
                              fontSize: theme.typography.fontSize.md, 
                              fontWeight: '700' as any, 
                              color: isDark ? colors.text : theme.semantic.text.primary,
                              marginBottom: 4,
                            }}
                            numberOfLines={1}
                          >
                            {appointment.type}
                          </Text>
                          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 4 }}>
                            <Ionicons name="person" size={12} color={isDark ? colors.textSecondary : theme.colors.gray[500]} />
                            <Text 
                              style={{ 
                                fontSize: theme.typography.fontSize.xs, 
                                color: isDark ? colors.textSecondary : theme.semantic.text.secondary,
                              marginLeft: 4,
                            }}
                            numberOfLines={1}
                          >
                              {appointment.doctor}
                            </Text>
                          </View>
                          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Ionicons name="location" size={12} color={isDark ? colors.textSecondary : theme.colors.gray[500]} />
                            <Text 
                              style={{ 
                                fontSize: theme.typography.fontSize.xs, 
                                color: isDark ? colors.textSecondary : theme.semantic.text.secondary,
                                marginLeft: 4,
                              }}
                              numberOfLines={1}
                            >
                              {appointment.location}
                            </Text>
                          </View>
                        </View>
                        <View style={{ alignItems: 'flex-end', minWidth: 80 }}>
                          <Badge 
                            label={appointment.status === 'confirmed' ? 'Confirmado' : 'Pendente'} 
                            variant={appointment.status === 'confirmed' ? 'success' : 'warning'} 
                            size="sm" 
                            style={{ marginBottom: theme.spacing[1] }}
                          />
                          <View style={{
                            backgroundColor: '#3b82f6',
                            paddingHorizontal: theme.spacing[2],
                            paddingVertical: theme.spacing[1],
                            borderRadius: theme.borderRadius.md,
                            marginBottom: 4,
                          }}>
                            <Text 
                              style={{ 
                                fontSize: 10, 
                                fontWeight: '700' as any, 
                                color: theme.colors.white
                              }}
                              numberOfLines={1}
                            >
                              {appointment.date}
                            </Text>
                          </View>
                          <Text 
                            style={{ 
                              fontSize: theme.typography.fontSize.xs, 
                              fontWeight: '600' as any,
                              color: theme.semantic.text.secondary 
                            }}
                            numberOfLines={1}
                          >
                            {appointment.time}
                          </Text>
                        </View>
                      </View>
                    </TouchableOpacity>
                  </Animated.View>
                ))
              ) : (
                <View style={{ alignItems: 'center', padding: theme.spacing[8] }}>
                  <Ionicons name="calendar-outline" size={64} color={theme.colors.gray[300]} />
                  <Text style={{ 
                    fontSize: theme.typography.fontSize.base, 
                    color: theme.semantic.text.secondary, 
                    marginTop: theme.spacing[3], 
                    textAlign: 'center' 
                  }}>
                    Nenhuma consulta agendada
                  </Text>
                </View>
              )}
            </Card>
          </Animated.View>

          {/* Quick Actions */}
          <Card
            variant="elevated"
            padding="md"
            style={{ backgroundColor: isDark ? colors.card : theme.colors.white }}
          >
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
                        numberOfLines={1}
                      >
                        {action.title}
                      </Text>
                    </LinearGradient>
                  </TouchableOpacity>
                </Animated.View>
              ))}
            </View>
          </Card>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
