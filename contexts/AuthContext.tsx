import React, { createContext, useContext, useEffect, useState } from 'react';
import { Session } from '@supabase/supabase-js';
import { supabase, authFunctions, User } from '@/lib/supabase';

interface AuthContextType {
  session: Session | null;
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<{ error: any }>;
  signUp: (email: string, password: string, userData: Partial<User>) => Promise<{ error: any }>;
  signOut: () => Promise<{ error: any }>;
  updateProfile: (updates: Partial<User>) => Promise<{ error: any }>;
  updatePassword: (newPassword: string) => Promise<{ error: any }>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Verificar sessão inicial
    initializeAuth();

    // Listener para mudanças na autenticação
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('Auth state changed:', event);
        setSession(session);
        
        if (session?.user) {
          await loadUserData(session.user.id);
        } else {
          setUser(null);
        }
        
        setLoading(false);
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  const initializeAuth = async () => {
    try {
      const { session, userData } = await authFunctions.getCurrentSession();
      setSession(session);
      setUser(userData);
    } catch (error) {
      console.error('Erro ao inicializar autenticação:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadUserData = async (userId: string) => {
    try {
      // Temporariamente, usar dados básicos do session em vez de consultar a tabela users
      // para evitar recursão infinita das políticas RLS
      const { data: session } = await supabase.auth.getSession();
      
      if (session?.session?.user) {
        // Criar um objeto de usuário básico a partir dos dados de autenticação
        const basicUser: User = {
          id: session.session.user.id,
          email: session.session.user.email || '',
          tipo_usuario: (session.session.user.email === 'admin@bmespaco.com.br' ? 'administrador' : 'cliente') as 'administrador' | 'cliente',
          nome: session.session.user.user_metadata?.name || 'Usuário',
          telefone: '',
          cpf: '',
          created_at: session.session.user.created_at || new Date().toISOString(),
          updated_at: session.session.user.updated_at || new Date().toISOString()
        };
        
        setUser(basicUser);
        return;
      }

      // Se conseguir resolver as políticas RLS, usar a consulta normal
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', userId)
        .single();

      if (error) {
        console.error('Erro ao carregar dados do usuário:', error);
        // Em caso de erro, usar dados básicos
        const { data: session } = await supabase.auth.getSession();
        if (session?.session?.user) {
          const basicUser: User = {
            id: session.session.user.id,
            email: session.session.user.email || '',
            tipo_usuario: (session.session.user.email === 'admin@bmespaco.com.br' ? 'administrador' : 'cliente') as 'administrador' | 'cliente',
            nome: 'Usuário',
            telefone: '',
            cpf: '',
            created_at: session.session.user.created_at || new Date().toISOString(),
            updated_at: session.session.user.updated_at || new Date().toISOString()
          };
          setUser(basicUser);
        }
        return;
      }

      setUser(data);
    } catch (error) {
      console.error('Erro ao carregar dados do usuário:', error);
      // Fallback para dados básicos
      const { data: session } = await supabase.auth.getSession();
      if (session?.session?.user) {
        const basicUser: User = {
          id: session.session.user.id,
          email: session.session.user.email || '',
          tipo_usuario: (session.session.user.email === 'admin@bmespaco.com.br' ? 'administrador' : 'cliente') as 'administrador' | 'cliente',
          nome: 'Usuário',
          telefone: '',
          cpf: '',
          created_at: session.session.user.created_at || new Date().toISOString(),
          updated_at: session.session.user.updated_at || new Date().toISOString()
        };
        setUser(basicUser);
      }
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      setLoading(true);
      const { data, error } = await authFunctions.signIn(email, password);
      
      if (error) {
        return { error };
      }

      return { error: null };
    } catch (error) {
      return { error };
    } finally {
      setLoading(false);
    }
  };

  const signUp = async (email: string, password: string, userData: Partial<User>) => {
    try {
      setLoading(true);
      const { data, error } = await authFunctions.signUp(email, password, userData);
      
      if (error) {
        return { error };
      }

      return { error: null };
    } catch (error) {
      return { error };
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    try {
      setLoading(true);
      const { error } = await authFunctions.signOut();
      
      if (!error) {
        setSession(null);
        setUser(null);
      }
      
      return { error };
    } catch (error) {
      return { error };
    } finally {
      setLoading(false);
    }
  };

  const updateProfile = async (updates: Partial<User>) => {
    try {
      if (!user) {
        return { error: new Error('Usuário não encontrado') };
      }

      const { data, error } = await authFunctions.updateProfile(user.id, updates);
      
      if (!error && data) {
        setUser(data);
      }
      
      return { error };
    } catch (error) {
      return { error };
    }
  };

  const updatePassword = async (newPassword: string) => {
    try {
      const { error } = await authFunctions.updatePassword(newPassword);
      return { error };
    } catch (error) {
      return { error };
    }
  };

  const value: AuthContextType = {
    session,
    user,
    loading,
    signIn,
    signUp,
    signOut,
    updateProfile,
    updatePassword,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
}

// Hook para verificar se o usuário está logado
export function useAuthRequired() {
  const { session, loading } = useAuth();
  return { isAuthenticated: !!session, loading };
}

// Hook para verificar se o usuário é administrador
export function useIsAdmin() {
  const { user } = useAuth();
  return user?.tipo_usuario === 'administrador';
}

// Hook para verificar se o usuário é cliente
export function useIsClient() {
  const { user } = useAuth();
  return user?.tipo_usuario === 'cliente';
}
