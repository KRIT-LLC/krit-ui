import React, { createContext, ReactNode, useContext, useMemo } from 'react';

export interface TranslationResource {
  [key: string]: string;
}

export interface I18nContextType {
  translations: TranslationResource;
  language: string;
  availableLanguages: string[];
  setLanguage: (lang: string) => void;
}

export const I18nContext = createContext<I18nContextType>({
  translations: {},
  language: 'en',
  availableLanguages: ['en'],
  setLanguage: () => {},
});

export const useI18n = () => useContext(I18nContext);

interface I18nProviderProps {
  translations: Record<string, TranslationResource>;
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
    return translations[language] || translations['en'] || {};
  }, [translations, language]);

  const contextValue: I18nContextType = {
    translations: currentTranslations,
    language,
    availableLanguages,
    setLanguage: onLanguageChange || (() => {}),
  };

  return <I18nContext.Provider value={contextValue}>{children}</I18nContext.Provider>;
};
