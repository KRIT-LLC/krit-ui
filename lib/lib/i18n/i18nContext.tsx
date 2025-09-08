import React, { createContext, ReactNode, useCallback, useContext, useMemo, useState } from 'react';
import { useTranslation as useI18nextTranslation } from 'react-i18next';
import en from './translations/en.json';
import ru from './translations/ru.json';
import { BaseTranslationKey, LanguageCode, ValidParams } from './types';

export const defaultTranslations = { ru, en } as const;
const regexCache = new Map<string, RegExp>();
const pluralFormsCache = new Map<string, string[]>();

// Вспомогательные функции
const getCachedRegex = (param: string): RegExp => {
  if (!regexCache.has(param)) {
    regexCache.set(param, new RegExp(`{{${param}}}`, 'g'));
  }
  return regexCache.get(param)!;
};

const getPluralForms = (lang: LanguageCode, count: number, key: string): string[] => {
  const cacheKey = `${lang}-${count}-${key}`;
  if (pluralFormsCache.has(cacheKey)) {
    return pluralFormsCache.get(cacheKey)!;
  }

  let forms: string[];
  if (lang === 'ru') {
    if (count % 10 === 1 && count % 100 !== 11) {
      forms = [`${key}_one`, `${key}`];
    } else if (count % 10 >= 2 && count % 10 <= 4 && (count % 100 < 10 || count % 100 >= 20)) {
      forms = [`${key}_few`, `${key}`];
    } else {
      forms = [`${key}_many`, `${key}_other`, `${key}`];
    }
  } else {
    forms = count === 1 ? [`${key}_one`, `${key}`] : [`${key}_other`, `${key}_plural`, `${key}`];
  }

  pluralFormsCache.set(cacheKey, forms);
  return forms;
};

// Контекст и провайдер
interface I18nContextType {
  t: (key: BaseTranslationKey, options?: ValidParams) => string;
  language: string;
  availableLanguages: readonly string[];
  setLanguage: (lang: string) => Promise<void>;
}

export const I18nContext = createContext<I18nContextType>({
  t: (key: BaseTranslationKey) => key,
  language: 'ru',
  availableLanguages: ['ru'],
  setLanguage: () => Promise.resolve(),
});

export const useI18n = () => useContext(I18nContext);

interface I18nProviderProps {
  i18n?: {
    t: (key: string, options?: Record<string, unknown>) => string;
    language: string;
    languages: readonly string[];
    changeLanguage: (lang: string) => Promise<unknown>;
  };
  children: ReactNode;
}

export const I18nProvider: React.FC<I18nProviderProps> = React.memo(
  ({ i18n: externalI18n, children }) => {
    const { t: i18nextT, i18n: i18nextInstance } = useI18nextTranslation();
    const [loadedTranslations] = useState(defaultTranslations);

    const internalI18n = useMemo(() => {
      if (externalI18n) return externalI18n;
      return {
        t: i18nextT,
        language: i18nextInstance.language || 'ru',
        languages: i18nextInstance.languages || ['ru'],
        changeLanguage: i18nextInstance.changeLanguage.bind(i18nextInstance),
      };
    }, [externalI18n, i18nextT, i18nextInstance]);

    const getTranslation = useCallback(
      (key: BaseTranslationKey, options?: ValidParams): string => {
        if (externalI18n) {
          try {
            const result = externalI18n.t(key, options as Record<string, unknown>);
            if (result && result !== key) return result;
          } catch (error) {
            console.warn('Translation error:', error);
          }
        }

        const lang = (internalI18n.language.split('-')[0] as LanguageCode) || 'ru';
        const translations = loadedTranslations[lang] ?? loadedTranslations.ru;

        let translation = translations[key as keyof typeof translations] || key;

        if (options?.count !== undefined) {
          const pluralForms = getPluralForms(lang, options.count, key);
          for (const form of pluralForms) {
            if (translations[form as keyof typeof translations]) {
              translation = translations[form as keyof typeof translations];
              break;
            }
          }
        }

        if (options && translation !== key) {
          let result = translation;
          Object.entries(options).forEach(([param, value]) => {
            if (value !== undefined) {
              result = result.replace(getCachedRegex(param), String(value));
            }
          });
          return result;
        }

        return translation;
      },
      [externalI18n, internalI18n.language, loadedTranslations],
    );

    const setLanguageWrapper = useCallback(
      (lang: string): Promise<void> => {
        return internalI18n.changeLanguage(lang).then(() => undefined);
      },
      [internalI18n],
    );

    const contextValue: I18nContextType = useMemo(
      () => ({
        t: getTranslation,
        language: internalI18n.language,
        availableLanguages: internalI18n.languages,
        setLanguage: setLanguageWrapper,
      }),
      [getTranslation, internalI18n.language, internalI18n.languages, setLanguageWrapper],
    );

    return <I18nContext.Provider value={contextValue}>{children}</I18nContext.Provider>;
  },
);
