// lib/hooks/useTranslation.ts
import { useI18n } from '@/lib/i18n/i18nContext';
import { getTranslation, InterpolationValues } from '@/lib/i18n/utils';

export const useTranslation = () => {
  const { translations, language, availableLanguages, setLanguage } = useI18n();

  const t = (key: string, values?: InterpolationValues): string => {
    return getTranslation(key, translations, language, values);
  };

  return {
    t,
    language,
    availableLanguages,
    setLanguage,
  };
};
