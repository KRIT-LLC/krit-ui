import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Pagination } from '@/components/ui/pagination';

const meta: Meta<typeof Pagination> = {
  title: 'Components/UI/Pagination',
  component: Pagination,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Компонент пагинации для навигации по страницам данных. Поддерживает выбор размера страницы, отображение выбранных элементов и различные варианты отображения.',
      },
    },
  },
  argTypes: {
    horizontalPadding: {
      control: { type: 'select' },
      options: ['small', 'medium', 'large'],
      description: 'Горизонтальные отступы компонента',
    },
    pageSize: {
      control: { type: 'number', min: 1, max: 100 },
      description: 'Количество элементов на странице',
    },
    pageCount: {
      control: { type: 'number', min: 0 },
      description: 'Общее количество страниц',
    },
    pageIndex: {
      control: { type: 'number', min: 0 },
      description: 'Индекс текущей страницы (начиная с 0)',
    },
    canPreviousPage: {
      control: 'boolean',
      description: 'Возможность перейти на предыдущую страницу',
    },
    canNextPage: {
      control: 'boolean',
      description: 'Возможность перейти на следующую страницу',
    },
    selectedCount: {
      control: { type: 'number', min: 0 },
      description: 'Количество выбранных элементов',
    },
    totalCount: {
      control: { type: 'number', min: 0 },
      description: 'Общее количество элементов',
    },
    compact: {
      control: 'boolean',
      description: 'Компактный режим без кнопок первой/последней страницы',
    },
    hideDisplayBy: {
      control: 'boolean',
      description: 'Скрыть селектор размера страницы',
    },
    setPageSize: {
      action: 'setPageSize',
      description: 'Обработчик изменения размера страницы',
    },
    setPageIndex: {
      action: 'setPageIndex',
      description: 'Обработчик изменения индекса страницы',
    },
    previousPage: {
      action: 'previousPage',
      description: 'Обработчик перехода на предыдущую страницу',
    },
    nextPage: {
      action: 'nextPage',
      description: 'Обработчик перехода на следующую страницу',
    },
  },
} satisfies Meta<typeof Pagination>;

export default meta;
type Story = StoryObj<typeof Pagination>;

// Базовый пример
export const Default: Story = {
  args: {
    pageSize: 20,
    pageCount: 10,
    pageIndex: 0,
    canPreviousPage: false,
    canNextPage: true,
  },
};

// Средняя страница
export const MiddlePage: Story = {
  args: {
    pageSize: 20,
    pageCount: 10,
    pageIndex: 4,
    canPreviousPage: true,
    canNextPage: true,
  },
};

// Последняя страница
export const LastPage: Story = {
  args: {
    pageSize: 20,
    pageCount: 10,
    pageIndex: 9,
    canPreviousPage: true,
    canNextPage: false,
  },
};

// Малое количество страниц
export const FewPages: Story = {
  args: {
    pageSize: 20,
    pageCount: 3,
    pageIndex: 1,
    canPreviousPage: true,
    canNextPage: true,
  },
};

// Большое количество страниц
export const ManyPages: Story = {
  args: {
    pageSize: 20,
    pageCount: 50,
    pageIndex: 25,
    canPreviousPage: true,
    canNextPage: true,
  },
};

// С выбранными элементами
export const WithSelectedItems: Story = {
  args: {
    pageSize: 20,
    pageCount: 10,
    pageIndex: 2,
    canPreviousPage: true,
    canNextPage: true,
    selectedCount: 5,
    totalCount: 200,
  },
};

// Компактный режим
export const Compact: Story = {
  args: {
    pageSize: 20,
    pageCount: 10,
    pageIndex: 4,
    canPreviousPage: true,
    canNextPage: true,
    compact: true,
  },
};

// Без селектора размера страницы
export const WithoutDisplayBy: Story = {
  args: {
    pageSize: 20,
    pageCount: 10,
    pageIndex: 4,
    canPreviousPage: true,
    canNextPage: true,
    hideDisplayBy: true,
  },
};

// Разные отступы
export const PaddingVariants: Story = {
  render: () => (
    <div className='flex flex-col gap-8'>
      <div>
        <h3 className='text-sm font-medium mb-2'>Small padding</h3>
        <Pagination
          pageSize={20}
          pageCount={10}
          pageIndex={4}
          canPreviousPage={true}
          canNextPage={true}
          horizontalPadding='small'
        />
      </div>
      <div>
        <h3 className='text-sm font-medium mb-2'>Medium padding (default)</h3>
        <Pagination
          pageSize={20}
          pageCount={10}
          pageIndex={4}
          canPreviousPage={true}
          canNextPage={true}
          horizontalPadding='medium'
        />
      </div>
      <div>
        <h3 className='text-sm font-medium mb-2'>Large padding</h3>
        <Pagination
          pageSize={20}
          pageCount={10}
          pageIndex={4}
          canPreviousPage={true}
          canNextPage={true}
          horizontalPadding='large'
        />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Варианты горизонтальных отступов: small, medium (по умолчанию) и large.',
      },
    },
  },
};

// Интерактивный пример
export const Interactive: Story = {
  render: function Render() {
    const [pageSize, setPageSize] = useState(20);
    const [pageIndex, setPageIndex] = useState(0);
    const pageCount = 10;

    const handlePreviousPage = () => {
      if (pageIndex > 0) {
        setPageIndex(pageIndex - 1);
      }
    };

    const handleNextPage = () => {
      if (pageIndex < pageCount - 1) {
        setPageIndex(pageIndex + 1);
      }
    };

    return (
      <div className='space-y-4'>
        <div className='p-4 bg-background-secondary rounded-lg'>
          <p className='text-sm text-foreground-secondary mb-2'>
            Текущая страница: {pageIndex + 1} из {pageCount}
          </p>
          <p className='text-sm text-foreground-secondary'>
            Размер страницы: {pageSize}
          </p>
        </div>
        <Pagination
          pageSize={pageSize}
          pageCount={pageCount}
          pageIndex={pageIndex}
          canPreviousPage={pageIndex > 0}
          canNextPage={pageIndex < pageCount - 1}
          setPageSize={setPageSize}
          setPageIndex={setPageIndex}
          previousPage={handlePreviousPage}
          nextPage={handleNextPage}
        />
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          'Интерактивный пример с управлением состоянием пагинации. Можно изменять страницу и размер страницы.',
      },
    },
  },
};

// Полный пример со всеми функциями
export const FullFeatured: Story = {
  render: function Render() {
    const [pageSize, setPageSize] = useState(20);
    const [pageIndex, setPageIndex] = useState(2);
    const [selectedCount, setSelectedCount] = useState(5);
    const pageCount = 15;
    const totalCount = 300;

    const handlePreviousPage = () => {
      if (pageIndex > 0) {
        setPageIndex(pageIndex - 1);
      }
    };

    const handleNextPage = () => {
      if (pageIndex < pageCount - 1) {
        setPageIndex(pageIndex + 1);
      }
    };

    const toggleSelection = () => {
      setSelectedCount(selectedCount > 0 ? 0 : 5);
    };

    return (
      <div className='space-y-4'>
        <div className='p-4 bg-background-secondary rounded-lg'>
          <p className='text-sm text-foreground-secondary mb-2'>
            Страница: {pageIndex + 1} из {pageCount} | Размер: {pageSize} | Всего элементов: {totalCount}
          </p>
          <button
            onClick={toggleSelection}
            className='text-sm text-foreground-secondary underline'
          >
            {selectedCount > 0 ? 'Снять выделение' : 'Выделить элементы'}
          </button>
        </div>
        <Pagination
          pageSize={pageSize}
          pageCount={pageCount}
          pageIndex={pageIndex}
          canPreviousPage={pageIndex > 0}
          canNextPage={pageIndex < pageCount - 1}
          selectedCount={selectedCount}
          totalCount={totalCount}
          setPageSize={setPageSize}
          setPageIndex={setPageIndex}
          previousPage={handlePreviousPage}
          nextPage={handleNextPage}
        />
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          'Полный пример со всеми функциями: навигация по страницам, изменение размера страницы и отображение выбранных элементов.',
      },
    },
  },
};

// Граничные случаи
export const EdgeCases: Story = {
  render: () => (
    <div className='flex flex-col gap-8'>
      <div>
        <h3 className='text-sm font-medium mb-2'>Одна страница</h3>
        <Pagination
          pageSize={20}
          pageCount={1}
          pageIndex={0}
          canPreviousPage={false}
          canNextPage={false}
        />
      </div>
      <div>
        <h3 className='text-sm font-medium mb-2'>Две страницы</h3>
        <Pagination
          pageSize={20}
          pageCount={2}
          pageIndex={0}
          canPreviousPage={false}
          canNextPage={true}
        />
      </div>
      <div>
        <h3 className='text-sm font-medium mb-2'>Три страницы</h3>
        <Pagination
          pageSize={20}
          pageCount={3}
          pageIndex={1}
          canPreviousPage={true}
          canNextPage={true}
        />
      </div>
      <div>
        <h3 className='text-sm font-medium mb-2'>Четыре страницы (граница отображения многоточия)</h3>
        <Pagination
          pageSize={20}
          pageCount={4}
          pageIndex={2}
          canPreviousPage={true}
          canNextPage={true}
        />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Граничные случаи с малым количеством страниц для проверки корректного отображения.',
      },
    },
  },
};
