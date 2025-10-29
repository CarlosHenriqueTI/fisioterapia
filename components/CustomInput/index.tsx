import { theme } from '@/theme';
import { Ionicons } from '@expo/vector-icons';
import { forwardRef, useEffect, useRef, useState } from 'react';
import { Animated, Text, TextInput, TextInputProps, TouchableOpacity, View } from 'react-native';

interface CustomInputProps extends TextInputProps {
  label?: string;
  error?: string;
  required?: boolean;
  type?: 'text' | 'email' | 'password' | 'phone' | 'number';
  icon?: string;
  onIconPress?: () => void;
  success?: boolean; // New prop for success state
}

export const CustomInput = forwardRef<TextInput, CustomInputProps>(
  ({ 
    label, 
    error, 
    required = false, 
    type = 'text',
    icon,
    onIconPress,
    success = false,
    style, 
    placeholderTextColor = theme.colors.gray['400'], 
    ...rest 
  }, ref) => {
    const [showPassword, setShowPassword] = useState(false);
    const [isFocused, setIsFocused] = useState(false);
    
    // Animation values
    const shakeAnimation = useRef(new Animated.Value(0)).current;
    const errorOpacity = useRef(new Animated.Value(0)).current;
    const errorHeight = useRef(new Animated.Value(0)).current;
    const successScale = useRef(new Animated.Value(0)).current;
    const borderPulse = useRef(new Animated.Value(1)).current;

    // Trigger shake animation when error appears
    useEffect(() => {
      if (error) {
        // Shake animation
        Animated.sequence([
          Animated.timing(shakeAnimation, {
            toValue: 10,
            duration: 50,
            useNativeDriver: true,
          }),
          Animated.timing(shakeAnimation, {
            toValue: -10,
            duration: 50,
            useNativeDriver: true,
          }),
          Animated.timing(shakeAnimation, {
            toValue: 10,
            duration: 50,
            useNativeDriver: true,
          }),
          Animated.timing(shakeAnimation, {
            toValue: 0,
            duration: 50,
            useNativeDriver: true,
          }),
        ]).start();

        // Error message fade in and expand
        Animated.parallel([
          Animated.timing(errorOpacity, {
            toValue: 1,
            duration: 200,
            useNativeDriver: false,
          }),
          Animated.timing(errorHeight, {
            toValue: 20,
            duration: 200,
            useNativeDriver: false,
          }),
        ]).start();
      } else {
        // Fade out and collapse
        Animated.parallel([
          Animated.timing(errorOpacity, {
            toValue: 0,
            duration: 150,
            useNativeDriver: false,
          }),
          Animated.timing(errorHeight, {
            toValue: 0,
            duration: 150,
            useNativeDriver: false,
          }),
        ]).start();
      }
    }, [error]);

    // Trigger success animation
    useEffect(() => {
      if (success) {
        Animated.spring(successScale, {
          toValue: 1,
          friction: 3,
          tension: 40,
          useNativeDriver: true,
        }).start();
      } else {
        successScale.setValue(0);
      }
    }, [success]);

    // Border pulse on focus
    useEffect(() => {
      if (isFocused) {
        Animated.loop(
          Animated.sequence([
            Animated.timing(borderPulse, {
              toValue: 1.02,
              duration: 1000,
              useNativeDriver: true,
            }),
            Animated.timing(borderPulse, {
              toValue: 1,
              duration: 1000,
              useNativeDriver: true,
            }),
          ])
        ).start();
      } else {
        borderPulse.setValue(1);
      }
    }, [isFocused]);

    const isPassword = type === 'password';
    const shouldShowPasswordToggle = isPassword;
    const actualSecureTextEntry = isPassword ? !showPassword : rest.secureTextEntry;

    const getInputStyle = () => ({
      borderWidth: 2,
      borderColor: error 
        ? theme.colors.error[500] 
        : success
          ? theme.colors.success[500]
          : isFocused 
            ? theme.colors.primary[500] 
            : theme.colors.gray['200'],
      borderRadius: theme.borderRadius.xl,
      paddingHorizontal: theme.spacing[4],
      paddingVertical: theme.spacing[3],
      fontSize: theme.typography.textStyles.body.fontSize,
      backgroundColor: theme.colors.white,
      paddingRight: (shouldShowPasswordToggle || icon || success) ? 50 : theme.spacing[4],
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
        
        <Animated.View 
          style={{ 
            position: 'relative',
            transform: [
              { translateX: shakeAnimation },
              { scale: borderPulse }
            ]
          }}
        >
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
                right: success ? theme.spacing[12] : theme.spacing[4],
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

          {success && (
            <Animated.View
              style={{
                position: 'absolute',
                right: theme.spacing[4],
                top: theme.spacing[3],
                padding: theme.spacing[1],
                transform: [{ scale: successScale }],
              }}
            >
              <Ionicons
                name="checkmark-circle"
                size={24}
                color={theme.colors.success[500]}
              />
            </Animated.View>
          )}
        </Animated.View>
        
        {error && (
          <Animated.View
            style={{
              opacity: errorOpacity,
              height: errorHeight,
              overflow: 'hidden',
            }}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: theme.spacing[1] }}>
              <Ionicons
                name="alert-circle"
                size={14}
                color={theme.colors.error[500]}
                style={{ marginRight: theme.spacing[1] }}
              />
              <Text style={getErrorStyle()}>
                {error}
              </Text>
            </View>
          </Animated.View>
        )}
      </View>
    );
  }
);
