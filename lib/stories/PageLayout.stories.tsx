// PageLayout.stories.tsx
import { action } from '@storybook/addon-actions';
import type { Meta, StoryObj } from '@storybook/react';
import { PageLayout } from '@/components/ui/page-layout';
import { PageHeader } from '@/components/ui/header';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const meta: Meta<typeof PageLayout> = {
  title: 'Components/UI/PageLayout',
  component: PageLayout,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Компонент макета страницы с предустановленными отступами и расположением элементов. Обеспечивает единообразную структуру страниц с заголовком, фильтрами и контентом.',
      },
    },
    layout: 'fullscreen',
  },
  argTypes: {
    headerSlot: {
      control: false,
      description: 'Слот для заголовка страницы',
    },
    filterSlot: {
      control: false,
      description: 'Слот для фильтров',
    },
    contentSlot: {
      control: false,
      description: 'Слот для основного контента',
    },
  },
} satisfies Meta<typeof PageLayout>;

export default meta;
type Story = StoryObj<typeof PageLayout>;

// Базовая история с заголовком
export const Default: Story = {
  args: {
    headerSlot: (
      <PageHeader
        title='Заголовок страницы'
        meta='Мета-информация'
        onBack={action('backClicked')}
      />
    ),
  },
  parameters: {
    docs: {
      description: {
        story: 'Базовый макет страницы с заголовком.',
      },
    },
  },
};

// Макет с заголовком и фильтрами
export const WithFilters: Story = {
  args: {
    headerSlot: (
      <PageHeader
        title='Проекты'
        meta='24'
        onBack={action('backClicked')}
        actions={
          <>
            <Button variant='fade-contrast-outlined'>Фильтр</Button>
            <Button>Создать проект</Button>
          </>
        }
      />
    ),
    filterSlot: (
      <div className='flex gap-4 items-center'>
        <Input placeholder='Поиск...' className='w-[300px]' />
        <Button variant='fade-contrast-outlined'>Фильтры</Button>
        <Button variant='fade-contrast-outlined'>Сортировка</Button>
      </div>
    ),
  },
  parameters: {
    docs: {
      description: {
        story: 'Макет страницы с заголовком и панелью фильтров.',
      },
    },
  },
};

// Макет с заголовком и контентом
export const WithContent: Story = {
  args: {
    headerSlot: (
      <PageHeader
        title='Документация'
        leftMeta='Глава 3'
        meta='Раздел 5'
        onBack={action('backClicked')}
        onNext={action('nextClicked')}
        onPrevious={action('previousClicked')}
        actions={<Button>Сохранить</Button>}
      />
    ),
    contentSlot: (
      <div className='px-8'>
        <Card>
          <CardHeader>
            <CardTitle>Основной контент</CardTitle>
          </CardHeader>
          <CardContent>
            <p className='text-foreground-secondary'>
              Здесь находится основной контент страницы. Это может быть таблица, список, форма или
              любой другой контент.
            </p>
          </CardContent>
        </Card>
      </div>
    ),
  },
  parameters: {
    docs: {
      description: {
        story: 'Макет страницы с заголовком и основным контентом.',
      },
    },
  },
};

// Полный пример со всеми слотами
export const Complete: Story = {
  args: {
    headerSlot: (
      <PageHeader
        title='Аналитика'
        meta='2024'
        onBack={action('backClicked')}
        actions={
          <>
            <Button variant='fade-contrast-outlined'>Экспорт</Button>
            <Button>Обновить</Button>
          </>
        }
      />
    ),
    filterSlot: (
      <div className='flex gap-4 items-center flex-wrap'>
        <Input placeholder='Поиск по названию...' className='w-[300px]' />
        <Button variant='fade-contrast-outlined'>Дата</Button>
        <Button variant='fade-contrast-outlined'>Статус</Button>
        <Button variant='fade-contrast-outlined'>Тип</Button>
      </div>
    ),
    contentSlot: (
      <div className='px-8'>
        <div className='grid grid-cols-3 gap-4 mb-6'>
          <Card>
            <CardHeader>
              <CardTitle>Всего</CardTitle>
            </CardHeader>
            <CardContent>
              <div className='text-3xl font-bold'>1,234</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Активных</CardTitle>
            </CardHeader>
            <CardContent>
              <div className='text-3xl font-bold'>567</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Завершено</CardTitle>
            </CardHeader>
            <CardContent>
              <div className='text-3xl font-bold'>890</div>
            </CardContent>
          </Card>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Детальная информация</CardTitle>
          </CardHeader>
          <CardContent>
            <p className='text-foreground-secondary'>
              Здесь может быть таблица, график или другой детальный контент.
            </p>
          </CardContent>
        </Card>
      </div>
    ),
  },
  parameters: {
    docs: {
      description: {
        story: 'Полный пример макета страницы со всеми слотами: заголовком, фильтрами и контентом.',
      },
    },
  },
};

// Только контент без заголовка и фильтров
export const OnlyContent: Story = {
  args: {
    contentSlot: (
      <div className='px-8'>
        <Card>
          <CardHeader>
            <CardTitle>Контент без заголовка</CardTitle>
          </CardHeader>
          <CardContent>
            <p className='text-foreground-secondary'>
              Макет может использоваться только с контентом, без заголовка и фильтров.
            </p>
          </CardContent>
        </Card>
      </div>
    ),
  },
  parameters: {
    docs: {
      description: {
        story: 'Макет страницы только с контентом, без заголовка и фильтров.',
      },
    },
  },
};

// Только заголовок без фильтров и контента
export const OnlyHeader: Story = {
  args: {
    headerSlot: (
      <PageHeader
        title='Настройки'
        onBack={action('backClicked')}
        actions={<Button>Сохранить</Button>}
      />
    ),
  },
  parameters: {
    docs: {
      description: {
        story: 'Макет страницы только с заголовком, без фильтров и контента.',
      },
    },
  },
};

// Только фильтры (редкий случай, но возможный)
export const OnlyFilters: Story = {
  args: {
    filterSlot: (
      <div className='flex gap-4 items-center'>
        <Input placeholder='Поиск...' className='w-[300px]' />
        <Button variant='fade-contrast-outlined'>Фильтры</Button>
        <Button variant='fade-contrast-outlined'>Сортировка</Button>
      </div>
    ),
  },
  parameters: {
    docs: {
      description: {
        story: 'Макет страницы только с фильтрами, без заголовка и контента.',
      },
    },
  },
};

// Макет с длинным контентом (проверка прокрутки)
export const WithLongContent: Story = {
  args: {
    headerSlot: (
      <PageHeader
        title='Длинный список'
        meta='1000+'
        onBack={action('backClicked')}
        actions={<Button>Добавить</Button>}
      />
    ),
    filterSlot: (
      <div className='flex gap-4 items-center'>
        <Input placeholder='Поиск...' className='w-[300px]' />
        <Button variant='fade-contrast-outlined'>Фильтры</Button>
      </div>
    ),
    contentSlot: (
      <div className='px-8'>
        <div className='space-y-4'>
          {Array.from({ length: 20 }, (_, i) => (
            <Card key={i}>
              <CardHeader>
                <CardTitle>Элемент {i + 1}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className='text-foreground-secondary'>
                  Это элемент списка номер {i + 1}. Контент достаточно длинный, чтобы проверить
                  прокрутку страницы.
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    ),
  },
  parameters: {
    docs: {
      description: {
        story: 'Макет страницы с длинным контентом для проверки прокрутки и поведения flex-контейнера.',
      },
    },
  },
};

