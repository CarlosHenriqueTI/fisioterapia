import Toast from 'react-native-toast-message';

// Tipos de erro
export enum ErrorType {
  NETWORK = 'NETWORK',
  VALIDATION = 'VALIDATION',
  AUTHENTICATION = 'AUTHENTICATION',
  AUTHORIZATION = 'AUTHORIZATION',
  NOT_FOUND = 'NOT_FOUND',
  SERVER = 'SERVER',
  UNKNOWN = 'UNKNOWN',
}

export interface AppError {
  type: ErrorType;
  message: string;
  originalError?: Error;
  statusCode?: number;
  field?: string;
}

// Classe de erro personalizada
export class CustomError extends Error {
  type: ErrorType;
  statusCode?: number;
  field?: string;

  constructor(message: string, type: ErrorType = ErrorType.UNKNOWN, statusCode?: number, field?: string) {
    super(message);
    this.name = 'CustomError';
    this.type = type;
    this.statusCode = statusCode;
    this.field = field;
  }
}

// Função para criar erros específicos
export const createError = {
  network: (message = 'Erro de conexão. Verifique sua internet.') =>
    new CustomError(message, ErrorType.NETWORK),
  
  validation: (message: string, field?: string) =>
    new CustomError(message, ErrorType.VALIDATION, undefined, field),
  
  authentication: (message = 'Credenciais inválidas.') =>
    new CustomError(message, ErrorType.AUTHENTICATION, 401),
  
  authorization: (message = 'Você não tem permissão para esta ação.') =>
    new CustomError(message, ErrorType.AUTHORIZATION, 403),
  
  notFound: (message = 'Recurso não encontrado.') =>
    new CustomError(message, ErrorType.NOT_FOUND, 404),
  
  server: (message = 'Erro interno do servidor.') =>
    new CustomError(message, ErrorType.SERVER, 500),
};

// Handler central de erros
export class ErrorHandler {
  static handle(error: unknown, context?: string): AppError {
    let appError: AppError;

    if (error instanceof CustomError) {
      appError = {
        type: error.type,
        message: error.message,
        statusCode: error.statusCode,
        field: error.field,
        originalError: error,
      };
    } else if (error instanceof Error) {
      // Tratar erros de rede do Axios
      if ('response' in error && error.response) {
        const response = error.response as any;
        appError = this.handleHttpError(response.status, response.data?.message || error.message);
      } else if ('request' in error) {
        appError = {
          type: ErrorType.NETWORK,
          message: 'Erro de conexão. Verifique sua internet.',
          originalError: error,
        };
      } else {
        appError = {
          type: ErrorType.UNKNOWN,
          message: error.message || 'Erro desconhecido',
          originalError: error,
        };
      }
    } else {
      appError = {
        type: ErrorType.UNKNOWN,
        message: String(error) || 'Erro desconhecido',
      };
    }

    // Log do erro (em produção, enviar para serviço de monitoramento)
    console.error(`[ErrorHandler] ${context || 'Unknown context'}:`, appError);

    return appError;
  }

  private static handleHttpError(status: number, message: string): AppError {
    switch (status) {
      case 400:
        return {
          type: ErrorType.VALIDATION,
          message: message || 'Dados inválidos.',
          statusCode: status,
        };
      case 401:
        return {
          type: ErrorType.AUTHENTICATION,
          message: message || 'Credenciais inválidas.',
          statusCode: status,
        };
      case 403:
        return {
          type: ErrorType.AUTHORIZATION,
          message: message || 'Você não tem permissão para esta ação.',
          statusCode: status,
        };
      case 404:
        return {
          type: ErrorType.NOT_FOUND,
          message: message || 'Recurso não encontrado.',
          statusCode: status,
        };
      case 500:
        return {
          type: ErrorType.SERVER,
          message: message || 'Erro interno do servidor.',
          statusCode: status,
        };
      default:
        return {
          type: ErrorType.UNKNOWN,
          message: message || 'Erro desconhecido',
          statusCode: status,
        };
    }
  }

  // Mostrar erro para o usuário via Toast
  static showError(error: AppError | unknown, context?: string) {
    const appError = error instanceof Error ? this.handle(error, context) : error as AppError;
    
    Toast.show({
      type: 'error',
      text1: this.getErrorTitle(appError.type),
      text2: appError.message,
      visibilityTime: 4000,
    });
  }

  // Mostrar sucesso
  static showSuccess(message: string, title = 'Sucesso') {
    Toast.show({
      type: 'success',
      text1: title,
      text2: message,
      visibilityTime: 3000,
    });
  }

  // Mostrar informação
  static showInfo(message: string, title = 'Informação') {
    Toast.show({
      type: 'info',
      text1: title,
      text2: message,
      visibilityTime: 3000,
    });
  }

  private static getErrorTitle(type: ErrorType): string {
    switch (type) {
      case ErrorType.NETWORK:
        return 'Erro de Conexão';
      case ErrorType.VALIDATION:
        return 'Dados Inválidos';
      case ErrorType.AUTHENTICATION:
        return 'Erro de Autenticação';
      case ErrorType.AUTHORIZATION:
        return 'Acesso Negado';
      case ErrorType.NOT_FOUND:
        return 'Não Encontrado';
      case ErrorType.SERVER:
        return 'Erro do Servidor';
      default:
        return 'Erro';
    }
  }
}

// Hook para usar tratamento de erros nos componentes
export const useErrorHandler = () => {
  const handleError = (error: unknown, context?: string) => {
    ErrorHandler.showError(error, context);
  };

  const showSuccess = (message: string, title?: string) => {
    ErrorHandler.showSuccess(message, title);
  };

  const showInfo = (message: string, title?: string) => {
    ErrorHandler.showInfo(message, title);
  };

  return {
    handleError,
    showSuccess,
    showInfo,
  };
};
