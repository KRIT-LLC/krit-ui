import { createContext, useCallback, useEffect, useState } from 'react';

export type Theme = 'dark' | 'light' | 'system';
/**
 * Версия темы. Определяет постфикс для классов тем в CSS.
 *
 * **Как расширять тип:**
 * Для добавления новой версии темы расширьте тип через union:
 * ```typescript
 * export type ThemeVersion = 'Krit' | 'NordGold' | 'Hunter';
 * ```
 *
 * **Правила именования классов в CSS:**
 * - Классы должны начинаться с `light` или `dark`
 * - После базового названия темы должен идти постфикс версии (значение из ThemeVersion)
 * - Примеры корректных классов:
 *   - `light` (версия не указана или пустая строка)
 *   - `dark` (версия не указана или пустая строка)
 *   - `lightKrit` (themeVersion='Krit')
 *   - `darkKrit` (themeVersion='Krit')
 *   - `lightNordGold` (themeVersion='NordGold')
 *   - `darkNordGold` (themeVersion='NordGold')
 *   - `lightHunter` (themeVersion='Hunter')
 *   - `darkHunter` (themeVersion='Hunter')
 *   - `light_project_name` (themeVersion='project_name')
 *   - `dark_project_name` (themeVersion='project_name')
 *
 * **Пример использования:**
 * При `themeVersion='Krit'` будут применяться классы `.lightKrit` и `.darkKrit`.
 * При `themeVersion='NordGold'` будут применяться классы `.lightNordGold` и `.darkNordGold`.
 * При `themeVersion='Hunter'` будут применяться классы `.lightHunter` и `.darkHunter`.
 * Эти классы должны быть определены в соответствующем CSS файле (например, `colorsKrit.css`, `colorsNordGold.css`, `colorsHunter.css`).
 *
 * **Важно:**
 * - Значение `themeVersion` должно точно соответствовать постфиксу в CSS классах
 * - Классы автоматически удаляются из DOM перед применением новой темы
 * - Все классы, начинающиеся с `light` или `dark`, будут удалены при переключении темы
 */
export type ThemeVersion = 'Krit' | 'NordGold' | 'Hunter';

const translations = {
  expand: 'Expand',
  empty: 'Empty',
  confirmAction: 'Confirm action',
  warning: 'Warning',
  maxNChars: 'Max charts',
  cancellation: 'Cancel',
  displayBy: 'Display by',
  selected: 'Selected',
  all: 'All',
  of: 'of',
  selectDate: 'Select date',
  search: 'Search...',
  notFound: 'Not found',
  networkError: 'Network error',
  refetch: 'Refetch',
  attachFile: 'Attach file',
  errorOccurred: 'Error occurred',
  noMediaFiles: 'No media files',
  networkErrorDescription: 'Network error description',
  confirmDeleteMedia: 'Are you sure you want to delete the file?',
  delete: 'Delete',
  imageSizeLimitMB: 'Image size limit',
  audioSizeLimitMB: 'Audio size limit',
  pdfSizeLimitMB: 'PDF size limit',
  videoSizeLimitMB: 'Video size limit',
  maxSizeOfFilesMB: 'Max size of files',
  mb: 'Mb',
  apply: 'Apply',
  showAll: 'Show all',
  chooseAll: 'Choose all',
  withoutSort: 'Without sort',
};

export type Translations = keyof typeof translations;

export type ThemeProviderProps = {
  children: React.ReactNode;
  /**
   * Тема по умолчанию, которая будет применена при инициализации.
   * Если не указана, будет использована системная тема или тема,
   * сохраненная в localStorage (если `storageKey` указан).
   */
  defaultTheme?: Theme;
  /**
   * Ключ для сохранения текущей темы в localStorage.
   * Позволяет сохранять выбор темы пользователя между сессиями.
   * Если не указан, тема не сохраняется.
   */
  storageKey?: string;
  /**
   * Переводы для текстов.
   * Ключи объекта — это идентификаторы переводов, значения — сами переводы.
   */
  translations?: Record<Translations, string>;
  /**
   * Версия темы. Если указана, классы будут применены с постфиксом версии.
   * Например, при themeVersion='2' будут использоваться классы .light2 и .dark2.
   * Должна соответствовать классу в используемом colors.css файле.
   */
  themeVersion?: ThemeVersion;
};

export type ThemeProviderState = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
  translations: Record<Translations, string>;
};

const initialState: ThemeProviderState = {
  theme: 'system',
  setTheme: () => null,
  toggleTheme: () => null,
  translations,
};

export const ThemeProviderContext = createContext<ThemeProviderState>(initialState);

/**
 * Провайдер темы для приложения. Управляет цветовой темой, переводами и CSS-переменными.
 * Обеспечивает контекст для дочерних компонентов к текущей теме и функциям её изменения.
 * Поддерживает сохранение выбранной темы в localStorage и синхронизацию с системными настройками.
 *
 * @component
 * @param {object} props - Параметры компонента
 * @param {React.ReactNode} props.children - Дочерние компоненты
 * @param {Theme} [props.defaultTheme='system'] - Тема по умолчанию
 * @param {string} [props.storageKey='app-ui-theme'] - Ключ для сохранения темы в localStorage
 * @param {Record<Translations, string>} [props.translations] - Кастомные переводы
 * @param {ThemeVersion} [props.themeVersion] - Версия темы (например, '2' для классов .light2 и .dark2)
 * @returns {React.ReactElement} Провайдер темы с контекстом
 *
 * @example
 * <ThemeProvider defaultTheme="dark" storageKey="my-app-theme">
 *   <App />
 * </ThemeProvider>
 *
 * @example
 * <ThemeProvider
 *   themeVersion="2"
 *   defaultTheme="dark"
 * >
 *   <App />
 * </ThemeProvider>
 */
export function ThemeProvider({
  children,
  defaultTheme = 'system',
  storageKey = 'app-ui-theme',
  themeVersion = 'Krit',
  ...props
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(
    () => (localStorage.getItem(storageKey) as Theme) || defaultTheme,
  );

  const getThemeClass = useCallback(
    (baseTheme: 'dark' | 'light'): string => {
      return themeVersion ? `${baseTheme}${themeVersion}` : baseTheme;
    },
    [themeVersion],
  );

  useEffect(() => {
    const root = window.document.documentElement;

    // Удаляем все классы тем, которые начинаются с 'light' или 'dark'
    const classesToRemove = Array.from(root.classList).filter(
      className => className.startsWith('light') || className.startsWith('dark'),
    );
    classesToRemove.forEach(className => root.classList.remove(className));

    if (theme === 'system') {
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light';
      const themeClass = getThemeClass(systemTheme);
      setTheme(systemTheme);
      root.classList.add(themeClass);
    } else {
      const themeClass = getThemeClass(theme);
      root.classList.add(themeClass);
    }
  }, [theme, getThemeClass]);

  const value: ThemeProviderState = {
    theme,
    setTheme: (theme: Theme) => {
      localStorage.setItem(storageKey, theme);
      setTheme(theme);
    },
    toggleTheme: () => {
      const nextTheme = theme === 'light' ? 'dark' : 'light';
      value.setTheme(nextTheme);
    },
    translations: {
      ...initialState.translations,
      ...props.translations,
    },
  };

  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      {children}
    </ThemeProviderContext.Provider>
  );
}
