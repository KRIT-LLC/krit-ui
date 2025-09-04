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
          'Провайдер темы для приложения. Управляет цветовой темой, переводами и CSS-переменными.',
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
  },
} satisfies Meta<typeof ThemeProvider>;

export default meta;
type Story = StoryObj<typeof ThemeProvider>;

// Компонент для демонстрации использования темы
const ThemeDemo = () => {
  const { theme, setTheme, toggleTheme } = useTheme();

  return (
    <div className='p-4 bg-background-primary text-foreground-primary rounded-lg border'>
      <h3 className='text-lg font-medium mb-4'>Текущая тема: {theme}</h3>
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
        story: 'Базовый провайдер темы с настройками по умолчанию.',
      },
    },
  },
};

// С кастомными цветами
export const WithCustomColors: Story = {
  render: args => (
    <ThemeProvider {...args}>
      <ThemeDemo />
    </ThemeProvider>
  ),
  args: {
    defaultTheme: 'dark',
    colors: {
      dark: {
        '--krit-background-primary': '240 10% 10%',
        '--krit-foreground-primary': '0 0% 98%',
        '--krit-background-theme': '142 76% 36%',
      },
      light: {
        '--krit-background-primary': '0 0% 98%',
        '--krit-foreground-primary': '240 10% 10%',
        '--krit-background-theme': '142 76% 36%',
      },
    },
  },
  parameters: {
    docs: {
      description: {
        story: 'Провайдер темы с кастомными цветами для светлой и темной темы.',
      },
    },
  },
};
