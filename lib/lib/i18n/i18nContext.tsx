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

export interface I18nContextType {
  translations: TranslationResource;
  language: string;
  availableLanguages: string[];
  setLanguage: (lang: string) => void;
}

export const I18nContext = createContext<I18nContextType>({
  translations: {} as TranslationResource,
  language: 'en',
  availableLanguages: ['en'],
  setLanguage: () => {},
});

export const useI18n = () => useContext(I18nContext);

interface I18nProviderProps {
  translations: Record<string, PartialTranslationResource>;
  language: string;
  availableLanguages?: string[];
  onLanguageChange?: (lang: string) => void;
  children: ReactNode;
}

export const I18nProvider: React.FC<I18nProviderProps> = ({
  translations,
  language,
  availableLanguages = ['en'],
  onLanguageChange,
  children,
}) => {
  const currentTranslations = useMemo(() => {
    const defaultForLang = defaultTranslations[language] || {};
    const userForLang = translations[language] || {};

    return {
      ...defaultTranslations.en,
      ...defaultForLang,
      ...userForLang,
    } as TranslationResource;
  }, [translations, language]);

  const contextValue: I18nContextType = {
    translations: currentTranslations,
    language,
    availableLanguages,
    setLanguage: onLanguageChange || (() => {}),
  };

  return <I18nContext.Provider value={contextValue}>{children}</I18nContext.Provider>;
};
