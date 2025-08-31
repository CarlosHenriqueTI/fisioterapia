import React from 'react';
import { TouchableOpacity, Text, View } from 'react-native';
import { router } from 'expo-router';
import FontAwesome from '@expo/vector-icons/FontAwesome';

interface BackButtonProps {
  title?: string;
  onPress?: () => void;
  style?: 'light' | 'dark';
}

export default function BackButton({ 
  title = 'Voltar', 
  onPress,
  style = 'light' 
}: BackButtonProps) {
  const handlePress = () => {
    if (onPress) {
      onPress();
    } else {
      router.back();
    }
  };

  const textColor = style === 'light' ? 'text-white' : 'text-gray-700';
  const iconColor = style === 'light' ? '#FFFFFF' : '#374151';

  return (
    <TouchableOpacity
      onPress={handlePress}
      className="flex-row items-center py-2 px-1 mb-4"
      activeOpacity={0.7}
    >
      <FontAwesome name="chevron-left" size={18} color={iconColor} />
      <Text className={`ml-2 text-base font-medium ${textColor}`}>
        {title}
      </Text>
    </TouchableOpacity>
  );
}
