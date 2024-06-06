import type { Meta, StoryObj } from '@storybook/react';
import { Calendar } from '@/components/ui/calendar';

const meta = {
  title: 'Calendar',
  component: Calendar,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    showOutsideDays: {
      control: 'boolean',
      description: 'Показывать дни конца предыдущего месяца и начала следующего месяца',
    },
  },
} satisfies Meta<typeof Calendar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Demo: Story = {};
