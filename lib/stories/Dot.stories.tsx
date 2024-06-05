import type { Meta, StoryObj } from '@storybook/react';
import { Dot } from '@/components/ui/dot';

const meta = {
  title: 'Dot',
  component: Dot,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof Dot>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Demo: Story = {
  args: {
    className: 'text-red-500',
  },
};
