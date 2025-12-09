import type { Meta, StoryObj } from '@storybook/react';
import { DataTable, TruncatedCell } from '@/components/ui/data-table';
import { FiltersColumnHeader } from '@/components/ui/filters-column-header';
import { SortableHeader } from '@/components/ui/sortable-header';

type Payment = {
  id: string;
  amount: number;
  status: 'pending' | 'processing' | 'success' | 'failed';
  email: string;
  date: string;
};

const data: Payment[] = [
  {
    id: '728ed52f',
    amount: 100,
    status: 'pending',
    email: 'm@example.com',
    date: '2024-01-15',
  },
  {
    id: '489e1d42',
    amount: 125,
    status: 'processing',
    email: 'example@gmail.com',
    date: '2024-02-20',
  },
  {
    id: '3a8b6c7d',
    amount: 200,
    status: 'success',
    email: 'user@domain.com',
    date: '2024-03-10',
  },
  {
    id: '4d5e6f7a',
    amount: 75,
    status: 'failed',
    email: 'test@test.org',
    date: '2024-01-25',
  },
  {
    id: '8b9c0d1e',
    amount: 300,
    status: 'pending',
    email: 'demo@demo.net',
    date: '2024-04-05',
  },
  {
    id: '1f2g3h4i',
    amount: 150,
    status: 'success',
    email: 'alice@example.com',
    date: '2024-02-14',
  },
  {
    id: '5j6k7l8m',
    amount: 90,
    status: 'processing',
    email: 'bob@test.com',
    date: '2024-03-22',
  },
  {
    id: '9n0o1p2q',
    amount: 250,
    status: 'failed',
    email: 'charlie@domain.org',
    date: '2024-01-08',
  },
];

const meta: Meta<typeof DataTable> = {
  title: 'Components/UI/Data Table',
  component: DataTable,
  tags: ['autodocs'],
  argTypes: {
    horizontalPadding: {
      control: { type: 'select' },
      options: ['small', 'medium', 'large'],
    },
    loading: { control: 'boolean' },
    variant: {
      control: { type: 'select' },
      options: ['table', 'list'],
      description: 'Вариант стиля таблицы: table - стандартный стиль с границами, list - стиль списка без вертикальных границ и фона строк',
    },
    hideHeader: {
      control: 'boolean',
      description: 'Скрыть строку с заголовками',
    },
  },
  parameters: {
    docs: {
      description: {
        component: 'Расширенная таблица данных с пагинацией, сортировкой и виртуализацией',
      },
    },
  },
};

export default meta;

export const Basic: StoryObj<typeof DataTable> = {
  args: {
    columns: [
      {
        accessorKey: 'email',
        header: 'Email',
        cell: ({ row }) => <TruncatedCell>{row.getValue('email')}</TruncatedCell>,
      },
      {
        accessorKey: 'amount',
        header: 'Amount',
      },
      {
        accessorKey: 'status',
        header: 'Status',
      },
    ],
    data,
    horizontalPadding: 'medium',
  },
};

export const LoadingState: StoryObj<typeof DataTable> = {
  args: {
    ...Basic.args,
    loading: true,
  },
};

export const ServerSidePagination: StoryObj<typeof DataTable> = {
  args: {
    ...Basic.args,
    pagination: {
      pageIndex: 0,
      pageSize: 10,
    },
    rowCount: 100,
  },
};

export const StickyHeader: StoryObj<typeof DataTable> = {
  args: {
    ...Basic.args,
    isStickyHeader: true,
  },
};

export const WithSorting: StoryObj<typeof DataTable> = {
  args: {
    columns: [
      {
        accessorKey: 'email',
        header: ({ column }) => <SortableHeader column={column}>Email</SortableHeader>,
        cell: ({ row }) => <TruncatedCell>{row.getValue('email')}</TruncatedCell>,
      },
      {
        accessorKey: 'amount',
        header: ({ column }) => <SortableHeader column={column}>Amount</SortableHeader>,
      },
      {
        accessorKey: 'status',
        header: ({ column }) => <SortableHeader column={column}>Status</SortableHeader>,
      },
      {
        accessorKey: 'date',
        header: ({ column }) => <SortableHeader column={column}>Date</SortableHeader>,
      },
    ],
    data,
    horizontalPadding: 'medium',
  },
  parameters: {
    docs: {
      description: {
        story:
          'Таблица с сортировкой по всем колонкам. Кликните на заголовок колонки для сортировки.',
      },
    },
  },
};

export const WithFilters: StoryObj<typeof DataTable> = {
  args: {
    columns: [
      {
        accessorKey: 'email',
        header: ({ column }) => (
          <FiltersColumnHeader type='search' column={column}>
            Email
          </FiltersColumnHeader>
        ),
        cell: ({ row }) => <TruncatedCell>{row.getValue('email')}</TruncatedCell>,
      },
      {
        accessorKey: 'amount',
        header: 'Amount',
      },
      {
        accessorKey: 'status',
        header: ({ column, table }) => (
          <FiltersColumnHeader
            type='select'
            column={column}
            table={table}
            options={[
              { label: 'Pending', value: 'pending' },
              { label: 'Processing', value: 'processing' },
              { label: 'Success', value: 'success' },
              { label: 'Failed', value: 'failed' },
            ]}
          >
            Status
          </FiltersColumnHeader>
        ),
      },
      {
        accessorKey: 'date',
        header: ({ column }) => (
          <FiltersColumnHeader type='date-range' column={column}>
            Date
          </FiltersColumnHeader>
        ),
      },
      {
        id: 'actions',
        header: ({ table }) => (
          <FiltersColumnHeader type='reset' table={table}>
            Reset
          </FiltersColumnHeader>
        ),
      },
    ],
    data,
    horizontalPadding: 'medium',
  },
  parameters: {
    docs: {
      description: {
        story:
          'Таблица с различными типами фильтров: поиск по email, выбор статуса, диапазон дат и кнопка сброса всех фильтров.',
      },
    },
  },
};

export const WithSortingAndFilters: StoryObj<typeof DataTable> = {
  args: {
    columns: [
      {
        accessorKey: 'email',
        header: ({ column }) => (
          <FiltersColumnHeader type='search' column={column}>
            <SortableHeader column={column}>Email</SortableHeader>
          </FiltersColumnHeader>
        ),
        cell: ({ row }) => <TruncatedCell>{row.getValue('email')}</TruncatedCell>,
      },
      {
        accessorKey: 'amount',
        header: ({ column }) => <SortableHeader column={column}>Amount</SortableHeader>,
      },
      {
        accessorKey: 'status',
        header: ({ column, table }) => (
          <FiltersColumnHeader
            type='select'
            column={column}
            table={table}
            options={[
              { label: 'Pending', value: 'pending' },
              { label: 'Processing', value: 'processing' },
              { label: 'Success', value: 'success' },
              { label: 'Failed', value: 'failed' },
            ]}
          >
            <SortableHeader column={column}>Status</SortableHeader>
          </FiltersColumnHeader>
        ),
      },
      {
        accessorKey: 'date',
        header: ({ column }) => (
          <FiltersColumnHeader type='date-range' column={column}>
            <SortableHeader column={column}>Date</SortableHeader>
          </FiltersColumnHeader>
        ),
      },
      {
        id: 'actions',
        header: ({ table }) => (
          <FiltersColumnHeader type='reset' table={table}>
            Reset
          </FiltersColumnHeader>
        ),
      },
    ],
    data,
    horizontalPadding: 'medium',
  },
  parameters: {
    docs: {
      description: {
        story:
          'Таблица с полным набором функций: сортировка и фильтрация. Комбинирует SortableHeader и FiltersColumnHeader для максимальной функциональности.',
      },
    },
  },
};

export const ListVariant: StoryObj<typeof DataTable> = {
  args: {
    columns: [
      {
        accessorKey: 'email',
        header: 'Email',
        cell: ({ row }) => <TruncatedCell>{row.getValue('email')}</TruncatedCell>,
      },
      {
        accessorKey: 'amount',
        header: 'Amount',
      },
      {
        accessorKey: 'status',
        header: 'Status',
      },
      {
        accessorKey: 'date',
        header: 'Date',
      },
    ],
    data,
    horizontalPadding: 'medium',
    variant: 'list',
    pagination: {
      pageIndex: 0,
      pageSize: 10,
    },
    rowCount: 8,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Вариант списка без вертикальных границ между колонками, без фона четных строк и hover эффекта. Имеет горизонтальные разделители между строками и автоматические стили для пагинации.',
      },
    },
  },
};

export const ListVariantWithoutHeader: StoryObj<typeof DataTable> = {
  args: {
    columns: [
      {
        accessorKey: 'email',
        header: '',
        cell: ({ row }) => <TruncatedCell>{row.getValue('email')}</TruncatedCell>,
      },
      {
        accessorKey: 'amount',
        header: '',
      },
      {
        accessorKey: 'status',
        header: '',
      },
      {
        accessorKey: 'date',
        header: '',
      },
    ],
    data,
    horizontalPadding: 'medium',
    variant: 'list',
    hideHeader: true,
    pagination: {
      pageIndex: 0,
      pageSize: 10,
    },
    rowCount: 8,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Вариант списка без заголовков. Подходит для отображения истории операций или логов, где заголовки не нужны.',
      },
    },
  },
};
