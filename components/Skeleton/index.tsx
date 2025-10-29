import { theme } from '@/theme';
import { useEffect, useRef } from 'react';
import { Animated, View, ViewStyle } from 'react-native';

interface SkeletonProps {
  width?: number | string;
  height?: number;
  borderRadius?: number;
  style?: ViewStyle;
}

export function Skeleton({ 
  width = '100%', 
  height = 20, 
  borderRadius = theme.borderRadius.md,
  style 
}: SkeletonProps) {
  const animatedValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(animatedValue, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: false,
        }),
        Animated.timing(animatedValue, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: false,
        }),
      ])
    ).start();
  }, []);

  const backgroundColor = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [theme.colors.gray[200], theme.colors.gray[300]],
  });

  return (
    <View style={[{ width: width as any, height, borderRadius, overflow: 'hidden' }, style]}>
      <Animated.View
        style={{
          width: '100%',
          height: '100%',
          backgroundColor,
        }}
      />
    </View>
  );
}

// Skeleton pré-configurados
export function SkeletonCard() {
  return (
    <View
      style={{
        backgroundColor: theme.colors.white,
        borderRadius: theme.borderRadius.xl,
        padding: theme.spacing[4],
        ...theme.shadows.md,
      }}
    >
      <View style={{ flexDirection: 'row', marginBottom: theme.spacing[3] }}>
        <Skeleton width={60} height={60} borderRadius={theme.borderRadius.full} />
        <View style={{ flex: 1, marginLeft: theme.spacing[3] }}>
          <Skeleton width="70%" height={16} style={{ marginBottom: theme.spacing[2] }} />
          <Skeleton width="50%" height={14} />
        </View>
      </View>
      <Skeleton width="100%" height={12} style={{ marginBottom: theme.spacing[2] }} />
      <Skeleton width="80%" height={12} />
    </View>
  );
}

export function SkeletonList({ count = 3 }: { count?: number }) {
  return (
    <View style={{ gap: theme.spacing[3] }}>
      {Array.from({ length: count }).map((_, index) => (
        <View
          key={index}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            padding: theme.spacing[3],
            backgroundColor: theme.colors.white,
            borderRadius: theme.borderRadius.lg,
            ...theme.shadows.sm,
          }}
        >
          <Skeleton width={48} height={48} borderRadius={theme.borderRadius.full} />
          <View style={{ flex: 1, marginLeft: theme.spacing[3] }}>
            <Skeleton width="60%" height={16} style={{ marginBottom: theme.spacing[2] }} />
            <Skeleton width="40%" height={14} />
          </View>
          <Skeleton width={60} height={32} borderRadius={theme.borderRadius.md} />
        </View>
      ))}
    </View>
  );
}

export function SkeletonStats() {
  return (
    <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: theme.spacing[3] }}>
      {Array.from({ length: 4 }).map((_, index) => (
        <View
          key={index}
          style={{
            flex: 1,
            minWidth: '47%',
            padding: theme.spacing[4],
            backgroundColor: theme.colors.white,
            borderRadius: theme.borderRadius.xl,
            ...theme.shadows.md,
          }}
        >
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: theme.spacing[2] }}>
            <Skeleton width={40} height={40} borderRadius={theme.borderRadius.md} />
            <Skeleton width={50} height={24} borderRadius={theme.borderRadius.md} />
          </View>
          <Skeleton width="80%" height={28} style={{ marginBottom: theme.spacing[1] }} />
          <Skeleton width="50%" height={14} />
        </View>
      ))}
    </View>
  );
}
