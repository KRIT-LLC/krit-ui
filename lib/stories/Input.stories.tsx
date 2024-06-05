import type {Meta, StoryObj} from '@storybook/react';
import {fn} from '@storybook/test';
import {Input} from '@/components/ui/input';

const meta = {
  title: 'Input',
  component: Input,
  parameters: {
    layout: 'centered',
  },
  args: {
    onChange: fn(),
    onEnter: fn(),
  },
  tags: ['autodocs'],
  argTypes: {
    asSearch: {
      control: {
        type: 'boolean',
      },
    },
    error: {
      control: {
        type: 'boolean',
      },
    },
    disabled: {
      control: {
        type: 'boolean',
      },
    },
    value: {
      control: {
        type: 'text',
      },
    },
    placeholder: {
      control: {
        type: 'text',
      },
    },
    // TODO: настроить выбор иконок
    rightIcon: {
      control: {
        type: 'text',
      },
    },
  }
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Demo: Story = {};
