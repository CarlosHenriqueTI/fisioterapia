import { Ionicons } from '@expo/vector-icons';
import { ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Card } from '@/components';
import { theme } from '@/theme';

export default function AdminDashboard() {
  const stats = [
    { title: 'Consultas Hoje', value: '8', icon: 'calendar', color: '#3b82f6' },
    { title: 'Clientes Ativos', value: '156', icon: 'people', color: '#10b981' },
    { title: 'Faturamento Mensal', value: 'R$ 15.280', icon: 'card', color: '#f59e0b' },
    { title: 'Taxa de Ocupação', value: '87%', icon: 'trending-up', color: '#8b5cf6' },
  ];

  const recentAppointments = [
    { id: 1, patient: 'João Silva', time: '09:00', type: 'Fisioterapia' },
    { id: 2, patient: 'Maria Santos', time: '10:30', type: 'RPG' },
    { id: 3, patient: 'Pedro Lima', time: '14:00', type: 'Pilates' },
  ];

  return (
    <SafeAreaView style={{ 
      flex: 1, 
      backgroundColor: theme.semantic.background.secondary 
    }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <Card 
          variant="elevated" 
          padding="xl" 
          style={{ 
            margin: theme.spacing[6], 
            marginBottom: theme.spacing[4] 
          }}
        >
          <View style={{ alignItems: 'center' }}>
            <View style={{
              backgroundColor: theme.colors.primary[50],
              padding: theme.spacing[3],
              borderRadius: theme.borderRadius.full,
              marginBottom: theme.spacing[3]
            }}>
              <Ionicons 
                name="analytics" 
                size={32} 
                color={theme.colors.primary[500]} 
              />
            </View>
            <Text style={{
              fontSize: theme.typography.fontSize['3xl'],
              fontWeight: '800' as any,
              color: theme.semantic.text.primary,
              textAlign: 'center'
            }}>
              Dashboard Administrativo
            </Text>
            <Text style={{
              fontSize: theme.typography.fontSize.base,
              color: theme.semantic.text.secondary,
              textAlign: 'center',
              marginTop: theme.spacing[1]
            }}>
              Visão geral do sistema
            </Text>
          </View>
        </Card>

        <View style={{ padding: theme.spacing[6], paddingTop: 0 }}>
          {/* Stats Grid */}
          <View style={{ 
            flexDirection: 'row', 
            flexWrap: 'wrap', 
            gap: theme.spacing[4], 
            marginBottom: theme.spacing[6] 
          }}>
            {stats.map((stat, index) => (
              <Card
                key={index}
                variant="elevated"
                padding="lg"
                style={{
                  flex: 1,
                  minWidth: '45%',
                }}
              >
                <View style={{ 
                  flexDirection: 'row', 
                  alignItems: 'center', 
                  marginBottom: theme.spacing[2] 
                }}>
                  <View style={{
                    backgroundColor: `${stat.color}15`,
                    padding: theme.spacing[2],
                    borderRadius: theme.borderRadius.md,
                    marginRight: theme.spacing[3]
                  }}>
                    <Ionicons name={stat.icon as any} size={20} color={stat.color} />
                  </View>
                  <Text style={{ 
                    fontSize: theme.typography.fontSize.sm, 
                    color: theme.semantic.text.secondary,
                    flex: 1,
                    fontWeight: '500' as any
                  }}>
                    {stat.title}
                  </Text>
                </View>
                <Text style={{ 
                  fontSize: theme.typography.fontSize['2xl'], 
                  fontWeight: '700' as any, 
                  color: theme.semantic.text.primary 
                }}>
                  {stat.value}
                </Text>
              </Card>
            ))}
          </View>

          {/* Recent Appointments */}
          <Card
            variant="elevated"
            padding="lg"
            style={{ marginBottom: theme.spacing[6] }}
          >
            <View style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginBottom: theme.spacing[4]
            }}>
              <Ionicons 
                name="calendar-outline" 
                size={24} 
                color={theme.colors.primary[500]} 
              />
              <Text style={{ 
                fontSize: theme.typography.fontSize.xl, 
                fontWeight: '600' as any, 
                color: theme.semantic.text.primary,
                marginLeft: theme.spacing[2]
              }}>
                Próximas Consultas
              </Text>
            </View>
            
            {recentAppointments.map((appointment, index) => (
              <View
                key={appointment.id}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  paddingVertical: theme.spacing[3],
                  borderBottomWidth: index < recentAppointments.length - 1 ? 1 : 0,
                  borderBottomColor: theme.semantic.border.light
                }}
              >
                <View style={{
                  backgroundColor: theme.colors.primary[500],
                  borderRadius: theme.borderRadius.full,
                  padding: theme.spacing[2],
                  marginRight: theme.spacing[3]
                }}>
                  <Ionicons name="person" size={16} color={theme.colors.white} />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={{ 
                    fontSize: theme.typography.fontSize.md, 
                    fontWeight: '600' as any, 
                    color: theme.semantic.text.primary 
                  }}>
                    {appointment.patient}
                  </Text>
                  <Text style={{ 
                    fontSize: theme.typography.fontSize.sm, 
                    color: theme.semantic.text.secondary 
                  }}>
                    {appointment.type}
                  </Text>
                </View>
                <View style={{
                  backgroundColor: theme.colors.primary[50],
                  paddingHorizontal: theme.spacing[3],
                  paddingVertical: theme.spacing[1],
                  borderRadius: theme.borderRadius.md
                }}>
                  <Text style={{ 
                    fontSize: theme.typography.fontSize.sm, 
                    fontWeight: '600' as any, 
                    color: theme.colors.primary[700] 
                  }}>
                    {appointment.time}
                  </Text>
                </View>
              </View>
            ))}
          </Card>

          {/* Quick Actions */}
          <Card variant="elevated" padding="lg">
            <View style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginBottom: theme.spacing[4]
            }}>
              <Ionicons 
                name="flash" 
                size={24} 
                color={theme.colors.secondary[500]} 
              />
              <Text style={{ 
                fontSize: theme.typography.fontSize.xl, 
                fontWeight: '600' as any, 
                color: theme.semantic.text.primary,
                marginLeft: theme.spacing[2]
              }}>
                Ações Rápidas
              </Text>
            </View>
            
            <View style={{ 
              flexDirection: 'row', 
              flexWrap: 'wrap', 
              gap: theme.spacing[3] 
            }}>
              <Card
                variant="outlined"
                padding="md"
                style={{
                  flex: 1,
                  minWidth: '45%',
                  backgroundColor: theme.colors.primary[500]
                }}
              >
                <View style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: theme.spacing[2]
                }}>
                  <Ionicons name="person-add" size={20} color={theme.colors.white} />
                  <Text style={{ 
                    color: theme.colors.white, 
                    fontWeight: '600' as any,
                    fontSize: theme.typography.fontSize.sm
                  }}>
                    Novo Cliente
                  </Text>
                </View>
              </Card>

              <Card
                variant="outlined"
                padding="md"
                style={{
                  flex: 1,
                  minWidth: '45%',
                  backgroundColor: theme.colors.secondary[500]
                }}
              >
                <View style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: theme.spacing[2]
                }}>
                  <Ionicons name="calendar-outline" size={20} color={theme.colors.white} />
                  <Text style={{ 
                    color: theme.colors.white, 
                    fontWeight: '600' as any,
                    fontSize: theme.typography.fontSize.sm
                  }}>
                    Agendar
                  </Text>
                </View>
              </Card>
            </View>
          </Card>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
