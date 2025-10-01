import { theme } from '@/theme';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { ActivityIndicator, Text, TouchableOpacity, TouchableOpacityProps, View } from 'react-native';

interface ButtonProps extends TouchableOpacityProps {
  title?: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  loading?: boolean;
  icon?: string;
  children?: React.ReactNode;
}

export function CustomButton({ 
  title, 
  onPress,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  loading = false,
  icon,
  style,
  children,
  testID,
  ...rest 
}: ButtonProps) {
  
  const getButtonStyle = () => {
    const baseStyle = {
      flexDirection: 'row' as const,
      alignItems: 'center' as const,
      justifyContent: 'center' as const,
      borderRadius: theme.borderRadius.xl,
      ...theme.shadows.sm,
      // Animação suave
      transform: disabled ? [{ scale: 0.98 }] : [{ scale: 1 }],
    };

    const sizeStyles = {
      small: {
        paddingHorizontal: theme.spacing[3],
        paddingVertical: theme.spacing[2],
        minHeight: 36,
      },
      medium: {
        paddingHorizontal: theme.spacing[5],
        paddingVertical: theme.spacing[3],
        minHeight: 44,
      },
      large: {
        paddingHorizontal: theme.spacing[6],
        paddingVertical: theme.spacing[4],
        minHeight: 52,
      },
    };

    const variantStyles = {
      primary: {
        backgroundColor: disabled 
          ? theme.colors.gray[300] 
          : theme.colors.primary[500],
        ...(!disabled && theme.shadows.colored.primary),
      },
      secondary: {
        backgroundColor: disabled 
          ? theme.colors.gray[300] 
          : theme.colors.secondary[500],
        ...(!disabled && theme.shadows.colored.success),
      },
      outline: {
        backgroundColor: 'transparent',
        borderWidth: 1.5,
        borderColor: disabled 
          ? theme.colors.gray[300] 
          : theme.colors.primary[500],
      },
      ghost: {
        backgroundColor: disabled 
          ? theme.colors.gray[100] 
          : theme.colors.primary[50],
      },
    };

    return {
      ...baseStyle,
      ...sizeStyles[size],
      ...variantStyles[variant],
      ...(style as object),
    };
  };

  const getTextStyle = () => {
    const sizeStyles = {
      small: {
        fontSize: theme.typography.fontSize.sm,
        letterSpacing: 0.3,
      },
      medium: {
        fontSize: theme.typography.fontSize.base,
        letterSpacing: 0.2,
      },
      large: {
        fontSize: theme.typography.fontSize.lg,
        letterSpacing: 0.1,
      },
    };

    const variantStyles = {
      primary: {
        color: theme.colors.white,
        fontWeight: theme.typography.fontWeight.semibold as any,
      },
      secondary: {
        color: theme.colors.white,
        fontWeight: theme.typography.fontWeight.semibold as any,
      },
      outline: {
        color: disabled 
          ? theme.colors.gray[400] 
          : theme.colors.primary[600],
        fontWeight: theme.typography.fontWeight.medium as any,
      },
      ghost: {
        color: disabled 
          ? theme.colors.gray[400] 
          : theme.colors.primary[600],
        fontWeight: theme.typography.fontWeight.medium as any,
      },
    };

    return {
      ...sizeStyles[size],
      ...variantStyles[variant],
    };
  };

  const iconSize = size === 'small' ? 18 : size === 'large' ? 26 : 22;
  const iconColor = variant === 'primary' || variant === 'secondary' 
    ? theme.colors.white
    : disabled 
      ? theme.colors.gray[400]
      : theme.colors.primary[600];

  return (
    <TouchableOpacity 
      style={getButtonStyle()}
      onPress={onPress}
      disabled={disabled || loading}
      testID={testID}
      {...rest}
    >
      {loading ? (
        <ActivityIndicator 
          size="small" 
          color={iconColor} 
        />
      ) : (
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          {icon && (
            <Ionicons 
              name={icon as any} 
              size={iconSize} 
              color={iconColor}
              style={{ marginRight: title ? theme.spacing[2] : 0 }}
            />
          )}
          {title && (
            <Text style={getTextStyle()}>
              {title}
            </Text>
          )}
          {children}
        </View>
      )}
    </TouchableOpacity>
  );
}
