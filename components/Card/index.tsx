import { theme } from '@/theme';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Text, TouchableOpacity, View, ViewStyle } from 'react-native';

interface CardProps {
  children: React.ReactNode;
  style?: ViewStyle;
  onPress?: () => void;
  variant?: 'default' | 'elevated' | 'outlined' | 'glass';
  padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  shadow?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
}

export function Card({ 
  children, 
  style, 
  onPress,
  variant = 'default',
  padding = 'md',
  shadow = 'md'
}: CardProps) {
  const getCardStyle = (): ViewStyle => {
    const baseStyle: ViewStyle = {
      borderRadius: theme.borderRadius.xl,
      overflow: 'hidden',
    };

    // Variantes
    const variantStyles: Record<string, ViewStyle> = {
      default: {
        backgroundColor: theme.colors.white,
        ...theme.shadows[shadow],
      },
      elevated: {
        backgroundColor: theme.colors.white,
        ...theme.shadows.lg,
        borderWidth: 1,
        borderColor: theme.semantic.border.light,
      },
      outlined: {
        backgroundColor: theme.colors.white,
        borderWidth: 2,
        borderColor: theme.semantic.border.medium,
      },
      glass: {
        backgroundColor: theme.semantic.surface.glass,
        borderWidth: 1,
        borderColor: theme.semantic.border.light,
      },
    };

    // Padding
    const paddingValues = {
      none: 0,
      sm: theme.spacing[3],
      md: theme.spacing[4],
      lg: theme.spacing[6],
      xl: theme.spacing[8],
    };

    return {
      ...baseStyle,
      ...variantStyles[variant],
      padding: paddingValues[padding],
    };
  };

  const cardStyle: ViewStyle = {
    ...getCardStyle(),
    ...style,
  };

  if (onPress) {
    return (
      <TouchableOpacity style={cardStyle} onPress={onPress}>
        {children}
      </TouchableOpacity>
    );
  }

  return (
    <View style={cardStyle}>
      {children}
    </View>
  );
}

interface StatCardProps {
  title: string;
  value: string;
  icon?: string;
  color?: string;
  onPress?: () => void;
}

export function StatCard({ title, value, icon, color = '#3b82f6', onPress }: StatCardProps) {
  return (
    <Card onPress={onPress} style={{ flex: 1, marginHorizontal: 4 }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
        <View style={{ flex: 1 }}>
          <Text style={{
            fontSize: 14,
            color: '#6b7280',
            marginBottom: 4,
          }}>
            {title}
          </Text>
          <Text style={{
            fontSize: 24,
            fontWeight: '700',
            color: '#1f2937',
          }}>
            {value}
          </Text>
        </View>
        {icon && (
          <View style={{
            width: 48,
            height: 48,
            borderRadius: 24,
            backgroundColor: `${color}15`,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
            <Ionicons name={icon as any} size={24} color={color} />
          </View>
        )}
      </View>
    </Card>
  );
}

interface AppointmentCardProps {
  time: string;
  patientName: string;
  type: string;
  status: string;
  onPress?: () => void;
  onCancel?: () => void;
}

export function AppointmentCard({ 
  time, 
  patientName, 
  type, 
  status, 
  onPress, 
  onCancel 
}: AppointmentCardProps) {
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'confirmado': return '#22c55e';
      case 'pendente': return '#f59e0b';
      case 'cancelado': return '#ef4444';
      case 'concluído': return '#3b82f6';
      default: return '#6b7280';
    }
  };

  return (
    <Card onPress={onPress} style={{ marginBottom: 12 }}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <View style={{ flex: 1 }}>
          <Text style={{
            fontSize: 18,
            fontWeight: '600',
            color: '#1f2937',
            marginBottom: 4,
          }}>
            {patientName}
          </Text>
          <Text style={{
            fontSize: 14,
            color: '#6b7280',
            marginBottom: 2,
          }}>
            {type}
          </Text>
          <Text style={{
            fontSize: 14,
            fontWeight: '600',
            color: '#3b82f6',
          }}>
            {time}
          </Text>
        </View>
        <View style={{ alignItems: 'flex-end' }}>
          <View style={{
            paddingHorizontal: 8,
            paddingVertical: 4,
            borderRadius: 6,
            backgroundColor: `${getStatusColor(status)}15`,
            marginBottom: onCancel ? 8 : 0,
          }}>
            <Text style={{
              fontSize: 12,
              fontWeight: '600',
              color: getStatusColor(status),
            }}>
              {status}
            </Text>
          </View>
          {onCancel && status.toLowerCase() !== 'cancelado' && (
            <TouchableOpacity
              onPress={onCancel}
              style={{
                padding: 4,
              }}
            >
              <Ionicons name="close-circle" size={20} color="#ef4444" />
            </TouchableOpacity>
          )}
        </View>
      </View>
    </Card>
  );
}

interface ClientCardProps {
  name: string;
  email: string;
  phone: string;
  status?: string;
  onPress?: () => void;
  onEdit?: () => void;
}

export function ClientCard({ 
  name, 
  email, 
  phone, 
  status = 'Ativo', 
  onPress, 
  onEdit 
}: ClientCardProps) {
  return (
    <Card onPress={onPress} style={{ marginBottom: 12 }}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <View style={{ flex: 1 }}>
          <Text style={{
            fontSize: 18,
            fontWeight: '600',
            color: '#1f2937',
            marginBottom: 4,
          }}>
            {name}
          </Text>
          <Text style={{
            fontSize: 14,
            color: '#6b7280',
            marginBottom: 2,
          }}>
            {email}
          </Text>
          <Text style={{
            fontSize: 14,
            color: '#6b7280',
          }}>
            {phone}
          </Text>
        </View>
        <View style={{ alignItems: 'flex-end' }}>
          <View style={{
            paddingHorizontal: 8,
            paddingVertical: 4,
            borderRadius: 6,
            backgroundColor: status === 'Ativo' ? '#22c55e15' : '#ef444415',
            marginBottom: onEdit ? 8 : 0,
          }}>
            <Text style={{
              fontSize: 12,
              fontWeight: '600',
              color: status === 'Ativo' ? '#22c55e' : '#ef4444',
            }}>
              {status}
            </Text>
          </View>
          {onEdit && (
            <TouchableOpacity
              onPress={onEdit}
              style={{
                padding: 4,
              }}
            >
              <Ionicons name="pencil" size={20} color="#3b82f6" />
            </TouchableOpacity>
          )}
        </View>
      </View>
    </Card>
  );
}
