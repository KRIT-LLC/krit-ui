import { useState } from 'react';
import { SelectSingleEventHandler } from 'react-day-picker';
import type { Meta, StoryObj } from '@storybook/react';
import { DatePicker } from '@/components/ui/date-picker';

const meta: Meta<typeof DatePicker> = {
  title: 'Components/UI/DatePicker',
  component: DatePicker,
  tags: ['autodocs'],
  argTypes: {
    mode: {
      control: { type: 'select' },
      options: ['single', 'multiple', 'range'],
    },
    error: {
      control: { type: 'text' },
    },
  },
  parameters: {
    docs: {
      description: {
        component: 'Универсальный компонент выбора даты с поддержкой различных режимов',
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof DatePicker>;

// Режим выбора одной даты
export const Single: Story = {
  render: () => {
    const [date, setDate] = useState<Date>();
    return (
      <DatePicker
        placeholder={'Выберите дату'}
        value={date}
        className='max-w-[300px]'
        onChange={setDate as SelectSingleEventHandler}
        mode='single'
      />
    );
  },
};

// Режим выбора нескольких дат
export const Multiple: Story = {
  render: () => {
    const [dates, setDates] = useState<Date[]>();
    return (
      <DatePicker
        className='max-w-[300px]'
        placeholder='Выберите даты'
        mode='multiple'
        value={dates}
        onChange={setDates}
      />
    );
  },
};

// Режим выбора диапазона дат
export const Range: Story = {
  render: () => {
    const [range, setRange] = useState<{ from?: Date; to?: Date }>();
    return (
      <DatePicker
        className='max-w-[300px]'
        placeholder='Выберите период'
        mode='range'
        value={range}
        onChange={setRange}
      />
    );
  },
};

// Состояние с ошибкой
export const WithError: Story = {
  args: {
    mode: 'single',
    error: 'Неверная дата',
    className: 'max-w-[300px]',
  },
};

// Режим только для чтения
export const ReadOnly: Story = {
  args: {
    mode: 'single',
    value: new Date(),
    readOnly: true,
    className: 'max-w-[300px]',
  },
};
