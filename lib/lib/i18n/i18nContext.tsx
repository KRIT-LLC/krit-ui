import React, { createContext, ReactNode, useContext, useMemo } from 'react';
import { useTranslation as useI18nextTranslation } from 'react-i18next';
import en from './translations/en.json';
import ru from './translations/ru.json';
import { BaseTranslationKey, LanguageCode, ValidParams } from './types';

export const defaultTranslations = {
  ru,
  en,
} as const;
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

export const I18nProvider: React.FC<I18nProviderProps> = ({ i18n: externalI18n, children }) => {
  const { t: i18nextT, i18n: i18nextInstance } = useI18nextTranslation();

  const internalI18n = useMemo(() => {
    if (externalI18n) return externalI18n;

    return {
      t: i18nextT,
      language: i18nextInstance.language || 'ru',
      languages: i18nextInstance.languages || ['ru'],
      changeLanguage: i18nextInstance.changeLanguage.bind(i18nextInstance),
    };
  }, [externalI18n, i18nextT, i18nextInstance]);

  const getTranslation = useMemo(() => {
    return (key: BaseTranslationKey, options?: ValidParams): string => {
      if (externalI18n) {
        try {
          const result = externalI18n.t(key, options as Record<string, unknown>);

          // Если внешняя библиотека возвращает перевод, используем его
          if (result && result !== key) {
            return result;
          }
        } catch (error) {
          console.warn('Translation error:', error);
        }
      }

      const lang = (internalI18n.language.split('-')[0] as LanguageCode) || 'ru';
      const translations = defaultTranslations[lang] ?? defaultTranslations.ru;
      let translation = (translations as Record<string, string>)[key] || key;

      // Обработка плюрализации
      if (options && options.count !== undefined) {
        const count = options.count;
        // Определяем возможные плюральные формы для текущего языка
        let pluralForms: string[];

        if (lang === 'ru') {
          if (count % 10 === 1 && count % 100 !== 11) {
            pluralForms = [`${key}_one`, `${key}`];
          } else if (
            count % 10 >= 2 &&
            count % 10 <= 4 &&
            (count % 100 < 10 || count % 100 >= 20)
          ) {
            pluralForms = [`${key}_few`, `${key}`];
          } else {
            pluralForms = [`${key}_many`, `${key}_other`, `${key}`];
          }
        } else {
          if (count === 1) {
            pluralForms = [`${key}_one`, `${key}`];
          } else {
            pluralForms = [`${key}_other`, `${key}_plural`, `${key}`];
          }
        }

        // Ищем первую доступную форму перевода
        for (const form of pluralForms) {
          if ((translations as Record<string, string>)[form]) {
            translation = (translations as Record<string, string>)[form];
            break;
          }
        }
      }

      if (options && translation !== key) {
        Object.entries(options).forEach(([param, value]) => {
          if (value !== undefined) {
            const regex = new RegExp(`{{${param}}}`, 'g');
            translation = translation.replace(regex, String(value));
          }
        });
      }

      return translation;
    };
  }, [externalI18n, internalI18n.language]);

  const setLanguageWrapper = (lang: string): Promise<void> => {
    return internalI18n.changeLanguage(lang).then(() => undefined);
  };

  const contextValue: I18nContextType = useMemo(
    () => ({
      t: getTranslation,
      language: internalI18n.language,
      availableLanguages: internalI18n.languages,
      setLanguage: setLanguageWrapper,
    }),
    [getTranslation, internalI18n.language, internalI18n.languages],
  );

  return <I18nContext.Provider value={contextValue}>{children}</I18nContext.Provider>;
};
