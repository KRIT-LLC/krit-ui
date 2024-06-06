import type { Meta, StoryObj } from '@storybook/react';
import { DataTable } from '@/components/ui/data-table';

const meta = {
  title: 'DataTable',
  component: DataTable,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {},
} satisfies Meta<typeof DataTable>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Demo: Story = {
  args: {
    columns: [
      {
        header: 'Name',
        accessorKey: 'name',
      },
      {
        header: 'Age',
        accessorKey: 'age',
      },
      {
        header: 'Address',
        accessorKey: 'address',
      },
    ],
    data: [
      {
        name: 'John',
        age: 30,
        address: '123 Main St',
      },
      {
        name: 'Jane',
        age: 25,
        address: '456 Park Ave',
      },
    ],
  },
};
