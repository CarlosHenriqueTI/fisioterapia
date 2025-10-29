import { theme } from '@/theme';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useRef } from 'react';
import { ActivityIndicator, Animated, Text, TouchableOpacity, TouchableOpacityProps, View } from 'react-native';

interface ButtonProps extends TouchableOpacityProps {
  title?: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'gradient';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  loading?: boolean;
  icon?: string;
  children?: React.ReactNode;
  gradient?: readonly [string, string, ...string[]];
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
  gradient = ['#0ea5e9', '#3b82f6'] as const,
  ...rest 
}: ButtonProps) {
  
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.96,
      useNativeDriver: true,
      friction: 3,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
      friction: 3,
    }).start();
  };
  
  const getButtonStyle = () => {
    const baseStyle = {
      flexDirection: 'row' as const,
      alignItems: 'center' as const,
      justifyContent: 'center' as const,
      borderRadius: theme.borderRadius.xl,
      overflow: 'hidden' as const,
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
        minHeight: 48,
      },
      large: {
        paddingHorizontal: theme.spacing[6],
        paddingVertical: theme.spacing[4],
        minHeight: 56,
      },
    };

    const variantStyles = {
      primary: {
        backgroundColor: disabled 
          ? theme.colors.gray[300] 
          : theme.colors.primary[500],
      },
      secondary: {
        backgroundColor: disabled 
          ? theme.colors.gray[300] 
          : theme.colors.secondary[500],
      },
      outline: {
        backgroundColor: 'transparent',
        borderWidth: 2,
        borderColor: disabled 
          ? theme.colors.gray[300] 
          : theme.colors.primary[500],
      },
      ghost: {
        backgroundColor: disabled 
          ? theme.colors.gray[100] 
          : theme.colors.primary[50],
      },
      gradient: {
        backgroundColor: 'transparent',
      },
    };

    return {
      ...baseStyle,
      ...sizeStyles[size],
      ...variantStyles[variant],
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
        fontWeight: theme.typography.fontWeight.bold as any,
      },
      secondary: {
        color: theme.colors.white,
        fontWeight: theme.typography.fontWeight.bold as any,
      },
      outline: {
        color: disabled 
          ? theme.colors.gray[400] 
          : theme.colors.primary[600],
        fontWeight: theme.typography.fontWeight.semibold as any,
      },
      ghost: {
        color: disabled 
          ? theme.colors.gray[400] 
          : theme.colors.primary[600],
        fontWeight: theme.typography.fontWeight.semibold as any,
      },
      gradient: {
        color: theme.colors.white,
        fontWeight: theme.typography.fontWeight.bold as any,
      },
    };

    return {
      ...sizeStyles[size],
      ...variantStyles[variant],
    };
  };

  const iconSize = size === 'small' ? 18 : size === 'large' ? 28 : 22;
  const iconColor = variant === 'primary' || variant === 'secondary' || variant === 'gradient'
    ? theme.colors.white
    : disabled 
      ? theme.colors.gray[400]
      : theme.colors.primary[600];

  const buttonContent = (
    <>
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
    </>
  );

  if (variant === 'gradient' && !disabled) {
    return (
      <Animated.View style={[{ transform: [{ scale: scaleAnim }] }, style]}>
        <TouchableOpacity
          onPress={onPress}
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
          disabled={disabled || loading}
          testID={testID}
          {...rest}
        >
          <LinearGradient
            colors={gradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={getButtonStyle()}
          >
            {buttonContent}
          </LinearGradient>
        </TouchableOpacity>
      </Animated.View>
    );
  }

  return (
    <Animated.View style={[{ transform: [{ scale: scaleAnim }] }, style]}>
      <TouchableOpacity 
        style={getButtonStyle()}
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        disabled={disabled || loading}
        testID={testID}
        {...rest}
      >
        {buttonContent}
      </TouchableOpacity>
    </Animated.View>
  );
}
