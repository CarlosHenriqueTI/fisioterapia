#!/usr/bin/env node

/**
 * Script para criar o administrador no Supabase Auth e Database
 */

const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

async function createAdminUser() {
  try {
    console.log('🔧 Criando administrador do sistema...\n');

    const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL;
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY; // Chave de serviço (não anon)
    
    if (!supabaseUrl) {
      console.error('❌ EXPO_PUBLIC_SUPABASE_URL não configurada');
      process.exit(1);
    }

    // Para criar usuários, precisamos da service role key (não a anon key)
    if (!supabaseServiceKey) {
      console.log('⚠️  SUPABASE_SERVICE_ROLE_KEY não encontrada.');
      console.log('📋 INSTRUÇÕES MANUAIS:');
      console.log('====================\n');
      
      console.log('1️⃣  Acesse: https://supabase.com/dashboard/project/[seu-projeto]/settings/api');
      console.log('2️⃣  Copie a "service_role" key (secreta)');
      console.log('3️⃣  Adicione no .env: SUPABASE_SERVICE_ROLE_KEY=sua-chave-aqui\n');
      
      console.log('4️⃣  OU crie manualmente no painel:');
      console.log('    - Acesse: Authentication → Users');
      console.log('    - Clique "Add user"');
      console.log('    - Email: admin@bmespaco.com.br');
      console.log('    - Password: BmEspaco2025!');
      console.log('    - Marque "Auto confirm user"');
      console.log('    - Copie o UUID gerado');
      console.log('    - Execute: npm run update-admin-uuid [UUID-COPIADO]\n');
      
      return;
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false
      }
    });

    // Criar usuário no Auth
    console.log('👤 Criando usuário no Supabase Auth...');
    const { data: authData, error: authError } = await supabase.auth.admin.createUser({
      email: 'admin@bmespaco.com.br',
      password: 'BmEspaco2025!',
      email_confirm: true,
      user_metadata: {
        nome: 'Administrador do Sistema'
      }
    });

    if (authError) {
      if (authError.message.includes('User already registered')) {
        console.log('✅ Usuário já existe no Auth');
        
        // Buscar usuário existente
        const { data: users } = await supabase.auth.admin.listUsers();
        const existingUser = users.users.find(u => u.email === 'admin@bmespaco.com.br');
        
        if (existingUser) {
          console.log(`✅ UUID encontrado: ${existingUser.id}`);
          await updateDatabaseUser(supabase, existingUser.id);
        }
      } else {
        console.error('❌ Erro ao criar usuário:', authError.message);
        return;
      }
    } else {
      console.log('✅ Usuário criado no Auth');
      console.log(`📋 UUID: ${authData.user.id}`);
      console.log(`📧 Email: ${authData.user.email}`);
      
      await updateDatabaseUser(supabase, authData.user.id);
    }

  } catch (error) {
    console.error('❌ Erro:', error.message);
  }
}

async function updateDatabaseUser(supabase, userId) {
  console.log('\n💾 Inserindo usuário na tabela users...');
  
  const { data, error } = await supabase
    .from('users')
    .upsert({
      id: userId,
      email: 'admin@bmespaco.com.br',
      tipo_usuario: 'administrador',
      nome: 'Administrador do Sistema',
      telefone: '(11) 99999-9999',
      especializacao: 'Fisioterapia',
      registro_profissional: 'CREFITO-12345'
    }, {
      onConflict: 'email'
    });

  if (error) {
    console.error('❌ Erro ao inserir na tabela users:', error.message);
  } else {
    console.log('✅ Usuário inserido na tabela users');
    console.log('\n🎉 ADMINISTRADOR CRIADO COM SUCESSO!');
    console.log('================================');
    console.log('📧 Email: admin@bmespaco.com.br');
    console.log('🔒 Senha: BmEspaco2025!');
    console.log('🎯 Agora você pode fazer login no app!');
  }
}

if (require.main === module) {
  createAdminUser();
}

module.exports = { createAdminUser };
