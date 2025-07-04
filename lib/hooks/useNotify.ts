import { AxiosError } from 'axios';
import { useToast } from '@/hooks/useToast';
import { useTranslation } from '@/hooks/useTranslation';

interface ErrorsObj {
  errors: {
    [key: string]: string[]; // Each key is a string (field name), and its value is an array of error messages
  };
}

export interface ErrorResponse {
  error: string;
  errors: string[] | ErrorsObj;
  message: string;
  detail: string;
  path: string;
  status: number;
  timestamp: string;
}

export const getErrorData = (error: Error | Record<string, unknown>) =>
  (error as unknown as AxiosError<ErrorResponse>).response?.data;
export const parseValueFromError = (key: string, error: string) =>
  error
    .split(key + "='")[1]
    ?.split("'")[0]
    ?.trim();

export type MessageFromServer = string;
export type MessageForUser = string | ((errors?: string[]) => string);

export const useNotify = (text?: string) => {
  const { t } = useTranslation();
  const { toast } = useToast();

  const notifyError = (text?: string, prefix?: string) => {
    const defaultPrefix = `${t('errorOccurred')}: `;
    toast({
      variant: 'destructive',
      title: text ? `${prefix ?? defaultPrefix}${text}` : t('errorOccurred'),
    });
  };

  const notifySuccess = (text?: string) => {
    toast({ variant: 'success', title: text });
  };

  const getErrorsText = (data: ErrorResponse | undefined): string => {
    if (!data) return '';
    if (Array.isArray(data.errors)) {
      return data.errors.join(', ');
    }
    if (data.errors && typeof data.errors === 'object') {
      const allErrors = Object.values(data.errors).flat();
      return allErrors.join(', ');
    }
    return '';
  };

  const getErrorText = (error: Error | Record<string, unknown>) => {
    const data = getErrorData(error);
    const errorTitle = (data && 'title' in data ? data.title : undefined) as string | undefined;
    const errorMessage =
      data?.message || String(data && ('Message' in data ? data.Message : '')) || data?.detail;

    const errorDescription = (error as unknown as Record<string, unknown>)?.errorDescription;
    if (errorDescription) return errorDescription as string;

    const errorText = errorMessage || data?.error || errorTitle;
    const errorsText = getErrorsText(data);
    return text || errorsText || errorText;
  };

  const onError = (error: Error | Record<string, unknown>) => {
    const errorText = getErrorText(error);
    notifyError(errorText);
  };

  const onSuccess = () => {
    notifySuccess(text || 'Success');
  };

  const getErrorHandler = (errorMessageMap: Record<MessageFromServer, MessageForUser>) => {
    return (error: Error | Record<string, unknown>) => {
      const errorText = getErrorText(error);
      const notifications: string[] = [];
      for (const [messageFromServer, messageForUser] of Object.entries(errorMessageMap)) {
        const data = getErrorData(error);
        const dataMessage = data?.message || (data && ('Message' in data ? data.Message : ''));
        const userMessage =
          typeof messageForUser === 'function'
            ? messageForUser(data?.errors as string[])
            : messageForUser;
        const hasMessageMatch =
          (!!messageFromServer && messageFromServer === dataMessage) ||
          (!!userMessage && !messageFromServer);
        if (hasMessageMatch) notifications.push(userMessage);
      }
      if (notifications.length) notifications.forEach(value => notifyError(value));
      else notifyError(errorText);
    };
  };

  const getSuccessHandler = (text: string) => {
    return () => notifySuccess(text);
  };

  return {
    toast,
    notifyError,
    onError,
    getErrorHandler,
    getSuccessHandler,
    notifySuccess,
    onSuccess,
  };
};
