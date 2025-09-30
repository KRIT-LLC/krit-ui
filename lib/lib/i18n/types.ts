import enTranslations from './translations/en.json';
import ruTranslations from './translations/ru.json';

export type TranslationSchema = {
  en: typeof enTranslations;
  ru: typeof ruTranslations;
};

export type LanguageCode = keyof TranslationSchema;

// Базовые ключи переводов (без плюральных суффиксов)
export type BaseTranslationKey = keyof typeof enTranslations | keyof typeof ruTranslations;

// Тип для всех возможных ключей, включая плюральные формы
export type AnyTranslationKey = BaseTranslationKey | `${BaseTranslationKey}_${string}`;

// Тип для параметров перевода
export type TranslationParams = {
  count?: number;
  [key: string]: string | number | undefined;
};

export type ValidParams = TranslationParams;
