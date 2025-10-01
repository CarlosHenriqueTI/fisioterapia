import { create } from 'zustand';

import { api } from '@/services/auth';
import { Appointment, AppointmentForm, AppointmentStore } from '@/types';
import { ErrorHandler } from '@/utils/errorHandler';

export const useAppointmentStore = create<AppointmentStore>((set, get) => ({
  appointments: [],
  selectedAppointment: null,
  isLoading: false,
  error: null,

  fetchAppointments: async (clientId?: number) => {
    try {
      set({ isLoading: true, error: null });
      
      const params = clientId ? { clientId } : {};
      const response = await api.get('/appointments', { params });
      const appointments: Appointment[] = response.data;
      
      set({ 
        appointments, 
        isLoading: false 
      });
    } catch (error) {
      const appError = ErrorHandler.handle(error, 'AppointmentStore.fetchAppointments');
      set({ 
        isLoading: false, 
        error: appError.message 
      });
      throw error;
    }
  },

  createAppointment: async (appointmentData: AppointmentForm) => {
    try {
      set({ isLoading: true, error: null });
      
      // Verificar conflitos de horário
      const conflictResponse = await api.get('/appointments', {
        params: { 
          date: appointmentData.date, 
          time: appointmentData.time 
        }
      });
      
      if (conflictResponse.data.length > 0) {
        throw new Error('Já existe um agendamento para este horário');
      }
      
      const response = await api.post('/appointments', {
        ...appointmentData,
        status: 'Agendado',
        createdAt: new Date().toISOString(),
      });
      
      const newAppointment: Appointment = response.data;
      
      set((state) => ({ 
        appointments: [...state.appointments, newAppointment],
        isLoading: false 
      }));
      
      ErrorHandler.showSuccess('Consulta agendada com sucesso!');
    } catch (error) {
      const appError = ErrorHandler.handle(error, 'AppointmentStore.createAppointment');
      set({ 
        isLoading: false, 
        error: appError.message 
      });
      throw error;
    }
  },

  updateAppointment: async (id: number, appointmentData: Partial<Appointment>) => {
    try {
      set({ isLoading: true, error: null });
      
      const response = await api.put(`/appointments/${id}`, {
        ...appointmentData,
        updatedAt: new Date().toISOString(),
      });
      
      const updatedAppointment: Appointment = response.data;
      
      set((state) => ({
        appointments: state.appointments.map((appointment) =>
          appointment.id === id ? updatedAppointment : appointment
        ),
        selectedAppointment: state.selectedAppointment?.id === id 
          ? updatedAppointment 
          : state.selectedAppointment,
        isLoading: false
      }));
      
      ErrorHandler.showSuccess('Consulta atualizada com sucesso!');
    } catch (error) {
      const appError = ErrorHandler.handle(error, 'AppointmentStore.updateAppointment');
      set({ 
        isLoading: false, 
        error: appError.message 
      });
      throw error;
    }
  },

  cancelAppointment: async (id: number) => {
    try {
      set({ isLoading: true, error: null });
      
      const response = await api.put(`/appointments/${id}`, {
        status: 'Cancelado',
        updatedAt: new Date().toISOString(),
      });
      
      const cancelledAppointment: Appointment = response.data;
      
      set((state) => ({
        appointments: state.appointments.map((appointment) =>
          appointment.id === id ? cancelledAppointment : appointment
        ),
        selectedAppointment: state.selectedAppointment?.id === id 
          ? cancelledAppointment 
          : state.selectedAppointment,
        isLoading: false
      }));
      
      ErrorHandler.showSuccess('Consulta cancelada com sucesso!');
    } catch (error) {
      const appError = ErrorHandler.handle(error, 'AppointmentStore.cancelAppointment');
      set({ 
        isLoading: false, 
        error: appError.message 
      });
      throw error;
    }
  },

  selectAppointment: (appointment: Appointment) => {
    set({ selectedAppointment: appointment });
  },

  clearError: () => {
    set({ error: null });
  },
}));
