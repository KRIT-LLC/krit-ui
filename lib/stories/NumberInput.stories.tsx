import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { NumberInput } from '@/components/ui/number-input';

const meta: Meta<typeof NumberInput> = {
  title: 'Components/UI/NumberInput',
  component: NumberInput,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Поле ввода числовых значений со строгой валидацией, поддержкой десятичных знаков и отрицательных чисел.',
      },
    },
  },
  argTypes: {
    value: { control: 'number', description: 'Текущее значение поля' },
    placeholder: { control: 'text', description: 'Текст-подсказка' },
    decimalPlaces: {
      control: { type: 'number', min: 0, max: 6, step: 1 },
      description: 'Количество знаков после десятичной точки',
    },
    allowNegative: {
      control: 'boolean',
      description: 'Разрешить ввод отрицательных значений',
    },
    required: { control: 'boolean', description: 'Показывать индикатор обязательности' },
    className: { control: 'text', description: 'Дополнительные CSS‑классы' },
    icon: { control: false, description: 'Иконка справа (ReactNode)' },
    onChange: { action: 'change', description: 'Колбэк изменения значения' },
    onValueChange: { action: 'valueChange', description: 'Алиас onChange' },
    onEnter: { action: 'enter', description: 'Колбэк по нажатию Enter' },
  },
} satisfies Meta<typeof NumberInput>;

export default meta;
type Story = StoryObj<typeof NumberInput>;

export const Integer: Story = {
  args: {
    decimalPlaces: 0,
    placeholder: 'Введите целое число',
  },
};

export const Decimal2: Story = {
  args: {
    decimalPlaces: 2,
    placeholder: '0.00',
  },
};

export const WithNegative: Story = {
  args: {
    allowNegative: true,
    decimalPlaces: 0,
    placeholder: 'Можно отрицательные',
  },
};

export const Disabled: Story = {
  args: {
    value: 10,
    disabled: true,
    decimalPlaces: 0,
  },
};

export const Interactive: Story = {
  render: function Render() {
    const [value, setValue] = useState<number | null>(10);
    return (
      <div className="space-y-3">
        <NumberInput value={value ?? undefined} onChange={setValue} decimalPlaces={2} placeholder="0.00" />
        <div className="text-sm text-muted-foreground">Текущее значение: {String(value)}</div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Интерактивный пример с управлением состоянием во внешнем компоненте.',
      },
    },
  },
};


