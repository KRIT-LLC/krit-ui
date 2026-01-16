import type { Meta, StoryObj } from '@storybook/react';
import { TimeBadge } from '@/components/ui/widget-plan-fact';

const meta: Meta<typeof TimeBadge> = {
  title: 'Components/UI/TimeBadge',
  component: TimeBadge,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Компонент для отображения даты/времени и длительности в виде бейджа. Поддерживает различные варианты стилей: default, warning (желтый), error (красный).',
      },
    },
  },
  argTypes: {
    dateTime: {
      control: 'text',
      description: 'Дата и время в формате "DD.MM.YYYY HH:mm"',
    },
    duration: {
      control: 'text',
      description: 'Длительность в формате "Xd : Yч : Zмин"',
    },
    variant: {
      control: 'select',
      options: ['default', 'warning', 'error'],
      description: 'Вариант стиля бейджа',
    },
    className: {
      control: 'text',
      description: 'Дополнительные CSS-классы',
    },
  },
} satisfies Meta<typeof TimeBadge>;

export default meta;
type Story = StoryObj<typeof TimeBadge>;

// Базовый пример (default)
export const Default: Story = {
  args: {
    dateTime: '01.12.2025 10:00',
    duration: '14д : 24ч : 20мин',
    variant: 'default',
  },
  parameters: {
    docs: {
      description: {
        story: 'Базовый вариант бейджа без фона (простой текст).',
      },
    },
  },
};

// Только дата/время
export const DateTimeOnly: Story = {
  args: {
    dateTime: '01.12.2025 10:00',
    variant: 'default',
  },
  parameters: {
    docs: {
      description: {
        story: 'Бейдж только с датой и временем.',
      },
    },
  },
};

// Только длительность
export const DurationOnly: Story = {
  args: {
    duration: '14д : 24ч : 20мин',
    variant: 'default',
  },
  parameters: {
    docs: {
      description: {
        story: 'Бейдж только с длительностью.',
      },
    },
  },
};

// Warning вариант
export const Warning: Story = {
  args: {
    dateTime: '01.12.2025 10:00',
    duration: '14д : 24ч : 20мин',
    variant: 'warning',
  },
  parameters: {
    docs: {
      description: {
        story: 'Бейдж с желтым фоном (предупреждение).',
      },
    },
  },
};

// Error вариант
export const Error: Story = {
  args: {
    dateTime: '01.12.2025 10:00',
    duration: '14д : 24ч : 20мин',
    variant: 'error',
  },
  parameters: {
    docs: {
      description: {
        story: 'Бейдж с красным фоном (ошибка/расхождение).',
      },
    },
  },
};

// Все варианты
export const AllVariants: Story = {
  render: () => (
    <div className='flex flex-col gap-4'>
      <div>
        <h3 className='text-sm font-medium mb-2'>Default</h3>
        <TimeBadge dateTime='01.12.2025 10:00' duration='14д : 24ч : 20мин' variant='default' />
      </div>
      <div>
        <h3 className='text-sm font-medium mb-2'>Warning</h3>
        <TimeBadge dateTime='01.12.2025 10:00' duration='14д : 24ч : 20мин' variant='warning' />
      </div>
      <div>
        <h3 className='text-sm font-medium mb-2'>Error</h3>
        <TimeBadge dateTime='01.12.2025 10:00' duration='14д : 24ч : 20мин' variant='error' />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Все варианты стилей бейджа.',
      },
    },
  },
};
