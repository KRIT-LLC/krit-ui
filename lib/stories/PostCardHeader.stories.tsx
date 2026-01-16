import { action } from '@storybook/addon-actions';
import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '@/components/ui/button';
import { PostCardHeader } from '@/components/ui/post-card';
import EditIcon from '@/assets/edit_outline.svg?react';

const meta: Meta<typeof PostCardHeader> = {
  title: 'Components/UI/PostCard/PostCardHeader',
  component: PostCardHeader,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Компонент заголовка карточки поста с поддержкой заголовка и кнопок действий. Используется для отображения заголовка карточки с действиями в правой части.',
      },
    },
  },
  argTypes: {
    titlePrefix: {
      control: 'text',
      description: 'Префикс заголовка (отображается серым цветом)',
    },
    titleText: {
      control: 'text',
      description:
        'Основной текст заголовка (отображается основным цветом, с обрезкой при переполнении)',
    },
    buttonsSlot: {
      control: 'object',
      description: 'Слот для кнопок действий (может содержать одну или несколько кнопок)',
    },
    dropDownButtons: {
      control: 'object',
      description: 'Массив действий для выпадающего меню',
    },
    onBack: {
      action: 'back',
      description: 'Callback-функция для кнопки "Назад"',
    },
    className: {
      control: 'text',
      description: 'Дополнительные CSS-классы для корневого элемента',
    },
  },
} satisfies Meta<typeof PostCardHeader>;

export default meta;
type Story = StoryObj<typeof PostCardHeader>;

// Базовый пример
export const Default: Story = {
  args: {
    titlePrefix: '223-CR',
    titleText: 'Title',
    buttonsSlot: <Button variant='theme-filled'>Кнопка</Button>,
    dropDownButtons: [
      { text: 'Редактировать', onClick: action('edit') },
      { text: 'Удалить', onClick: action('delete') },
    ],
  },
  parameters: {
    docs: {
      description: {
        story:
          'Базовый пример использования компонента с заголовком, кнопками действий и выпадающим меню.',
      },
    },
  },
};

// Только заголовок
export const TitleOnly: Story = {
  args: {
    titlePrefix: '223-CR',
    titleText: 'Title',
  },
  parameters: {
    docs: {
      description: {
        story: 'Компонент только с заголовком, без кнопок действий.',
      },
    },
  },
};

// Только кнопки
export const ButtonsOnly: Story = {
  args: {
    buttonsSlot: (
      <>
        <Button variant='theme-filled'>Кнопка</Button>
        <Button variant='fade-contrast-filled' size='icon'>
          <EditIcon className='w-6 h-6' />
        </Button>
      </>
    ),
    dropDownButtons: [{ text: 'Дополнительные действия', onClick: action('more') }],
  },
  parameters: {
    docs: {
      description: {
        story: 'Компонент только с кнопками действий и выпадающим меню, без заголовка.',
      },
    },
  },
};

// Длинный текст с обрезкой
export const LongText: Story = {
  args: {
    titlePrefix: '223-CR',
    titleText:
      'Очень длинный заголовок карточки поста, который будет обрезан троеточием при переполнении',
    buttonsSlot: (
      <>
        <Button variant='theme-filled'>Кнопка</Button>
        <Button variant='fade-contrast-filled' size='icon'>
          <EditIcon className='w-6 h-6' />
        </Button>
      </>
    ),
    dropDownButtons: [
      { text: 'Редактировать', onClick: action('edit') },
      { text: 'Удалить', onClick: action('delete') },
    ],
  },
  parameters: {
    docs: {
      description: {
        story:
          'Пример с длинным текстом заголовка, который будет обрезан троеточием при переполнении, и выпадающим меню.',
      },
    },
  },
};

// Множество кнопок
export const MultipleButtons: Story = {
  args: {
    titlePrefix: '223-CR',
    titleText: 'Title',
    buttonsSlot: (
      <>
        <Button variant='theme-filled' size='sm'>
          Сохранить
        </Button>
        <Button variant='fade-contrast-outlined' size='sm'>
          Отмена
        </Button>
        <Button variant='fade-contrast-filled' size='icon'>
          <EditIcon className='w-6 h-6' />
        </Button>
      </>
    ),
    dropDownButtons: [
      { text: 'Экспортировать', onClick: action('export') },
      { text: 'Поделиться', onClick: action('share') },
      { text: 'Удалить', onClick: action('delete') },
    ],
  },
  parameters: {
    docs: {
      description: {
        story:
          'Пример с несколькими кнопками разных вариантов и размеров, а также выпадающим меню.',
      },
    },
  },
};

// Только префикс
export const PrefixOnly: Story = {
  args: {
    titlePrefix: '223-CR',
  },
  parameters: {
    docs: {
      description: {
        story: 'Компонент только с префиксом заголовка.',
      },
    },
  },
};

// Только текст
export const TextOnly: Story = {
  args: {
    titleText: 'Title',
  },
  parameters: {
    docs: {
      description: {
        story: 'Компонент только с текстом заголовка.',
      },
    },
  },
};

// Только выпадающее меню
export const DropdownOnly: Story = {
  args: {
    titlePrefix: '223-CR',
    titleText: 'Title',
    dropDownButtons: [
      { text: 'Редактировать', onClick: action('edit') },
      { text: 'Дублировать', onClick: action('duplicate') },
      { text: 'Удалить', onClick: action('delete'), disabled: false },
    ],
  },
  parameters: {
    docs: {
      description: {
        story: 'Компонент только с выпадающим меню действий.',
      },
    },
  },
};

// Комбинация кнопок и выпадающего меню
export const WithButtonsAndDropdown: Story = {
  args: {
    titlePrefix: '223-CR',
    titleText: 'Title',
    buttonsSlot: (
      <>
        <Button variant='theme-filled'>Сохранить</Button>
        <Button variant='fade-contrast-filled' size='icon'>
          <EditIcon className='w-6 h-6' />
        </Button>
      </>
    ),
    dropDownButtons: [
      { text: 'Экспортировать', onClick: action('export') },
      { text: 'Поделиться', onClick: action('share') },
      { text: 'Удалить', onClick: action('delete'), disabled: false },
    ],
  },
  parameters: {
    docs: {
      description: {
        story: 'Компонент с кнопками действий и выпадающим меню.',
      },
    },
  },
};

// Выпадающее меню с отключенными действиями
export const DropdownWithDisabled: Story = {
  args: {
    titlePrefix: '223-CR',
    titleText: 'Title',
    dropDownButtons: [
      { text: 'Редактировать', onClick: action('edit') },
      { text: 'Дублировать', onClick: action('duplicate'), disabled: true },
      { text: 'Удалить', onClick: action('delete'), disabled: true },
    ],
  },
  parameters: {
    docs: {
      description: {
        story: 'Выпадающее меню с отключенными действиями.',
      },
    },
  },
};

// С кнопкой "Назад"
export const WithBackButton: Story = {
  args: {
    titlePrefix: '223-CR',
    titleText: 'Title',
    onBack: action('back'),
    buttonsSlot: <Button variant='theme-filled'>Кнопка</Button>,
    dropDownButtons: [
      { text: 'Редактировать', onClick: action('edit') },
      { text: 'Удалить', onClick: action('delete') },
    ],
  },
  parameters: {
    docs: {
      description: {
        story: 'Компонент с кнопкой "Назад" перед заголовком.',
      },
    },
  },
};

// Только кнопка "Назад" и заголовок
export const BackButtonOnly: Story = {
  args: {
    titlePrefix: '223-CR',
    titleText: 'Title',
    onBack: action('back'),
  },
  parameters: {
    docs: {
      description: {
        story: 'Компонент только с кнопкой "Назад" и заголовком, без дополнительных действий.',
      },
    },
  },
};

// Пустой компонент
export const Empty: Story = {
  args: {},
  parameters: {
    docs: {
      description: {
        story: 'Пустой компонент без заголовка и кнопок (может использоваться как контейнер).',
      },
    },
  },
};
