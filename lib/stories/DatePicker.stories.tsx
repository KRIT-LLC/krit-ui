import type {Meta, StoryObj} from '@storybook/react';
import {DatePicker} from '@/components/ui/date-picker';

const meta = {
  title: 'DatePicker',
  component: DatePicker,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {
    onChange: () => {},
  },
  argTypes: {}
} satisfies Meta<typeof DatePicker>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Single: Story = {
  args: {
    mode: 'single',
    value: new Date(),
  },
};
export const Multiple: Story = {
  args: {
    mode: 'multiple',
    value: [new Date()],
  },
};
