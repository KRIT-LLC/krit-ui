// Input.stories.tsx
import { useState } from 'react';
import { action } from '@storybook/addon-actions';
import type { Meta, StoryObj } from '@storybook/react';
import { Input } from '@/components/ui/input';

// Импортируем иконки для демонстрации
const InfoIcon = () => <span>ℹ️</span>;
const CheckIcon = () => <span>✅</span>;

const meta: Meta<typeof Input> = {
  title: 'Components/UI/Input',
  component: Input,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Универсальный компонент поля ввода с поддержкой различных состояний, иконок и валидации.',
      },
    },
  },
  argTypes: {
    type: {
      control: 'select',
      options: ['text', 'password', 'email', 'number', 'tel'],
      description: 'Тип поля ввода',
    },
    placeholder: {
      control: 'text',
      description: 'Текст placeholder',
    },
    error: {
      control: 'text',
      description: 'Сообщение об ошибке или флаг ошибки',
    },
    disabled: {
      control: 'boolean',
      description: 'Неактивное состояние поля',
    },
    readOnly: {
      control: 'boolean',
      description: 'Режим только для чтения',
    },
    asSearch: {
      control: 'boolean',
      description: 'Режим поискового поля',
    },
    withCount: {
      control: 'boolean',
      description: 'Отображение счетчика символов',
    },
    value: {
      control: 'text',
      description: 'Значение поля',
    },
    onEnter: {
      action: 'enterPressed',
      description: 'Callback при нажатии Enter',
    },
    onChange: {
      action: 'valueChanged',
      description: 'Callback при изменении значения',
    },
  },
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof Input>;

// Базовая история
export const Default: Story = {
  args: {
    placeholder: 'Введите текст',
  },
  parameters: {
    docs: {
      description: {
        story: 'Базовое поле ввода с плейсхолдером.',
      },
    },
  },
};

// Поле с ошибкой
export const WithError: Story = {
  args: {
    placeholder: 'Введите текст',
    error: 'Обязательное поле',
  },
  parameters: {
    docs: {
      description: {
        story: 'Поле ввода с сообщением об ошибке.',
      },
    },
  },
};

// Поисковое поле
export const Search: Story = {
  args: {
    asSearch: true,
    placeholder: 'Поиск...',
  },
  parameters: {
    docs: {
      description: {
        story: 'Поле ввода в режиме поиска с иконкой поиска.',
      },
    },
  },
};

// Поле с правой иконкой
export const WithRightIcon: Story = {
  args: {
    placeholder: 'С иконкой',
    rightIcon: <InfoIcon />,
  },
  parameters: {
    docs: {
      description: {
        story: 'Поле ввода с иконкой справа.',
      },
    },
  },
};

// Поле со счетчиком символов
export const WithCharacterCount: Story = {
  args: {
    placeholder: 'Введите текст',
    withCount: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Поле ввода со счетчиком введенных символов.',
      },
    },
  },
};

// Поле пароля
export const Password: Story = {
  args: {
    type: 'password',
    placeholder: 'Введите пароль',
  },
  parameters: {
    docs: {
      description: {
        story: 'Поле ввода пароля с возможностью показа/скрытия.',
      },
    },
  },
};

// Неактивное поле
export const Disabled: Story = {
  args: {
    placeholder: 'Неактивное поле',
    disabled: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Неактивное поле ввода.',
      },
    },
  },
};

// Поле только для чтения
export const ReadOnly: Story = {
  args: {
    value: 'Только для чтения',
    readOnly: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Поле ввода в режиме только для чтения.',
      },
    },
  },
};

// Обработка нажатия Enter
export const WithEnterHandler: Story = {
  args: {
    placeholder: 'Нажмите Enter',
    onEnter: action('enterPressed'),
  },
  parameters: {
    docs: {
      description: {
        story: 'Поле ввода с обработкой нажатия клавиши Enter.',
      },
    },
  },
};

// Комбинированный пример
export const CombinedExample: Story = {
  render: () => {
    const [value, setValue] = useState('');

    return (
      <div className='flex flex-col gap-4 max-w-md'>
        <Input placeholder='Обычное поле' value={value} onChange={e => setValue(e.target.value)} />
        <Input
          asSearch
          placeholder='Поиск'
          value={value}
          onChange={e => setValue(e.target.value)}
        />
        <Input
          type='password'
          placeholder='Пароль'
          value={value}
          onChange={e => setValue(e.target.value)}
        />
        <Input
          placeholder='С иконкой и счетчиком'
          rightIcon={<CheckIcon />}
          withCount
          value={value}
          onChange={e => setValue(e.target.value)}
        />
        <Input
          placeholder='С ошибкой'
          error='Некорректное значение'
          value={value}
          onChange={e => setValue(e.target.value)}
        />
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Комбинированный пример различных вариантов использования полей ввода.',
      },
    },
  },
};

// Управляемый компонент
export const Controlled: Story = {
  render: () => {
    const [value, setValue] = useState('');

    return (
      <div className='flex flex-col gap-2 max-w-md'>
        <Input
          placeholder='Управляемое поле'
          value={value}
          onChange={e => setValue(e.target.value)}
          withCount
        />
        <div className='text-sm text-muted-foreground'>
          Введенное значение: {value || '(пусто)'}
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Пример управляемого компонента с внешним состоянием.',
      },
    },
  },
};
