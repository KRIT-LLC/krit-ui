// Label.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const meta: Meta<typeof Label> = {
  title: 'Components/UI/Label',
  component: Label,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Компонент метки для полей ввода с поддержкой обозначения обязательных полей. Основан на Radix UI Label.',
      },
    },
  },
  argTypes: {
    children: {
      control: 'text',
      description: 'Текст метки',
    },
    required: {
      control: 'boolean',
      description: 'Обязательное поле (добавляет звездочку)',
    },
    htmlFor: {
      control: 'text',
      description: 'ID элемента, с которым связана метка',
    },
    className: {
      control: 'text',
      description: 'Дополнительные CSS-классы',
    },
  },
} satisfies Meta<typeof Label>;

export default meta;
type Story = StoryObj<typeof Label>;

// Базовая метка
export const Default: Story = {
  args: {
    children: 'Обычная метка',
    htmlFor: 'input-field',
  },
  parameters: {
    docs: {
      description: {
        story: 'Базовая метка без указания обязательности поля.',
      },
    },
  },
};

// Обязательная метка
export const Required: Story = {
  args: {
    children: 'Обязательное поле',
    required: true,
    htmlFor: 'required-field',
  },
  parameters: {
    docs: {
      description: {
        story: 'Метка для обязательного поля с красной звездочкой.',
      },
    },
  },
};

// Метка с кастомным стилем
export const WithCustomStyle: Story = {
  args: {
    children: 'Метка с кастомным стилем',
    className: 'text-blue-500 font-bold',
    htmlFor: 'custom-field',
  },
  parameters: {
    docs: {
      description: {
        story: 'Метка с дополнительными пользовательскими стилями.',
      },
    },
  },
};

// Пример использования с полем ввода
export const WithInput: Story = {
  render: () => (
    <div className='flex flex-col gap-2 max-w-md'>
      <Label htmlFor='email'>Email адрес</Label>
      <Input id='email' type='email' placeholder='Введите ваш email' />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Пример использования метки вместе с полем ввода.',
      },
    },
  },
};

// Пример с обязательным полем
export const WithRequiredInput: Story = {
  render: () => (
    <div className='flex flex-col gap-2 max-w-md'>
      <Label required htmlFor='password'>
        Пароль
      </Label>
      <Input id='password' type='password' placeholder='Введите пароль' />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Пример использования метки для обязательного поля вместе с полем ввода.',
      },
    },
  },
};

// Группа меток
export const Group: Story = {
  render: () => (
    <div className='flex flex-col gap-4 max-w-md'>
      <div className='flex flex-col gap-2'>
        <Label htmlFor='name'>Имя</Label>
        <Input id='name' placeholder='Введите ваше имя' />
      </div>
      <div className='flex flex-col gap-2'>
        <Label required htmlFor='email'>
          Email
        </Label>
        <Input id='email' type='email' placeholder='Введите ваш email' />
      </div>
      <div className='flex flex-col gap-2'>
        <Label htmlFor='phone'>Телефон (необязательно)</Label>
        <Input id='phone' type='tel' placeholder='Введите ваш телефон' />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Группа меток с полями ввода, демонстрирующая различные варианты использования.',
      },
    },
  },
};

// Метка с неактивным полем
export const WithDisabledInput: Story = {
  render: () => (
    <div className='flex flex-col gap-2 max-w-md'>
      <Label htmlFor='disabled-field'>Неактивное поле</Label>
      <Input id='disabled-field' placeholder='Неактивное поле' disabled />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Метка, связанная с неактивным полем ввода.',
      },
    },
  },
};
