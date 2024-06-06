import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { Button } from '@/components/ui/button';
import { Check, Plus } from 'lucide-react';
import DocumentListOutline from '@/assets/document_list_outline.svg?react';

const IconMap = {
  Check: <Check />,
  Plus: <Plus />,
  DocumentListOutline: <DocumentListOutline />,
};

const meta = {
  title: 'Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  args: {
    onClick: fn(),
    icon: null,
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default',
        'primary',
        'accent',
        'pale',
        'destructive',
        'success',
        'grey',
        'secondary',
        'contrast',
        'outline',
        'ghost',
        'link',
        'purple'],
    },
    icon: {
      options: ['none', ...Object.keys(IconMap)],
      mapping: {
        none: null,
        ...IconMap,
      },
      control: {
        labels: {
          none: 'No Icon',
          ...Object.keys(IconMap),
        },
      },
    },
    size: {
      control: 'select',
      options: ['default', 'xs', 'sm', 'lg', 'xl', 'icon'],
    },
    asChild: {
      control: false,
    },
    asDropdown: {
      control: false,
    },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Demo: Story = {
  args: {
    children: 'Button',
  },
};
