import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import { api } from '@/services/auth';
import { AuthStore, LoginForm, User } from '@/types';
import { ErrorHandler } from '@/utils/errorHandler';

const AUTH_STORAGE_KEY = '@auth_store';

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,

      login: async (credentials: LoginForm) => {
        try {
          set({ isLoading: true, error: null });

          // Buscar usuário admin
          const adminResponse = await api.get('/users', {
            params: { email: credentials.email, password: credentials.password },
          });
          
          const adminUsers = adminResponse.data.filter((u: any) => u.role === 'admin');
          
          if (adminUsers.length > 0) {
            const user: User = adminUsers[0];
            set({ 
              user, 
              isAuthenticated: true, 
              isLoading: false, 
              error: null 
            });
            return;
          }

          // Buscar cliente se não for admin
          const clientResponse = await api.get('/clients', {
            params: { email: credentials.email, password: credentials.password },
          });

          if (clientResponse.data.length > 0) {
            const client = clientResponse.data[0];
            const user: User = {
              ...client,
              role: 'client' as const,
            };
            set({ 
              user, 
              isAuthenticated: true, 
              isLoading: false, 
              error: null 
            });
            return;
          }

          // Se chegou até aqui, credenciais inválidas
          throw new Error('Credenciais inválidas');

        } catch (error) {
          const appError = ErrorHandler.handle(error, 'AuthStore.login');
          set({ 
            isLoading: false, 
            error: appError.message,
            user: null,
            isAuthenticated: false
          });
          throw error;
        }
      },

      logout: async () => {
        try {
          set({ isLoading: true });
          // Aqui você pode fazer uma chamada para invalidar o token no servidor
          set({ 
            user: null, 
            isAuthenticated: false, 
            isLoading: false, 
            error: null 
          });
        } catch (error) {
          const appError = ErrorHandler.handle(error, 'AuthStore.logout');
          set({ 
            isLoading: false, 
            error: appError.message 
          });
        }
      },

      clearError: () => {
        set({ error: null });
      },

      setLoading: (loading: boolean) => {
        set({ isLoading: loading });
      },
    }),
    {
      name: AUTH_STORAGE_KEY,
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({ 
        user: state.user, 
        isAuthenticated: state.isAuthenticated 
      }),
    }
  )
);
