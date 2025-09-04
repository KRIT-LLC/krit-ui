// Separator.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import { Separator } from '@/components/ui/separator';

const meta: Meta<typeof Separator> = {
  title: 'Components/UI/Separator',
  component: Separator,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Разделитель для визуального отделения элементов интерфейса. Основан на Radix UI Separator.',
      },
    },
  },
  argTypes: {
    orientation: {
      control: 'radio',
      options: ['horizontal', 'vertical'],
      description: 'Ориентация разделителя',
    },
    decorative: {
      control: 'boolean',
      description: 'Декоративный элемент (не влияет на доступность)',
    },
    className: {
      control: 'text',
      description: 'Дополнительные CSS-классы',
    },
  },
} satisfies Meta<typeof Separator>;

export default meta;
type Story = StoryObj<typeof Separator>;

// Горизонтальный разделитель
export const Horizontal: Story = {
  args: {
    orientation: 'horizontal',
  },
  parameters: {
    docs: {
      description: {
        story: 'Горизонтальный разделитель по умолчанию.',
      },
    },
  },
};

// Вертикальный разделитель
export const Vertical: Story = {
  args: {
    orientation: 'vertical',
  },
  render: args => (
    <div className='flex h-20 items-center gap-4'>
      <div>Left</div>
      <Separator {...args} />
      <div>Right</div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Вертикальный разделитель между элементами.',
      },
    },
  },
};

// С кастомным стилем
export const WithCustomStyle: Story = {
  args: {
    className: 'bg-background-warning',
  },
  parameters: {
    docs: {
      description: {
        story: 'Разделитель с дополнительными пользовательскими стилями.',
      },
    },
  },
};

// Пример использования в интерфейсе
export const InContext: Story = {
  render: () => (
    <div className='max-w-md space-y-4'>
      <div>
        <h3>Профиль пользователя</h3>
        <p>Личная информация и настройки аккаунта</p>
      </div>
      <Separator />
      <div className='flex h-5 items-center space-x-4'>
        <div>Общее</div>
        <Separator orientation='vertical' />
        <div>Безопасность</div>
        <Separator orientation='vertical' />
        <div>Уведомления</div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Пример использования разделителей в реальном интерфейсе.',
      },
    },
  },
};

// Недекоративный разделитель
export const NonDecorative: Story = {
  args: {
    decorative: false,
    'aria-label': 'Section divider',
  },
  parameters: {
    docs: {
      description: {
        story: 'Разделитель с семантической значимостью для доступности.',
      },
    },
  },
};
