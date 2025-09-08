import { useI18n } from '@/lib/i18n/i18nContext';
import { BaseTranslationKey, ValidParams } from '@/lib/i18n/types';

export const useTranslation = () => {
  const { t, language, availableLanguages, setLanguage } = useI18n();

  const typedT = <K extends BaseTranslationKey>(key: K, options?: ValidParams<K>) =>
    t(key, options);

  return {
    t: typedT,
    language,
    availableLanguages,
    setLanguage,
  };
};
