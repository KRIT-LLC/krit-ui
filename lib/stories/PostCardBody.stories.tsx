import { action } from '@storybook/addon-actions';
import type { Meta, StoryObj } from '@storybook/react';
import { Badge } from '@/components/ui/badge';
import { PostCardBody } from '@/components/ui/post-card';

const meta: Meta<typeof PostCardBody> = {
  title: 'Components/UI/PostCard/PostCardBody',
  component: PostCardBody,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Компонент тела карточки поста для отображения структурированной информации в формате ключ-значение. Поддерживает группировку полей в секции с разделителями.',
      },
    },
  },
  argTypes: {
    sections: {
      control: 'object',
      description: 'Массив секций с полями',
    },
    className: {
      control: 'text',
      description: 'Дополнительные CSS-классы для корневого элемента',
    },
  },
} satisfies Meta<typeof PostCardBody>;

export default meta;
type Story = StoryObj<typeof PostCardBody>;

// Базовый пример
export const Default: Story = {
  args: {
    sections: [
      {
        fields: [
          { label: 'Статус', value: <Badge variant='success'>Выполнен</Badge> },
          { label: 'Приоритет', value: 'Неотложный' },
          { label: 'Название', value: 'Ремонт конвейерной ленты' },
          { label: 'Вид заказа', value: 'РМ01—Плановый заказ ТОРО' },
          { label: 'Вид работ', value: '100—Осмотр' },
        ],
      },
      {
        fields: [
          { label: 'Дата создания', value: '01.11.2025 10:00' },
          { label: 'Завод', value: 'ТехМеталлСтрой' },
          { label: 'Участок', value: 'Цех по прокатке металла' },
        ],
      },
      {
        fields: [
          {
            label: 'Техническое место',
            value: (
              <a href='#' className='text-foreground-theme hover:underline'>
                GR-FIX-001-02-006—Печь для плавки металла
              </a>
            ),
          },
          {
            label: 'Оборудование',
            value: (
              <a href='#' className='text-foreground-theme hover:underline'>
                123281811—ГПА-32 "ЛАДОГА"
              </a>
            ),
          },
        ],
      },
      {
        fields: [
          {
            label: 'Описание',
            value:
              'Необходима замена комплектующих для восстановления работоспособности оборудования. Требуется провести диагностику и заменить изношенные детали.',
          },
        ],
      },
    ],
  },
  parameters: {
    docs: {
      description: {
        story: 'Базовый пример использования компонента с несколькими секциями и различными типами значений.',
      },
    },
  },
};

// С бейджами и статусами
export const WithBadges: Story = {
  args: {
    sections: [
      {
        fields: [
          { label: 'Статус', value: <Badge variant='success'>Выполнен</Badge> },
          { label: 'Приоритет', value: <Badge variant='destructive'>Неотложный</Badge> },
          { label: 'Категория', value: 'Падение с высоты' },
          { label: 'Вероятность', value: 'Вероятная' },
        ],
      },
      {
        fields: [
          { label: 'ID', value: <Badge variant='theme'>KRIT ID</Badge> },
          { label: 'Статус', value: <Badge variant='success-fade'>Активен</Badge> },
        ],
      },
    ],
  },
  parameters: {
    docs: {
      description: {
        story: 'Пример с различными типами бейджей для статусов и идентификаторов.',
      },
    },
  },
};

// Одна секция
export const SingleSection: Story = {
  args: {
    sections: [
      {
        fields: [
          { label: 'Название', value: 'Блок очистки конденсата OSQ для QA99' },
          { label: 'Изготовитель', value: 'Mobil' },
          { label: 'Модель', value: '1-5W-30' },
          { label: 'Единица измерения', value: 'шт' },
        ],
      },
    ],
  },
  parameters: {
    docs: {
      description: {
        story: 'Пример с одной секцией полей.',
      },
    },
  },
};

// Длинный текст
export const LongText: Story = {
  args: {
    sections: [
      {
        fields: [
          {
            label: 'Описание',
            value:
              'Очень длинное описание, которое может занимать несколько строк и переноситься на новую строку при необходимости. Это позволяет отображать подробную информацию о карточке поста, включая все необходимые детали и контекст.',
          },
        ],
      },
    ],
  },
  parameters: {
    docs: {
      description: {
        story: 'Пример с длинным текстом, который будет переноситься на несколько строк.',
      },
    },
  },
};

// С ссылками
export const WithLinks: Story = {
  args: {
    sections: [
      {
        fields: [
          {
            label: 'Техническое место',
            value: (
              <a href='#' className='text-foreground-theme hover:underline' onClick={action('link-clicked')}>
                GR-FIX-001-02-006—Печь для плавки металла
              </a>
            ),
          },
          {
            label: 'Оборудование',
            value: (
              <a href='#' className='text-foreground-theme hover:underline' onClick={action('link-clicked')}>
                123281811—ГПА-32 "ЛАДОГА"
              </a>
            ),
          },
          {
            label: 'Ссылка',
            value: (
              <a href='#' className='text-foreground-theme hover:underline' onClick={action('link-clicked')}>
                Перейти к деталям
              </a>
            ),
          },
        ],
      },
    ],
  },
  parameters: {
    docs: {
      description: {
        story: 'Пример с интерактивными ссылками в значениях полей.',
      },
    },
  },
};

// Пустой компонент
export const Empty: Story = {
  args: {
    sections: [],
  },
  parameters: {
    docs: {
      description: {
        story: 'Пустой компонент без секций (не отображается).',
      },
    },
  },
};
