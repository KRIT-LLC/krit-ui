import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { TimePicker, TimePickerProps } from '@/components/ui/time-picker';

const meta: Meta<typeof TimePicker> = {
  title: 'Components/UI/TimePicker',
  component: TimePicker,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Компонент выбора времени с маской ввода и выпадающим списком для удобного выбора.',
      },
    },
  },
  argTypes: {
    value: {
      control: 'text',
      description: 'Текущее значение времени в формате HH:MM',
    },
    placeholder: {
      control: 'text',
      description: 'Текст-подсказка при пустом поле',
    },
    disabled: {
      control: 'boolean',
      description: 'Отключение поля ввода',
    },
    onChange: {
      action: 'changed',
      description: 'Callback при изменении значения',
    },
    className: {
      control: 'text',
      description: 'Дополнительные CSS-классы',
    },
  },
} satisfies Meta<typeof TimePicker>;

export default meta;
type Story = StoryObj<typeof TimePicker>;

// Компонент-обертка для управления состоянием
const TimePickerWithState = (args: TimePickerProps) => {
  const [time, setTime] = useState(args.value || '');

  return (
    <div className='flex flex-col gap-4 max-w-xs'>
      <TimePicker {...args} value={time} onChange={setTime} />
      <div className='text-sm text-foreground-tertiary'>
        Выбранное время: {time || 'не выбрано'}
      </div>
    </div>
  );
};

// Базовый TimePicker
export const Default: Story = {
  render: args => <TimePickerWithState {...args} />,
  args: {
    placeholder: 'Выберите время',
  },
  parameters: {
    docs: {
      description: {
        story: 'Базовый компонент выбора времени с placeholder.',
      },
    },
  },
};

// С предустановленным значением
export const WithValue: Story = {
  render: args => <TimePickerWithState {...args} />,
  args: {
    value: '14:30',
    placeholder: 'Выберите время',
  },
  parameters: {
    docs: {
      description: {
        story: 'Компонент с предустановленным значением времени.',
      },
    },
  },
};

// Отключенное состояние
export const Disabled: Story = {
  render: args => <TimePickerWithState {...args} />,
  args: {
    value: '09:15',
    disabled: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Отключенный компонент выбора времени.',
      },
    },
  },
};

// С кастомным стилем
export const WithCustomStyle: Story = {
  render: args => <TimePickerWithState {...args} />,
  args: {
    placeholder: 'Выберите время',
    className: 'w-40',
  },
  parameters: {
    docs: {
      description: {
        story: 'Компонент с кастомными стилями (уменьшенная ширина).',
      },
    },
  },
};

// Пример использования в форме
export const InForm: Story = {
  render: () => {
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');

    return (
      <div className='flex flex-col gap-4 max-w-md p-4 bg-background-secondary rounded-lg'>
        <h3 className='text-lg font-medium'>Выбор интервала времени</h3>

        <div className='flex items-center gap-2'>
          <div className='flex-1'>
            <label className='block text-sm font-medium mb-1'>Начало</label>
            <TimePicker value={startTime} onChange={setStartTime} placeholder='00:00' />
          </div>

          <span className='pt-5'>—</span>

          <div className='flex-1'>
            <label className='block text-sm font-medium mb-1'>Конец</label>
            <TimePicker value={endTime} onChange={setEndTime} placeholder='23:59' />
          </div>
        </div>

        <div className='text-sm text-foreground-tertiary'>
          Выбранный интервал: {startTime || '--:--'} — {endTime || '--:--'}
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Пример использования TimePicker в форме для выбора интервала времени.',
      },
    },
  },
};
