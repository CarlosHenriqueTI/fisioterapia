import { useTheme } from '@/contexts/ThemeContext';
import { Ionicons } from '@expo/vector-icons';
import React, { useEffect, useRef } from 'react';
import { Animated, TouchableOpacity } from 'react-native';

export const ThemeToggle: React.FC = () => {
  const { mode, isDark, setMode } = useTheme();
  const rotateAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    // Rotate animation when theme changes
    Animated.sequence([
      Animated.timing(rotateAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(rotateAnim, {
        toValue: 0,
        duration: 0,
        useNativeDriver: true,
      }),
    ]).start();
  }, [isDark]);

  const handleToggle = () => {
    // Scale animation on press
    Animated.sequence([
      Animated.spring(scaleAnim, {
        toValue: 0.8,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 3,
        tension: 40,
        useNativeDriver: true,
      }),
    ]).start();

    // Toggle between light and dark (skip system for now)
    if (mode === 'light' || mode === 'system') {
      setMode('dark');
    } else {
      setMode('light');
    }
  };

  const rotation = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <TouchableOpacity onPress={handleToggle} activeOpacity={0.8}>
      <Animated.View
        style={{
          width: 44,
          height: 44,
          borderRadius: 22,
          backgroundColor: isDark ? 'rgba(148, 163, 184, 0.1)' : 'rgba(59, 130, 246, 0.1)',
          justifyContent: 'center',
          alignItems: 'center',
          transform: [{ rotate: rotation }, { scale: scaleAnim }],
        }}
      >
        <Ionicons
          name={isDark ? 'moon' : 'sunny'}
          size={24}
          color={isDark ? '#F59E0B' : '#3B82F6'}
        />
      </Animated.View>
    </TouchableOpacity>
  );
};
