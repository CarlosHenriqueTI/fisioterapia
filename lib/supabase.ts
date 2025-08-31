import 'react-native-url-polyfill/auto';
import { createClient } from '@supabase/supabase-js';

// Configurações do Supabase usando variáveis de ambiente
const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY!;

// Verificar se as variáveis de ambiente estão configuradas
if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    'Configurações do Supabase não encontradas. Verifique o arquivo .env'
  );
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    // Configurações de autenticação
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});

// Tipos para o banco de dados
export interface User {
  id: string;
  email: string;
  tipo_usuario: 'administrador' | 'cliente';
  nome: string;
  telefone?: string;
  cpf?: string;
  data_nascimento?: string;
  endereco?: string;
  created_at: string;
  updated_at: string;
}

export interface Cliente extends User {
  tipo_usuario: 'cliente';
  historico_medico?: string;
  observacoes?: string;
}

export interface Administrador extends User {
  tipo_usuario: 'administrador';
  especializacao?: string;
  registro_profissional?: string;
}

export interface Agendamento {
  id: string;
  cliente_id: string;
  administrador_id: string;
  data_agendamento: string;
  status: 'agendado' | 'em_andamento' | 'concluido' | 'cancelado';
  tipo_servico: string;
  observacoes?: string;
  valor?: number;
  created_at: string;
  updated_at: string;
}

export interface Servico {
  id: string;
  nome: string;
  descricao?: string;
  duracao_minutos: number;
  valor: number;
  ativo: boolean;
  created_at: string;
  updated_at: string;
}

// Funções de autenticação
export const authFunctions = {
  // Cadastro
  async signUp(email: string, password: string, userData: Partial<User>) {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: userData,
        },
      });

      if (error) throw error;

      // Criar registro na tabela users
      if (data.user) {
        const { error: insertError } = await supabase.from('users').insert({
          id: data.user.id,
          email: data.user.email,
          ...userData,
        });

        if (insertError) throw insertError;
      }

      return { data, error: null };
    } catch (error) {
      return { data: null, error };
    }
  },

  // Login
  async signIn(email: string, password: string) {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      // Buscar dados completos do usuário
      if (data.user) {
        const { data: userData, error: userError } = await supabase
          .from('users')
          .select('*')
          .eq('id', data.user.id)
          .single();

        if (userError) throw userError;

        return { data: { ...data, userData }, error: null };
      }

      return { data, error: null };
    } catch (error) {
      return { data: null, error };
    }
  },

  // Logout
  async signOut() {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      return { error: null };
    } catch (error) {
      return { error };
    }
  },

  // Verificar sessão atual
  async getCurrentSession() {
    try {
      const { data: { session }, error } = await supabase.auth.getSession();
      if (error) throw error;

      if (session?.user) {
        const { data: userData, error: userError } = await supabase
          .from('users')
          .select('*')
          .eq('id', session.user.id)
          .single();

        if (userError) throw userError;

        return { session, userData, error: null };
      }

      return { session, userData: null, error: null };
    } catch (error) {
      return { session: null, userData: null, error };
    }
  },

  // Atualizar perfil
  async updateProfile(userId: string, updates: Partial<User>) {
    try {
      const { data, error } = await supabase
        .from('users')
        .update({
          ...updates,
          updated_at: new Date().toISOString(),
        })
        .eq('id', userId)
        .select()
        .single();

      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      return { data: null, error };
    }
  },

  // Alterar senha
  async updatePassword(newPassword: string) {
    try {
      const { error } = await supabase.auth.updateUser({
        password: newPassword,
      });

      if (error) throw error;
      return { error: null };
    } catch (error) {
      return { error };
    }
  },
};

// Funções para agendamentos
export const agendamentoFunctions = {
  // Criar agendamento
  async criarAgendamento(agendamento: Omit<Agendamento, 'id' | 'created_at' | 'updated_at'>) {
    try {
      const { data, error } = await supabase
        .from('agendamentos')
        .insert({
          ...agendamento,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        })
        .select()
        .single();

      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      return { data: null, error };
    }
  },

  // Buscar agendamentos por cliente
  async buscarAgendamentosPorCliente(clienteId: string) {
    try {
      const { data, error } = await supabase
        .from('agendamentos')
        .select(`
          *,
          administrador:users!administrador_id(nome, email),
          servico:servicos(nome, duracao_minutos)
        `)
        .eq('cliente_id', clienteId)
        .order('data_agendamento', { ascending: true });

      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      return { data: null, error };
    }
  },

  // Buscar agendamentos por administrador
  async buscarAgendamentosPorAdmin(adminId: string) {
    try {
      const { data, error } = await supabase
        .from('agendamentos')
        .select(`
          *,
          cliente:users!cliente_id(nome, email, telefone),
          servico:servicos(nome, duracao_minutos)
        `)
        .eq('administrador_id', adminId)
        .order('data_agendamento', { ascending: true });

      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      return { data: null, error };
    }
  },

  // Atualizar status do agendamento
  async atualizarStatusAgendamento(agendamentoId: string, status: Agendamento['status']) {
    try {
      const { data, error } = await supabase
        .from('agendamentos')
        .update({
          status,
          updated_at: new Date().toISOString(),
        })
        .eq('id', agendamentoId)
        .select()
        .single();

      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      return { data: null, error };
    }
  },
};

// Funções para serviços
export const servicoFunctions = {
  // Buscar todos os serviços ativos
  async buscarServicosAtivos() {
    try {
      const { data, error } = await supabase
        .from('servicos')
        .select('*')
        .eq('ativo', true)
        .order('nome');

      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      return { data: null, error };
    }
  },

  // Criar serviço (apenas admin)
  async criarServico(servico: Omit<Servico, 'id' | 'created_at' | 'updated_at'>) {
    try {
      const { data, error } = await supabase
        .from('servicos')
        .insert({
          ...servico,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        })
        .select()
        .single();

      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      return { data: null, error };
    }
  },
};
