import { useContext } from 'react';
import { ThemeProviderContext, Translations } from '@/components/ui/theme-provider';

export const useTranslation = () => {
  const context = useContext(ThemeProviderContext);

  const t = (key: Translations) => {
    if (!context.translations) {
      console.warn('KRIT-UI: Translations not found');
      return key;
    }
    if (context.translations?.[key] === undefined) {
      console.warn(`KRIT-UI: Translation for key ${key} not found`);
      return key;
    }

    return context.translations[key];
  };

  return { t };
};
