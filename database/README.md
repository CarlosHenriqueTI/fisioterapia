# 🗄️ Configuração do Banco de Dados - BM Espaço Saúde

## 📋 Configuração Inicial

### 1. Configurar Supabase
1. Crie um projeto no [Supabase](https://supabase.com)
2. Configure as variáveis de ambiente no `.env`
3. Execute o schema inicial:

```bash
npm run execute-schema
```

### 2. Criar Usuário Administrador
Execute o script de criação do administrador:

```bash
npm run create-admin
```

### 3. Verificar Instalação
Valide se o banco está configurado corretamente:

```bash
npm run verify-schema
```

## 🏗️ Estrutura do Banco

### Tabelas Principais
- **users**: Usuários do sistema (clientes e administradores)
- **appointments**: Agendamentos de consultas
- **services**: Serviços oferecidos pela clínica
- **payments**: Registros de pagamentos (futuro)

### Segurança (RLS)
- Row Level Security habilitado em todas as tabelas
- Políticas específicas para clientes e administradores
- Autenticação JWT obrigatória

### Triggers
- **updated_at**: Atualização automática de timestamps
- **user_creation**: Sincronização auth.users ↔ public.users

## 🔄 Migrations

Para aplicar correções ou atualizações:

1. **Schema Principal**: `supabase-schema.sql`
2. **Correções RLS**: `fix-rls-policies.sql`
3. **Backup**: `supabase-schema-backup.sql`

## ⚠️ Importante

- Nunca execute o schema em produção sem backup
- Use `verify-schema.js` antes de aplicar mudanças
- Mantenha sempre uma cópia de segurança dos dados

## 🆔 Usuário Administrador Padrão

```
Email: admin@bmespaco.com.br
Senha: [configurada durante criação]
Tipo: administrador
```

> **Nota**: Altere a senha padrão após primeiro acesso!
