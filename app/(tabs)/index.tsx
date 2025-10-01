import { Redirect } from 'expo-router';

export default function TabsIndex() {
  // Aqui você pode checar o tipo de usuário logado e redirecionar
  // Exemplo fictício:
  const userType = 'administrator'; // Troque pela lógica real

  if (userType === 'administrator') {
    return <Redirect href="/(tabs)/(administrator)" />;
  } else {
    return <Redirect href="/(tabs)/(customers)" />;
  }
}