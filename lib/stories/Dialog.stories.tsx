import type {Meta, StoryObj} from '@storybook/react';
import {Dialog} from '@/components/ui/dialog';

const meta = {
  title: 'Dialog',
  component: Dialog,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {}
} satisfies Meta<typeof Dialog>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Demo: Story = {};
