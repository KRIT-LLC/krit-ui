import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '@/components/ui/button';
import { Select } from '@/components/ui/select';

const meta: Meta<typeof Select> = {
  title: 'Components/UI/Select',
  component: Select,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Расширенный компонент выбора (select) с поддержкой виртуализации, загрузки, ошибок и кастомного рендеринга. Основан на Radix UI Select.',
      },
    },
  },
  argTypes: {
    placeholder: {
      control: 'text',
      description: 'Текст-заполнитель при отсутствии выбора',
    },
    options: {
      control: 'object',
      description: 'Массив опций для выбора',
    },
    clearable: {
      control: 'boolean',
      description: 'Возможность очистки выбора',
    },
    borderless: {
      control: 'boolean',
      description: 'Стиль без границ',
    },
    isLoading: {
      control: 'boolean',
      description: 'Флаг загрузки данных',
    },
    isError: {
      control: 'boolean',
      description: 'Флаг ошибки загрузки',
    },
    error: {
      control: 'text',
      description: 'Сообщение об ошибке',
    },
    readOnly: {
      control: 'boolean',
      description: 'Режим только для чтения',
    },
    disabled: {
      control: 'boolean',
      description: 'Отключение компонента',
    },
    onRefetch: {
      action: 'refetch',
      description: 'Обработчик повторной загрузки данных',
    },
    onChange: {
      action: 'change',
      description: 'Обработчик изменения значения',
    },
    onClick: {
      action: 'click',
      description: 'Обработчик клика по триггеру',
    },
  },
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof Select>;

// Базовый пример
export const Default: Story = {
  args: {
    placeholder: 'Выберите опцию',
    options: [
      { value: 'option1', label: 'Опция 1' },
      { value: 'option2', label: 'Опция 2' },
      { value: 'option3', label: 'Опция 3' },
    ],
  },
};

// Без границ
export const Borderless: Story = {
  args: {
    placeholder: 'Выберите опцию',
    borderless: true,
    options: [
      { value: 'option1', label: 'Опция 1' },
      { value: 'option2', label: 'Опция 2' },
      { value: 'option3', label: 'Опция 3' },
    ],
  },
};

// В состоянии загрузки
export const Loading: Story = {
  args: {
    placeholder: 'Выберите опцию',
    isLoading: true,
    options: [],
  },
};

// С ошибкой
export const Error: Story = {
  args: {
    placeholder: 'Выберите опцию',
    isError: true,
    options: [],
  },
};

// Только для чтения
export const ReadOnly: Story = {
  args: {
    placeholder: 'Выберите опцию',
    readOnly: true,
    value: 'option1',
    options: [
      { value: 'option1', label: 'Опция 1' },
      { value: 'option2', label: 'Опция 2' },
      { value: 'option3', label: 'Опция 3' },
    ],
  },
};

// Отключенный
export const Disabled: Story = {
  args: {
    placeholder: 'Выберите опцию',
    disabled: true,
    options: [
      { value: 'option1', label: 'Опция 1' },
      { value: 'option2', label: 'Опция 2' },
      { value: 'option3', label: 'Опция 3' },
    ],
  },
};

// С кастомным рендерингом
export const CustomRender: Story = {
  args: {
    placeholder: 'Выберите пользователя',
    options: [
      { value: 'user1', label: 'Иван Петров' },
      { value: 'user2', label: 'Мария Сидорова' },
      { value: 'user3', label: 'Алексей Иванов' },
    ],
    renderValue: option => (
      <div className='flex items-center'>
        <div className='w-6 h-6 rounded-full bg-blue-500 mr-2 flex items-center justify-center text-white text-xs'>
          {option.label.charAt(0)}
        </div>
        {option.label}
      </div>
    ),
    renderOption: option => (
      <div className='flex items-center'>
        <div className='w-8 h-8 rounded-full bg-blue-500 mr-3 flex items-center justify-center text-white'>
          {option.label.charAt(0)}
        </div>
        <div>
          <div className='font-medium'>{option.label}</div>
          <div className='text-xs text-muted-foreground'>{option.value}@example.com</div>
        </div>
      </div>
    ),
  },
};

// С большим количеством опций (виртуализация)
export const WithManyOptions: Story = {
  args: {
    placeholder: 'Выберите число',
    options: Array.from({ length: 1000 }, (_, i) => ({
      value: `option${i + 1}`,
      label: `Опция ${i + 1}`,
    })),
  },
};

// Интерактивный пример с обновлением опций
export const Interactive: Story = {
  render: function Render() {
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [options, setOptions] = useState([
      { value: 'option1', label: 'Опция 1' },
      { value: 'option2', label: 'Опция 2' },
    ]);

    const handleRefetch = () => {
      setIsLoading(true);
      setIsError(false);

      // Имитация загрузки данных
      setTimeout(() => {
        setIsLoading(false);
        setOptions([
          { value: 'option1', label: 'Обновленная опция 1' },
          { value: 'option2', label: 'Обновленная опция 2' },
          { value: 'option3', label: 'Новая опция 3' },
        ]);
      }, 1500);
    };

    const simulateError = () => {
      setIsLoading(true);
      setIsError(false);

      // Имитация ошибки
      setTimeout(() => {
        setIsLoading(false);
        setIsError(true);
      }, 1500);
    };

    return (
      <div className='space-y-4'>
        <Select
          placeholder='Выберите опцию'
          options={options}
          isLoading={isLoading}
          isError={isError}
          onRefetch={handleRefetch}
        />
        <div className='flex space-x-2'>
          <Button onClick={handleRefetch}>Обновить опции</Button>
          <Button variant='fade-contrast-outlined' onClick={simulateError}>
            Имитировать ошибку
          </Button>
        </div>
      </div>
    );
  },
};
