import { defaultTranslations } from './defaultTranslations';
import { TranslationResource } from './i18nContext';

export type InterpolationValues = Record<string, string | number | boolean | null | undefined>;

const pluralRules: Record<string, (count: number) => string> = {
  en: count => (count === 1 ? '' : '_plural'),
  ru: count => {
    const mod10 = count % 10;
    const mod100 = count % 100;

    if (mod10 === 1 && mod100 !== 11) return '_one';
    if (mod10 >= 2 && mod10 <= 4 && (mod100 < 10 || mod100 >= 20)) return '_few';
    if (mod10 === 0 || (mod10 >= 5 && mod10 <= 9) || (mod100 >= 11 && mod100 <= 19)) return '_many';
    return '_many';
  },
};

export const interpolate = (text: string, values: InterpolationValues = {}): string => {
  return Object.keys(values).reduce((result, key) => {
    const value = values[key];
    return result.replace(
      new RegExp(`{{${key}}}`, 'g'),
      value !== null && value !== undefined ? String(value) : '',
    );
  }, text);
};

export const getTranslation = (
  key: string,
  translations: TranslationResource,
  language: string,
  values?: InterpolationValues,
): string => {
  let finalKey = key;
  const count = values?.count;

  if (count !== undefined && typeof count === 'number') {
    const getSuffix = pluralRules[language] || pluralRules.en;
    const suffix = getSuffix(count);

    const pluralKey = `${key}${suffix}`;
    if (translations[pluralKey as keyof TranslationResource] !== undefined) {
      finalKey = pluralKey;
    }
  }

  const text = translations[finalKey as keyof TranslationResource] || finalKey;
  return values ? interpolate(text, values) : text;
};

export type NestedTranslations = {
  [key: string]: string | NestedTranslations;
};

export const validateTranslations = (
  translations: Record<string, Partial<TranslationResource>>,
) => {
  Object.keys(translations).forEach(language => {
    const defaultKeys = Object.keys(defaultTranslations.en) as Array<keyof TranslationResource>;
    const missingKeys = defaultKeys.filter(key => !translations[language]?.[key]);

    if (missingKeys.length > 0) {
      console.warn(
        `Missing translation keys for ${language}: ${missingKeys.join(', ')}. Using default values.`,
      );
    }
  });
};

export const flattenTranslations = (
  obj: NestedTranslations,
  prefix = '',
): Partial<TranslationResource> => {
  return Object.keys(obj).reduce((acc, key) => {
    const pre = prefix.length ? prefix + '.' : '';
    const value = obj[key];

    if (typeof value === 'object' && value !== null) {
      Object.assign(acc, flattenTranslations(value, pre + key));
    } else if (typeof value === 'string') {
      // Приводим ключи к типу TranslationResource
      const translationKey = (pre + key) as keyof TranslationResource;
      acc[translationKey] = value;
    }

    return acc;
  }, {} as Partial<TranslationResource>);
};
