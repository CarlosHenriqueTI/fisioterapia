import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useFocusEffect } from 'expo-router';
import { useCallback, useState } from 'react';
import { Modal, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';

import { Card, CustomButton, LoadingSpinner } from '@/components';
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
    status: 'Confirmado' | 'Pendente' | 'Cancelado' | 'Concluído';
}

function getStatusConfig(status: Appointment['status']) {
  switch (status) {
    case 'Confirmado':
      return { 
        bg: theme.colors.secondary[50], 
        text: theme.colors.secondary[700],
        icon: 'checkmark-circle' as const
      };
    case 'Pendente':
      return { 
        bg: theme.colors.accent[50], 
        text: theme.colors.accent[700],
        icon: 'time' as const
      };
    case 'Cancelado':
      return { 
        bg: theme.colors.error[50], 
        text: theme.colors.error[500],
        icon: 'close-circle' as const
      };
    case 'Concluído':
      return { 
        bg: theme.colors.primary[50], 
        text: theme.colors.primary[700],
        icon: 'checkmark-done-circle' as const
      };
    default:
      return { 
        bg: theme.colors.gray[50], 
        text: theme.colors.gray[700],
        icon: 'help-circle' as const
      };
  }
}

export default function CustomerAppointments() {
  const { client } = useClientAuth();
  const [showModal, setShowModal] = useState(false);
  const [upcomingAppointments, setUpcomingAppointments] = useState<Appointment[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  
  const { handleError } = useErrorHandler();
  
  const fetchAppointments = async () => {
    if (!client) return;
    
    setIsLoading(true);
    try {
      const response = await api.get('/appointments', {
        params: {
          clientId: client.id,
          status_ne: 'Concluído'
        }
      });
      setUpcomingAppointments(response.data);
    } catch (error) {
      handleError(error, 'CustomerAppointments');
    } finally {
      setIsLoading(false);
    }
  };

  // Mock data for available slots
  const [availableSlots] = useState([
    {
      type: 'Consulta de Fisioterapia',
      date: '2024-06-15',
      time: '10:00',
    },
    {
      type: 'Avaliação Inicial',
      date: '2024-06-16',
      time: '14:00',
    },
    {
      type: 'Reavaliação',
      date: '2024-06-17',
      time: '09:00',
    },
  ]);

  const cancelAppointment = async (appointmentId: number) => {
    try {
      await api.patch(`/appointments/${appointmentId}`, { status: 'Cancelado' });
      Toast.show({ 
        type: 'success', 
        text1: 'Sucesso', 
        text2: 'Consulta cancelada com sucesso!' 
      });
      fetchAppointments();
    } catch (error) {
      handleError(error, 'CancelAppointment');
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchAppointments();
    }, [client])
  );
  
  return (
    <>
      <SafeAreaView style={{ 
        flex: 1, 
        backgroundColor: '#f8fafc'
      }}>
        <ScrollView 
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 80 }}
        >
          {/* Header com Gradiente */}
          <LinearGradient
            colors={['#10b981', '#059669']}
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
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: theme.spacing[4] }}>
              <View style={{ flex: 1 }}>
                <Text style={{
                  fontSize: theme.typography.fontSize.xl,
                  fontWeight: '800' as any,
                  color: theme.colors.white,
                }}>
                  Minhas Consultas
                </Text>
                <Text style={{
                  fontSize: theme.typography.fontSize.xs,
                  color: 'rgba(255, 255, 255, 0.9)',
                  marginTop: theme.spacing[1],
                }}>
                  Gerencie seus agendamentos
                </Text>
              </View>
              <View style={{
                backgroundColor: 'rgba(255, 255, 255, 0.2)',
                padding: theme.spacing[3],
                borderRadius: theme.borderRadius.full,
              }}>
                <Ionicons name="calendar" size={32} color={theme.colors.white} />
              </View>
            </View>
          </LinearGradient>

          <View style={{ paddingHorizontal: theme.spacing[4], paddingVertical: theme.spacing[4], marginTop: theme.spacing[4] }}>
            {/* Loading State */}
            {isLoading && (
              <Card variant="outlined" padding="xl" style={{ 
                marginBottom: theme.spacing[4],
                borderRadius: theme.borderRadius.xl,
              }}>
                <LoadingSpinner size="large" color={theme.colors.secondary[500]} />
                <Text style={{
                  textAlign: 'center',
                  marginTop: theme.spacing[2],
                  color: theme.semantic.text.secondary
                }}>
                  Carregando consultas...
                </Text>
              </Card>
            )}

            {/* Upcoming Appointments */}
            {!isLoading && (
              <>
                <Text style={{
                  fontSize: theme.typography.fontSize.xl,
                  fontWeight: '700' as any,
                  color: theme.semantic.text.primary,
                  marginBottom: theme.spacing[4]
                }}>
                  Próximas Consultas
                </Text>
                
                {upcomingAppointments.length === 0 ? (
                  <Card variant="outlined" padding="xl" style={{ 
                    marginBottom: theme.spacing[4],
                    borderRadius: theme.borderRadius.xl,
                  }}>
                    <View style={{ alignItems: 'center' }}>
                      <Ionicons 
                        name="calendar-outline" 
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
                        Nenhuma consulta agendada
                      </Text>
                      <Text style={{
                        fontSize: theme.typography.fontSize.sm,
                        color: theme.semantic.text.tertiary,
                        marginTop: theme.spacing[2],
                        textAlign: 'center'
                      }}>
                        Agende sua próxima consulta
                      </Text>
                    </View>
                  </Card>
                ) : (
                  upcomingAppointments.map((appointment) => {
                    const statusConfig = getStatusConfig(appointment.status);
                    return (
                      <Card 
                        key={appointment.id}
                        variant="elevated" 
                        padding="lg"
                        style={{ 
                          marginBottom: theme.spacing[3],
                          borderRadius: theme.borderRadius.xl,
                          borderLeftWidth: 4,
                          borderLeftColor: statusConfig.text,
                          shadowColor: statusConfig.text,
                          shadowOffset: { width: 0, height: 4 },
                          shadowOpacity: 0.2,
                          shadowRadius: 8,
                          elevation: 4,
                        }}
                      >
                        <View style={{ 
                          flexDirection: 'row', 
                          justifyContent: 'space-between', 
                          alignItems: 'flex-start' 
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
                            <View style={{
                              backgroundColor: statusConfig.bg,
                              paddingHorizontal: theme.spacing[2],
                              paddingVertical: theme.spacing[1],
                              borderRadius: theme.borderRadius.md,
                              alignSelf: 'flex-start',
                              flexDirection: 'row',
                              alignItems: 'center'
                            }}>
                              <Ionicons 
                                name={statusConfig.icon} 
                                size={14} 
                                color={statusConfig.text}
                                style={{ marginRight: theme.spacing[1] }}
                              />
                              <Text style={{
                                fontSize: theme.typography.fontSize.xs,
                                fontWeight: '600' as any,
                                color: statusConfig.text
                              }}>
                                {appointment.status}
                              </Text>
                            </View>
                          </View>
                          
                          {appointment.status !== 'Concluído' && appointment.status !== 'Cancelado' && (
                            <CustomButton
                              title="Cancelar"
                              onPress={() => cancelAppointment(appointment.id)}
                              variant="outline"
                              size="small"
                              icon="close"
                              style={{ 
                                borderColor: theme.colors.error[500],
                                marginLeft: theme.spacing[2] 
                              }}
                            />
                          )}
                        </View>
                      </Card>
                    );
                  })
                )}
              </>
            )}

            {/* Quick Schedule Button */}
            <CustomButton
              title="Agendar Nova Consulta"
              onPress={() => setShowModal(true)}
              variant="secondary"
              size="large"
              icon="add-circle"
              style={{ marginBottom: theme.spacing[6] }}
            />

            {/* Tips */}
            <Card variant="elevated" padding="lg" style={{
              borderRadius: theme.borderRadius.xl,
              shadowColor: '#f59e0b',
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.15,
              shadowRadius: 8,
              elevation: 3,
            }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: theme.spacing[3] }}>
                <View style={{
                  backgroundColor: theme.colors.accent[50],
                  padding: theme.spacing[2],
                  borderRadius: theme.borderRadius.md,
                  marginRight: theme.spacing[3]
                }}>
                  <Ionicons 
                    name="bulb" 
                    size={24} 
                    color={theme.colors.accent[500]} 
                  />
                </View>
                <Text style={{
                  fontSize: theme.typography.fontSize.lg,
                  fontWeight: '700' as any,
                  color: theme.semantic.text.primary
                }}>
                  Dicas Importantes
                </Text>
              </View>
              
              <View style={{ paddingLeft: theme.spacing[4] }}>
                <Text style={{
                  fontSize: theme.typography.fontSize.sm,
                  color: theme.semantic.text.secondary,
                  lineHeight: 20,
                  marginBottom: theme.spacing[2]
                }}>
                  • Chegue com 15 minutos de antecedência
                </Text>
                <Text style={{
                  fontSize: theme.typography.fontSize.sm,
                  color: theme.semantic.text.secondary,
                  lineHeight: 20,
                  marginBottom: theme.spacing[2]
                }}>
                  • Traga roupas confortáveis para os exercícios
                </Text>
                <Text style={{
                  fontSize: theme.typography.fontSize.sm,
                  color: theme.semantic.text.secondary,
                  lineHeight: 20,
                  marginBottom: theme.spacing[2]
                }}>
                  • Comunique qualquer mudança em seu estado de saúde
                </Text>
                <Text style={{
                  fontSize: theme.typography.fontSize.sm,
                  color: theme.semantic.text.secondary,
                  lineHeight: 20
                }}>
                  • Cancele com pelo menos 24h de antecedência
                </Text>
              </View>
            </Card>
          </View>
        </ScrollView>
      </SafeAreaView>

      {/* Schedule Modal */}
      <Modal
        visible={showModal}
        animationType="slide"
        presentationStyle="pageSheet"
      >
        <SafeAreaView style={{ 
          flex: 1, 
          backgroundColor: theme.semantic.background.primary 
        }}>
          {/* Modal Header */}
          <Card 
            variant="elevated"
            padding="lg"
            style={{
              margin: theme.spacing[4],
              marginBottom: theme.spacing[3]
            }}
          >
            <View style={{ 
              flexDirection: 'row', 
              justifyContent: 'space-between', 
              alignItems: 'center' 
            }}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <View style={{
                  backgroundColor: theme.colors.secondary[50],
                  padding: theme.spacing[2],
                  borderRadius: theme.borderRadius.md,
                  marginRight: theme.spacing[3]
                }}>
                  <Ionicons 
                    name="calendar" 
                    size={24} 
                    color={theme.colors.secondary[500]} 
                  />
                </View>
                <Text style={{
                  fontSize: theme.typography.fontSize['2xl'],
                  fontWeight: '700' as any,
                  color: theme.semantic.text.primary
                }}>
                  Agendar Consulta
                </Text>
              </View>
              <CustomButton
                title=""
                onPress={() => setShowModal(false)}
                variant="ghost"
                size="small"
                icon="close"
              />
            </View>
          </Card>

          <ScrollView 
            style={{ flex: 1 }}
            contentContainerStyle={{ 
              paddingHorizontal: theme.spacing[4],
              paddingBottom: theme.spacing[6]
            }}
          >
            <Text style={{
              fontSize: theme.typography.fontSize.lg,
              fontWeight: '700' as any,
              color: theme.semantic.text.primary,
              marginBottom: theme.spacing[4]
            }}>
              Horários Disponíveis
            </Text>
            
            {availableSlots.map((slot, index) => (
              <Card 
                key={index}
                variant="outlined"
                padding="md"
                style={{ 
                  marginBottom: theme.spacing[3],
                  borderRadius: theme.borderRadius.xl,
                  borderWidth: 2,
                  borderColor: theme.colors.secondary[200],
                }}
              >
                <View style={{ 
                  flexDirection: 'row', 
                  justifyContent: 'space-between', 
                  alignItems: 'center' 
                }}>
                  <View style={{ flex: 1 }}>
                    <Text style={{
                      fontSize: theme.typography.fontSize.base,
                      fontWeight: '600' as any,
                      color: theme.semantic.text.primary,
                      marginBottom: theme.spacing[1]
                    }}>
                      {slot.type}
                    </Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
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
                        {slot.date} às {slot.time}
                      </Text>
                    </View>
                  </View>
                  <CustomButton
                    title="Agendar"
                    onPress={() => {
                      Toast.show({
                        type: 'success',
                        text1: 'Consulta Agendada!',
                        text2: `${slot.type} em ${slot.date} às ${slot.time}`
                      });
                      setShowModal(false);
                    }}
                    variant="secondary"
                    size="small"
                    icon="checkmark"
                  />
                </View>
              </Card>
            ))}
          </ScrollView>
        </SafeAreaView>
      </Modal>
      <Toast />
    </>
  );
}
