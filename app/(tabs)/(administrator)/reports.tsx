
import { api } from '@/services/auth';
import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect } from 'expo-router';
import { useCallback, useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Card, CustomButton, LoadingSpinner } from '@/components';
import { theme } from '@/theme';


interface Stat {
  label: string;
  value: string;
}

interface ReportItem {
  title: string;
  description: string;
  icon: string;
  color: string;
}

const reports: ReportItem[] = [
  {
    title: 'Consultas por mês',
    description: 'Veja o total de consultas realizadas no mês.',
    icon: 'calendar',
    color: '#2563eb',
  },
  {
    title: 'Clientes ativos',
    description: 'Total de clientes cadastrados e ativos.',
    icon: 'people',
    color: '#059669',
  },
  {
    title: 'Receita estimada',
    description: 'Receita total baseada nas consultas.',
    icon: 'cash',
    color: '#dc2626',
  },
];

export default function ReportsPage() {
  const [stats, setStats] = useState<Stat[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchReportData = async () => {
    setIsLoading(true);
    try {
      // Fazendo as requisições em paralelo para otimizar
      const [appointmentsRes, clientsRes] = await Promise.all([
        api.get('/appointments'),
        api.get('/clients')
      ]);

      // Lógica de cálculo (exemplo simples)
      const monthlyAppointments = appointmentsRes.data.length;
      const totalClients = clientsRes.data.length;

      const generatedStats = [
        { label: 'Total de Consultas', value: `${monthlyAppointments}`},
        { label: 'Receita Estimada', value: `R$ ${(monthlyAppointments * 120).toFixed(2)}`},
        { label: 'Total de Clientes', value: `${totalClients}`},
        { label: 'Taxa de Ocupação', value: '87%'},
      ];

      setStats(generatedStats);

    } catch (error) {
      console.error("Erro ao gerar relatórios:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchReportData();
    }, [])
  );
  
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
              backgroundColor: theme.colors.accent[50],
              padding: theme.spacing[3],
              borderRadius: theme.borderRadius.full,
              marginBottom: theme.spacing[3]
            }}>
              <Ionicons 
                name="bar-chart" 
                size={32} 
                color={theme.colors.accent[500]} 
              />
            </View>
            <Text style={{
              fontSize: theme.typography.fontSize['3xl'],
              fontWeight: '800' as any,
              color: theme.semantic.text.primary,
              textAlign: 'center'
            }}>
              Relatórios
            </Text>
            <Text style={{
              fontSize: theme.typography.fontSize.base,
              color: theme.semantic.text.secondary,
              textAlign: 'center',
              marginTop: theme.spacing[1]
            }}>
              Análises e estatísticas do sistema
            </Text>
          </View>
        </Card>
        <View style={{ padding: theme.spacing[6], paddingTop: 0 }}>
          {/* Quick Stats */}
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
                name="stats-chart" 
                size={24} 
                color={theme.colors.primary[500]} 
              />
              <Text style={{ 
                fontSize: theme.typography.fontSize.xl, 
                fontWeight: '600' as any, 
                color: theme.semantic.text.primary,
                marginLeft: theme.spacing[2]
              }}>
                Resumo Geral
              </Text>
            </View>

            {isLoading ? (
              <View style={{ 
                alignItems: 'center', 
                paddingVertical: theme.spacing[8] 
              }}>
                <LoadingSpinner size="large" />
                <Text style={{
                  fontSize: theme.typography.fontSize.base,
                  color: theme.semantic.text.secondary,
                  marginTop: theme.spacing[3]
                }}>
                  Carregando estatísticas...
                </Text>
              </View>
            ) : (
              <View style={{ 
                flexDirection: 'row', 
                flexWrap: 'wrap', 
                gap: theme.spacing[3] 
              }}>
                {stats.map((stat, index) => (
                  <Card
                    key={index}
                    variant="outlined"
                    padding="md"
                    style={{
                      flex: 1,
                      minWidth: '45%',
                      backgroundColor: theme.colors.primary[50]
                    }}
                  >
                    <Text style={{ 
                      fontSize: theme.typography.fontSize.sm, 
                      color: theme.semantic.text.secondary, 
                      marginBottom: theme.spacing[1] 
                    }}>
                      {stat.label}
                    </Text>
                    <Text style={{ 
                      fontSize: theme.typography.fontSize['2xl'], 
                      fontWeight: '700' as any, 
                      color: theme.colors.primary[700]
                    }}>
                      {stat.value}
                    </Text>
                  </Card>
                ))}
              </View>
            )}
          </Card>

          {/* Reports List */}
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
                name="document-text" 
                size={24} 
                color={theme.colors.secondary[500]} 
              />
              <Text style={{ 
                fontSize: theme.typography.fontSize.xl, 
                fontWeight: '600' as any, 
                color: theme.semantic.text.primary,
                marginLeft: theme.spacing[2]
              }}>
                Relatórios Disponíveis
              </Text>
            </View>

            {reports.map((report, index) => (
              <Card
                key={index}
                variant="outlined"
                padding="md"
                style={{ 
                  marginBottom: theme.spacing[3],
                  borderLeftWidth: 4,
                  borderLeftColor: report.color
                }}
              >
                <View style={{
                  flexDirection: 'row',
                  alignItems: 'center'
                }}>
                  <View style={{
                    backgroundColor: `${report.color}15`,
                    borderRadius: theme.borderRadius.lg,
                    padding: theme.spacing[2],
                    marginRight: theme.spacing[3]
                  }}>
                    <Ionicons 
                      name={report.icon as any} 
                      size={24} 
                      color={report.color} 
                    />
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={{ 
                      fontSize: theme.typography.fontSize.md, 
                      fontWeight: '600' as any, 
                      color: theme.semantic.text.primary, 
                      marginBottom: theme.spacing[1] 
                    }}>
                      {report.title}
                    </Text>
                    <Text style={{ 
                      fontSize: theme.typography.fontSize.sm, 
                      color: theme.semantic.text.secondary 
                    }}>
                      {report.description}
                    </Text>
                  </View>
                  <Ionicons 
                    name="chevron-forward" 
                    size={20} 
                    color={theme.colors.gray[400]} 
                  />
                </View>
              </Card>
            ))}
          </Card>

          {/* Export Options */}
          <Card variant="elevated" padding="lg">
            <View style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginBottom: theme.spacing[4]
            }}>
              <Ionicons 
                name="download" 
                size={24} 
                color={theme.colors.accent[500]} 
              />
              <Text style={{ 
                fontSize: theme.typography.fontSize.xl, 
                fontWeight: '600' as any, 
                color: theme.semantic.text.primary,
                marginLeft: theme.spacing[2]
              }}>
                Exportar Dados
              </Text>
            </View>
            
            <View style={{ 
              flexDirection: 'row', 
              gap: theme.spacing[3] 
            }}>
              <CustomButton
                title="Exportar PDF"
                variant="primary"
                icon="document-text"
                onPress={() => {}}
                style={{
                  flex: 1,
                  backgroundColor: theme.colors.error[500]
                }}
              />

              <CustomButton
                title="Exportar Excel"
                variant="primary"
                icon="grid"
                onPress={() => {}}
                style={{
                  flex: 1,
                  backgroundColor: theme.colors.success[500]
                }}
              />
            </View>
          </Card>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
