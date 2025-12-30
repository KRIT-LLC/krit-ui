import { useState } from 'react';
import { SelectRangeEventHandler, SelectSingleEventHandler } from 'react-day-picker';
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

// С кнопкой сброса
export const WithReset: Story = {
  render: () => {
    const [date, setDate] = useState<Date>();
    return (
      <DatePicker
        placeholder='Выберите дату'
        value={date}
        className='max-w-[300px]'
        onChange={setDate as SelectSingleEventHandler}
        mode='single'
        showReset
      />
    );
  },
};

// С внутренней меткой
export const WithInnerLabel: Story = {
  render: () => {
    const [date, setDate] = useState<Date>(new Date());
    return (
      <DatePicker
        innerLabel='Дата начала'
        value={date}
        className='max-w-[300px]'
        onChange={setDate as SelectSingleEventHandler}
        mode='single'
        showReset
      />
    );
  },
};

// Диапазон с меткой и сбросом
export const RangeWithLabel: Story = {
  render: () => {
    const [range, setRange] = useState<{ from?: Date; to?: Date }>({
      from: new Date(),
      to: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    });
    return (
      <DatePicker
        innerLabel='Период'
        mode='range'
        value={range}
        onChange={setRange as unknown as SelectRangeEventHandler}
        className='max-w-[400px]'
        showReset
      />
    );
  },
};

// Демонстрация ручного ввода
export const ManualInput: Story = {
  render: () => {
    const [date, setDate] = useState<Date>();
    return (
      <div className='space-y-4'>
        <div>
          <h3 className='text-sm font-medium mb-2'>Одна дата (формат: дд.мм.гггг)</h3>
          <DatePicker
            placeholder='Введите или выберите дату'
            value={date}
            className='max-w-[300px]'
            onChange={setDate as SelectSingleEventHandler}
            mode='single'
            showReset
          />
        </div>
        <div className='text-xs text-gray-600'>
          Попробуйте ввести дату вручную, например: 12122025
        </div>
      </div>
    );
  },
};

// Демонстрация ручного ввода диапазона
export const ManualInputRange: Story = {
  render: () => {
    const [range, setRange] = useState<{ from?: Date; to?: Date }>();
    return (
      <div className='space-y-4'>
        <div>
          <h3 className='text-sm font-medium mb-2'>
            Диапазон дат (формат: дд.мм.гггг — дд.мм.гггг)
          </h3>
          <DatePicker
            placeholder='Введите или выберите период'
            mode='range'
            value={range}
            onChange={setRange as unknown as SelectRangeEventHandler}
            className='max-w-[400px]'
            showReset
          />
        </div>
        <div className='text-xs text-gray-600'>
          Попробуйте ввести диапазон вручную, например: 12122025 — 15122025
        </div>
      </div>
    );
  },
};

// Разница между placeholder и innerLabel
export const PlaceholderVsInnerLabel: Story = {
  render: () => {
    const [date1, setDate1] = useState<Date>();
    const [date2, setDate2] = useState<Date>(new Date());
    const [date3, setDate3] = useState<Date>(new Date());
    return (
      <div className='space-y-6'>
        <div>
          <h3 className='text-sm font-medium mb-2'>Только placeholder (пропадает при фокусе)</h3>
          <DatePicker
            placeholder='Выберите дату'
            value={date1}
            className='max-w-[300px]'
            onChange={setDate1 as SelectSingleEventHandler}
            mode='single'
          />
          <div className='text-xs text-gray-600 mt-1'>
            Placeholder виден только когда инпут пустой и не в фокусе
          </div>
        </div>
        <div>
          <h3 className='text-sm font-medium mb-2'>
            Только innerLabel (показывается перед значением с двоеточием)
          </h3>
          <DatePicker
            innerLabel='Дата'
            value={date2}
            className='max-w-[300px]'
            onChange={setDate2 as SelectSingleEventHandler}
            mode='single'
            showReset
          />
          <div className='text-xs text-gray-600 mt-1'>
            InnerLabel виден перед значением. Место под маску зарезервировано, но маска скрыта до
            фокуса.
          </div>
        </div>
        <div>
          <h3 className='text-sm font-medium mb-2'>Placeholder + innerLabel вместе</h3>
          <DatePicker
            placeholder='Введите дату'
            innerLabel='Дата начала'
            value={date3}
            className='max-w-[300px]'
            onChange={setDate3 as SelectSingleEventHandler}
            mode='single'
            showReset
          />
          <div className='text-xs text-gray-600 mt-1'>
            InnerLabel имеет приоритет: метка показывается перед значением, placeholder игнорируется
            (резервируется место под маску).
          </div>
        </div>
      </div>
    );
  },
};

// Примеры с innerLabel для разных режимов
export const MultipleWithInnerLabel: Story = {
  render: () => {
    const [dates, setDates] = useState<Date[]>();
    return (
      <DatePicker
        className='max-w-[300px]'
        innerLabel='Даты'
        mode='multiple'
        value={dates}
        onChange={setDates}
        showReset
      />
    );
  },
};

// Диапазон с innerLabel (пустой)
export const RangeWithInnerLabelEmpty: Story = {
  render: () => {
    const [range, setRange] = useState<{ from?: Date; to?: Date }>();
    return (
      <DatePicker
        innerLabel='Период выполнения'
        mode='range'
        value={range}
        onChange={setRange as unknown as SelectRangeEventHandler}
        className='max-w-[400px]'
        showReset
      />
    );
  },
};
