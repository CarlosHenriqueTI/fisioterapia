import { theme } from '@/theme';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useEffect, useRef } from 'react';
import { Animated, Text, TouchableOpacity, View } from 'react-native';

interface ToastProps {
  visible: boolean;
  type?: 'success' | 'error' | 'warning' | 'info';
  title: string;
  message?: string;
  duration?: number;
  onHide: () => void;
}

export function Toast({ 
  visible, 
  type = 'success', 
  title, 
  message, 
  duration = 3000,
  onHide 
}: ToastProps) {
  const translateY = useRef(new Animated.Value(-100)).current;
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      Animated.parallel([
        Animated.spring(translateY, {
          toValue: 0,
          friction: 8,
          tension: 40,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();

      const timer = setTimeout(() => {
        hideToast();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [visible]);

  const hideToast = () => {
    Animated.parallel([
      Animated.timing(translateY, {
        toValue: -100,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(opacity, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start(() => {
      onHide();
    });
  };

  const config = {
    success: {
      gradient: ['#10b981', '#059669'] as const,
      icon: 'checkmark-circle' as const,
      iconColor: '#fff',
    },
    error: {
      gradient: ['#ef4444', '#dc2626'] as const,
      icon: 'close-circle' as const,
      iconColor: '#fff',
    },
    warning: {
      gradient: ['#f59e0b', '#d97706'] as const,
      icon: 'warning' as const,
      iconColor: '#fff',
    },
    info: {
      gradient: ['#3b82f6', '#2563eb'] as const,
      icon: 'information-circle' as const,
      iconColor: '#fff',
    },
  };

  const currentConfig = config[type];

  if (!visible) return null;

  return (
    <Animated.View
      style={{
        position: 'absolute',
        top: 50,
        left: theme.spacing[4],
        right: theme.spacing[4],
        zIndex: 9999,
        transform: [{ translateY }],
        opacity,
      }}
    >
      <TouchableOpacity activeOpacity={0.9} onPress={hideToast}>
        <LinearGradient
          colors={currentConfig.gradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={{
            borderRadius: theme.borderRadius.xl,
            padding: theme.spacing[4],
            flexDirection: 'row',
            alignItems: 'center',
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.3,
            shadowRadius: 8,
            elevation: 8,
          }}
        >
          <View style={{
            backgroundColor: 'rgba(255, 255, 255, 0.2)',
            padding: theme.spacing[2],
            borderRadius: theme.borderRadius.full,
            marginRight: theme.spacing[3],
          }}>
            <Ionicons 
              name={currentConfig.icon} 
              size={24} 
              color={currentConfig.iconColor} 
            />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={{
              fontSize: theme.typography.fontSize.base,
              fontWeight: '700' as any,
              color: theme.colors.white,
              marginBottom: message ? 2 : 0,
            }}>
              {title}
            </Text>
            {message && (
              <Text style={{
                fontSize: theme.typography.fontSize.sm,
                color: 'rgba(255, 255, 255, 0.9)',
              }}>
                {message}
              </Text>
            )}
          </View>
          <TouchableOpacity onPress={hideToast}>
            <Ionicons name="close" size={20} color="rgba(255, 255, 255, 0.8)" />
          </TouchableOpacity>
        </LinearGradient>
      </TouchableOpacity>
    </Animated.View>
  );
}

// Hook para usar o Toast
export function useToast() {
  const [toastConfig, setToastConfig] = React.useState<{
    visible: boolean;
    type: 'success' | 'error' | 'warning' | 'info';
    title: string;
    message?: string;
  }>({
    visible: false,
    type: 'success',
    title: '',
    message: '',
  });

  const showToast = (
    type: 'success' | 'error' | 'warning' | 'info',
    title: string,
    message?: string
  ) => {
    setToastConfig({ visible: true, type, title, message });
  };

  const hideToast = () => {
    setToastConfig(prev => ({ ...prev, visible: false }));
  };

  return {
    toastConfig,
    showToast,
    hideToast,
    showSuccess: (title: string, message?: string) => showToast('success', title, message),
    showError: (title: string, message?: string) => showToast('error', title, message),
    showWarning: (title: string, message?: string) => showToast('warning', title, message),
    showInfo: (title: string, message?: string) => showToast('info', title, message),
  };
}
