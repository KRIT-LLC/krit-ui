import type {Meta, StoryObj} from '@storybook/react';
import {Command} from '@/components/ui/command';

const meta = {
  title: 'Command',
  component: Command,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {}
} satisfies Meta<typeof Command>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Demo: Story = {};
