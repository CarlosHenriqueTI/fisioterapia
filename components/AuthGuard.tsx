import React from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { router } from 'expo-router';
import { useAuth, useAuthRequired } from '@/contexts/AuthContext';

interface AuthGuardProps {
  children: React.ReactNode;
  requireAuth?: boolean;
  allowedUserTypes?: ('administrador' | 'cliente')[];
}

export function AuthGuard({ 
  children, 
  requireAuth = true, 
  allowedUserTypes
}: AuthGuardProps) {
  const { user, loading } = useAuth();
  const { isAuthenticated } = useAuthRequired();

  // Mostrar loading enquanto verifica autenticação
  if (loading) {
    return (
      <View className="flex-1 justify-center items-center bg-gray-50">
        <ActivityIndicator size="large" color="#6b7280" />
        <Text className="mt-4 text-gray-600">Carregando...</Text>
      </View>
    );
  }

  // Se require auth e não está autenticado, redirecionar
  if (requireAuth && !isAuthenticated) {
    router.replace('/selection');
    return null;
  }

  // Se tem tipos permitidos e o usuário não tem o tipo correto
  if (allowedUserTypes && user && !allowedUserTypes.includes(user.tipo_usuario)) {
    router.replace('/selection');
    return null;
  }

  return <>{children}</>;
}

// Componente específico para proteger rotas de administrador
export function AdminGuard({ children }: { children: React.ReactNode }) {
  return (
    <AuthGuard 
      allowedUserTypes={['administrador']}
    >
      {children}
    </AuthGuard>
  );
}

// Componente específico para proteger rotas de cliente
export function ClientGuard({ children }: { children: React.ReactNode }) {
  return (
    <AuthGuard 
      allowedUserTypes={['cliente']}
    >
      {children}
    </AuthGuard>
  );
}

// Hook para verificar permissões
export function usePermissions() {
  const { user } = useAuth();
  
  return {
    isAdmin: user?.tipo_usuario === 'administrador',
    isClient: user?.tipo_usuario === 'cliente',
    canManageUsers: user?.tipo_usuario === 'administrador',
    canManageAppointments: user?.tipo_usuario === 'administrador',
    canViewReports: user?.tipo_usuario === 'administrador',
    canViewOwnData: !!user,
  };
}
