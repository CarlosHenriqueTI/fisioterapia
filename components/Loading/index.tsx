import { ActivityIndicator, Text, View } from 'react-native';

interface LoadingSpinnerProps {
  size?: 'small' | 'large';
  color?: string;
  message?: string;
}

export function LoadingSpinner({ 
  size = 'large', 
  color = '#3b82f6', 
  message 
}: LoadingSpinnerProps) {
  return (
    <View style={{
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 20,
    }}>
      <ActivityIndicator size={size} color={color} />
      {message && (
        <Text style={{
          marginTop: 12,
          fontSize: 16,
          color: '#6b7280',
          textAlign: 'center',
        }}>
          {message}
        </Text>
      )}
    </View>
  );
}

interface SkeletonProps {
  width?: number | string;
  height?: number;
  borderRadius?: number;
  style?: any;
}

export function Skeleton({ 
  width = '100%', 
  height = 20, 
  borderRadius = 4,
  style 
}: SkeletonProps) {
  return (
    <View style={[{
      width,
      height,
      backgroundColor: '#f3f4f6',
      borderRadius,
    }, style]} />
  );
}

interface LoadingCardProps {
  showAvatar?: boolean;
  lines?: number;
}

export function LoadingCard({ showAvatar = true, lines = 3 }: LoadingCardProps) {
  return (
    <View style={{
      backgroundColor: '#ffffff',
      borderRadius: 12,
      padding: 16,
      marginBottom: 12,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.1,
      shadowRadius: 3,
      elevation: 2,
    }}>
      <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
        {showAvatar && (
          <Skeleton 
            width={48} 
            height={48} 
            borderRadius={24} 
            style={{ marginRight: 12 }}
          />
        )}
        <View style={{ flex: 1 }}>
          <Skeleton width="60%" height={16} style={{ marginBottom: 8 }} />
          {Array.from({ length: lines }).map((_, index) => (
            <Skeleton 
              key={index}
              width={index === lines - 1 ? "80%" : "100%"} 
              height={14} 
              style={{ marginBottom: 6 }}
            />
          ))}
        </View>
      </View>
    </View>
  );
}

interface LoadingOverlayProps {
  visible: boolean;
  message?: string;
}

export function LoadingOverlay({ visible, message = 'Carregando...' }: LoadingOverlayProps) {
  if (!visible) return null;

  return (
    <View style={{
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 1000,
    }}>
      <View style={{
        backgroundColor: '#ffffff',
        borderRadius: 12,
        padding: 24,
        alignItems: 'center',
        minWidth: 150,
      }}>
        <ActivityIndicator size="large" color="#3b82f6" />
        <Text style={{
          marginTop: 12,
          fontSize: 16,
          color: '#1f2937',
          textAlign: 'center',
        }}>
          {message}
        </Text>
      </View>
    </View>
  );
}
