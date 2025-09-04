import type { Meta, StoryObj } from '@storybook/react';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

const meta: Meta<typeof RadioGroup> = {
  title: 'Components/UI/RadioGroup',
  component: RadioGroup,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Группа радиокнопок для выбора одной опции из нескольких. Основан на Radix UI RadioGroup.',
      },
    },
  },
  argTypes: {
    defaultValue: {
      control: 'text',
      description: 'Значение выбранной по умолчанию опции',
    },
    value: {
      control: 'text',
      description: 'Управляемое значение выбранной опции',
    },
    onValueChange: {
      action: 'valueChanged',
      description: 'Обработчик изменения выбранной опции',
    },
    disabled: {
      control: 'boolean',
      description: 'Отключение всей группы',
    },
    required: {
      control: 'boolean',
      description: 'Обязательность выбора',
    },
    name: {
      control: 'text',
      description: 'Имя группы (для форм)',
    },
    orientation: {
      control: 'select',
      options: ['horizontal', 'vertical'],
      description: 'Ориентация группы',
    },
    className: {
      control: 'text',
      description: 'Дополнительные CSS-классы',
    },
  },
} satisfies Meta<typeof RadioGroup>;

export default meta;
type Story = StoryObj<typeof RadioGroup>;

// Базовая группа радиокнопок
export const Default: Story = {
  render: args => (
    <RadioGroup {...args}>
      <div className='flex items-center space-x-2'>
        <RadioGroupItem value='option1' id='option1' />
        <Label htmlFor='option1'>Option 1</Label>
      </div>
      <div className='flex items-center space-x-2'>
        <RadioGroupItem value='option2' id='option2' />
        <Label htmlFor='option2'>Option 2</Label>
      </div>
      <div className='flex items-center space-x-2'>
        <RadioGroupItem value='option3' id='option3' />
        <Label htmlFor='option3'>Option 3</Label>
      </div>
    </RadioGroup>
  ),
  args: {
    defaultValue: 'option1',
  },
};

// Горизонтальная группа
export const Horizontal: Story = {
  render: args => (
    <RadioGroup {...args} className='flex space-x-4'>
      <div className='flex items-center space-x-2'>
        <RadioGroupItem value='option1' id='option1-h' />
        <Label htmlFor='option1-h'>Option 1</Label>
      </div>
      <div className='flex items-center space-x-2'>
        <RadioGroupItem value='option2' id='option2-h' />
        <Label htmlFor='option2-h'>Option 2</Label>
      </div>
      <div className='flex items-center space-x-2'>
        <RadioGroupItem value='option3' id='option3-h' />
        <Label htmlFor='option3-h'>Option 3</Label>
      </div>
    </RadioGroup>
  ),
  args: {
    orientation: 'horizontal',
  },
};

// Отключенная опция
export const DisabledOption: Story = {
  render: args => (
    <RadioGroup {...args}>
      <div className='flex items-center space-x-2'>
        <RadioGroupItem value='option1' id='option1-d' />
        <Label htmlFor='option1-d'>Option 1</Label>
      </div>
      <div className='flex items-center space-x-2'>
        <RadioGroupItem value='option2' id='option2-d' disabled />
        <Label htmlFor='option2-d'>Option 2 (disabled)</Label>
      </div>
      <div className='flex items-center space-x-2'>
        <RadioGroupItem value='option3' id='option3-d' />
        <Label htmlFor='option3-d'>Option 3</Label>
      </div>
    </RadioGroup>
  ),
};

// Отключенная группа
export const DisabledGroup: Story = {
  render: args => (
    <RadioGroup {...args}>
      <div className='flex items-center space-x-2'>
        <RadioGroupItem value='option1' id='option1-dg' />
        <Label htmlFor='option1-dg'>Option 1</Label>
      </div>
      <div className='flex items-center space-x-2'>
        <RadioGroupItem value='option2' id='option2-dg' />
        <Label htmlFor='option2-dg'>Option 2</Label>
      </div>
      <div className='flex items-center space-x-2'>
        <RadioGroupItem value='option3' id='option3-dg' />
        <Label htmlFor='option3-dg'>Option 3</Label>
      </div>
    </RadioGroup>
  ),
  args: {
    disabled: true,
  },
};
