#!/usr/bin/env node

/**
 * Script para executar o schema do banco de dados no Supabase
 * Este script lê o arquivo supabase-schema.sql e executa no projeto Supabase
 */

const fs = require('fs');
const path = require('path');

// Importar as variáveis de ambiente
require('dotenv').config();

async function executeSchema() {
  try {
    console.log('🔄 Iniciando execução do schema do banco de dados...\n');

    // Verificar se as variáveis de ambiente estão configuradas
    const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseKey) {
      console.error('❌ Erro: Variáveis de ambiente do Supabase não configuradas!');
      console.log('📝 Configure o arquivo .env com:');
      console.log('   - EXPO_PUBLIC_SUPABASE_URL');
      console.log('   - EXPO_PUBLIC_SUPABASE_ANON_KEY');
      process.exit(1);
    }

    console.log('✅ Variáveis de ambiente configuradas');
    console.log(`🔗 URL do Supabase: ${supabaseUrl}`);
    console.log(`🔑 Chave configurada: ${supabaseKey.substring(0, 20)}...`);

    // Ler o arquivo do schema
    const schemaPath = path.join(__dirname, 'database', 'supabase-schema.sql');
    
    if (!fs.existsSync(schemaPath)) {
      console.error('❌ Erro: Arquivo supabase-schema.sql não encontrado!');
      console.log(`📁 Procurado em: ${schemaPath}`);
      process.exit(1);
    }

    const schemaContent = fs.readFileSync(schemaPath, 'utf8');
    console.log('✅ Arquivo schema carregado com sucesso');
    console.log(`📊 Tamanho do arquivo: ${schemaContent.length} caracteres\n`);

    // Instruções para execução manual
    console.log('📋 INSTRUÇÕES PARA EXECUTAR O SCHEMA:');
    console.log('=====================================\n');
    
    console.log('1️⃣  Acesse o painel do Supabase:');
    console.log(`    🔗 ${supabaseUrl.replace('/rest/v1', '')}/project/default/sql\n`);
    
    console.log('2️⃣  Vá para "SQL Editor" no menu lateral\n');
    
    console.log('3️⃣  Clique em "New Query"\n');
    
    console.log('4️⃣  Copie e cole o conteúdo do arquivo:');
    console.log(`    📁 ${schemaPath}\n`);
    
    console.log('5️⃣  Clique em "Run" para executar o script\n');
    
    console.log('6️⃣  Verifique se as tabelas foram criadas:');
    console.log('    SQL: SELECT table_name FROM information_schema.tables WHERE table_schema = \'public\';\n');

    // Mostrar resumo do que será criado
    console.log('📊 RESUMO DO QUE SERÁ CRIADO:');
    console.log('=============================\n');
    
    const tableMatches = schemaContent.match(/CREATE TABLE (\w+)/g);
    if (tableMatches) {
      console.log('🗄️  Tabelas:');
      tableMatches.forEach(match => {
        const tableName = match.replace('CREATE TABLE ', '');
        console.log(`    ✅ ${tableName}`);
      });
      console.log('');
    }

    const functionMatches = schemaContent.match(/CREATE OR REPLACE FUNCTION (\w+)/g);
    if (functionMatches) {
      console.log('⚙️  Funções:');
      functionMatches.forEach(match => {
        const functionName = match.replace('CREATE OR REPLACE FUNCTION ', '');
        console.log(`    ✅ ${functionName}`);
      });
      console.log('');
    }

    const policyMatches = schemaContent.match(/CREATE POLICY/g);
    if (policyMatches) {
      console.log(`🔒 Políticas de Segurança: ${policyMatches.length} políticas RLS`);
      console.log('');
    }

    // Verificação automática (opcional)
    console.log('🤖 VERIFICAÇÃO AUTOMÁTICA (Opcional):');
    console.log('====================================\n');
    console.log('Para verificar automaticamente se o schema foi executado:');
    console.log('    npm run verify-schema\n');

    console.log('✅ Script de execução concluído!');
    console.log('📝 Siga as instruções acima para executar o schema no Supabase.\n');

  } catch (error) {
    console.error('❌ Erro ao executar o script:', error.message);
    process.exit(1);
  }
}

// Verificar se está sendo executado diretamente
if (require.main === module) {
  executeSchema();
}

module.exports = { executeSchema };
