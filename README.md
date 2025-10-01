# BM Espaço Saúde - Sistema de Fisioterapia

Sistema mobile desenvolvido em React Native/Expo para gerenciamento de consultório de fisioterapia com interfaces separadas para administradores e clientes.

## 🚀 Tecnologias

- **React Native 0.81** + **Expo 54** + **TypeScript**
- **Expo Router** (navegação baseada em arquivos)
- **NativeWind** (Tailwind CSS para React Native)
- **Context API** + **Zustand** (gerenciamento de estado)
- **React Native Toast Message** + **Axios**

## 📁 Estrutura

```
app/
├── (administrator)/    # Login administrador
├── (client)/          # Login/cadastro cliente  
├── (tabs)/           # Navegação principal
│   ├── (administrator)/  # Dashboard, clientes, consultas, cadastro, relatórios
│   └── (customers)/     # Dashboard, consultas, histórico, perfil
├── selection.tsx      # Seleção de área
└── index.tsx         # Página inicial

components/           # Card, CustomButton, CustomInput, LoadingSpinner
contexts/            # ClientAuthContext
services/            # auth.ts (API)
utils/              # validation.ts, errorHandler.ts
theme/              # Sistema de design
```

## ⚡ Instalação Rápida

```bash
npm install
npm start
```

## 🎨 Funcionalidades

**👨‍💼 Administrador**: Dashboard com métricas, gerenciar clientes/consultas, cadastros, relatórios
**👤 Cliente**: Dashboard personalizado, agendar consultas, histórico, perfil

## � Design System

- **Cores**: Azul (admin) / Verde (cliente)
- **Componentes**: Cards elevados, inputs com validação, navegação por tabs
- **Layout**: ScrollView completo, SafeAreaView, tema unificado

## 📱 Como Usar

1. Selecione área (Admin/Cliente)
2. **Admin**: Login direto | **Cliente**: Login ou cadastro
3. Navegue pelas funcionalidades via tabs

## 📄 Scripts

- `npm start` - Servidor de desenvolvimento
- `npm run android/ios/web` - Plataforma específica
- `npm run server` - JSON Server (mock API)

---
**Projeto FDW - Fisioterapia - UniSenac**