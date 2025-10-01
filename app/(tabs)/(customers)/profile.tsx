import { Ionicons } from '@expo/vector-icons';
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
                name="person" 
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
              Meu Perfil
            </Text>
            <Text style={{
              fontSize: theme.typography.fontSize.base,
              color: theme.semantic.text.secondary,
              textAlign: 'center',
              marginTop: theme.spacing[1]
            }}>
              Gerencie suas informações pessoais
            </Text>
          </View>
        </Card>

        <View style={{ paddingHorizontal: theme.spacing[6] }}>
          {/* Profile Form */}
          <Card variant="elevated" padding="lg" style={{ marginBottom: theme.spacing[4] }}>
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
          <Card variant="elevated" padding="lg">
            <Text style={{
              fontSize: theme.typography.fontSize.lg,
              fontWeight: '700' as any,
              color: theme.semantic.text.primary,
              marginBottom: theme.spacing[4]
            }}>
              Configurações da Conta
            </Text>

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