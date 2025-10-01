// 🎨 Design System Moderno
export const colors = {
  // 🔵 Cores primárias - Azul moderno
  primary: {
    50: '#f0f9ff',
    100: '#e0f2fe',
    200: '#bae6fd',
    300: '#7dd3fc',
    400: '#38bdf8',
    500: '#0ea5e9', // Nova cor principal - mais vibrante
    600: '#0284c7',
    700: '#0369a1',
    800: '#075985',
    900: '#0c4a6e',
    950: '#082f49',
  },
  
  // 🟢 Cores secundárias - Verde saúde
  secondary: {
    50: '#f0fdf4',
    100: '#dcfce7',
    200: '#bbf7d0',
    300: '#86efac',
    400: '#4ade80',
    500: '#22c55e',
    600: '#16a34a',
    700: '#15803d',
    800: '#166534',
    900: '#14532d',
    950: '#052e16',
  },
  
  // 🟡 Accent - Dourado médico
  accent: {
    50: '#fffbeb',
    100: '#fef3c7',
    200: '#fde68a',
    300: '#fcd34d',
    400: '#fbbf24',
    500: '#f59e0b',
    600: '#d97706',
    700: '#b45309',
    800: '#92400e',
    900: '#78350f',
    950: '#451a03',
  },
  
  // Tons de cinza
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
  
  // Estados
  success: {
    50: '#f0fdf4',
    100: '#dcfce7',
    500: '#22c55e',
    600: '#16a34a',
  },
  
  warning: {
    50: '#fffbeb',
    100: '#fef3c7',
    500: '#f59e0b',
    600: '#d97706',
  },
  
  error: {
    50: '#fef2f2',
    100: '#fee2e2',
    500: '#ef4444',
    600: '#dc2626',
  },
  
  info: {
    50: '#eff6ff',
    100: '#dbeafe',
    500: '#3b82f6',
    600: '#2563eb',
  },
  
  // Cores especiais
  white: '#ffffff',
  black: '#000000',
  transparent: 'transparent',
};

// 🌈 Gradientes modernos
export const gradients = {
  primary: ['#0ea5e9', '#3b82f6'],
  secondary: ['#22c55e', '#16a34a'],
  accent: ['#f59e0b', '#d97706'],
  medical: ['#0ea5e9', '#22c55e'],
  sunset: ['#f59e0b', '#ef4444'],
  ocean: ['#06b6d4', '#3b82f6'],
  success: ['#22c55e', '#15803d'],
  danger: ['#ef4444', '#dc2626'],
  neutral: ['#64748b', '#475569'],
};

// 🎯 Cores semânticas modernas
export const semantic = {
  background: {
    primary: '#ffffff',
    secondary: '#f8fafc',
    tertiary: '#f1f5f9',
    dark: '#0f172a',
  },
  surface: {
    primary: '#ffffff',
    secondary: '#f8fafc',
    elevated: '#ffffff',
    glass: 'rgba(255, 255, 255, 0.8)',
    darkGlass: 'rgba(15, 23, 42, 0.8)',
  },
  text: {
    primary: '#0f172a',
    secondary: '#475569',
    tertiary: '#94a3b8',
    inverse: '#ffffff',
    accent: '#0ea5e9',
  },
  border: {
    light: '#e2e8f0',
    medium: '#cbd5e1',
    strong: '#94a3b8',
    accent: '#0ea5e9',
  },
};

// ✍️ Tipografia moderna
export const typography = {
  fontFamily: {
    display: 'System', // Para títulos grandes
    heading: 'System', // Para cabeçalhos
    body: 'System',    // Para texto normal
    mono: 'Courier',   // Para códigos/dados
  },
  
  fontSize: {
    xs: 11,
    sm: 13,
    base: 15,
    md: 16,
    lg: 18,
    xl: 20,
    '2xl': 22,
    '3xl': 28,
    '4xl': 32,
    '5xl': 40,
    '6xl': 48,
  },
  
  lineHeight: {
    tight: 1.2,
    normal: 1.4,
    relaxed: 1.6,
    loose: 1.8,
  },
  
  fontWeight: {
    light: '300',
    normal: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
    extrabold: '800',
  },
  
  // 📝 Estilos de texto predefinidos
  textStyles: {
    display: {
      fontSize: 48,
      fontWeight: '800',
      lineHeight: 1.2,
      letterSpacing: -0.5,
    },
    h1: {
      fontSize: 32,
      fontWeight: '700',
      lineHeight: 1.3,
    },
    h2: {
      fontSize: 28,
      fontWeight: '600',
      lineHeight: 1.3,
    },
    h3: {
      fontSize: 22,
      fontWeight: '600',
      lineHeight: 1.4,
    },
    body: {
      fontSize: 15,
      fontWeight: '400',
      lineHeight: 1.5,
    },
    caption: {
      fontSize: 13,
      fontWeight: '400',
      lineHeight: 1.4,
    },
    overline: {
      fontSize: 11,
      fontWeight: '600',
      textTransform: 'uppercase',
      letterSpacing: 1.2,
    },
  },
};

// Espaçamento
export const spacing = {
  0: 0,
  1: 4,
  2: 8,
  3: 12,
  4: 16,
  5: 20,
  6: 24,
  7: 28,
  8: 32,
  10: 40,
  12: 48,
  16: 64,
  20: 80,
  24: 96,
  32: 128,
  40: 160,
  48: 192,
  56: 224,
  64: 256,
};

// 🔳 Bordas e raios modernos
export const borderRadius = {
  none: 0,
  xs: 2,
  sm: 4,
  md: 6,
  lg: 8,
  xl: 12,
  '2xl': 16,
  '3xl': 20,
  '4xl': 28,
  full: 9999,
};

// 📐 Sistema de layout moderno
export const layout = {
  container: {
    sm: 640,
    md: 768,
    lg: 1024,
    xl: 1280,
  },
  screen: {
    padding: 24,
    paddingSm: 16,
    paddingXs: 12,
  },
  card: {
    padding: 20,
    paddingSm: 16,
    margin: 12,
  },
};

// ✨ Sistema de sombras moderno
export const shadows = {
  none: {
    shadowColor: 'transparent',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0,
    shadowRadius: 0,
    elevation: 0,
  },
  xs: {
    shadowColor: '#0f172a',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 1,
    elevation: 1,
  },
  sm: {
    shadowColor: '#0f172a',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  md: {
    shadowColor: '#0f172a',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 4,
  },
  lg: {
    shadowColor: '#0f172a',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.15,
    shadowRadius: 15,
    elevation: 8,
  },
  xl: {
    shadowColor: '#0f172a',
    shadowOffset: { width: 0, height: 20 },
    shadowOpacity: 0.25,
    shadowRadius: 25,
    elevation: 12,
  },
  colored: {
    primary: {
      shadowColor: '#0ea5e9',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.3,
      shadowRadius: 8,
      elevation: 6,
    },
    success: {
      shadowColor: '#22c55e',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.3,
      shadowRadius: 8,
      elevation: 6,
    },
  },
};

// 🎭 Efeitos visuais modernos
export const effects = {
  blur: {
    sm: 4,
    md: 8,
    lg: 16,
    xl: 24,
  },
  opacity: {
    disabled: 0.4,
    pressed: 0.8,
    overlay: 0.5,
    subtle: 0.6,
  },
  transform: {
    scale: {
      pressed: 0.98,
      hover: 1.02,
      active: 0.95,
    },
  },
};

// 🌊 Animações
export const animations = {
  duration: {
    fast: 150,
    normal: 250,
    slow: 350,
  },
  easing: {
    ease: 'ease',
    easeIn: 'ease-in',
    easeOut: 'ease-out',
    easeInOut: 'ease-in-out',
  },
};

// 🎨 Tema completo moderno
export const theme = {
  colors,
  gradients,
  semantic,
  typography,
  spacing,
  borderRadius,
  layout,
  shadows,
  effects,
  animations,
};

// 🏥 Tema específico para saúde/medicina
export const medicalTheme = {
  ...theme,
  colors: {
    ...colors,
    primary: colors.primary,
    secondary: colors.secondary,
    accent: colors.accent,
  },
  brandColors: {
    trust: '#0ea5e9',      // Azul confiança
    health: '#22c55e',     // Verde saúde
    care: '#f59e0b',       // Dourado cuidado
    emergency: '#ef4444',   // Vermelho emergência
  },
};

// 🎯 Utilitários do tema
export const themeUtils = {
  // Função para criar sombra com cor personalizada
  createColoredShadow: (color: string, opacity = 0.3) => ({
    shadowColor: color,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: opacity,
    shadowRadius: 8,
    elevation: 6,
  }),
  
  // Função para criar gradiente linear
  createLinearGradient: (colors: string[]) => ({
    colors,
    start: { x: 0, y: 0 },
    end: { x: 1, y: 1 },
  }),
  
  // Função para obter cor com opacidade
  getColorWithOpacity: (color: string, opacity: number) => {
    const hex = color.replace('#', '');
    const r = parseInt(hex.substr(0, 2), 16);
    const g = parseInt(hex.substr(2, 2), 16);
    const b = parseInt(hex.substr(4, 2), 16);
    return `rgba(${r}, ${g}, ${b}, ${opacity})`;
  },
};

// Types
export type Theme = typeof theme;
export type MedicalTheme = typeof medicalTheme;
export type Colors = typeof colors;
export type Gradients = typeof gradients;
export type Semantic = typeof semantic;
export type Typography = typeof typography;
export type Spacing = typeof spacing;
export type BorderRadius = typeof borderRadius;
export type Layout = typeof layout;
export type Shadows = typeof shadows;
export type Effects = typeof effects;
export type Animations = typeof animations;
