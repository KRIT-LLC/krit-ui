import { useEffect, useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '@/components/ui/button';
import { ThemeProvider } from '@/components/ui/theme-provider';
import { useTheme } from '@/hooks/useTheme';

const meta: Meta<typeof ThemeProvider> = {
  title: 'Providers/ThemeProvider',
  component: ThemeProvider,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Провайдер темы для приложения. Управляет цветовой темой через CSS классы и переводами.',
      },
    },
  },
  argTypes: {
    defaultTheme: {
      control: 'select',
      options: ['light', 'dark', 'system'],
      description: 'Тема по умолчанию при инициализации',
    },
    storageKey: {
      control: 'text',
      description: 'Ключ для сохранения темы в localStorage',
    },
    themeVersion: {
      control: 'select',
      options: [undefined, '2'],
      description:
        'Версия темы. Определяет постфикс для CSS классов (например, "2" для классов .light2 и .dark2)',
    },
  },
} satisfies Meta<typeof ThemeProvider>;

export default meta;
type Story = StoryObj<typeof ThemeProvider>;

// Компонент для демонстрации использования темы
const ThemeDemo = () => {
  const { theme, setTheme, toggleTheme } = useTheme();
  const [currentThemeClass, setCurrentThemeClass] = useState<string>('не установлен');

  // Отслеживаем изменения класса темы в DOM
  useEffect(() => {
    const updateThemeClass = () => {
      const themeClass =
        typeof window !== 'undefined'
          ? Array.from(document.documentElement.classList).find(
              className => className.startsWith('light') || className.startsWith('dark'),
            ) || 'не установлен'
          : 'не доступен';
      setCurrentThemeClass(themeClass);
    };

    updateThemeClass();

    // Наблюдаем за изменениями классов в DOM
    const observer = new MutationObserver(updateThemeClass);
    if (typeof window !== 'undefined') {
      observer.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ['class'],
      });
    }

    return () => observer.disconnect();
  }, [theme]);

  return (
    <div className='p-4 bg-background-primary text-foreground-primary rounded-lg border'>
      <h3 className='text-lg font-medium mb-4'>Текущая тема: {theme}</h3>
      <p className='text-sm text-foreground-secondary mb-4'>
        CSS класс в DOM:{' '}
        <code className='px-1 py-0.5 bg-background-secondary rounded'>{currentThemeClass}</code>
      </p>
      <div className='flex gap-2'>
        <Button onClick={() => setTheme('light')}>Light</Button>
        <Button onClick={() => setTheme('dark')}>Dark</Button>
        <Button onClick={() => setTheme('system')}>System</Button>
        <Button onClick={toggleTheme}>Toggle</Button>
      </div>
      <div className='mt-4 p-4 bg-background-secondary rounded'>
        <p>Пример текста в текущей теме</p>
        <div className='mt-2 p-2 bg-background-contrast text-foreground-on-contrast rounded'>
          Контрастный фон
        </div>
      </div>
    </div>
  );
};

// Базовый провайдер темы
export const Default: Story = {
  render: args => (
    <ThemeProvider {...args}>
      <ThemeDemo />
    </ThemeProvider>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Базовый провайдер темы с настройками по умолчанию. Использует стандартные классы .light и .dark.',
      },
    },
  },
};

// С версией темы
export const WithThemeVersion: Story = {
  render: args => (
    <ThemeProvider {...args}>
      <ThemeDemo />
    </ThemeProvider>
  ),
  args: {
    defaultTheme: 'dark',
    themeVersion: '2',
  },
  parameters: {
    docs: {
      description: {
        story:
          'Провайдер темы с версией "2". Использует классы .light2 и .dark2 из colors2.css. Версия темы добавляется как постфикс к базовым классам тем.',
      },
    },
  },
};
