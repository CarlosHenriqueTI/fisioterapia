import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect } from 'expo-router';
import { useCallback, useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';

import { Card, LoadingSpinner } from '@/components';
import { useClientAuth } from '@/contexts/ClientAuthContext';
import { api } from '@/services/auth';
import { theme } from '@/theme';
import { useErrorHandler } from '@/utils/errorHandler';

interface Appointment {
  id: number;
  date: string;
  time: string;
  type: string;
  doctor: string;
  status: 'Concluído' | 'Faltou' | 'Cancelado';
  notes: string;
}

// Função utilitária para status
function getStatusConfig(status: Appointment['status']) {
  switch (status) {
    case 'Concluído':
      return { 
        bg: theme.colors.secondary[50], 
        color: theme.colors.secondary[700], 
        icon: 'checkmark-circle' as const
      };
    case 'Faltou':
      return { 
        bg: theme.colors.error[50], 
        color: theme.colors.error[500], 
        icon: 'close-circle' as const
      };
    case 'Cancelado':
      return { 
        bg: theme.colors.accent[50], 
        color: theme.colors.accent[700], 
        icon: 'remove-circle' as const
      };
    default:
      return { 
        bg: theme.colors.gray[50], 
        color: theme.colors.gray[700], 
        icon: 'help-circle' as const
      };
  }
}

export default function History() {
  const { client } = useClientAuth();
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const { handleError } = useErrorHandler();

  const fetchHistory = async () => {
    if (!client) return;
    
    setIsLoading(true);
    try {
      // Busca consultas que já aconteceram
      const response = await api.get('/appointments', {
        params: {
          clientId: client.id,
          status: ['Concluído', 'Faltou', 'Cancelado']
        }
      });
      setAppointments(response.data);
    } catch (error) {
      handleError(error, 'CustomerHistory');
    } finally {
      setIsLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchHistory();
    }, [client])
  );

  const totalSessions = appointments.filter(app => app.status === 'Concluído').length;
  const totalMissed = appointments.filter(app => app.status === 'Faltou').length;
  const totalCanceled = appointments.filter(app => app.status === 'Cancelado').length;

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
                name="library" 
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
              Histórico
            </Text>
            <Text style={{
              fontSize: theme.typography.fontSize.base,
              color: theme.semantic.text.secondary,
              textAlign: 'center',
              marginTop: theme.spacing[1]
            }}>
              Suas consultas anteriores
            </Text>
          </View>
        </Card>

        <View style={{ paddingHorizontal: theme.spacing[6] }}>
          {/* Loading State */}
          {isLoading && (
            <Card variant="outlined" padding="xl" style={{ marginBottom: theme.spacing[4] }}>
              <LoadingSpinner size="large" color={theme.colors.primary[500]} />
              <Text style={{
                textAlign: 'center',
                marginTop: theme.spacing[2],
                color: theme.semantic.text.secondary
              }}>
                Carregando histórico...
              </Text>
            </Card>
          )}

          {/* Stats */}
          {!isLoading && (
            <>
              <View style={{ 
                flexDirection: 'row', 
                gap: theme.spacing[3], 
                marginBottom: theme.spacing[6] 
              }}>
                <Card 
                  variant="elevated"
                  padding="md"
                  style={{ flex: 1 }}
                >
                  <View style={{ alignItems: 'center' }}>
                    <View style={{
                      backgroundColor: theme.colors.secondary[50],
                      padding: theme.spacing[2],
                      borderRadius: theme.borderRadius.md,
                      marginBottom: theme.spacing[2]
                    }}>
                      <Ionicons 
                        name="checkmark-done" 
                        size={24} 
                        color={theme.colors.secondary[500]} 
                      />
                    </View>
                    <Text style={{
                      fontSize: theme.typography.fontSize['2xl'],
                      fontWeight: '800' as any,
                      color: theme.semantic.text.primary
                    }}>
                      {totalSessions}
                    </Text>
                    <Text style={{
                      fontSize: theme.typography.fontSize.sm,
                      color: theme.semantic.text.secondary,
                      textAlign: 'center'
                    }}>
                      Concluídas
                    </Text>
                  </View>
                </Card>

                <Card 
                  variant="elevated"
                  padding="md"
                  style={{ flex: 1 }}
                >
                  <View style={{ alignItems: 'center' }}>
                    <View style={{
                      backgroundColor: theme.colors.error[50],
                      padding: theme.spacing[2],
                      borderRadius: theme.borderRadius.md,
                      marginBottom: theme.spacing[2]
                    }}>
                      <Ionicons 
                        name="close-circle" 
                        size={24} 
                        color={theme.colors.error[500]} 
                      />
                    </View>
                    <Text style={{
                      fontSize: theme.typography.fontSize['2xl'],
                      fontWeight: '800' as any,
                      color: theme.semantic.text.primary
                    }}>
                      {totalMissed}
                    </Text>
                    <Text style={{
                      fontSize: theme.typography.fontSize.sm,
                      color: theme.semantic.text.secondary,
                      textAlign: 'center'
                    }}>
                      Faltou
                    </Text>
                  </View>
                </Card>

                <Card 
                  variant="elevated"
                  padding="md"
                  style={{ flex: 1 }}
                >
                  <View style={{ alignItems: 'center' }}>
                    <View style={{
                      backgroundColor: theme.colors.accent[50],
                      padding: theme.spacing[2],
                      borderRadius: theme.borderRadius.md,
                      marginBottom: theme.spacing[2]
                    }}>
                      <Ionicons 
                        name="ban" 
                        size={24} 
                        color={theme.colors.accent[500]} 
                      />
                    </View>
                    <Text style={{
                      fontSize: theme.typography.fontSize['2xl'],
                      fontWeight: '800' as any,
                      color: theme.semantic.text.primary
                    }}>
                      {totalCanceled}
                    </Text>
                    <Text style={{
                      fontSize: theme.typography.fontSize.sm,
                      color: theme.semantic.text.secondary,
                      textAlign: 'center'
                    }}>
                      Canceladas
                    </Text>
                  </View>
                </Card>
              </View>

              {/* Appointments List */}
              <Text style={{
                fontSize: theme.typography.fontSize.xl,
                fontWeight: '700' as any,
                color: theme.semantic.text.primary,
                marginBottom: theme.spacing[4]
              }}>
                Todas as Consultas
              </Text>

              {appointments.length === 0 ? (
                <Card variant="outlined" padding="xl">
                  <View style={{ alignItems: 'center' }}>
                    <Ionicons 
                      name="document-outline" 
                      size={48} 
                      color={theme.colors.gray[400]} 
                    />
                    <Text style={{
                      fontSize: theme.typography.fontSize.lg,
                      fontWeight: '600' as any,
                      color: theme.semantic.text.secondary,
                      marginTop: theme.spacing[3],
                      textAlign: 'center'
                    }}>
                      Nenhuma consulta no histórico
                    </Text>
                    <Text style={{
                      fontSize: theme.typography.fontSize.sm,
                      color: theme.semantic.text.tertiary,
                      marginTop: theme.spacing[2],
                      textAlign: 'center'
                    }}>
                      Suas consultas aparecerão aqui após serem concluídas
                    </Text>
                  </View>
                </Card>
              ) : (
                appointments.map((appointment) => {
                  const statusConfig = getStatusConfig(appointment.status);
                  return (
                    <Card 
                      key={appointment.id}
                      variant="elevated" 
                      padding="lg"
                      style={{ marginBottom: theme.spacing[3] }}
                    >
                      <View style={{ 
                        flexDirection: 'row', 
                        justifyContent: 'space-between', 
                        alignItems: 'flex-start',
                        marginBottom: theme.spacing[2]
                      }}>
                        <View style={{ flex: 1 }}>
                          <Text style={{
                            fontSize: theme.typography.fontSize.lg,
                            fontWeight: '700' as any,
                            color: theme.semantic.text.primary,
                            marginBottom: theme.spacing[1]
                          }}>
                            {appointment.type}
                          </Text>
                          <Text style={{
                            fontSize: theme.typography.fontSize.sm,
                            color: theme.semantic.text.secondary,
                            marginBottom: theme.spacing[1]
                          }}>
                            Dr(a). {appointment.doctor}
                          </Text>
                          <View style={{ 
                            flexDirection: 'row', 
                            alignItems: 'center',
                            marginBottom: theme.spacing[2] 
                          }}>
                            <Ionicons 
                              name="calendar-outline" 
                              size={16} 
                              color={theme.colors.gray[500]} 
                            />
                            <Text style={{
                              fontSize: theme.typography.fontSize.sm,
                              color: theme.semantic.text.secondary,
                              marginLeft: theme.spacing[1]
                            }}>
                              {appointment.date} às {appointment.time}
                            </Text>
                          </View>
                        </View>
                        
                        <View style={{
                          backgroundColor: statusConfig.bg,
                          paddingHorizontal: theme.spacing[2],
                          paddingVertical: theme.spacing[1],
                          borderRadius: theme.borderRadius.md,
                          flexDirection: 'row',
                          alignItems: 'center'
                        }}>
                          <Ionicons 
                            name={statusConfig.icon} 
                            size={14} 
                            color={statusConfig.color}
                            style={{ marginRight: theme.spacing[1] }}
                          />
                          <Text style={{
                            fontSize: theme.typography.fontSize.xs,
                            fontWeight: '600' as any,
                            color: statusConfig.color
                          }}>
                            {appointment.status}
                          </Text>
                        </View>
                      </View>

                      {/* Notes */}
                      {appointment.notes && (
                        <View style={{
                          backgroundColor: theme.colors.gray[50],
                          padding: theme.spacing[3],
                          borderRadius: theme.borderRadius.md,
                          borderLeftWidth: 3,
                          borderLeftColor: theme.colors.primary[500]
                        }}>
                          <View style={{ 
                            flexDirection: 'row', 
                            alignItems: 'center',
                            marginBottom: theme.spacing[1] 
                          }}>
                            <Ionicons 
                              name="document-text" 
                              size={16} 
                              color={theme.colors.primary[500]} 
                            />
                            <Text style={{
                              fontSize: theme.typography.fontSize.sm,
                              fontWeight: '600' as any,
                              color: theme.semantic.text.primary,
                              marginLeft: theme.spacing[1]
                            }}>
                              Observações:
                            </Text>
                          </View>
                          <Text style={{
                            fontSize: theme.typography.fontSize.sm,
                            color: theme.semantic.text.secondary,
                            lineHeight: 18
                          }}>
                            {appointment.notes}
                          </Text>
                        </View>
                      )}
                    </Card>
                  );
                })
              )}
            </>
          )}
        </View>
      </ScrollView>
      <Toast />
    </SafeAreaView>
  );
}
