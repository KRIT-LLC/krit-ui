// i18nContext.tsx
import React, { createContext, ReactNode, useContext, useMemo } from 'react';
import { useTranslation as useI18nextTranslation } from 'react-i18next';
import { defaultTranslations } from './defaultTranslations';
import { BaseTranslationKey, ValidParams } from './types';

export interface I18nContextType {
  t: <K extends BaseTranslationKey>(key: K, options?: ValidParams<K>) => string;
  language: string;
  availableLanguages: readonly string[];
  setLanguage: (lang: string) => Promise<void>;
}

export const I18nContext = createContext<I18nContextType>({
  t: (key: BaseTranslationKey) => key,
  language: 'en',
  availableLanguages: ['en'],
  setLanguage: () => Promise.resolve(),
});

export const useI18n = () => useContext(I18nContext);

interface I18nProviderProps {
  i18n?: {
    t: (key: string, options?: Record<string, unknown>) => string;
    language: string;
    languages: readonly string[];
    changeLanguage: (lang: string) => Promise<any>;
  };
  children: ReactNode;
}

export const I18nProvider: React.FC<I18nProviderProps> = ({ i18n: externalI18n, children }) => {
  const { t: i18nextT, i18n: i18nextInstance } = useI18nextTranslation();

  const i18n = externalI18n || {
    t: i18nextT,
    language: i18nextInstance.language,
    languages: i18nextInstance.languages,
    changeLanguage: i18nextInstance.changeLanguage.bind(i18nextInstance),
  };

  const setLanguageWrapper = (lang: string): Promise<void> => {
    return i18n.changeLanguage(lang).then(() => {});
  };

  const getTranslation = <K extends BaseTranslationKey>(
    key: K,
    options?: ValidParams<K>,
  ): string => {
    if (externalI18n) {
      try {
        const translationOptions: Record<string, unknown> = {
          ns: 'krit',
          ...options,
        };
        if (options?.count !== undefined) {
          translationOptions.count = options.count;
        }
        const translation = externalI18n.t(
          key,
          translationOptions as Parameters<typeof externalI18n.t>[1],
        );
        if (translation !== key) {
          return translation;
        }
      } catch (error) {
        console.warn('Error getting translation from external i18n:', error);
      }
    }

    const language = i18n.language.split('-')[0];
    // Для плюрализации используем встроенные возможности i18next
    // i18next автоматически добавит нужный суффикс (_plural, _one, и т.д.)
    const defaultTranslation = defaultTranslations[language]?.[key] || defaultTranslations.en[key];

    if (!defaultTranslation) return key as string;

    // Интерполяция параметров
    if (options) {
      return Object.entries(options).reduce(
        (result, [param, value]) => result.replace(`{{${param}}}`, String(value)),
        defaultTranslation,
      );
    }

    return defaultTranslation;
  };

  const contextValue: I18nContextType = useMemo(
    () => ({
      t: getTranslation,
      language: i18n.language,
      availableLanguages: i18n.languages,
      setLanguage: setLanguageWrapper,
    }),
    [i18n.language, i18n.languages, externalI18n],
  );

  return <I18nContext.Provider value={contextValue}>{children}</I18nContext.Provider>;
};
