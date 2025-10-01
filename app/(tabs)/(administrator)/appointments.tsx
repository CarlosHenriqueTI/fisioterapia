import { Ionicons } from '@expo/vector-icons';
import { ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Card, CustomButton } from '@/components';
import { theme } from '@/theme';

export default function AppointmentsPage() {
  const appointments = [
    { id: 1, time: '08:00', patient: 'João Silva', type: 'Fisioterapia', status: 'Confirmado' },
    { id: 2, time: '09:30', patient: 'Maria Santos', type: 'RPG', status: 'Pendente' },
    { id: 3, time: '11:00', patient: 'Pedro Lima', type: 'Pilates', status: 'Confirmado' },
    { id: 4, time: '14:00', patient: 'Ana Costa', type: 'Fisioterapia', status: 'Cancelado' },
    { id: 5, time: '15:30', patient: 'Carlos Souza', type: 'Massagem', status: 'Confirmado' },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Confirmado': return { bg: '#d1fae5', text: '#065f46' };
      case 'Pendente': return { bg: '#fef3c7', text: '#92400e' };
      case 'Cancelado': return { bg: '#fee2e2', text: '#991b1b' };
      default: return { bg: '#f3f4f6', text: '#374151' };
    }
  };

  return (
    <SafeAreaView style={{ 
      flex: 1, 
      backgroundColor: theme.semantic.background.secondary 
    }}>
      <ScrollView 
        style={{ flex: 1 }}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: theme.spacing[6] }}
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
              backgroundColor: theme.colors.primary[50],
              padding: theme.spacing[3],
              borderRadius: theme.borderRadius.full,
              marginBottom: theme.spacing[3]
            }}>
              <Ionicons 
                name="calendar" 
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
              Consultas
            </Text>
            <Text style={{
              fontSize: theme.typography.fontSize.base,
              color: theme.semantic.text.secondary,
              textAlign: 'center',
              marginTop: theme.spacing[1]
            }}>
              Gerenciar agendamentos
            </Text>
          </View>
        </Card>

        <View style={{ padding: theme.spacing[6], paddingTop: 0 }}>
          {/* Date Selector */}
          <Card
            variant="elevated"
            padding="lg"
            style={{ marginBottom: theme.spacing[5] }}
          >
            <View style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginBottom: theme.spacing[3]
            }}>
              <Ionicons 
                name="today" 
                size={20} 
                color={theme.colors.primary[500]} 
              />
              <Text style={{ 
                fontSize: theme.typography.fontSize.lg, 
                fontWeight: '600' as any, 
                color: theme.semantic.text.primary,
                marginLeft: theme.spacing[2]
              }}>
                Data Selecionada
              </Text>
            </View>
            
            <View style={{
              flexDirection: 'row',
              alignItems: 'center',
              backgroundColor: theme.colors.primary[50],
              padding: theme.spacing[3],
              borderRadius: theme.borderRadius.lg,
              borderLeftWidth: 4,
              borderLeftColor: theme.colors.primary[500]
            }}>
              <Ionicons 
                name="calendar-outline" 
                size={20} 
                color={theme.colors.primary[500]} 
              />
              <Text style={{ 
                fontSize: theme.typography.fontSize.base, 
                color: theme.semantic.text.primary, 
                marginLeft: theme.spacing[2],
                fontWeight: '500' as any
              }}>
                15 de Dezembro, 2024
              </Text>
            </View>
          </Card>

          {/* Add Appointment Button */}
          <CustomButton
            title="Nova Consulta"
            variant="primary"
            size="large"
            icon="add"
            onPress={() => {}}
            style={{ marginBottom: theme.spacing[6] }}
          />

          {/* Appointments List */}
          <View style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: theme.spacing[4]
          }}>
            <Ionicons 
              name="time" 
              size={20} 
              color={theme.colors.secondary[500]} 
            />
            <Text style={{ 
              fontSize: theme.typography.fontSize.lg, 
              fontWeight: '600' as any, 
              color: theme.semantic.text.primary,
              marginLeft: theme.spacing[2]
            }}>
              Consultas do Dia
            </Text>
          </View>
          
          {appointments.map((appointment, index) => {
            const statusColors = getStatusColor(appointment.status);
            const borderColor = appointment.status === 'Confirmado' ? theme.colors.success[500] : 
                               appointment.status === 'Pendente' ? theme.colors.warning[500] : theme.colors.error[500];
            
            return (
              <Card
                key={appointment.id}
                variant="elevated"
                padding="lg"
                style={{
                  marginBottom: theme.spacing[3],
                  borderLeftWidth: 4,
                  borderLeftColor: borderColor
                }}
              >
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <View style={{ flex: 1 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: theme.spacing[2] }}>
                      <View style={{
                        backgroundColor: theme.colors.primary[50],
                        padding: theme.spacing[1],
                        borderRadius: theme.borderRadius.md,
                        marginRight: theme.spacing[2]
                      }}>
                        <Text style={{
                          fontSize: theme.typography.fontSize.sm,
                          fontWeight: '600' as any,
                          color: theme.colors.primary[700]
                        }}>
                          {appointment.time}
                        </Text>
                      </View>
                      <Text style={{ 
                        fontSize: theme.typography.fontSize.lg, 
                        fontWeight: '600' as any, 
                        color: theme.semantic.text.primary,
                        flex: 1
                      }}>
                        {appointment.patient}
                      </Text>
                    </View>
                    
                    <Text style={{ 
                      fontSize: theme.typography.fontSize.sm, 
                      color: theme.semantic.text.secondary,
                      marginBottom: theme.spacing[2]
                    }}>
                      {appointment.type}
                    </Text>
                    
                    <View style={{
                      backgroundColor: statusColors.bg,
                      paddingHorizontal: theme.spacing[2],
                      paddingVertical: theme.spacing[1],
                      borderRadius: theme.borderRadius.md,
                      alignSelf: 'flex-start'
                    }}>
                      <Text style={{
                        fontSize: theme.typography.fontSize.xs,
                        fontWeight: '600' as any,
                        color: statusColors.text
                      }}>
                        {appointment.status}
                      </Text>
                    </View>
                  </View>
                  
                  <View style={{ flexDirection: 'row', gap: theme.spacing[2] }}>
                    <View style={{
                      backgroundColor: theme.colors.success[50],
                      padding: theme.spacing[2],
                      borderRadius: theme.borderRadius.md
                    }}>
                      <Ionicons 
                        name="checkmark" 
                        size={16} 
                        color={theme.colors.success[600]} 
                      />
                    </View>
                    <View style={{
                      backgroundColor: theme.colors.primary[50],
                      padding: theme.spacing[2],
                      borderRadius: theme.borderRadius.md
                    }}>
                      <Ionicons 
                        name="create-outline" 
                        size={16} 
                        color={theme.colors.primary[600]} 
                      />
                    </View>
                  </View>
                </View>
              </Card>
            );
          })}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
