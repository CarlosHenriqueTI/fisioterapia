import { FormValidation, ValidationError } from '@/types';

// Tipos de validação
export type ValidationRule = (value: any) => string | null;

// Regras de validação básicas
export const validationRules = {
  required: (message = 'Este campo é obrigatório'): ValidationRule =>
    (value) => {
      if (!value || (typeof value === 'string' && value.trim().length === 0)) {
        return message;
      }
      return null;
    },

  email: (message = 'Email inválido'): ValidationRule =>
    (value) => {
      if (!value) return null;
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(value) ? null : message;
    },

  minLength: (min: number, message?: string): ValidationRule =>
    (value) => {
      if (!value) return null;
      const length = typeof value === 'string' ? value.length : 0;
      return length >= min ? null : message || `Deve ter pelo menos ${min} caracteres`;
    },

  maxLength: (max: number, message?: string): ValidationRule =>
    (value) => {
      if (!value) return null;
      const length = typeof value === 'string' ? value.length : 0;
      return length <= max ? null : message || `Deve ter no máximo ${max} caracteres`;
    },

  phone: (message = 'Telefone inválido'): ValidationRule =>
    (value) => {
      if (!value) return null;
      // Regex para telefone brasileiro: (xx) xxxxx-xxxx ou (xx) xxxx-xxxx
      const phoneRegex = /^\(\d{2}\)\s\d{4,5}-\d{4}$/;
      return phoneRegex.test(value) ? null : message;
    },

  password: (message = 'Senha deve ter pelo menos 6 caracteres'): ValidationRule =>
    (value) => {
      if (!value) return null;
      return value.length >= 6 ? null : message;
    },

  strongPassword: (message = 'Senha deve ter pelo menos 8 caracteres, incluindo maiúscula, minúscula e número'): ValidationRule =>
    (value) => {
      if (!value) return null;
      const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{8,}$/;
      return strongPasswordRegex.test(value) ? null : message;
    },

  date: (message = 'Data inválida'): ValidationRule =>
    (value) => {
      if (!value) return null;
      const dateRegex = /^\d{2}\/\d{2}\/\d{4}$/;
      if (!dateRegex.test(value)) return message;
      
      const [day, month, year] = value.split('/').map(Number);
      const date = new Date(year, month - 1, day);
      
      return (
        date.getFullYear() === year &&
        date.getMonth() === month - 1 &&
        date.getDate() === day
      ) ? null : message;
    },

  cpf: (message = 'CPF inválido'): ValidationRule =>
    (value) => {
      if (!value) return null;
      const cpf = value.replace(/\D/g, '');
      
      if (cpf.length !== 11) return message;
      
      // Validação básica de CPF
      let sum = 0;
      for (let i = 0; i < 9; i++) {
        sum += parseInt(cpf.charAt(i)) * (10 - i);
      }
      let digit = 11 - (sum % 11);
      if (digit === 10 || digit === 11) digit = 0;
      if (digit !== parseInt(cpf.charAt(9))) return message;
      
      sum = 0;
      for (let i = 0; i < 10; i++) {
        sum += parseInt(cpf.charAt(i)) * (11 - i);
      }
      digit = 11 - (sum % 11);
      if (digit === 10 || digit === 11) digit = 0;
      if (digit !== parseInt(cpf.charAt(10))) return message;
      
      return null;
    },

  custom: (validatorFn: (value: any) => boolean, message: string): ValidationRule =>
    (value) => validatorFn(value) ? null : message,
};

// Schema de validação
export interface ValidationSchema {
  [field: string]: ValidationRule[];
}

// Classe principal de validação
export class Validator {
  private schema: ValidationSchema;

  constructor(schema: ValidationSchema) {
    this.schema = schema;
  }

  // Validar um campo específico
  validateField(field: string, value: any): ValidationError | null {
    const rules = this.schema[field];
    if (!rules) return null;

    for (const rule of rules) {
      const error = rule(value);
      if (error) {
        return { field, message: error };
      }
    }

    return null;
  }

  // Validar objeto completo
  validate(data: Record<string, any>): FormValidation {
    const errors: ValidationError[] = [];

    Object.keys(this.schema).forEach((field) => {
      const error = this.validateField(field, data[field]);
      if (error) {
        errors.push(error);
      }
    });

    return {
      isValid: errors.length === 0,
      errors,
    };
  }

  // Obter mensagem de erro para um campo
  getFieldError(field: string, errors: ValidationError[]): string | undefined {
    return errors.find(error => error.field === field)?.message;
  }
}

// Schemas pré-definidos para o projeto
export const validationSchemas = {
  login: new Validator({
    email: [validationRules.required(), validationRules.email()],
    password: [validationRules.required()],
  }),

  clientRegistration: new Validator({
    name: [validationRules.required(), validationRules.minLength(2)],
    email: [validationRules.required(), validationRules.email()],
    password: [validationRules.required(), validationRules.password()],
    phone: [validationRules.required(), validationRules.phone()],
    birthDate: [validationRules.required(), validationRules.date()],
    address: [validationRules.required(), validationRules.minLength(10)],
  }),

  clientUpdate: new Validator({
    name: [validationRules.required(), validationRules.minLength(2)],
    email: [validationRules.required(), validationRules.email()],
    phone: [validationRules.required(), validationRules.phone()],
    birthDate: [validationRules.required(), validationRules.date()],
    address: [validationRules.required(), validationRules.minLength(10)],
  }),

  appointment: new Validator({
    clientId: [validationRules.required()],
    date: [validationRules.required(), validationRules.date()],
    time: [validationRules.required()],
    type: [validationRules.required()],
  }),
};

// Hook para usar validação nos componentes
export const useValidation = (schema: Validator) => {
  const validateField = (field: string, value: any) => {
    return schema.validateField(field, value);
  };

  const validateForm = (data: Record<string, any>) => {
    return schema.validate(data);
  };

  const getFieldError = (field: string, errors: ValidationError[]) => {
    return schema.getFieldError(field, errors);
  };

  return {
    validateField,
    validateForm,
    getFieldError,
  };
};

// Utilitários para formatação
export const formatters = {
  phone: (value: string): string => {
    const numbers = value.replace(/\D/g, '');
    if (numbers.length <= 2) return numbers;
    if (numbers.length <= 6) return `(${numbers.slice(0, 2)}) ${numbers.slice(2)}`;
    if (numbers.length <= 10) return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 6)}-${numbers.slice(6)}`;
    return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 7)}-${numbers.slice(7, 11)}`;
  },

  cpf: (value: string): string => {
    const numbers = value.replace(/\D/g, '');
    if (numbers.length <= 3) return numbers;
    if (numbers.length <= 6) return `${numbers.slice(0, 3)}.${numbers.slice(3)}`;
    if (numbers.length <= 9) return `${numbers.slice(0, 3)}.${numbers.slice(3, 6)}.${numbers.slice(6)}`;
    return `${numbers.slice(0, 3)}.${numbers.slice(3, 6)}.${numbers.slice(6, 9)}-${numbers.slice(9, 11)}`;
  },

  date: (value: string): string => {
    const numbers = value.replace(/\D/g, '');
    if (numbers.length <= 2) return numbers;
    if (numbers.length <= 4) return `${numbers.slice(0, 2)}/${numbers.slice(2)}`;
    return `${numbers.slice(0, 2)}/${numbers.slice(2, 4)}/${numbers.slice(4, 8)}`;
  },
};
