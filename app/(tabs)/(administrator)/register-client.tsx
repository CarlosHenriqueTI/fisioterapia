import { api } from '@/services/auth';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';

import { Card, CustomButton, CustomInput } from '@/components';
import { theme } from '@/theme';
import { useErrorHandler } from '@/utils/errorHandler';
import { validationSchemas } from '@/utils/validation';

export default function RegisterClientPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    birthDate: '',
    address: '',
    observations: ''
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isLoading, setIsLoading] = useState(false);

  const { handleError } = useErrorHandler();

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Limpar erro do campo quando usuário digitar
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleSubmit = async () => {
    // Validar formulário
    const validation = validationSchemas.clientRegistration.validate(formData);
    
    if (!validation.isValid) {
      const errorMap: { [key: string]: string } = {};
      validation.errors.forEach((error) => {
        errorMap[error.field] = error.message;
      });
      setErrors(errorMap);
      Toast.show({ type: 'error', text1: 'Erro', text2: 'Verifique os campos destacados' });
      return;
    }

    setErrors({});
    setIsLoading(true);

    try {
      const response = await api.post('/clients', formData);

      if (response.status === 201) {
        Toast.show({ type: 'success', text1: 'Sucesso', text2: 'Cliente cadastrado com sucesso!' });
        setFormData({
          name: '',
          email: '',
          password: '',
          phone: '',
          birthDate: '',
          address: '',
          observations: ''
        });
      } else {
        Toast.show({ type: 'error', text1: 'Erro', text2: 'Erro ao cadastrar cliente.' });
      }
    } catch (error) {
      handleError(error, 'RegisterClient');
    } finally {
      setIsLoading(false);
    }
  };

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
                Cadastrar Cliente
              </Text>
              <Text style={{
                fontSize: theme.typography.fontSize.xs,
                color: 'rgba(255, 255, 255, 0.9)',
                marginTop: theme.spacing[1],
              }}>
                Preencha os dados
              </Text>
            </View>
            <View style={{
              backgroundColor: 'rgba(255, 255, 255, 0.2)',
              padding: theme.spacing[3],
              borderRadius: theme.borderRadius.full,
            }}>
              <Ionicons name="person-add" size={32} color={theme.colors.white} />
            </View>
          </View>
        </LinearGradient>

        {/* Form */}
        <View style={{ paddingHorizontal: theme.spacing[4], paddingVertical: theme.spacing[4], marginTop: theme.spacing[4] }}>
        <Card 
          variant="elevated" 
          padding="lg"
          style={{ 
            borderRadius: theme.borderRadius.xl,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 8,
            elevation: 3,
          }}
        >
          <Text style={{
            fontSize: theme.typography.fontSize.lg,
            fontWeight: '600' as any,
            color: theme.semantic.text.primary,
            marginBottom: theme.spacing[4]
          }}>
            Dados Pessoais
          </Text>

          <CustomInput
            label="Nome Completo"
            placeholder="Digite o nome completo"
            value={formData.name}
            onChangeText={(text) => handleInputChange('name', text)}
            error={errors.name}
            required
          />

          <CustomInput
            label="Email"
            type="email"
            placeholder="exemplo@email.com"
            value={formData.email}
            onChangeText={(text) => handleInputChange('email', text)}
            error={errors.email}
            required
          />

          <CustomInput
            label="Senha"
            type="password"
            placeholder="Digite uma senha segura"
            value={formData.password}
            onChangeText={(text) => handleInputChange('password', text)}
            error={errors.password}
            required
          />

          <CustomInput
            label="Telefone"
            type="phone"
            placeholder="(11) 99999-9999"
            value={formData.phone}
            onChangeText={(text) => handleInputChange('phone', text)}
            error={errors.phone}
            required
          />

          <View style={{
            height: 1,
            backgroundColor: theme.semantic.border.light,
            marginVertical: theme.spacing[5]
          }} />

          <Text style={{
            fontSize: theme.typography.fontSize.lg,
            fontWeight: '600' as any,
            color: theme.semantic.text.primary,
            marginBottom: theme.spacing[4]
          }}>
            Informações Adicionais
          </Text>

          <CustomInput
            label="Data de Nascimento"
            placeholder="DD/MM/AAAA"
            value={formData.birthDate}
            onChangeText={(text) => handleInputChange('birthDate', text)}
            error={errors.birthDate}
          />

          <CustomInput
            label="Endereço"
            placeholder="Rua, número, bairro, cidade"
            value={formData.address}
            onChangeText={(text) => handleInputChange('address', text)}
            error={errors.address}
            multiline
          />

          <CustomInput
            label="Observações"
            placeholder="Informações adicionais sobre o cliente"
            value={formData.observations}
            onChangeText={(text) => handleInputChange('observations', text)}
            error={errors.observations}
            multiline
            style={{ minHeight: 80 }}
          />

          <CustomButton
            title={isLoading ? 'Cadastrando...' : 'Cadastrar Cliente'}
            onPress={handleSubmit}
            loading={isLoading}
            disabled={isLoading}
            variant="secondary"
            size="large"
            icon="person-add"
            style={{ marginTop: theme.spacing[4] }}
          />
        </Card>
        </View>
      </ScrollView>
      <Toast />
    </SafeAreaView>
  );
}