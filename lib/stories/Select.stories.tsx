import type { Meta, StoryObj } from '@storybook/react';
import { Select } from '@/components/ui/select';

const meta = {
  title: 'Select',
  component: Select,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {},
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Demo: Story = {
  args: {
    options: [
      { label: 'Option 1', value: '1' },
      { label: 'Option 2', value: '2' },
      { label: 'Option 3', value: '3' },
    ],
    value: '1',
    onValueChange: () => {
    },
  },
};
