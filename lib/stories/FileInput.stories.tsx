import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { FileInput } from '@/components/ui/file-input';

const meta = {
  title: 'FileInput',
  component: FileInput,
  parameters: {
    layout: 'centered',
  },
  args: {
    onAdd: fn(),
    onFileRemove: fn(),
    onClick: fn(),
  },
  tags: ['autodocs'],
  argTypes: {
    accept: {
      control: {
        type: 'text',
      },
    },
    maxFileSize: {
      control: {
        type: 'number',
      },
    },
    error: {
      control: {
        type: 'boolean',
      },
    },
    value: {
      control: {
        type: 'file',
      },
    },
    placeholder: {
      control: {
        type: 'text',
      },
    },
  },
} satisfies Meta<typeof FileInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Demo: Story = {
  args: {
    accept: 'image/jpeg, image/jpg, image/png',
    maxFileSize: 10,
    error: false,
  },
};
