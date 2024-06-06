import { AxiosError } from 'axios';
import { useTranslation } from 'react-i18next';
import {useToast} from '@/hooks/useToast.ts';

export interface ErrorResponse {
  error: string;
  errors: string[];
  message: string;
  path: string;
  status: number;
  timestamp: string;
}
export const getErrorData = (error: Error) => (error as unknown as AxiosError<ErrorResponse>).response?.data;
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

  const notifyError = (text?: string) => {
    toast({ variant: 'destructive', title: text ? `${t('errorOccurred')}: ${text}` : t('errorOccurred') });
  };

  const notifySuccess = (text?: string) => {
    toast({ variant: 'success', title: text });
  };

  const getErrorText = (error: Error) => {
    const data = getErrorData(error);
    const errorTitle = (data && 'title' in data ? data.title : undefined) as string | undefined;
    const errorMessage = data?.message || String(data && ('Message' in data ? data.Message : ''));
    const errorText = errorMessage || data?.error || errorTitle;
    const errorsText = data?.errors?.join(', ');
    return text || errorsText || errorText;
  };

  const onError = (error: Error) => {
    const errorText = getErrorText(error);
    notifyError(errorText);
  };

  const onSuccess = () => {
    notifySuccess(text || 'Success');
  };

  const getErrorHandler = (errorMessageMap: Record<MessageFromServer, MessageForUser>) => {
    return (error: Error) => {
      const errorText = getErrorText(error);
      const notifications: string[] = [];
      for (const [messageFromServer, messageForUser] of Object.entries(errorMessageMap)) {
        const data = getErrorData(error);
        const dataMessage = data?.message || (data && ('Message' in data ? data.Message : ''));
        const userMessage = typeof messageForUser === 'function' ? messageForUser(data?.errors) : messageForUser;
        const hasMessageMatch =
          (!!messageFromServer && messageFromServer === dataMessage) || (!!userMessage && !messageFromServer);
        if (hasMessageMatch) notifications.push(userMessage);
      }
      if (notifications.length) notifications.forEach(notifyError);
      else notifyError(errorText);
    };
  };

  const getSuccessHandler = (text: string) => {
    return () => notifySuccess(text);
  };

  return { toast, notifyError, onError, getErrorHandler, getSuccessHandler, notifySuccess, onSuccess };
};
