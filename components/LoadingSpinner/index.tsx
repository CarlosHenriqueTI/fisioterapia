import { theme } from '@/theme';
import { useEffect, useRef } from 'react';
import { Animated, View } from 'react-native';

interface LoadingSpinnerProps {
  size?: 'small' | 'medium' | 'large';
  color?: string;
  style?: any;
}

export const LoadingSpinner = ({ 
  size = 'medium', 
  color = theme.colors.primary[500],
  style 
}: LoadingSpinnerProps) => {
  const spinValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const spinAnimation = Animated.loop(
      Animated.timing(spinValue, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      })
    );
    
    spinAnimation.start();
    
    return () => spinAnimation.stop();
  }, [spinValue]);

  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  const sizeMap = {
    small: 20,
    medium: 32,
    large: 48,
  };

  const spinnerSize = sizeMap[size];

  return (
    <View style={[{ alignItems: 'center', justifyContent: 'center' }, style]}>
      <Animated.View
        style={{
          width: spinnerSize,
          height: spinnerSize,
          borderWidth: 3,
          borderColor: `${color}20`,
          borderTopColor: color,
          borderRadius: spinnerSize / 2,
          transform: [{ rotate: spin }],
        }}
      />
    </View>
  );
};
