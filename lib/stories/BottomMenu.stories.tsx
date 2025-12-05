// BottomMenu.stories.tsx
import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { BottomMenu } from '@/components/ui/bottom-menu';
import { Button } from '@/components/ui/button';

const meta: Meta<typeof BottomMenu> = {
  title: 'Components/UI/BottomMenu',
  component: BottomMenu,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Универсальный компонент нижнего меню. Отображает фиксированное меню внизу экрана с текстом слева и кнопками действий справа. Используется для групповых операций над выбранными элементами.',
      },
    },
    layout: 'fullscreen',
  },
  argTypes: {
    label: {
      control: 'text',
      description: 'Текст, отображаемый слева',
    },
    open: {
      control: 'boolean',
      description: 'Отображать ли меню',
    },
    className: {
      control: 'text',
      description: 'Дополнительные CSS-классы',
    },
  },
} satisfies Meta<typeof BottomMenu>;

export default meta;
type Story = StoryObj<typeof BottomMenu>;

// Базовый пример
export const Default: Story = {
  args: {
    label: 'Выбраны заказы: 27',
    actions: (
      <>
        <Button variant='fade-contrast-filled' onClick={() => alert('Отправлено на утверждение')}>
          Отправить на утверждение
        </Button>
        <Button variant='fade-contrast-filled' onClick={() => alert('Утверждено')}>
          Утвердить
        </Button>
        <Button variant='fade-contrast-filled' onClick={() => alert('Выполнено')}>
          Выполнить
        </Button>
        <Button variant='fade-contrast-filled' onClick={() => alert('Работы приняты')}>
          Принять работы
        </Button>
      </>
    ),
  },
  parameters: {
    docs: {
      description: {
        story: 'Стандартное использование компонента с несколькими действиями.',
      },
    },
  },
};

// С одним действием
export const SingleAction: Story = {
  args: {
    label: 'Выбрано элементов: 5',
    actions: (
      <Button variant='fade-contrast-filled' onClick={() => alert('Удалено')}>
        Удалить
      </Button>
    ),
  },
  parameters: {
    docs: {
      description: {
        story: 'Меню с одним действием.',
      },
    },
  },
};

// С разными вариантами кнопок
export const WithDifferentVariants: Story = {
  args: {
    label: 'Выбраны заказы: 3',
    actions: (
      <>
        <Button variant='fade-contrast-filled' onClick={() => alert('Обычная кнопка')}>
          Обычная
        </Button>
        <Button variant='theme-filled' onClick={() => alert('Основная кнопка')}>
          Основная
        </Button>
        <Button variant='warning-filled' onClick={() => alert('Ошибка')}>
          Ошибка
        </Button>
        <Button variant='theme-filled' onClick={() => alert('Успех')}>
          Успех
        </Button>
      </>
    ),
  },
  parameters: {
    docs: {
      description: {
        story: 'Меню с кнопками разных вариантов стилизации.',
      },
    },
  },
};

// С отключенными кнопками
export const WithDisabledActions: Story = {
  args: {
    label: 'Выбраны заказы: 0',
    actions: (
      <>
        <Button variant='fade-contrast-filled' onClick={() => alert('Отправлено')} disabled>
          Отправить на утверждение
        </Button>
        <Button variant='fade-contrast-filled' onClick={() => alert('Утверждено')} disabled>
          Утвердить
        </Button>
        <Button variant='fade-contrast-filled' onClick={() => alert('Выполнено')}>
          Выполнить
        </Button>
      </>
    ),
  },
  parameters: {
    docs: {
      description: {
        story: 'Меню с отключенными действиями.',
      },
    },
  },
};

// Интерактивный пример с управлением состоянием
export const Interactive: Story = {
  render: () => {
    const [selectedCount, setSelectedCount] = useState(0);
    const [isOpen, setIsOpen] = useState(false);

    return (
      <div className='flex min-h-screen flex-col items-center justify-center gap-4 p-8'>
        <div className='flex flex-col gap-4'>
          <p className='text-lg'>
            Выбрано элементов: <strong>{selectedCount}</strong>
          </p>
          <div className='flex gap-2'>
            <Button onClick={() => setIsOpen(!isOpen)} variant='fade-contrast-outlined'>
              {isOpen ? 'Скрыть меню' : 'Показать меню'}
            </Button>
            <Button
              onClick={() => setSelectedCount(prev => prev + 5)}
              variant='fade-contrast-outlined'
            >
              Выбрать 5 элементов
            </Button>
          </div>
        </div>
        <BottomMenu
          label={`Выбраны заказы: ${selectedCount}`}
          actions={
            <>
              <Button
                variant='fade-contrast-filled'
                onClick={() => setSelectedCount(prev => prev + 1)}
              >
                Увеличить
              </Button>
              <Button
                variant='fade-contrast-filled'
                onClick={() => setSelectedCount(prev => Math.max(0, prev - 1))}
                disabled={selectedCount === 0}
              >
                Уменьшить
              </Button>
              <Button
                variant='fade-contrast-filled'
                onClick={() => setSelectedCount(0)}
                disabled={selectedCount === 0}
              >
                Сбросить
              </Button>
            </>
          }
          open={isOpen && selectedCount > 0}
        />
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          'Интерактивный пример с управлением состоянием выбранных элементов и видимостью меню.',
      },
    },
  },
};

// Длинный текст
export const WithLongLabel: Story = {
  args: {
    label: 'Выбраны заказы: 1234567890 (очень длинный текст для проверки адаптивности)',
    actions: (
      <>
        <Button variant='fade-contrast-filled' onClick={() => alert('Действие 1')}>
          Действие 1
        </Button>
        <Button variant='fade-contrast-filled' onClick={() => alert('Действие 2')}>
          Действие 2
        </Button>
      </>
    ),
  },
  parameters: {
    docs: {
      description: {
        story: 'Меню с длинным текстом, демонстрирующее адаптивность компонента.',
      },
    },
  },
};

// Много действий
export const ManyActions: Story = {
  args: {
    label: 'Выбраны заказы: 15',
    actions: (
      <>
        <Button variant='fade-contrast-filled' onClick={() => alert('Действие 1')}>
          Действие 1
        </Button>
        <Button variant='fade-contrast-filled' onClick={() => alert('Действие 2')}>
          Действие 2
        </Button>
        <Button variant='fade-contrast-filled' onClick={() => alert('Действие 3')}>
          Действие 3
        </Button>
        <Button variant='fade-contrast-filled' onClick={() => alert('Действие 4')}>
          Действие 4
        </Button>
        <Button variant='fade-contrast-filled' onClick={() => alert('Действие 5')}>
          Действие 5
        </Button>
        <Button variant='fade-contrast-filled' onClick={() => alert('Действие 6')}>
          Действие 6
        </Button>
      </>
    ),
  },
  parameters: {
    docs: {
      description: {
        story: 'Меню с большим количеством действий.',
      },
    },
  },
};

// Пример с кастомными элементами
export const WithCustomElements: Story = {
  args: {
    label: 'Выбраны заказы: 10',
    actions: (
      <>
        <Button variant='fade-contrast-filled' onClick={() => alert('Действие 1')}>
          Действие 1
        </Button>
        <div className='h-9 w-px bg-line-primary' />
        <Button variant='fade-contrast-filled' onClick={() => alert('Действие 2')}>
          Действие 2
        </Button>
      </>
    ),
  },
  parameters: {
    docs: {
      description: {
        story: 'Меню с кастомными элементами (например, разделитель).',
      },
    },
  },
};
