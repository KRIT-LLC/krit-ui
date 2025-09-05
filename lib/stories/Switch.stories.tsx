// Switch.stories.tsx
import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';

const meta: Meta<typeof Switch> = {
  title: 'Components/UI/Switch',
  component: Switch,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Переключатель (switch) для изменения состояния между включенным и выключенным. Основан на Radix UI Switch.',
      },
    },
  },
  argTypes: {
    checked: {
      control: 'boolean',
      description: 'Состояние переключателя (включен/выключен)',
    },
    disabled: {
      control: 'boolean',
      description: 'Отключение переключателя',
    },
    onCheckedChange: {
      action: 'checkedChange',
      description: 'Обработчик изменения состояния',
    },
    className: {
      control: 'text',
      description: 'Дополнительные CSS-классы',
    },
  },
} satisfies Meta<typeof Switch>;

export default meta;
type Story = StoryObj<typeof Switch>;

// Базовый переключатель
export const Default: Story = {
  args: {},
  parameters: {
    docs: {
      description: {
        story: 'Базовый переключатель в выключенном состоянии.',
      },
    },
  },
};

// Включенный переключатель
export const Checked: Story = {
  args: {
    checked: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Переключатель во включенном состоянии.',
      },
    },
  },
};

// Отключенный переключатель
export const Disabled: Story = {
  args: {
    disabled: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Отключенный переключатель (неактивный).',
      },
    },
  },
};

// Отключенный и включенный переключатель
export const DisabledChecked: Story = {
  args: {
    checked: true,
    disabled: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Отключенный переключатель во включенном состоянии.',
      },
    },
  },
};

// Пример использования с лейблом
export const WithLabel: Story = {
  render: args => (
    <div className='flex items-center space-x-2'>
      <Switch id='switch-mode' {...args} />
      <Label htmlFor='switch-mode'>Режим</Label>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Переключатель с текстовым лейблом.',
      },
    },
  },
};

// Пример группы переключателей
export const Group: Story = {
  render: () => (
    <div className='space-y-4'>
      <div className='flex items-center space-x-2'>
        <Switch id='switch-1' />
        <Label htmlFor='switch-1'>Опция 1</Label>
      </div>
      <div className='flex items-center space-x-2'>
        <Switch id='switch-2' />
        <Label htmlFor='switch-2'>Опция 2</Label>
      </div>
      <div className='flex items-center space-x-2'>
        <Switch id='switch-3' disabled />
        <Label htmlFor='switch-3' className='opacity-70'>
          Опция 3 (отключена)
        </Label>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Группа переключателей с различными состояниями.',
      },
    },
  },
};

// Пример с обработкой изменения состояния
export const WithState: Story = {
  render: function Render(args) {
    const [isChecked, setIsChecked] = React.useState(false);

    return (
      <div className='flex flex-col space-y-4'>
        <div className='flex items-center space-x-2'>
          <Switch checked={isChecked} onCheckedChange={setIsChecked} {...args} />
          <Label htmlFor='switch-state'>{isChecked ? 'Включено' : 'Выключено'}</Label>
        </div>
        <p className='text-sm text-muted-foreground'>
          Текущее состояние: {isChecked ? 'включено' : 'выключено'}
        </p>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Переключатель с управлением состоянием через React useState.',
      },
    },
  },
};

// Пример с кастомными стилями
export const WithCustomStyle: Story = {
  args: {
    className:
      'data-[state=checked]:bg-background-warning data-[state=unchecked]:bg-background-theme',
  },
  parameters: {
    docs: {
      description: {
        story: 'Переключатель с кастомными цветами для разных состояний.',
      },
    },
  },
};
