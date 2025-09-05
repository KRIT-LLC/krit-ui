import React, { createContext, ReactNode, useContext, useMemo } from 'react';
import { defaultTranslations } from './defaultTranslations';

export interface TranslationResource {
  expand: string;
  empty: string;
  confirmAction: string;
  warning: string;
  maxNChars: string;
  cancellation: string;
  displayBy: string;
  selected: string;
  all: string;
  of: string;
  selectDate: string;
  search: string;
  notFound: string;
  networkError: string;
  refetch: string;
  attachFile: string;
  errorOccurred: string;
  noMediaFiles: string;
  networkErrorDescription: string;
  confirmDeleteMedia: string;
  delete: string;
  imageSizeLimitMB: string;
  audioSizeLimitMB: string;
  pdfSizeLimitMB: string;
  videoSizeLimitMB: string;
  maxSizeOfFilesMB: string;
  mb: string;
}

export type PartialTranslationResource = Partial<TranslationResource>;

export type TranslationOptions = Record<string, string | number | boolean | null | undefined>;

export interface I18nContextType {
  t: (key: keyof TranslationResource, options?: TranslationOptions) => string;
  language: string;
  availableLanguages: readonly string[];
  setLanguage: (lang: string) => Promise<void>;
}

export const I18nContext = createContext<I18nContextType>({
  t: (key: keyof TranslationResource) => key,
  language: 'en',
  availableLanguages: ['en'],
  setLanguage: () => Promise.resolve(),
});

export const useI18n = () => useContext(I18nContext);

interface I18nProviderProps {
  i18n: {
    t: (key: string, options?: TranslationOptions) => string;
    language: string;
    languages: readonly string[];
    changeLanguage: (lang: string) => Promise<any>;
  };
  children: ReactNode;
}

export const I18nProvider: React.FC<I18nProviderProps> = ({ i18n, children }) => {
  // Обертка для changeLanguage, которая преобразует Promise<any> в Promise<void>
  const changeLanguageWrapper = (lang: string): Promise<void> => {
    return i18n.changeLanguage(lang).then(() => {
      // Игнорируем возвращаемое значение
    });
  };

  // Функция для получения перевода с fallback на дефолтные значения
  const getTranslation = (key: keyof TranslationResource, options?: TranslationOptions): string => {
    // Пытаемся получить перевод из i18next
    const i18nTranslation = i18n.t(key, options);

    // Если перевод получен и он не равен ключу (что означает, что перевод существует),
    // возвращаем его
    if (i18nTranslation !== key) {
      return i18nTranslation;
    }

    // Если перевод не найден в i18next, используем дефолтный перевод
    const defaultTranslation =
      defaultTranslations[i18n.language]?.[key] || defaultTranslations.en[key];

    // Если есть options, интерполируем значения в дефолтный перевод
    if (options && defaultTranslation) {
      return Object.keys(options).reduce((result, optionKey) => {
        const value = options[optionKey];
        return result.replace(
          `{{${optionKey}}}`,
          value !== null && value !== undefined ? String(value) : '',
        );
      }, defaultTranslation);
    }

    return defaultTranslation || key;
  };

  const contextValue: I18nContextType = useMemo(
    () => ({
      t: getTranslation,
      language: i18n.language,
      availableLanguages: i18n.languages,
      setLanguage: changeLanguageWrapper,
    }),
    [i18n],
  );

  return <I18nContext.Provider value={contextValue}>{children}</I18nContext.Provider>;
};
