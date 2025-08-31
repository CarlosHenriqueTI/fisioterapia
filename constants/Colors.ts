/**
 * Sistema de cores do BM Espaço Saúde
 * Design consistente para toda a aplicação
 */

export const Colors = {
  // Cores primárias da marca
  primary: {
    50: '#f0f9ff',
    100: '#e0f2fe',
    200: '#bae6fd',
    300: '#7dd3fc',
    400: '#38bdf8',
    500: '#0ea5e9', // Principal
    600: '#0284c7',
    700: '#0369a1',
    800: '#075985',
    900: '#0c4a6e',
  },

  // Cores secundárias (saúde/medicina)
  secondary: {
    50: '#f0fdf4',
    100: '#dcfce7',
    200: '#bbf7d0',
    300: '#86efac',
    400: '#4ade80',
    500: '#22c55e', // Verde medicina
    600: '#16a34a',
    700: '#15803d',
    800: '#166534',
    900: '#14532d',
  },

  // Cores de estado
  success: '#22c55e',
  warning: '#f59e0b',
  error: '#ef4444',
  info: '#3b82f6',

  // Tons neutros
  gray: {
    50: '#f9fafb',
    100: '#f3f4f6',
    200: '#e5e7eb',
    300: '#d1d5db',
    400: '#9ca3af',
    500: '#6b7280',
    600: '#4b5563',
    700: '#374151',
    800: '#1f2937',
    900: '#111827',
  },

  // Temas light/dark
  light: {
    text: '#1f2937',
    textSecondary: '#6b7280',
    background: '#ffffff',
    surface: '#f9fafb',
    border: '#e5e7eb',
    tint: '#0ea5e9',
    tabIconDefault: '#9ca3af',
    tabIconSelected: '#0ea5e9',
    cardBackground: '#ffffff',
    modalBackground: 'rgba(0, 0, 0, 0.5)',
  },
  
  dark: {
    text: '#f9fafb',
    textSecondary: '#d1d5db',
    background: '#111827',
    surface: '#1f2937',
    border: '#374151',
    tint: '#38bdf8',
    tabIconDefault: '#6b7280',
    tabIconSelected: '#38bdf8',
    cardBackground: '#1f2937',
    modalBackground: 'rgba(0, 0, 0, 0.8)',
  },
};

export default Colors;
