import { defaultTranslations } from '../../lib/lib/i18n/defaultTranslations';
import { I18nProvider } from '../../lib/lib/i18n/i18nContext';

export const withI18n = (Story, context) => {
  const language = context.parameters.language || context.globals.language || 'en';

  return (
    <I18nProvider
      translations={{
        en: defaultTranslations.en,
        ru: defaultTranslations.ru,
      }}
      language={language}
      availableLanguages={['en', 'ru']}
    >
      <Story />
    </I18nProvider>
  );
};
