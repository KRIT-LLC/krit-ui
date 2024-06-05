import type {Meta, StoryObj} from '@storybook/react';
import {Table} from '@/components/ui/table';

const meta = {
  title: 'Table',
  component: Table,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {}
} satisfies Meta<typeof Table>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Demo: Story = {};
