import { create } from 'zustand';

import { api } from '@/services/auth';
import { Client, ClientForm, ClientStore } from '@/types';
import { ErrorHandler } from '@/utils/errorHandler';

export const useClientStore = create<ClientStore>((set, get) => ({
  clients: [],
  selectedClient: null,
  isLoading: false,
  error: null,

  fetchClients: async () => {
    try {
      set({ isLoading: true, error: null });
      
      const response = await api.get('/clients');
      const clients: Client[] = response.data;
      
      set({ 
        clients, 
        isLoading: false 
      });
    } catch (error) {
      const appError = ErrorHandler.handle(error, 'ClientStore.fetchClients');
      set({ 
        isLoading: false, 
        error: appError.message 
      });
      throw error;
    }
  },

  createClient: async (clientData: ClientForm) => {
    try {
      set({ isLoading: true, error: null });
      
      // Verificar se email já existe
      const existingResponse = await api.get('/clients', {
        params: { email: clientData.email }
      });
      
      if (existingResponse.data.length > 0) {
        throw new Error('Email já cadastrado');
      }
      
      const response = await api.post('/clients', clientData);
      const newClient: Client = response.data;
      
      set((state) => ({ 
        clients: [...state.clients, newClient],
        isLoading: false 
      }));
      
      ErrorHandler.showSuccess('Cliente cadastrado com sucesso!');
    } catch (error) {
      const appError = ErrorHandler.handle(error, 'ClientStore.createClient');
      set({ 
        isLoading: false, 
        error: appError.message 
      });
      throw error;
    }
  },

  updateClient: async (id: number, clientData: Partial<Client>) => {
    try {
      set({ isLoading: true, error: null });
      
      const response = await api.put(`/clients/${id}`, clientData);
      const updatedClient: Client = response.data;
      
      set((state) => ({
        clients: state.clients.map((client) =>
          client.id === id ? updatedClient : client
        ),
        selectedClient: state.selectedClient?.id === id ? updatedClient : state.selectedClient,
        isLoading: false
      }));
      
      ErrorHandler.showSuccess('Cliente atualizado com sucesso!');
    } catch (error) {
      const appError = ErrorHandler.handle(error, 'ClientStore.updateClient');
      set({ 
        isLoading: false, 
        error: appError.message 
      });
      throw error;
    }
  },

  deleteClient: async (id: number) => {
    try {
      set({ isLoading: true, error: null });
      
      await api.delete(`/clients/${id}`);
      
      set((state) => ({
        clients: state.clients.filter((client) => client.id !== id),
        selectedClient: state.selectedClient?.id === id ? null : state.selectedClient,
        isLoading: false
      }));
      
      ErrorHandler.showSuccess('Cliente removido com sucesso!');
    } catch (error) {
      const appError = ErrorHandler.handle(error, 'ClientStore.deleteClient');
      set({ 
        isLoading: false, 
        error: appError.message 
      });
      throw error;
    }
  },

  selectClient: (client: Client) => {
    set({ selectedClient: client });
  },

  clearError: () => {
    set({ error: null });
  },
}));
