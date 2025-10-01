import { Card, CustomButton } from '@/components';
import { theme } from '@/theme';
import { Link } from 'expo-router';
import { Image, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function SelectionScreen() {
  return (
    <SafeAreaView style={{ 
      flex: 1, 
      backgroundColor: theme.semantic.background.secondary 
    }}>
      <View style={{ 
        flex: 1, 
        justifyContent: 'center', 
        alignItems: 'center', 
        padding: theme.spacing[6] 
      }}>
        {/* Logo Card */}
        <Card 
          variant="elevated" 
          padding="xl"
          style={{ marginBottom: theme.spacing[8], width: '100%' }}
        >
          <View style={{ alignItems: 'center' }}>
            <Image
              source={require('../assets/images/logo.jpeg')}
              style={{ 
                width: 160, 
                height: 160, 
                borderRadius: theme.borderRadius.xl,
                marginBottom: theme.spacing[4]
              }}
              resizeMode="cover"
              accessibilityLabel="Logo BM Espaço Saúde"
            />
            
            <Text style={{
              fontSize: theme.typography.fontSize['4xl'],
              fontWeight: '800' as any,
              color: theme.colors.primary[600],
              textAlign: 'center',
              marginBottom: theme.spacing[2]
            }}>
              BM Espaço Saúde
            </Text>
            
            <Text style={{
              fontSize: theme.typography.fontSize.lg,
              color: theme.semantic.text.secondary,
              textAlign: 'center'
            }}>
              Fisioterapia e Bem-estar
            </Text>
          </View>
        </Card>

        {/* Botões de seleção */}
        <Card variant="elevated" padding="lg" style={{ width: '100%' }}>
          <Text style={{
            fontSize: theme.typography.fontSize.xl,
            fontWeight: '600' as any,
            color: theme.semantic.text.primary,
            textAlign: 'center',
            marginBottom: theme.spacing[6]
          }}>
            Selecione sua área de acesso
          </Text>
          
          <View style={{ gap: theme.spacing[4] }}>
            <Link href="/(administrator)/login" asChild>
              <CustomButton
                title="Área do Administrador"
                variant="primary"
                size="large"
                icon="medical"
                onPress={() => {}}
              />
            </Link>

            <Link href="/(client)/login" asChild>
              <CustomButton
                title="Área do Cliente"
                variant="secondary"
                size="large"
                icon="person"
                onPress={() => {}}
              />
            </Link>
          </View>
          
          <Text style={{
            fontSize: theme.typography.fontSize.sm,
            color: theme.semantic.text.tertiary,
            textAlign: 'center',
            marginTop: theme.spacing[6]
          }}>
            Escolha a área correspondente ao seu perfil de usuário
          </Text>
        </Card>
      </View>
    </SafeAreaView>
  );
}
