import type { Meta, StoryObj } from '@storybook/react';
import { DataTable, TruncatedCell } from '@/components/ui/data-table';

type Payment = {
  id: string;
  amount: number;
  status: 'pending' | 'processing' | 'success' | 'failed';
  email: string;
};

const data: Payment[] = [
  {
    id: '728ed52f',
    amount: 100,
    status: 'pending',
    email: 'm@example.com',
  },
  {
    id: '489e1d42',
    amount: 125,
    status: 'processing',
    email: 'example@gmail.com',
  },
  {
    id: '3a8b6c7d',
    amount: 200,
    status: 'success',
    email: 'user@domain.com',
  },
  {
    id: '4d5e6f7a',
    amount: 75,
    status: 'failed',
    email: 'test@test.org',
  },
  {
    id: '8b9c0d1e',
    amount: 300,
    status: 'pending',
    email: 'demo@demo.net',
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
