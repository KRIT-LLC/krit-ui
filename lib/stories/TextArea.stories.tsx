import type { Meta, StoryObj } from '@storybook/react';
import { TextArea } from '@/components/ui/text-area';

const meta: Meta<typeof TextArea> = {
  title: 'Components/UI/TextArea',
  component: TextArea,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Компонент текстовой области с расширенной функциональностью, включая подсчет символов, обработку нажатия Enter и отображение ошибок.',
      },
    },
  },
  argTypes: {
    placeholder: {
      control: 'text',
      description: 'Текст-подсказка',
    },
    rows: {
      control: 'number',
      description: 'Количество видимых строк текста',
    },
    disabled: {
      control: 'boolean',
      description: 'Отключение поля ввода',
    },
    error: {
      control: 'text',
      description: 'Сообщение об ошибке или флаг ошибки',
    },
    maxLength: {
      control: 'number',
      description: 'Максимальное количество символов',
    },
    value: {
      control: 'text',
      description: 'Значение текстовой области',
    },
    className: {
      control: 'text',
      description: 'Дополнительные CSS-классы',
    },
    onEnter: {
      action: 'onEnter',
      description: 'Callback при нажатии Enter',
    },
    onChange: {
      action: 'onChange',
      description: 'Callback при изменении значения',
    },
  },
} satisfies Meta<typeof TextArea>;

export default meta;
type Story = StoryObj<typeof TextArea>;

// Базовая текстовая область
export const Default: Story = {
  args: {
    placeholder: 'Введите текст...',
    rows: 4,
  },
  parameters: {
    docs: {
      description: {
        story: 'Базовая текстовая область с стандартными настройками.',
      },
    },
  },
};

// С ограничением длины
export const WithMaxLength: Story = {
  args: {
    placeholder: 'Введите текст (максимум 100 символов)...',
    rows: 4,
    maxLength: 100,
  },
  parameters: {
    docs: {
      description: {
        story: 'Текстовая область с ограничением максимального количества символов и счетчиком.',
      },
    },
  },
};

// С ошибкой
export const WithError: Story = {
  args: {
    placeholder: 'Введите текст...',
    rows: 4,
    error: 'Это поле обязательно для заполнения',
  },
  parameters: {
    docs: {
      description: {
        story: 'Текстовая область с сообщением об ошибке.',
      },
    },
  },
};

// Отключенное состояние
export const Disabled: Story = {
  args: {
    placeholder: 'Отключенное поле...',
    rows: 4,
    disabled: true,
    value: 'Этот текст нельзя изменить',
  },
  parameters: {
    docs: {
      description: {
        story: 'Отключенная текстовая область.',
      },
    },
  },
};

// С обработкой Enter
export const WithEnterHandler: Story = {
  args: {
    placeholder: 'Нажмите Enter для отправки...',
    rows: 3,
  },
  parameters: {
    docs: {
      description: {
        story: 'Текстовая область, которая обрабатывает нажатие клавиши Enter.',
      },
    },
  },
};

// С предзаполненным значением
export const WithValue: Story = {
  args: {
    placeholder: 'Введите текст...',
    rows: 4,
    value: 'Предзаполненный текст для демонстрации работы компонента',
  },
  parameters: {
    docs: {
      description: {
        story: 'Текстовая область с предустановленным значением.',
      },
    },
  },
};

// Различные размеры
export const DifferentSizes: Story = {
  render: () => (
    <div className='flex flex-col gap-4 max-w-md'>
      <div>
        <label className='block text-sm font-medium mb-2'>Короткий текст (2 строки)</label>
        <TextArea rows={2} placeholder='Введите короткий текст...' />
      </div>
      <div>
        <label className='block text-sm font-medium mb-2'>Средний текст (4 строки)</label>
        <TextArea rows={4} placeholder='Введите текст средней длины...' />
      </div>
      <div>
        <label className='block text-sm font-medium mb-2'>Длинный текст (8 строк)</label>
        <TextArea rows={8} placeholder='Введите длинный текст...' />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Примеры текстовых областей разного размера.',
      },
    },
  },
};
