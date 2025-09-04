import type { Meta, StoryObj } from '@storybook/react';
import { Preloader } from '@/components/ui/preloader';

const meta: Meta<typeof Preloader> = {
  title: 'Components/UI/Preloader',
  component: Preloader,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Компонент индикатора загрузки с анимацией вращения. Использует иконку Loader2 из библиотеки lucide-react.',
      },
    },
  },
  argTypes: {
    className: {
      control: 'text',
      description: 'Дополнительные CSS-классы для контейнера',
    },
    style: {
      control: 'object',
      description: 'Объект со стилями для контейнера',
    },
  },
} satisfies Meta<typeof Preloader>;

export default meta;
type Story = StoryObj<typeof Preloader>;

// Базовый индикатор загрузки
export const Default: Story = {
  args: {},
  parameters: {
    docs: {
      description: {
        story: 'Базовый индикатор загрузки без дополнительных свойств.',
      },
    },
  },
};

// Индикатор с кастомными стилями
export const WithCustomStyle: Story = {
  args: {
    style: {
      backgroundColor: '#f0f0f0',
      borderRadius: '8px',
    },
  },
  parameters: {
    docs: {
      description: {
        story: 'Индикатор загрузки с пользовательскими стилями контейнера.',
      },
    },
  },
};

// Индикатор с дополнительными классами
export const WithCustomClass: Story = {
  args: {
    className: 'border-2 border-dashed border-gray-300 p-8',
  },
  parameters: {
    docs: {
      description: {
        story: 'Индикатор загрузки с дополнительными CSS-классами.',
      },
    },
  },
};

// Компактный вариант
export const Compact: Story = {
  render: () => (
    <div className='flex items-center gap-2'>
      <span>Загрузка данных</span>
      <Preloader className='w-6 h-6' />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Компактный индикатор загрузки, встроенный в текст.',
      },
    },
  },
};
