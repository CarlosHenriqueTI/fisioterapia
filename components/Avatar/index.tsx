import { theme } from '@/theme';
import { Ionicons } from '@expo/vector-icons';
import { Image, Text, View, ViewStyle } from 'react-native';

interface AvatarProps {
  source?: string;
  name?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  variant?: 'circle' | 'rounded' | 'square';
  showBadge?: boolean;
  badgeColor?: string;
  badgePosition?: 'top-right' | 'bottom-right';
  style?: ViewStyle;
}

export function Avatar({
  source,
  name,
  size = 'md',
  variant = 'circle',
  showBadge = false,
  badgeColor = '#22c55e',
  badgePosition = 'bottom-right',
  style,
}: AvatarProps) {
  const sizeMap = {
    xs: 32,
    sm: 40,
    md: 56,
    lg: 72,
    xl: 96,
    '2xl': 128,
  };

  const iconSizeMap = {
    xs: 16,
    sm: 20,
    md: 28,
    lg: 36,
    xl: 48,
    '2xl': 64,
  };

  const textSizeMap = {
    xs: 12,
    sm: 14,
    md: 20,
    lg: 26,
    xl: 36,
    '2xl': 48,
  };

  const badgeSizeMap = {
    xs: 8,
    sm: 10,
    md: 12,
    lg: 14,
    xl: 16,
    '2xl': 20,
  };

  const avatarSize = sizeMap[size];
  const iconSize = iconSizeMap[size];
  const textSize = textSizeMap[size];
  const badgeSize = badgeSizeMap[size];

  const borderRadiusMap = {
    circle: avatarSize / 2,
    rounded: theme.borderRadius.xl,
    square: theme.borderRadius.md,
  };

  const getInitials = (name?: string): string => {
    if (!name) return '?';
    const names = name.trim().split(' ');
    if (names.length === 1) return names[0].charAt(0).toUpperCase();
    return (names[0].charAt(0) + names[names.length - 1].charAt(0)).toUpperCase();
  };

  const getBackgroundColor = (name?: string): string => {
    const colors = [
      theme.colors.primary[500],
      theme.colors.secondary[500],
      theme.colors.accent[500],
      '#a855f7',
      '#3b82f6',
      '#ef4444',
      '#f59e0b',
    ];
    if (!name) return colors[0];
    const charCode = name.charCodeAt(0);
    return colors[charCode % colors.length];
  };

  const containerStyle: ViewStyle = {
    width: avatarSize,
    height: avatarSize,
    borderRadius: borderRadiusMap[variant],
    position: 'relative',
    ...style,
  };

  const badgeStyle: ViewStyle = {
    position: 'absolute',
    width: badgeSize,
    height: badgeSize,
    borderRadius: badgeSize / 2,
    backgroundColor: badgeColor,
    borderWidth: 2,
    borderColor: theme.colors.white,
    ...(badgePosition === 'top-right'
      ? { top: 0, right: 0 }
      : { bottom: 0, right: 0 }),
  };

  return (
    <View style={containerStyle}>
      {source ? (
        <Image
          source={{ uri: source }}
          style={{
            width: '100%',
            height: '100%',
            borderRadius: borderRadiusMap[variant],
          }}
          resizeMode="cover"
        />
      ) : (
        <View
          style={{
            width: '100%',
            height: '100%',
            borderRadius: borderRadiusMap[variant],
            backgroundColor: getBackgroundColor(name),
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          {name ? (
            <Text
              style={{
                color: theme.colors.white,
                fontSize: textSize,
                fontWeight: '700',
              }}
            >
              {getInitials(name)}
            </Text>
          ) : (
            <Ionicons name="person" size={iconSize} color={theme.colors.white} />
          )}
        </View>
      )}
      {showBadge && <View style={badgeStyle} />}
    </View>
  );
}
