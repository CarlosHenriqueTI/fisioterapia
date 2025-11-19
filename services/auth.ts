import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { Platform } from 'react-native';

// Configuração para json-server rodando com --host 0.0.0.0 --port 3000
const getApiBaseUrl = () => {
  // Usando localhost com adb reverse (emulador) ou IP da rede (dispositivo físico)
  if (Platform.OS === 'web') {
    return 'http://localhost:3000';
  }
  
  // Para emulador Android com adb reverse tcp:3000 tcp:3000
  // Para dispositivo físico, use o IP: 192.168.8.52
  return 'http://10.0.2.2:3000'; // IP especial do emulador Android que aponta para localhost do PC
};

export const api = axios.create({
  baseURL: getApiBaseUrl(),
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  }
});

// Interceptor para logging de requests (apenas em desenvolvimento)
if (__DEV__) {
  api.interceptors.request.use(
    (config) => {
      console.log(`🌐 API Request: ${config.method?.toUpperCase()} ${config.baseURL}${config.url}`);
      return config;
    },
    (error) => {
      console.error('❌ API Request Error:', error);
      return Promise.reject(error);
    }
  );

  api.interceptors.response.use(
    (response) => {
      console.log(`✅ API Response: ${response.status} ${response.config.url}`);
      return response;
    },
    (error) => {
      console.error('❌ API Response Error:', {
        status: error.response?.status,
        url: error.config?.url,
        message: error.message
      });
      return Promise.reject(error);
    }
  );
}

interface User {
  id?: number;
  email: string;
  password: string;
  name?: string;
}

export const AUTH_TOKEN_KEY = '@auth_token';

export const authService = {
  async login(email: string, password: string) {
    try {
      const response = await api.get('/users', {
        params: { email, password },
      });

      if (response.data.length > 0) {
        const user = response.data[0];
        await AsyncStorage.setItem(AUTH_TOKEN_KEY, JSON.stringify(user));
        return { success: true, user };
      }
      return { success: false, message: 'Credenciais inválidas' };
    } catch (error) {
      return { success: false, message: 'Ocorreu um erro' };
    }
  },

  async signup(userData: User) {
    try {
      const existingUser = await api.get('/users', {
        params: { email: userData.email },
      });

      if (existingUser.data.length > 0) {
        return { success: false, message: 'Email já registrado' };
      }

      const response = await api.post('/users', userData);
      const user = response.data;
      await AsyncStorage.setItem(AUTH_TOKEN_KEY, JSON.stringify(user));
      return { success: true, user };
    } catch (error) {
      return { success: false, message: 'Ocorreu um erro durante o registro' };
    }
  },

  async logout() {
    try {
      await AsyncStorage.removeItem(AUTH_TOKEN_KEY);
      return { success: true };
    } catch (error) {
      return { success: false, message: 'Erro durante o logout' };
    }
  },

  async getCurrentUser() {
    try {
      const userData = await AsyncStorage.getItem(AUTH_TOKEN_KEY);
      return userData ? JSON.parse(userData) : null;
    } catch (error) {
      return null;
    }
  },
};