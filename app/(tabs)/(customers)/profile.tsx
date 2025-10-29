import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useEffect, useState } from 'react';
import { Alert, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';

import { Card, CustomButton, CustomInput } from '@/components';
import { useClientAuth } from '@/contexts/ClientAuthContext';
import { api } from '@/services/auth';
import { theme } from '@/theme';
import { useErrorHandler } from '@/utils/errorHandler';
import { formatters, validationSchemas } from '@/utils/validation';

export default function CustomerProfile() {
  const { client, logout, setClient } = useClientAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState(client);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isLoading, setIsLoading] = useState(false);

  const { handleError } = useErrorHandler();

  useEffect(() => {
    setProfileData(client);
  }, [client]);

  const handleInputChange = (field: string, value: string) => {
    if (profileData) {
      // Apply formatters for specific fields
      let formattedValue = value;
      if (field === 'phone') {
        formattedValue = formatters.phone(value);
      } else if (field === 'birthDate') {
        formattedValue = formatters.date(value);
      }
      
      setProfileData({ ...profileData, [field]: formattedValue });
      
      // Clear error for this field
      if (errors[field]) {
        setErrors(prev => ({ ...prev, [field]: '' }));
      }
    }
  };

  const handleSave = async () => {
    if (!profileData) return;

    // Validate form
    const validation = validationSchemas.clientUpdate.validate(profileData);
    
    if (!validation.isValid) {
      const errorMap: { [key: string]: string } = {};
      validation.errors.forEach((error) => {
        errorMap[error.field] = error.message;
      });
      setErrors(errorMap);
      Toast.show({ type: 'error', text1: 'Erro', text2: 'Verifique os campos destacados' });
      return;
    }

    setIsLoading(true);
    try {
      const response = await api.put(`/clients/${profileData.id}`, profileData);
      setClient(response.data);
      setIsEditing(false);
      setErrors({});
      Toast.show({ type: 'success', text1: 'Sucesso', text2: 'Perfil atualizado!' });
    } catch (error) {
      handleError(error, 'UpdateProfile');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    Alert.alert(
      'Sair',
      'Tem certeza que deseja sair da sua conta?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Sair',
          style: 'destructive',
          onPress: logout
        }
      ]
    );
  };
  
  if (!profileData) {
    return (
      <SafeAreaView style={{ 
        flex: 1, 
        backgroundColor: theme.semantic.background.secondary 
      }}>
        <Card variant="outlined" padding="xl" style={{ margin: theme.spacing[6] }}>
          <View style={{ alignItems: 'center' }}>
            <Ionicons 
              name="alert-circle" 
              size={48} 
              color={theme.colors.error[500]} 
            />
            <Text style={{
              fontSize: theme.typography.fontSize.lg,
              fontWeight: '600' as any,
              color: theme.semantic.text.primary,
              marginTop: theme.spacing[3],
              textAlign: 'center'
            }}>
              Erro ao carregar perfil
            </Text>
            <Text style={{
              fontSize: theme.typography.fontSize.sm,
              color: theme.semantic.text.secondary,
              marginTop: theme.spacing[2],
              textAlign: 'center'
            }}>
              Não foi possível carregar as informações do perfil
            </Text>
          </View>
        </Card>
      </SafeAreaView>
    );
  }
  
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
          colors={['#8b5cf6', '#7c3aed']}
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
                Meu Perfil
              </Text>
              <Text style={{
                fontSize: theme.typography.fontSize.xs,
                color: 'rgba(255, 255, 255, 0.9)',
                marginTop: theme.spacing[1],
              }}>
                Gerencie suas informações
              </Text>
            </View>
            <View style={{
              backgroundColor: 'rgba(255, 255, 255, 0.2)',
              padding: theme.spacing[3],
              borderRadius: theme.borderRadius.full,
            }}>
              <Ionicons name="person" size={32} color={theme.colors.white} />
            </View>
          </View>
        </LinearGradient>

        <View style={{ paddingHorizontal: theme.spacing[4], paddingVertical: theme.spacing[4], marginTop: theme.spacing[4] }}>
          {/* Profile Form */}
          <Card variant="elevated" padding="lg" style={{ 
            marginBottom: theme.spacing[4],
            borderRadius: theme.borderRadius.xl,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 8,
            elevation: 3,
          }}>
            <View style={{ 
              flexDirection: 'row', 
              justifyContent: 'space-between', 
              alignItems: 'center',
              marginBottom: theme.spacing[4] 
            }}>
              <Text style={{
                fontSize: theme.typography.fontSize.xl,
                fontWeight: '700' as any,
                color: theme.semantic.text.primary
              }}>
                Informações Pessoais
              </Text>
              {!isEditing && (
                <CustomButton
                  title="Editar"
                  onPress={() => setIsEditing(true)}
                  variant="outline"
                  size="small"
                  icon="create"
                />
              )}
            </View>

            <CustomInput
              label="Nome Completo"
              value={profileData.name}
              onChangeText={(text) => handleInputChange('name', text)}
              error={errors.name}
              editable={isEditing}
              required
            />

            <CustomInput
              label="Email"
              type="email"
              value={profileData.email}
              editable={false}
              style={{ 
                backgroundColor: theme.colors.gray[100] 
              }}
            />

            <CustomInput
              label="Telefone"
              type="phone"
              value={profileData.phone}
              onChangeText={(text) => handleInputChange('phone', text)}
              error={errors.phone}
              editable={isEditing}
              required
            />

            <CustomInput
              label="Data de Nascimento"
              placeholder="DD/MM/AAAA"
              value={profileData.birthDate}
              onChangeText={(text) => handleInputChange('birthDate', text)}
              error={errors.birthDate}
              editable={isEditing}
              required
            />

            <CustomInput
              label="Endereço"
              value={profileData.address}
              onChangeText={(text) => handleInputChange('address', text)}
              error={errors.address}
              editable={isEditing}
              multiline
              required
            />

            {isEditing && (
              <View style={{ 
                flexDirection: 'row', 
                gap: theme.spacing[3],
                marginTop: theme.spacing[4] 
              }}>
                <CustomButton
                  title="Cancelar"
                  onPress={() => {
                    setIsEditing(false);
                    setProfileData(client);
                    setErrors({});
                  }}
                  variant="outline"
                  size="medium"
                  icon="close"
                  style={{ flex: 1 }}
                />
                <CustomButton
                  title={isLoading ? 'Salvando...' : 'Salvar'}
                  onPress={handleSave}
                  loading={isLoading}
                  disabled={isLoading}
                  variant="secondary"
                  size="medium"
                  icon="checkmark"
                  style={{ flex: 1 }}
                />
              </View>
            )}
          </Card>

          {/* Account Actions */}
          <Card variant="elevated" padding="lg" style={{
            borderRadius: theme.borderRadius.xl,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 8,
            elevation: 3,
          }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: theme.spacing[4] }}>
              <View style={{
                backgroundColor: theme.colors.primary[50],
                padding: theme.spacing[2],
                borderRadius: theme.borderRadius.md,
                marginRight: theme.spacing[2],
              }}>
                <Ionicons name="settings" size={20} color={theme.colors.primary[500]} />
              </View>
              <Text style={{
                fontSize: theme.typography.fontSize.lg,
                fontWeight: '700' as any,
                color: theme.semantic.text.primary,
              }}>
                Configurações da Conta
              </Text>
            </View>

            <View style={{ gap: theme.spacing[3] }}>
              <View style={{
                backgroundColor: theme.colors.primary[50],
                padding: theme.spacing[4],
                borderRadius: theme.borderRadius.lg,
                borderLeftWidth: 4,
                borderLeftColor: theme.colors.primary[500]
              }}>
                <View style={{ 
                  flexDirection: 'row', 
                  alignItems: 'center',
                  marginBottom: theme.spacing[2] 
                }}>
                  <Ionicons 
                    name="information-circle" 
                    size={20} 
                    color={theme.colors.primary[500]} 
                  />
                  <Text style={{
                    fontSize: theme.typography.fontSize.sm,
                    fontWeight: '600' as any,
                    color: theme.colors.primary[700],
                    marginLeft: theme.spacing[2]
                  }}>
                    Informação da Conta
                  </Text>
                </View>
                <Text style={{
                  fontSize: theme.typography.fontSize.sm,
                  color: theme.colors.primary[600],
                  lineHeight: 18
                }}>
                  Seu email não pode ser alterado. Entre em contato com o suporte caso precise modificá-lo.
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
            </View>
          </Card>
        </View>
      </ScrollView>
      <Toast />
    </SafeAreaView>
  );
}