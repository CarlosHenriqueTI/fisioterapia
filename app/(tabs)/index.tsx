import { Redirect } from 'expo-router';

export default function TabsIndex() {
  // Redireciona para a página de seleção quando acessar /tabs diretamente
  return <Redirect href="/selection" />;
}
