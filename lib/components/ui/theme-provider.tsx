import { createContext, useEffect, useState } from 'react';

export type Theme = 'dark' | 'light' | 'system';
type HSLColor = `${number} ${number}% ${number}%`;
type Gradient = `linear-gradient(${string})`;

export type ThemeVariables = {
  // Background colors
  '--krit-background-primary': HSLColor;
  '--krit-background-primary-hover': HSLColor;
  '--krit-background-primary-selected': HSLColor;
  '--krit-background-secondary': HSLColor;
  '--krit-background-secondary-hover': HSLColor;
  '--krit-background-tertiary': HSLColor;
  '--krit-background-theme': HSLColor;
  '--krit-background-theme-hover': HSLColor;
  '--krit-background-theme-fade': HSLColor;
  '--krit-background-contrast': HSLColor;
  '--krit-background-contrast-hover': HSLColor;
  '--krit-background-contrast-disabled': HSLColor;
  '--krit-background-contrast-selected': HSLColor;
  '--krit-background-contrast-fade': HSLColor;
  '--krit-background-contrast-fade-hover': HSLColor;
  '--krit-background-contrast-fade-selected': HSLColor;
  '--krit-background-contrast-fade-disabled': HSLColor;
  '--krit-background-error': HSLColor;
  '--krit-background-error-hover': HSLColor;
  '--krit-background-error-fade': HSLColor;
  '--krit-background-error-fade-hover': HSLColor;
  '--krit-background-error-gradient': Gradient;
  '--krit-background-warning': HSLColor;
  '--krit-background-warning-hover': HSLColor;
  '--krit-background-warning-fade': HSLColor;
  '--krit-background-warning-fade-hover': HSLColor;
  '--krit-background-success': HSLColor;
  '--krit-background-success-hover': HSLColor;
  '--krit-background-success-tertiary': HSLColor;
  '--krit-background-success-fade': HSLColor;
  '--krit-background-success-fade-hover': HSLColor;
  '--krit-background-success-gradient': Gradient;
  '--krit-background-overlay': HSLColor;
  '--krit-background-progress-gradient': Gradient;

  // Foreground colors
  '--krit-foreground-primary': HSLColor;
  '--krit-foreground-primary-disabled': HSLColor;
  '--krit-foreground-secondary': HSLColor;
  '--krit-foreground-tertiary': HSLColor;
  '--krit-foreground-theme': HSLColor;
  '--krit-foreground-on-contrast': HSLColor;
  '--krit-foreground-on-contrast-disabled': HSLColor;
  '--krit-foreground-error': HSLColor;
  '--krit-foreground-warning': HSLColor;
  '--krit-foreground-success': HSLColor;

  // Line colors
  '--krit-line-primary': HSLColor;
  '--krit-line-primary-hover': HSLColor;
  '--krit-line-primary-disabled': HSLColor;
  '--krit-line-secondary': HSLColor;
  '--krit-line-error': HSLColor;
  '--krit-line-warning': HSLColor;
  '--krit-line-success': HSLColor;
  '--krit-line-theme': HSLColor;
  '--krit-line-contrast': HSLColor;
  '--krit-line-focused': HSLColor;

  // Icon colors
  '--krit-icon-contrast': HSLColor;
  '--krit-icon-contrast-disabled': HSLColor;
  '--krit-icon-fade-contrast': HSLColor;
  '--krit-icon-on-contrast': HSLColor;
  '--krit-icon-on-contrast-selected': HSLColor;
  '--krit-icon-on-contrast-disabled': HSLColor;
  '--krit-icon-theme': HSLColor;
  '--krit-icon-error': HSLColor;
  '--krit-icon-warning': HSLColor;
  '--krit-icon-success': HSLColor;

  // Other
  '--krit-purple': HSLColor;
  '--krit-radius': `${number}rem`;
};

const translations = {
  expand: 'Expand',
  empty: 'Empty',
  confirmAction: 'Confirm action',
  warning: 'Warning',
  maxNChars: 'Max charts',
  cancellation: 'Cancel',
  displayBy: 'Display by',
  selected: 'Selected',
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
   * Цвета для тем. Объект, где ключи — это названия тем (`dark` или `light`),
   * а значения — объекты с CSS-переменными (необязательными).
   * Позволяет кастомизировать цвета для каждой темы.
   */
  colors?: Record<'dark' | 'light', Partial<ThemeVariables>>;
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

export function ThemeProvider({
  children,
  defaultTheme = 'system',
  storageKey = 'app-ui-theme',
  colors,
  ...props
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(
    () => (localStorage.getItem(storageKey) as Theme) || defaultTheme,
  );

  const updateThemeVariables = (theme: 'dark' | 'light') => {
    Object.entries(colors?.[theme] || {}).forEach(([key, value]) => {
      document.documentElement.style.setProperty(key, value);
    });
  };

  useEffect(() => {
    const root = window.document.documentElement;

    root.classList.remove('light', 'dark');

    if (theme === 'system') {
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light';
      setTheme(systemTheme);
      root.classList.add(systemTheme);
      updateThemeVariables(systemTheme);
    } else {
      root.classList.add(theme);
      updateThemeVariables(theme);
    }
  }, [theme, colors]);

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
