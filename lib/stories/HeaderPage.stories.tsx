// PageHeader.stories.tsx
import { action } from '@storybook/addon-actions';
import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '@/components/ui/button';
import { PageHeader } from '@/components/ui/header';

const meta: Meta<typeof PageHeader> = {
  title: 'Components/UI/PageHeader',
  component: PageHeader,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Заголовок страницы с навигацией и дополнительными действиями. Поддерживает кнопки навигации, мета-информацию и различные действия.',
      },
    },
    layout: 'fullscreen',
  },
  argTypes: {
    className: {
      control: 'text',
      description: 'Дополнительные CSS-классы',
    },
    title: {
      control: 'text',
      description: 'Заголовок страницы',
    },
    leftMeta: {
      control: 'text',
      description: 'Мета-информация слева от заголовка',
    },
    meta: {
      control: 'text',
      description: 'Мета-информация рядом с заголовком',
    },
    onBack: {
      action: 'backClicked',
      description: 'Callback при клике на кнопку "Назад"',
    },
    onNext: {
      action: 'nextClicked',
      description: 'Callback при клике на кнопку "Вперед"',
    },
    onPrevious: {
      action: 'previousClicked',
      description: 'Callback при клике на кнопку "Назад" в контексте навигации',
    },
  },
} satisfies Meta<typeof PageHeader>;

export default meta;
type Story = StoryObj<typeof PageHeader>;

// Базовая история
export const Default: Story = {
  args: {
    title: 'Заголовок страницы',
    meta: 'Мета-информация',
    onBack: action('backClicked'),
  },
  parameters: {
    docs: {
      description: {
        story: 'Базовый заголовок страницы с кнопкой "Назад" и мета-информацией.',
      },
    },
  },
};

// Заголовок с действиями
export const WithActions: Story = {
  args: {
    title: 'Проекты',
    meta: '24',
    onBack: action('backClicked'),
    actions: (
      <>
        <Button variant='outline'>Фильтр</Button>
        <Button>Создать проект</Button>
      </>
    ),
  },
  parameters: {
    docs: {
      description: {
        story: 'Заголовок с действиями в правой части.',
      },
    },
  },
};

// Заголовок с навигацией вперед/назад
export const WithNavigation: Story = {
  args: {
    title: 'Страница 5',
    leftMeta: '5',
    meta: 'из 10',
    onBack: action('backClicked'),
    onNext: action('nextClicked'),
    onPrevious: action('previousClicked'),
  },
  parameters: {
    docs: {
      description: {
        story: 'Заголовок с полной навигацией (вперед/назад) и мета-информацией о номере страницы.',
      },
    },
  },
};

// Заголовок с действиями рядом с заголовком
export const WithTitleActions: Story = {
  args: {
    title: 'Мой проект',
    titleActions: (
      <Button variant='ghost' size='sm'>
        Редактировать
      </Button>
    ),
    actions: <Button variant='outline'>Экспорт</Button>,
  },
  parameters: {
    docs: {
      description: {
        story: 'Заголовок с действиями рядом с названием и основными действиями справа.',
      },
    },
  },
};

// Полный пример
export const CompleteExample: Story = {
  args: {
    title: 'Документация',
    leftMeta: 'Глава 3',
    meta: 'Раздел 5',
    onBack: action('backClicked'),
    onNext: action('nextClicked'),
    onPrevious: action('previousClicked'),
    titleActions: (
      <Button variant='ghost' size='sm'>
        Добавить заметку
      </Button>
    ),
    actions: (
      <>
        <Button variant='outline'>Поделиться</Button>
        <Button>Сохранить</Button>
      </>
    ),
  },
  parameters: {
    docs: {
      description: {
        story: 'Полный пример заголовка со всеми возможными элементами.',
      },
    },
  },
};

// Заголовок без навигации
export const WithoutNavigation: Story = {
  args: {
    title: 'Настройки профиля',
    actions: <Button>Сохранить изменения</Button>,
  },
  parameters: {
    docs: {
      description: {
        story: 'Заголовок без элементов навигации, только с действиями.',
      },
    },
  },
};

// Заголовок с отключенными кнопками навигации
export const WithDisabledNavigation: Story = {
  args: {
    title: 'Страница 1',
    leftMeta: '1',
    meta: 'из 5',
    onNext: action('nextClicked'),
    // onPrevious не передается, поэтому кнопка "Назад" будет отключена
  },
  parameters: {
    docs: {
      description: {
        story: 'Заголовок с отключенной кнопкой "Назад" (когда onPrevious не предоставлен).',
      },
    },
  },
};
