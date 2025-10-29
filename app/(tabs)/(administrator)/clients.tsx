import { api } from '@/services/auth';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { router, useFocusEffect } from 'expo-router';
import { useCallback, useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Card, CustomButton, CustomInput, LoadingSpinner } from '@/components';
import { theme } from '@/theme';

// Interface para definir a estrutura de um cliente
interface Client {
  id: number;
  name: string;
  email: string;
  phone: string;
  status?: 'Ativo' | 'Inativo'; // Status é opcional
}

export default function ClientsPage() {
  const [searchText, setSearchText] = useState('');
  const [clients, setClients] = useState<Client[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchClients = async () => {
    setIsLoading(true);
    try {
      const response = await api.get('/clients');
      setClients(response.data);
    } catch (error) {
      console.error("Erro ao buscar clientes:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // useFocusEffect para recarregar os dados sempre que a tela receber foco
  useFocusEffect(
    useCallback(() => {
      fetchClients();
    }, [])
  );

  const filteredClients = clients.filter(client =>
    client.name.toLowerCase().includes(searchText.toLowerCase()) ||
    client.email.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
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
                Clientes
              </Text>
              <Text style={{
                fontSize: theme.typography.fontSize.xs,
                color: 'rgba(255, 255, 255, 0.9)',
                marginTop: theme.spacing[1],
              }}>
                Gerenciar cadastros
              </Text>
            </View>
            <View style={{
              backgroundColor: 'rgba(255, 255, 255, 0.2)',
              padding: theme.spacing[3],
              borderRadius: theme.borderRadius.full,
            }}>
              <Ionicons name="people" size={32} color={theme.colors.white} />
            </View>
          </View>
        </LinearGradient>

        <View style={{ paddingHorizontal: theme.spacing[4], paddingVertical: theme.spacing[4], marginTop: theme.spacing[4], flex: 1 }}>
        {/* Search Bar */}
        <CustomInput
          placeholder="Buscar clientes..."
          value={searchText}
          onChangeText={setSearchText}
          icon="search"
          style={{ marginBottom: theme.spacing[4] }}
        />

        {/* Add Client Button */}
        <CustomButton
          title="Cadastrar Novo Cliente"
          variant="primary"
          size="large"
          icon="person-add"
          onPress={() => router.push('/register-client')}
          style={{ marginBottom: theme.spacing[6] }}
        />

        {/* Loading State */}
        {isLoading ? (
          <Card variant="outlined" padding="xl" style={{ borderRadius: theme.borderRadius.xl }}>
            <View style={{ alignItems: 'center' }}>
              <LoadingSpinner size="large" />
              <Text style={{
                fontSize: theme.typography.fontSize.base,
                color: theme.semantic.text.secondary,
                marginTop: theme.spacing[4]
              }}>
                Carregando clientes...
              </Text>
            </View>
          </Card>
        ) : (
          /* Clients List */
          <View style={{ flex: 1 }}>
            {filteredClients.length === 0 ? (
              <Card variant="outlined" padding="xl" style={{ borderRadius: theme.borderRadius.xl }}>
                <View style={{ alignItems: 'center' }}>
                  <Ionicons 
                    name="people-outline" 
                    size={48} 
                    color={theme.colors.gray[400]} 
                  />
                  <Text style={{
                    fontSize: theme.typography.fontSize.lg,
                    color: theme.semantic.text.secondary,
                    textAlign: 'center',
                    marginTop: theme.spacing[3]
                  }}>
                    {searchText ? 'Nenhum cliente encontrado' : 'Nenhum cliente cadastrado'}
                  </Text>
                </View>
              </Card>
            ) : (
              filteredClients.map((client) => (
                <Card
                  key={client.id}
                  variant="elevated"
                  padding="lg"
                  style={{ 
                    marginBottom: theme.spacing[4],
                    borderRadius: theme.borderRadius.xl,
                    borderLeftWidth: 4,
                    borderLeftColor: theme.colors.secondary[500],
                    shadowColor: '#000',
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.1,
                    shadowRadius: 8,
                    elevation: 3,
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
                        fontWeight: '600' as any, 
                        color: theme.semantic.text.primary, 
                        marginBottom: theme.spacing[2] 
                      }}>
                        {client.name}
                      </Text>
                      
                      <View style={{ 
                        flexDirection: 'row', 
                        alignItems: 'center',
                        marginBottom: theme.spacing[1]
                      }}>
                        <Ionicons 
                          name="mail" 
                          size={14} 
                          color={theme.semantic.text.tertiary} 
                        />
                        <Text style={{ 
                          fontSize: theme.typography.fontSize.sm, 
                          color: theme.semantic.text.secondary,
                          marginLeft: theme.spacing[2]
                        }}>
                          {client.email}
                        </Text>
                      </View>
                      
                      <View style={{ 
                        flexDirection: 'row', 
                        alignItems: 'center',
                        marginBottom: theme.spacing[3]
                      }}>
                        <Ionicons 
                          name="call" 
                          size={14} 
                          color={theme.semantic.text.tertiary} 
                        />
                        <Text style={{ 
                          fontSize: theme.typography.fontSize.sm, 
                          color: theme.semantic.text.secondary,
                          marginLeft: theme.spacing[2]
                        }}>
                          {client.phone}
                        </Text>
                      </View>
                      
                      {client.status && (
                        <View style={{
                          backgroundColor: client.status === 'Ativo' 
                            ? theme.colors.success[50] 
                            : theme.colors.error[50],
                          paddingHorizontal: theme.spacing[2],
                          paddingVertical: theme.spacing[1],
                          borderRadius: theme.borderRadius.md,
                          alignSelf: 'flex-start'
                        }}>
                          <Text style={{
                            fontSize: theme.typography.fontSize.xs,
                            fontWeight: '600' as any,
                            color: client.status === 'Ativo' 
                              ? theme.colors.success[600] 
                              : theme.colors.error[600]
                          }}>
                            {client.status}
                          </Text>
                        </View>
                      )}
                    </View>
                    
                    <View style={{
                      backgroundColor: theme.colors.primary[50],
                      padding: theme.spacing[2],
                      borderRadius: theme.borderRadius.md,
                      marginLeft: theme.spacing[3]
                    }}>
                      <Ionicons 
                        name="create-outline" 
                        size={20} 
                        color={theme.colors.primary[500]} 
                      />
                    </View>
                  </View>
                </Card>
              ))
            )}
          </View>
        )}
      </View>
      </ScrollView>
    </SafeAreaView>
  );
}