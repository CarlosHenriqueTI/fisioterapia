-- =====================================================
-- CORRIGIR RECURSÃO INFINITA NAS POLÍTICAS RLS
-- =====================================================

-- Primeiro, desabilitar RLS temporariamente para corrigir
ALTER TABLE users DISABLE ROW LEVEL SECURITY;
ALTER TABLE agendamentos DISABLE ROW LEVEL SECURITY;
ALTER TABLE historico_atendimentos DISABLE ROW LEVEL SECURITY;
ALTER TABLE servicos DISABLE ROW LEVEL SECURITY;

-- Remover todas as políticas existentes
DROP POLICY IF EXISTS "users_own_profile" ON users;
DROP POLICY IF EXISTS "admins_view_all_users" ON users;
DROP POLICY IF EXISTS "users_view_own_appointments" ON agendamentos;
DROP POLICY IF EXISTS "clients_create_appointments" ON agendamentos;
DROP POLICY IF EXISTS "admins_manage_appointments" ON agendamentos;
DROP POLICY IF EXISTS "users_view_own_history" ON historico_atendimentos;
DROP POLICY IF EXISTS "admins_manage_history" ON historico_atendimentos;
DROP POLICY IF EXISTS "all_view_active_services" ON servicos;
DROP POLICY IF EXISTS "admins_manage_services" ON servicos;

-- =====================================================
-- CRIAR POLÍTICAS RLS CORRIGIDAS (SEM RECURSÃO)
-- =====================================================

-- Reabilitar RLS
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE agendamentos ENABLE ROW LEVEL SECURITY;
ALTER TABLE historico_atendimentos ENABLE ROW LEVEL SECURITY;
ALTER TABLE servicos ENABLE ROW LEVEL SECURITY;

-- Políticas para users (SEM RECURSÃO)
CREATE POLICY "users_can_view_own_profile" ON users
  FOR ALL USING (auth.uid() = id);

-- Política para admins usando metadata do JWT (sem consultar tabela users)
CREATE POLICY "admins_can_view_all_users" ON users
  FOR SELECT USING (
    (auth.jwt() ->> 'user_metadata')::jsonb ->> 'role' = 'admin'
  );

-- Política alternativa para admins (usando email como identificador)
CREATE POLICY "admin_email_access" ON users
  FOR ALL USING (
    auth.jwt() ->> 'email' IN ('admin@bmespaco.com.br')
  );

-- Políticas para agendamentos (simplificadas)
CREATE POLICY "users_own_appointments" ON agendamentos
  FOR ALL USING (
    cliente_id = auth.uid() OR 
    administrador_id = auth.uid()
  );

-- Políticas para histórico (simplificadas)
CREATE POLICY "users_own_history" ON historico_atendimentos
  FOR ALL USING (
    cliente_id = auth.uid() OR 
    administrador_id = auth.uid()
  );

-- Políticas para serviços (públicas para visualização)
CREATE POLICY "public_view_services" ON servicos
  FOR SELECT USING (ativo = true);

CREATE POLICY "authenticated_manage_services" ON servicos
  FOR ALL USING (auth.uid() IS NOT NULL);
