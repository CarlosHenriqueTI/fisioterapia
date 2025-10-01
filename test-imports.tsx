// Arquivo de teste para verificar se as importações funcionam
import { useAuthStore } from '@/stores';
import { validationSchemas } from '@/utils/validation';

// Teste básico das importações
export default function TestImports() {
  const { login, isLoading } = useAuthStore();
  
  const testValidation = () => {
    const data = { email: 'test@test.com', password: '123' };
    const validation = validationSchemas.login.validate(data);
    console.log('Validation result:', validation);
  };

  return null; // Component apenas para teste
}
