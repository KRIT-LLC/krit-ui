import React, { useEffect } from 'react';
import type { Decorator, Preview } from '@storybook/react';
import { Theme, ThemeProvider, ThemeVersion } from '../lib/components/ui/theme-provider';
import { useTheme } from '../lib/hooks/useTheme';
import './preview-styles.css';

// Компонент-обёртка для синхронизации темы с глобальными параметрами Storybook
const ThemeWrapper = ({ children, theme }: { children: React.ReactNode; theme: Theme }) => {
  const { setTheme } = useTheme();

  useEffect(() => {
    setTheme(theme);
  }, [theme, setTheme]);

  return <>{children}</>;
};

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  globalTypes: {
    theme: {
      name: 'Theme',
      description: 'Цветовая тема (светлая/темная)',
      defaultValue: 'light',
      toolbar: {
        title: 'Theme',
        icon: 'moon',
        items: [
          { value: 'light', title: 'Light', icon: 'sun' },
          { value: 'dark', title: 'Dark', icon: 'moon' },
          { value: 'system', title: 'System', icon: 'circlehollow' },
        ],
        dynamicTitle: true,
      },
    },
    themeVersion: {
      name: 'Theme Version',
      description: 'Версия темы (цветовая схема)',
      defaultValue: undefined,
      toolbar: {
        title: 'Theme Version',
        icon: 'paintbrush',
        items: [
          { value: undefined, title: 'Default (no version)', icon: 'circle' },
          { value: '2', title: 'Version 2', icon: 'circle' },
          { value: 'NordGold', title: 'NordGold', icon: 'circle' },
        ],
        dynamicTitle: true,
      },
    },
  },
  decorators: [
    ((Story, context) => {
      const theme = (context.globals.theme || 'light') as Theme;
      const themeVersion = context.globals.themeVersion as ThemeVersion | undefined;

      return (
        <ThemeProvider
          defaultTheme={theme}
          storageKey='storybook-ui-theme'
          themeVersion={themeVersion}
        >
          <ThemeWrapper theme={theme}>
            <Story />
          </ThemeWrapper>
        </ThemeProvider>
      );
    }) as Decorator,
  ],
};

export default preview;
