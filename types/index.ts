/**
 * Tipos globais do sistema BM Espaço Saúde
 */

export interface User {
  id: string;
  email: string;
  nome: string;
  cpf: string;
  telefone: string;
  tipo_usuario: 'administrador' | 'cliente';
  created_at: string;
  updated_at: string;
}

export interface Appointment {
  id: string;
  client_id: string;
  service_id: string;
  date: string;
  time: string;
  status: 'agendado' | 'confirmado' | 'cancelado' | 'concluido';
  notes?: string;
  created_at: string;
  updated_at: string;
}

export interface Service {
  id: string;
  name: string;
  description: string;
  duration: number; // em minutos
  price: number;
  active: boolean;
  created_at: string;
  updated_at: string;
}

export type TabParamList = {
  index: undefined;
  agenda: undefined;
  appointments: undefined;
  dashboard: undefined;
  clients: undefined;
  'register-client': undefined;
  reports: undefined;
  history: undefined;
  profile: undefined;
};

export type AuthState = {
  user: User | null;
  loading: boolean;
  error: string | null;
};
