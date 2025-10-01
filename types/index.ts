// Tipos centralizados do sistema
export interface User {
  id: number;
  email: string;
  password?: string; // Opcional para resposta da API
  name?: string;
  role: 'admin' | 'client';
  createdAt?: string;
  updatedAt?: string;
}

export interface Client {
  id: number;
  name: string;
  email: string;
  password?: string; // Opcional para resposta da API
  phone: string;
  birthDate: string;
  address: string;
  emergencyContact?: string;
  medicalHistory?: string;
  observations?: string;
  status?: 'Ativo' | 'Inativo';
  createdAt?: string;
  updatedAt?: string;
}

export interface Appointment {
  id: number;
  clientId: number;
  date: string;
  time: string;
  type: AppointmentType;
  status: AppointmentStatus;
  doctor?: string;
  notes?: string;
  createdAt?: string;
  updatedAt?: string;
}

export type AppointmentType = 
  | 'Fisioterapia'
  | 'RPG'
  | 'Pilates'
  | 'Massagem'
  | 'Avaliação'
  | 'Retorno';

export type AppointmentStatus = 
  | 'Agendado'
  | 'Confirmado'
  | 'Em Andamento'
  | 'Concluído'
  | 'Cancelado'
  | 'Faltou'
  | 'Pendente';

// Tipos de resposta da API
export interface ApiResponse<T> {
  data: T;
  message?: string;
  success: boolean;
}

export interface AuthResponse {
  user: User | Client;
  token?: string;
  success: boolean;
  message?: string;
}

// Tipos para formulários
export interface LoginForm {
  email: string;
  password: string;
}

export interface ClientForm {
  name: string;
  email: string;
  password: string;
  phone: string;
  birthDate: string;
  address: string;
  emergencyContact?: string;
  medicalHistory?: string;
  observations?: string;
}

export interface AppointmentForm {
  clientId: number;
  date: string;
  time: string;
  type: AppointmentType;
  doctor?: string;
  notes?: string;
}

// Tipos para estado de loading
export interface LoadingState {
  isLoading: boolean;
  error: string | null;
}

// Tipos para validação
export interface ValidationError {
  field: string;
  message: string;
}

export interface FormValidation {
  isValid: boolean;
  errors: ValidationError[];
}

// Tipos para componentes
export interface BaseComponentProps {
  children?: React.ReactNode;
  className?: string;
  testID?: string;
}

export interface ButtonProps extends BaseComponentProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  loading?: boolean;
  icon?: string;
}

export interface InputProps extends BaseComponentProps {
  label?: string;
  placeholder?: string;
  value: string;
  onChangeText: (text: string) => void;
  error?: string;
  required?: boolean;
  type?: 'text' | 'email' | 'password' | 'phone' | 'number';
  multiline?: boolean;
  numberOfLines?: number;
}

// Tipos para o store Zustand
export interface AuthStore {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  login: (credentials: LoginForm) => Promise<void>;
  logout: () => Promise<void>;
  clearError: () => void;
  setLoading: (loading: boolean) => void;
}

export interface ClientStore {
  clients: Client[];
  selectedClient: Client | null;
  isLoading: boolean;
  error: string | null;
  fetchClients: () => Promise<void>;
  createClient: (client: ClientForm) => Promise<void>;
  updateClient: (id: number, client: Partial<Client>) => Promise<void>;
  deleteClient: (id: number) => Promise<void>;
  selectClient: (client: Client) => void;
  clearError: () => void;
}

export interface AppointmentStore {
  appointments: Appointment[];
  selectedAppointment: Appointment | null;
  isLoading: boolean;
  error: string | null;
  fetchAppointments: (clientId?: number) => Promise<void>;
  createAppointment: (appointment: AppointmentForm) => Promise<void>;
  updateAppointment: (id: number, appointment: Partial<Appointment>) => Promise<void>;
  cancelAppointment: (id: number) => Promise<void>;
  selectAppointment: (appointment: Appointment) => void;
  clearError: () => void;
}

// Tipos para navegação
export type RootStackParamList = {
  index: undefined;
  selection: undefined;
  '(administrator)': undefined;
  '(client)': undefined;
  '(tabs)': undefined;
};

export type AdminTabParamList = {
  dashboard: undefined;
  clients: undefined;
  appointments: undefined;
  'register-client': undefined;
  reports: undefined;
};

export type ClientTabParamList = {
  dashboard: undefined;
  appointments: undefined;
  history: undefined;
  profile: undefined;
};

// Utilitários de tipo
export type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;
export type RequiredFields<T, K extends keyof T> = T & Required<Pick<T, K>>;
