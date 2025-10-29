import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { Appearance, ColorSchemeName } from 'react-native';

type ThemeMode = 'light' | 'dark' | 'system';

interface ThemeContextType {
  mode: ThemeMode;
  isDark: boolean;
  setMode: (mode: ThemeMode) => void;
  colors: ThemeColors;
}

interface ThemeColors {
  // Background colors
  background: string;
  backgroundSecondary: string;
  backgroundTertiary: string;
  
  // Card colors
  card: string;
  cardSecondary: string;
  
  // Text colors
  text: string;
  textSecondary: string;
  textTertiary: string;
  
  // Border colors
  border: string;
  borderLight: string;
  
  // Primary colors
  primary: string;
  primaryLight: string;
  primaryDark: string;
  
  // Accent colors
  success: string;
  error: string;
  warning: string;
  info: string;
  
  // Glass effect
  glass: string;
  glassBorder: string;
  
  // Shadow
  shadow: string;
}

const lightColors: ThemeColors = {
  background: '#FFFFFF',
  backgroundSecondary: '#F9FAFB',
  backgroundTertiary: '#F3F4F6',
  
  card: '#FFFFFF',
  cardSecondary: '#F9FAFB',
  
  text: '#111827',
  textSecondary: '#6B7280',
  textTertiary: '#9CA3AF',
  
  border: '#E5E7EB',
  borderLight: '#F3F4F6',
  
  primary: '#3B82F6',
  primaryLight: '#DBEAFE',
  primaryDark: '#1E40AF',
  
  success: '#10B981',
  error: '#EF4444',
  warning: '#F59E0B',
  info: '#3B82F6',
  
  glass: 'rgba(255, 255, 255, 0.7)',
  glassBorder: 'rgba(255, 255, 255, 0.2)',
  
  shadow: 'rgba(0, 0, 0, 0.1)',
};

const darkColors: ThemeColors = {
  background: '#0F172A',
  backgroundSecondary: '#1E293B',
  backgroundTertiary: '#334155',
  
  card: '#1E293B',
  cardSecondary: '#334155',
  
  text: '#F1F5F9',
  textSecondary: '#CBD5E1',
  textTertiary: '#94A3B8',
  
  border: '#334155',
  borderLight: '#475569',
  
  primary: '#60A5FA',
  primaryLight: '#1E3A8A',
  primaryDark: '#93C5FD',
  
  success: '#34D399',
  error: '#F87171',
  warning: '#FBBF24',
  info: '#60A5FA',
  
  glass: 'rgba(30, 41, 59, 0.7)',
  glassBorder: 'rgba(148, 163, 184, 0.1)',
  
  shadow: 'rgba(0, 0, 0, 0.3)',
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const THEME_STORAGE_KEY = '@app_theme_mode';

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [mode, setModeState] = useState<ThemeMode>('system');
  const [systemColorScheme, setSystemColorScheme] = useState<ColorSchemeName>(
    Appearance.getColorScheme()
  );

  // Load saved theme preference
  useEffect(() => {
    loadThemePreference();
  }, []);

  // Listen to system theme changes
  useEffect(() => {
    const subscription = Appearance.addChangeListener(({ colorScheme }) => {
      setSystemColorScheme(colorScheme);
    });

    return () => subscription.remove();
  }, []);

  const loadThemePreference = async () => {
    try {
      const savedMode = await AsyncStorage.getItem(THEME_STORAGE_KEY);
      if (savedMode && (savedMode === 'light' || savedMode === 'dark' || savedMode === 'system')) {
        setModeState(savedMode as ThemeMode);
      }
    } catch (error) {
      console.error('Error loading theme preference:', error);
    }
  };

  const setMode = async (newMode: ThemeMode) => {
    try {
      await AsyncStorage.setItem(THEME_STORAGE_KEY, newMode);
      setModeState(newMode);
    } catch (error) {
      console.error('Error saving theme preference:', error);
    }
  };

  // Determine if dark mode should be active
  const isDark = mode === 'dark' || (mode === 'system' && systemColorScheme === 'dark');
  const colors = isDark ? darkColors : lightColors;

  return (
    <ThemeContext.Provider value={{ mode, isDark, setMode, colors }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
