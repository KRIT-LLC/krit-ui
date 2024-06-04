import type {Meta, StoryObj} from '@storybook/react';
import {Popover} from '@/components/ui/popover';

const meta = {
  title: 'Popover',
  component: Popover,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {}
} satisfies Meta<typeof Popover>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Demo: Story = {};
