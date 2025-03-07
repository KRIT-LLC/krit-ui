import { createContext, useEffect, useState } from 'react';

export type Theme = 'dark' | 'light' | 'system';

export type Translations =
  | 'expand'
  | 'empty'
  | 'confirmAction'
  | 'warning'
  | 'maxNChars'
  | 'cancellation'
  | 'displayBy'
  | 'selected'
  | 'of'
  | 'selectDate'
  | 'search'
  | 'notFound'
  | 'networkError'
  | 'refetch'
  | 'attachFile'
  | 'errorOccurred';

export type ThemeProviderProps = {
  children: React.ReactNode;
  defaultTheme?: Theme;
  storageKey?: string;
  translations?: Record<Translations, string>;
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
  translations: {
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
  },
};

export const ThemeProviderContext = createContext<ThemeProviderState>(initialState);

export function ThemeProvider({
  children,
  defaultTheme = 'system',
  storageKey = 'app-ui-theme',
  ...props
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(
    () => (localStorage.getItem(storageKey) as Theme) || defaultTheme,
  );

  useEffect(() => {
    const root = window.document.documentElement;

    root.classList.remove('light', 'dark');

    if (theme === 'system') {
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light';
      setTheme(systemTheme);
      root.classList.add(systemTheme);
    } else {
      root.classList.add(theme);
    }
  }, [theme]);

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
