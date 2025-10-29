import { theme } from '@/theme';
import { Ionicons } from '@expo/vector-icons';
import { Text, View, ViewStyle } from 'react-native';

interface BadgeProps {
  label: string;
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info' | 'neutral';
  size?: 'sm' | 'md' | 'lg';
  icon?: string;
  style?: ViewStyle;
  rounded?: boolean;
}

export function Badge({
  label,
  variant = 'primary',
  size = 'md',
  icon,
  style,
  rounded = false,
}: BadgeProps) {
  const variantStyles = {
    primary: {
      backgroundColor: theme.colors.primary[50],
      color: theme.colors.primary[700],
      borderColor: theme.colors.primary[200],
    },
    secondary: {
      backgroundColor: theme.colors.secondary[50],
      color: theme.colors.secondary[700],
      borderColor: theme.colors.secondary[200],
    },
    success: {
      backgroundColor: '#dcfce7',
      color: '#15803d',
      borderColor: '#86efac',
    },
    warning: {
      backgroundColor: '#fef3c7',
      color: '#92400e',
      borderColor: '#fde68a',
    },
    error: {
      backgroundColor: '#fee2e2',
      color: '#991b1b',
      borderColor: '#fca5a5',
    },
    info: {
      backgroundColor: '#dbeafe',
      color: '#1e40af',
      borderColor: '#93c5fd',
    },
    neutral: {
      backgroundColor: theme.colors.gray[100],
      color: theme.colors.gray[700],
      borderColor: theme.colors.gray[300],
    },
  };

  const sizeStyles = {
    sm: {
      paddingHorizontal: theme.spacing[2],
      paddingVertical: theme.spacing[1] / 2,
      fontSize: theme.typography.fontSize.xs,
      iconSize: 12,
    },
    md: {
      paddingHorizontal: theme.spacing[3],
      paddingVertical: theme.spacing[1],
      fontSize: theme.typography.fontSize.sm,
      iconSize: 14,
    },
    lg: {
      paddingHorizontal: theme.spacing[4],
      paddingVertical: theme.spacing[2] / 2,
      fontSize: theme.typography.fontSize.base,
      iconSize: 16,
    },
  };

  const selectedVariant = variantStyles[variant];
  const selectedSize = sizeStyles[size];

  const containerStyle: ViewStyle = {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: selectedVariant.backgroundColor,
    borderWidth: 1,
    borderColor: selectedVariant.borderColor,
    borderRadius: rounded ? 100 : theme.borderRadius.md,
    paddingHorizontal: selectedSize.paddingHorizontal,
    paddingVertical: selectedSize.paddingVertical,
    alignSelf: 'flex-start',
    ...style,
  };

  return (
    <View style={containerStyle}>
      {icon && (
        <Ionicons
          name={icon as any}
          size={selectedSize.iconSize}
          color={selectedVariant.color}
          style={{ marginRight: theme.spacing[1] }}
        />
      )}
      <Text
        style={{
          fontSize: selectedSize.fontSize,
          fontWeight: '600',
          color: selectedVariant.color,
        }}
      >
        {label}
      </Text>
    </View>
  );
}
