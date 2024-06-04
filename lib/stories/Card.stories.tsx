import type {Meta, StoryObj} from '@storybook/react';
import {Card} from '@/components/ui/card';
import {fn} from '@storybook/test';

const meta = {
  title: 'Card',
  component: Card,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {
    onClick: fn(),
    onSelect: fn(),
    children: 'Пример отображения карточки',
  },
  argTypes: {
    children: {
      control: 'text',
    },
    checked: {
      control: 'boolean',
    },
    showArrow: {
      control: 'boolean',
    }
  }
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Demo: Story = {};
