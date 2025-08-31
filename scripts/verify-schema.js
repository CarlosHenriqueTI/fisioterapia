#!/usr/bin/env node

/**
 * Script para verificar se o schema foi executado corretamente no Supabase
 */

const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

async function verifySchema() {
  try {
    console.log('🔍 Verificando execução do schema...\n');

    const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseKey) {
      console.error('❌ Variáveis de ambiente não configuradas!');
      process.exit(1);
    }

    const supabase = createClient(supabaseUrl, supabaseKey);

    console.log('🔄 Conectando ao Supabase...');

    // Verificar tabelas
    const { data: tables, error: tablesError } = await supabase
      .from('information_schema.tables')
      .select('table_name')
      .eq('table_schema', 'public');

    if (tablesError) {
      console.error('❌ Erro ao verificar tabelas:', tablesError.message);
      return;
    }

    const expectedTables = ['users', 'servicos', 'agendamentos', 'historico_atendimentos'];
    const existingTables = tables?.map(t => t.table_name) || [];
    
    console.log('📊 VERIFICAÇÃO DE TABELAS:');
    console.log('==========================');
    
    expectedTables.forEach(table => {
      if (existingTables.includes(table)) {
        console.log(`✅ ${table} - Criada`);
      } else {
        console.log(`❌ ${table} - Não encontrada`);
      }
    });

    const allTablesExist = expectedTables.every(table => existingTables.includes(table));

    if (allTablesExist) {
      console.log('\n🎉 SUCESSO! Todas as tabelas foram criadas corretamente!');
      
      // Verificar se há dados de exemplo
      const { data: users } = await supabase.from('users').select('count', { count: 'exact' });
      const { data: servicos } = await supabase.from('servicos').select('count', { count: 'exact' });
      
      console.log('\n📈 ESTATÍSTICAS:');
      console.log('================');
      console.log(`👥 Usuários: ${users?.length || 0}`);
      console.log(`🏥 Serviços: ${servicos?.length || 0}`);
      
    } else {
      console.log('\n⚠️  Algumas tabelas não foram encontradas.');
      console.log('📝 Execute o schema novamente no painel do Supabase.');
    }

  } catch (error) {
    console.error('❌ Erro na verificação:', error.message);
  }
}

if (require.main === module) {
  verifySchema();
}

module.exports = { verifySchema };
