import type { Meta, StoryObj } from '@storybook/react';
import { TimeBadge, WidgetPlanFact } from '@/components/ui/widget-plan-fact';

const meta: Meta<typeof WidgetPlanFact> = {
  title: 'Components/UI/WidgetPlanFact',
  component: WidgetPlanFact,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Виджет для отображения сравнения плановых и фактических значений. Отображает секции с планом и фактом, а также опциональное расхождение.',
      },
    },
  },
  argTypes: {
    rows: {
      control: 'object',
      description: 'Массив строк с планом и фактом',
    },
    orientation: {
      control: 'select',
      options: ['vertical', 'horizontal'],
      description: 'Ориентация виджета: вертикальная (строки) или горизонтальная (колонки)',
    },
    className: {
      control: 'text',
      description: 'Дополнительные CSS-классы для корневого элемента',
    },
  },
} satisfies Meta<typeof WidgetPlanFact>;

export default meta;
type Story = StoryObj<typeof WidgetPlanFact>;

// Вертикальная ориентация (по умолчанию)
export const Vertical: Story = {
  args: {
    orientation: 'vertical',
    rows: [
      {
        planLabel: 'План начала',
        planValue: '01.11.2025 10:00',
        factLabel: 'Факт начала',
        factDateTime: '01.12.2025 10:00',
        delta: 'Расхождение 30д : 2ч : 30мин',
      },
      {
        planLabel: 'План окончания',
        planValue: '14.11.2025 10:00',
        factLabel: 'Факт окончания',
        factDateTime: '14.12.2025 10:00',
        delta: 'Расхождение 30д : 0ч : 0мин',
      },
      {
        planLabel: 'План продол-ти',
        planValue: '14д : 24ч : 20мин',
        factLabel: 'Факт продол-ти',
        factDuration: '23д : 24ч : 20мин',
        delta: 'Расхождение 9д : 0ч : 0мин',
      },
    ],
  },
  parameters: {
    docs: {
      description: {
        story: 'Вертикальная ориентация виджета с тремя секциями: начало, окончание и длительность.',
      },
    },
  },
};

// Горизонтальная ориентация
export const Horizontal: Story = {
  args: {
    orientation: 'horizontal',
    rows: [
      {
        planLabel: 'План начала',
        planValue: '01.11.2025 10:00',
        factLabel: 'Факт начала',
        factDateTime: '01.12.2025 10:00',
        delta: 'Расхождение 30д : 2ч : 30мин',
      },
      {
        planLabel: 'План окончания',
        planValue: '14.11.2025 10:00',
        factLabel: 'Факт окончания',
        factDateTime: '14.12.2025 10:00',
        delta: 'Расхождение 30д : 0ч : 0мин',
      },
      {
        planLabel: 'План продол-ти',
        planValue: '14д : 24ч : 20мин',
        factLabel: 'Факт продол-ти',
        factDuration: '23д : 24ч : 20мин',
        delta: 'Расхождение 9д : 0ч : 0мин',
      },
    ],
  },
  parameters: {
    docs: {
      description: {
        story: 'Горизонтальная ориентация виджета с тремя колонками: начало, окончание и длительность.',
      },
    },
  },
};

// Без расхождения
export const WithoutDelta: Story = {
  args: {
    rows: [
      {
        planLabel: 'План начала',
        planValue: '01.11.2025 10:00',
        factLabel: 'Факт начала',
        factDateTime: '01.12.2025 10:00',
      },
      {
        planLabel: 'План окончания',
        planValue: '14.11.2025 10:00',
        factLabel: 'Факт окончания',
        factDateTime: '14.12.2025 10:00',
      },
    ],
  },
  parameters: {
    docs: {
      description: {
        story: 'Виджет без отображения расхождений (delta не передана).',
      },
    },
  },
};

// С длительностью
export const WithDuration: Story = {
  args: {
    rows: [
      {
        planLabel: 'План продол-ти',
        planValue: '14д : 24ч : 20мин',
        factLabel: 'Факт продол-ти',
        factDuration: '23д : 24ч : 20мин',
        delta: 'Расхождение 9д : 0ч : 0мин',
      },
    ],
  },
  parameters: {
    docs: {
      description: {
        story: 'Виджет с отображением длительности вместо даты/времени.',
      },
    },
  },
};

// С датой и длительностью
export const WithDateTimeAndDuration: Story = {
  args: {
    rows: [
      {
        planLabel: 'План начала',
        planValue: '01.11.2025 10:00',
        factLabel: 'Факт начала',
        factDateTime: '01.12.2025 10:00',
        factDuration: '14д : 24ч : 20мин',
        delta: 'Расхождение 30д : 2ч : 30мин',
      },
    ],
  },
  parameters: {
    docs: {
      description: {
        story: 'Виджет с отображением даты/времени и длительности одновременно.',
      },
    },
  },
};

// Одна секция (вертикальная)
export const SingleRow: Story = {
  args: {
    orientation: 'vertical',
    rows: [
      {
        planLabel: 'План начала',
        planValue: '01.11.2025 10:00',
        factLabel: 'Факт начала',
        factDateTime: '01.12.2025 10:00',
        delta: 'Расхождение 30д : 2ч : 30мин',
      },
    ],
  },
  parameters: {
    docs: {
      description: {
        story: 'Виджет с одной секцией в вертикальной ориентации.',
      },
    },
  },
};

// Одна секция (горизонтальная)
export const SingleRowHorizontal: Story = {
  args: {
    orientation: 'horizontal',
    rows: [
      {
        planLabel: 'План начала',
        planValue: '01.11.2025 10:00',
        factLabel: 'Факт начала',
        factDateTime: '01.12.2025 10:00',
        delta: 'Расхождение 30д : 2ч : 30мин',
      },
    ],
  },
  parameters: {
    docs: {
      description: {
        story: 'Виджет с одной секцией в горизонтальной ориентации.',
      },
    },
  },
};
