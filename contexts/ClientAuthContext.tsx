// contexts/ClientAuthContext.tsx
import { CLIENT_SESSION_KEY } from '@/app/(client)/login'; // Ajuste o caminho se necessário
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';
import { createContext, ReactNode, useContext, useEffect, useState } from 'react';

// Definindo a interface do Cliente
interface Client {
  id: number;
  name: string;
  email: string;
  phone: string;
  birthDate: string;
  address: string;
  emergencyContact: string;
  medicalHistory: string;
}

// Definindo a interface do Contexto
interface ClientAuthContextType {
  client: Client | null;
  setClient: (client: Client | null) => void;
  isLoading: boolean;
  logout: () => void;
}

const ClientAuthContext = createContext<ClientAuthContextType | undefined>(undefined);

export const ClientAuthProvider = ({ children }: { children: ReactNode }) => {
  const [client, setClient] = useState<Client | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadClientData = async () => {
      try {
        const clientDataString = await AsyncStorage.getItem(CLIENT_SESSION_KEY);
        if (clientDataString) {
          setClient(JSON.parse(clientDataString));
        }
      } catch (e) {
        console.error("Failed to load client data.", e);
      } finally {
        setIsLoading(false);
      }
    };

    loadClientData();
  }, []);

  const logout = async () => {
    await AsyncStorage.removeItem(CLIENT_SESSION_KEY);
    setClient(null);
    router.replace('/selection');
  };

  return (
    <ClientAuthContext.Provider value={{ client, setClient, isLoading, logout }}>
      {children}
    </ClientAuthContext.Provider>
  );
};

export const useClientAuth = () => {
  const context = useContext(ClientAuthContext);
  if (context === undefined) {
    throw new Error('useClientAuth must be used within a ClientAuthProvider');
  }
  return context;
};