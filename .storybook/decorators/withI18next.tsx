import { I18nProvider } from '../../lib/lib/i18n/i18nContext';

const t = (key: string) => {
  return key;
};

export const withI18n = Story => (
  <I18nProvider
    i18n={{
      t: t,
      language: 'ru',
      languages: ['ru', 'en'],
      changeLanguage: () => Promise.resolve(),
    }}
  >
    <Story />
  </I18nProvider>
);
