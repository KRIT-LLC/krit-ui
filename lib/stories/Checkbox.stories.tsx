import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { Checkbox } from '@/components/ui/checkbox.tsx';

const meta = {
  title: 'Checkbox',
  component: Checkbox,
  parameters: {
    layout: 'centered',
  },
  args: {
    onCheckedChange: fn(),
    children: 'Checkbox',
  },
  tags: ['autodocs'],
  argTypes: {
    children: {
      control: 'text',
    },
    checked: {
      control: 'boolean',
    },
  },
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Demo: Story = {};
