import { theme } from '@/theme';
import { Ionicons } from '@expo/vector-icons';
import { forwardRef, useState } from 'react';
import { Text, TextInput, TextInputProps, TouchableOpacity, View } from 'react-native';

interface CustomInputProps extends TextInputProps {
  label?: string;
  error?: string;
  required?: boolean;
  type?: 'text' | 'email' | 'password' | 'phone' | 'number';
  icon?: string;
  onIconPress?: () => void;
}

export const CustomInput = forwardRef<TextInput, CustomInputProps>(
  ({ 
    label, 
    error, 
    required = false, 
    type = 'text',
    icon,
    onIconPress,
    style, 
    placeholderTextColor = theme.colors.gray['400'], 
    ...rest 
  }, ref) => {
    const [showPassword, setShowPassword] = useState(false);
    const [isFocused, setIsFocused] = useState(false);

    const isPassword = type === 'password';
    const shouldShowPasswordToggle = isPassword;
    const actualSecureTextEntry = isPassword ? !showPassword : rest.secureTextEntry;

    const getInputStyle = () => ({
      borderWidth: 2,
      borderColor: error 
        ? theme.colors.error[500] 
        : isFocused 
          ? theme.colors.primary[500] 
          : theme.colors.gray['200'],
      borderRadius: theme.borderRadius.xl,
      paddingHorizontal: theme.spacing[4],
      paddingVertical: theme.spacing[3],
      fontSize: theme.typography.textStyles.body.fontSize,
      backgroundColor: theme.colors.white,
      paddingRight: (shouldShowPasswordToggle || icon) ? 50 : theme.spacing[4],
      color: theme.colors.gray['900'],
      ...theme.shadows.sm,
    });

    const getLabelStyle = () => ({
      fontSize: theme.typography.fontSize.md,
      fontWeight: theme.typography.fontWeight.semibold as any,
      color: theme.semantic.text.primary,
      marginBottom: theme.spacing[2],
    });

    const getErrorStyle = () => ({
      fontSize: theme.typography.fontSize.sm,
      color: theme.colors.error[500],
      marginTop: theme.spacing[1],
    });

    const getKeyboardType = () => {
      switch (type) {
        case 'email':
          return 'email-address' as const;
        case 'phone':
          return 'phone-pad' as const;
        case 'number':
          return 'numeric' as const;
        default:
          return 'default' as const;
      }
    };

    const getAutoCapitalize = () => {
      return type === 'email' ? 'none' as const : 'sentences' as const;
    };

    return (
      <View style={{ marginBottom: theme.spacing[4] }}>
        {label && (
          <Text style={getLabelStyle()}>
            {label}
            {required && <Text style={{ color: theme.colors.error[500] }}> *</Text>}
          </Text>
        )}
        
        <View style={{ position: 'relative' }}>
          <TextInput
            ref={ref}
            style={[getInputStyle(), style]}
            placeholderTextColor={placeholderTextColor}
            secureTextEntry={actualSecureTextEntry}
            keyboardType={getKeyboardType()}
            autoCapitalize={getAutoCapitalize()}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            {...rest}
          />
          
          {(shouldShowPasswordToggle || icon) && (
            <TouchableOpacity
              style={{
                position: 'absolute',
                right: theme.spacing[4],
                top: theme.spacing[3],
                padding: theme.spacing[1],
              }}
              onPress={shouldShowPasswordToggle 
                ? () => setShowPassword(!showPassword)
                : onIconPress
              }
            >
              <Ionicons
                name={shouldShowPasswordToggle 
                  ? (showPassword ? 'eye-off' : 'eye')
                  : (icon as any)
                }
                size={20}
                color={theme.colors.gray[500]}
              />
            </TouchableOpacity>
          )}
        </View>
        
        {error && (
          <Text style={getErrorStyle()}>
            {error}
          </Text>
        )}
      </View>
    );
  }
);
