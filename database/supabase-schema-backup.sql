-- =====================================================
-- SCRIPT DE CRIAÇÃO DO BANCO DE DADOS SUPABASE
-- Sistema de Fisioterapia BM Espaço Saúde
-- =====================================================

-- Extensões necessárias
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =====================================================
-- TABELA DE USUÁRIOS
-- =====================================================
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email VARCHAR(255) UNIQUE NOT NULL,
  tipo_usuario VARCHAR(20) NOT NULL CHECK (tipo_usuario IN ('administrador', 'cliente')),
  nome VARCHAR(255) NOT NULL,
  telefone VARCHAR(20),
  cpf VARCHAR(14) UNIQUE,
  data_nascimento DATE,
  endereco TEXT,
  -- Campos específicos para clientes
  historico_medico TEXT,
  observacoes TEXT,
  -- Campos específicos para administradores
  especializacao VARCHAR(255),
  registro_profissional VARCHAR(50),
  -- Timestamps
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =====================================================
-- TABELA DE SERVIÇOS
-- =====================================================
CREATE TABLE servicos (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  nome VARCHAR(255) NOT NULL,
  descricao TEXT,
  duracao_minutos INTEGER NOT NULL DEFAULT 60,
  valor DECIMAL(10,2) NOT NULL DEFAULT 0.00,
  ativo BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =====================================================
-- TABELA DE AGENDAMENTOS
-- =====================================================
CREATE TABLE agendamentos (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  cliente_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  administrador_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  servico_id UUID REFERENCES servicos(id) ON DELETE SET NULL,
  data_agendamento TIMESTAMP WITH TIME ZONE NOT NULL,
  status VARCHAR(20) NOT NULL DEFAULT 'agendado' CHECK (status IN ('agendado', 'em_andamento', 'concluido', 'cancelado')),
  tipo_servico VARCHAR(255) NOT NULL,
  observacoes TEXT,
  valor DECIMAL(10,2),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  -- Constraints
  CONSTRAINT check_cliente_tipo CHECK (
    EXISTS (
      SELECT 1 FROM users 
      WHERE id = cliente_id AND tipo_usuario = 'cliente'
    )
  ),
  CONSTRAINT check_admin_tipo CHECK (
    EXISTS (
      SELECT 1 FROM users 
      WHERE id = administrador_id AND tipo_usuario = 'administrador'
    )
  )
);

-- =====================================================
-- TABELA DE HISTÓRICO DE ATENDIMENTOS
-- =====================================================
CREATE TABLE historico_atendimentos (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  agendamento_id UUID NOT NULL REFERENCES agendamentos(id) ON DELETE CASCADE,
  cliente_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  administrador_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  data_atendimento TIMESTAMP WITH TIME ZONE NOT NULL,
  tipo_atendimento VARCHAR(255) NOT NULL,
  observacoes TEXT,
  procedimentos_realizados TEXT,
  proxima_sessao DATE,
  valor_pago DECIMAL(10,2),
  forma_pagamento VARCHAR(50),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =====================================================
-- ÍNDICES PARA PERFORMANCE
-- =====================================================
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_tipo ON users(tipo_usuario);
CREATE INDEX idx_users_cpf ON users(cpf);
CREATE INDEX idx_agendamentos_cliente ON agendamentos(cliente_id);
CREATE INDEX idx_agendamentos_admin ON agendamentos(administrador_id);
CREATE INDEX idx_agendamentos_data ON agendamentos(data_agendamento);
CREATE INDEX idx_agendamentos_status ON agendamentos(status);
CREATE INDEX idx_historico_cliente ON historico_atendimentos(cliente_id);
CREATE INDEX idx_historico_admin ON historico_atendimentos(administrador_id);
CREATE INDEX idx_historico_data ON historico_atendimentos(data_atendimento);

-- =====================================================
-- FUNCTIONS E TRIGGERS PARA UPDATED_AT
-- =====================================================
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Triggers para atualizar updated_at automaticamente
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_servicos_updated_at BEFORE UPDATE ON servicos 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_agendamentos_updated_at BEFORE UPDATE ON agendamentos 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_historico_updated_at BEFORE UPDATE ON historico_atendimentos 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- =====================================================
-- POLÍTICAS RLS (Row Level Security)
-- =====================================================

-- Habilitar RLS nas tabelas
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE agendamentos ENABLE ROW LEVEL SECURITY;
ALTER TABLE historico_atendimentos ENABLE ROW LEVEL SECURITY;
ALTER TABLE servicos ENABLE ROW LEVEL SECURITY;

-- Políticas para users
CREATE POLICY "Usuários podem ver e editar próprio perfil" ON users
  FOR ALL USING (auth.uid() = id);

CREATE POLICY "Administradores podem ver todos os usuários" ON users
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM users 
      WHERE id = auth.uid() AND tipo_usuario = 'administrador'
    )
  );

-- Políticas para agendamentos
CREATE POLICY "Clientes podem ver próprios agendamentos" ON agendamentos
  FOR SELECT USING (
    cliente_id = auth.uid() OR
    administrador_id = auth.uid()
  );

CREATE POLICY "Clientes podem criar agendamentos" ON agendamentos
  FOR INSERT WITH CHECK (cliente_id = auth.uid());

CREATE POLICY "Administradores podem gerenciar agendamentos" ON agendamentos
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM users 
      WHERE id = auth.uid() AND tipo_usuario = 'administrador'
    )
  );

-- Políticas para histórico
CREATE POLICY "Usuários podem ver próprio histórico" ON historico_atendimentos
  FOR SELECT USING (
    cliente_id = auth.uid() OR
    administrador_id = auth.uid()
  );

CREATE POLICY "Administradores podem gerenciar histórico" ON historico_atendimentos
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM users 
      WHERE id = auth.uid() AND tipo_usuario = 'administrador'
    )
  );

-- Políticas para serviços
CREATE POLICY "Todos podem ver serviços ativos" ON servicos
  FOR SELECT USING (ativo = true);

CREATE POLICY "Administradores podem gerenciar serviços" ON servicos
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM users 
      WHERE id = auth.uid() AND tipo_usuario = 'administrador'
    )
  );

-- =====================================================
-- INSERÇÃO DE DADOS INICIAIS
-- =====================================================

-- Serviços padrão
INSERT INTO servicos (nome, descricao, duracao_minutos, valor, ativo) VALUES
('Fisioterapia Geral', 'Sessão de fisioterapia para reabilitação geral', 60, 80.00, true),
('Fisioterapia Neurológica', 'Tratamento especializado em neurologia', 60, 100.00, true),
('Fisioterapia Ortopédica', 'Tratamento para lesões ortopédicas', 60, 90.00, true),
('Fisioterapia Respiratória', 'Tratamento para problemas respiratórios', 45, 85.00, true),
('Pilates Terapêutico', 'Sessão de pilates para reabilitação', 50, 70.00, true),
('RPG - Reeducação Postural Global', 'Técnica de correção postural', 60, 95.00, true),
('Drenagem Linfática', 'Tratamento para sistema linfático', 60, 75.00, true),
('Avaliação Fisioterapêutica', 'Avaliação inicial do paciente', 90, 120.00, true);

-- =====================================================
-- FUNCTIONS AUXILIARES
-- =====================================================

-- Função para buscar agendamentos do dia
CREATE OR REPLACE FUNCTION agendamentos_do_dia(data_consulta DATE DEFAULT CURRENT_DATE)
RETURNS TABLE (
  id UUID,
  cliente_nome VARCHAR(255),
  cliente_telefone VARCHAR(20),
  administrador_nome VARCHAR(255),
  data_agendamento TIMESTAMP WITH TIME ZONE,
  tipo_servico VARCHAR(255),
  status VARCHAR(20),
  observacoes TEXT
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    a.id,
    uc.nome as cliente_nome,
    uc.telefone as cliente_telefone,
    ua.nome as administrador_nome,
    a.data_agendamento,
    a.tipo_servico,
    a.status,
    a.observacoes
  FROM agendamentos a
  JOIN users uc ON a.cliente_id = uc.id
  JOIN users ua ON a.administrador_id = ua.id
  WHERE DATE(a.data_agendamento) = data_consulta
  ORDER BY a.data_agendamento;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Função para relatório de agendamentos por período
CREATE OR REPLACE FUNCTION relatorio_agendamentos(
  data_inicio DATE,
  data_fim DATE,
  admin_id UUID DEFAULT NULL
)
RETURNS TABLE (
  total_agendamentos BIGINT,
  agendamentos_concluidos BIGINT,
  agendamentos_cancelados BIGINT,
  receita_total DECIMAL(10,2),
  receita_recebida DECIMAL(10,2)
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    COUNT(*) as total_agendamentos,
    COUNT(*) FILTER (WHERE a.status = 'concluido') as agendamentos_concluidos,
    COUNT(*) FILTER (WHERE a.status = 'cancelado') as agendamentos_cancelados,
    COALESCE(SUM(a.valor), 0) as receita_total,
    COALESCE(SUM(CASE WHEN a.status = 'concluido' THEN a.valor ELSE 0 END), 0) as receita_recebida
  FROM agendamentos a
  WHERE DATE(a.data_agendamento) BETWEEN data_inicio AND data_fim
    AND (admin_id IS NULL OR a.administrador_id = admin_id);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- =====================================================
-- COMENTÁRIOS PARA DOCUMENTAÇÃO
-- =====================================================
COMMENT ON TABLE users IS 'Tabela de usuários do sistema (clientes e administradores)';
COMMENT ON TABLE servicos IS 'Tabela de serviços oferecidos pela clínica';
COMMENT ON TABLE agendamentos IS 'Tabela de agendamentos de consultas';
COMMENT ON TABLE historico_atendimentos IS 'Histórico completo de atendimentos realizados';

COMMENT ON COLUMN users.tipo_usuario IS 'Tipo do usuário: administrador ou cliente';
COMMENT ON COLUMN agendamentos.status IS 'Status do agendamento: agendado, em_andamento, concluido, cancelado';
COMMENT ON COLUMN servicos.ativo IS 'Indica se o serviço está ativo e disponível para agendamento';
