import { Ionicons } from '@expo/vector-icons';
import { ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Card, CustomButton } from '@/components';
import { theme } from '@/theme';

export default function CustomerDashboard() {
  const nextAppointments = [
    { id: 1, date: '15/12/2024', time: '14:30', type: 'Fisioterapia', doctor: 'Dr. João Silva' },
    { id: 2, date: '18/12/2024', time: '09:00', type: 'RPG', doctor: 'Dra. Maria Santos' },
  ];

  const quickActions = [
    { title: 'Agendar Consulta', icon: 'calendar-outline', color: '#10b981' },
    { title: 'Ver Histórico', icon: 'time-outline', color: '#3b82f6' },
    { title: 'Meu Perfil', icon: 'person-outline', color: '#8b5cf6' },
    { title: 'Contato', icon: 'call-outline', color: '#f59e0b' },
  ];

  return (
    <SafeAreaView style={{ 
      flex: 1, 
      backgroundColor: theme.semantic.background.secondary 
    }}>
      <ScrollView 
        contentContainerStyle={{ flexGrow: 1, paddingBottom: 80 }}
        showsVerticalScrollIndicator={false}
      >
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
              backgroundColor: theme.colors.secondary[50],
              padding: theme.spacing[4],
              borderRadius: theme.borderRadius.full,
              marginBottom: theme.spacing[3]
            }}>
              <Ionicons 
                name="heart" 
                size={32} 
                color={theme.colors.secondary[500]} 
              />
            </View>
            <Text style={{
              fontSize: theme.typography.fontSize['3xl'],
              fontWeight: '800' as any,
              color: theme.semantic.text.primary,
              textAlign: 'center'
            }}>
              Olá, Cliente! 👋
            </Text>
            <Text style={{
              fontSize: theme.typography.fontSize.base,
              color: theme.semantic.text.secondary,
              textAlign: 'center',
              marginTop: theme.spacing[1]
            }}>
              Bem-vindo ao BM Espaço Saúde
            </Text>
          </View>
        </Card>

        <View style={{ padding: theme.spacing[6], paddingTop: 0 }}>
          {/* Next Appointments */}
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
            {nextAppointments.length > 0 ? (
              nextAppointments.map((appointment, index) => (
                <View
                  key={appointment.id}
                  style={{
                    backgroundColor: theme.colors.primary[50],
                    borderRadius: theme.borderRadius.lg,
                    padding: theme.spacing[4],
                    marginBottom: index < nextAppointments.length - 1 ? theme.spacing[3] : 0,
                    borderLeftWidth: 4,
                    borderLeftColor: theme.colors.primary[500]
                  }}
                >
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <View style={{ flex: 1 }}>
                      <Text style={{ 
                        fontSize: theme.typography.fontSize.lg, 
                        fontWeight: '600' as any, 
                        color: theme.semantic.text.primary,
                        marginBottom: theme.spacing[1]
                      }}>
                        {appointment.type}
                      </Text>
                      <Text style={{ 
                        fontSize: theme.typography.fontSize.sm, 
                        color: theme.semantic.text.secondary 
                      }}>
                        {appointment.doctor}
                      </Text>
                    </View>
                    <View style={{ alignItems: 'flex-end' }}>
                      <View style={{
                        backgroundColor: theme.colors.primary[500],
                        paddingHorizontal: theme.spacing[2],
                        paddingVertical: theme.spacing[1],
                        borderRadius: theme.borderRadius.md,
                        marginBottom: theme.spacing[1]
                      }}>
                        <Text style={{ 
                          fontSize: theme.typography.fontSize.xs, 
                          fontWeight: '600' as any, 
                          color: theme.colors.white
                        }}>
                          {appointment.date}
                        </Text>
                      </View>
                      <Text style={{ 
                        fontSize: theme.typography.fontSize.sm, 
                        color: theme.semantic.text.secondary 
                      }}>
                        {appointment.time}
                      </Text>
                    </View>
                  </View>
                </View>
              ))
            ) : (
              <View style={{ alignItems: 'center', padding: theme.spacing[5] }}>
                <Ionicons 
                  name="calendar-outline" 
                  size={48} 
                  color={theme.colors.gray[400]} 
                />
                <Text style={{ 
                  fontSize: theme.typography.fontSize.base, 
                  color: theme.semantic.text.secondary, 
                  marginTop: theme.spacing[2], 
                  textAlign: 'center' 
                }}>
                  Nenhuma consulta agendada
                </Text>
              </View>
            )}
          </Card>

          {/* Quick Actions */}
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
              {quickActions.map((action, index) => (
                <CustomButton
                  key={index}
                  title={action.title}
                  variant="primary"
                  icon={action.icon as any}
                  onPress={() => {}}
                  style={{
                    backgroundColor: action.color,
                    flex: 1,
                    minWidth: '45%'
                  }}
                />
              ))}
            </View>
          </Card>

          {/* Health Tips */}
          <Card variant="elevated" padding="lg">
            <View style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginBottom: theme.spacing[4]
            }}>
              <Ionicons 
                name="bulb" 
                size={24} 
                color={theme.colors.accent[500]} 
              />
              <Text style={{ 
                fontSize: theme.typography.fontSize.xl, 
                fontWeight: '600' as any, 
                color: theme.semantic.text.primary,
                marginLeft: theme.spacing[2]
              }}>
                Dica de Saúde
              </Text>
            </View>
            
            <View style={{
              backgroundColor: theme.colors.accent[50],
              borderRadius: theme.borderRadius.lg,
              padding: theme.spacing[4],
              borderLeftWidth: 4,
              borderLeftColor: theme.colors.accent[500]
            }}>
              <Text style={{ 
                fontSize: theme.typography.fontSize.base, 
                color: theme.colors.accent[700], 
                lineHeight: 22 
              }}>
                💡 Lembre-se de manter uma postura correta durante o trabalho. 
                Faça pausas regulares e pratique os exercícios recomendados pelo fisioterapeuta!
              </Text>
            </View>
          </Card>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
