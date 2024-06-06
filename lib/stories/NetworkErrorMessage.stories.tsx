import type { Meta, StoryObj } from '@storybook/react';
import { NetworkErrorMessage } from '@/components/ui/network-error-message';

const meta = {
  title: 'NetworkErrorMessage',
  component: NetworkErrorMessage,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {},
} satisfies Meta<typeof NetworkErrorMessage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Demo: Story = {};
