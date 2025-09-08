import { useI18n } from '@/lib/i18n/i18nContext';

export const useTranslation = () => {
  const { t, language, availableLanguages, setLanguage } = useI18n();

  return {
    t,
    language,
    availableLanguages,
    setLanguage,
  };
};
