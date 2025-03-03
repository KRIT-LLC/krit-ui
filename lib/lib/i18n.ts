import { initReactI18next } from 'react-i18next';
import i18n from 'i18next';

const resources = {
  en: {
    translation: {
      networkError: 'Download error',
      refetch: 'Reload',
      attachFile: 'Attach file',
      confirmAction: 'Confirm action',
      warning: 'Warning',
      maxNChars: 'Maximum {{count}} characters',
      cancellation: 'Cancel',
      selected: 'Selected',
      displayBy: 'Display by',
      of: 'of',
      expand: 'Expand',
      empty: 'Empty',
      selectDate: 'Select date',
      errorOccurred: 'An error occurred',
      notFound: 'Not found',
      search: 'Search',
    },
  },
  ru: {
    translation: {
      networkError: 'Ошибка загрузки',
      refetch: 'Перезагрузить',
      attachFile: 'Приложить файл',
      confirmAction: 'Подтвердите действие',
      warning: 'Предупреждение',
      maxNChars: 'Максимум {{count}} символов',
      cancellation: 'Отмена',
      selected: 'Выделено',
      displayBy: 'Выводить по',
      of: 'из',
      expand: 'Развернуть',
      empty: 'Пусто',
      selectDate: 'Выберите дату',
      errorOccurred: 'Произошла ошибка',
      notFound: 'Не найдено',
      search: 'Поиск',
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: 'ru',
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
});

export { i18n };
