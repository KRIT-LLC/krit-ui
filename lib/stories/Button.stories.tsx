import type { Meta, StoryObj } from '@storybook/react';
import { Download, Heart, Settings } from 'lucide-react';
import { Button, ButtonProps } from '@/components/ui/button';

const meta: Meta<typeof Button> = {
  title: 'Components/UI/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'radio',
      options: ['default', 'primary', 'secondary', 'destructive', 'ghost', 'link'],
    },
    size: {
      control: 'radio',
      options: ['sm', 'md', 'lg'],
    },
    asChild: {
      control: 'boolean',
      defaultValue: false,
    },
    asDropdown: {
      control: 'boolean',
      defaultValue: false,
    },
    icon: {
      control: 'select',
      options: ['none', 'heart', 'settings', 'download'],
      mapping: {
        heart: <Heart className='h-4 w-4' />,
        settings: <Settings className='h-4 w-4' />,
        download: <Download className='h-4 w-4' />,
        none: null,
      },
    },
    children: {
      control: 'text',
      defaultValue: 'Button Label',
    },
  },
  parameters: {
    docs: {
      description: {
        component:
          'Универсальный компонент кнопки с поддержкой различных стилей, размеров и состояний',
      },
    },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof Button>;

const Template: Story = {
  render: args => <Button {...args} />,
};

export const Default = {
  ...Template,
  args: {
    variant: 'default',
    size: 'md',
  },
};

export const Primary = {
  ...Template,
  args: {
    variant: 'primary',
    children: 'Primary Action',
  },
};

export const WithIcon = {
  ...Template,
  args: {
    variant: 'primary',
    icon: 'download',
    children: 'Download File',
  },
};

export const Dropdown = {
  ...Template,
  args: {
    asDropdown: true,
    children: 'Menu Options',
    icon: 'settings',
  },
};

export const AsChild = {
  render: (args: ButtonProps) => (
    <Button {...args}>
      <a href='#link'>Link as Button</a>
    </Button>
  ),
  args: {
    asChild: true,
    variant: 'link',
  },
};

export const Destructive = {
  ...Template,
  args: {
    variant: 'destructive',
    children: 'Delete Item',
  },
};

export const Disabled = {
  ...Template,
  args: {
    disabled: true,
    children: 'Disabled State',
  },
};

export const LoadingState = {
  ...Template,
  args: {
    'aria-label': 'Loading...',
    children: 'Processing...',
    disabled: true,
    icon: <span className='animate-spin'>⟳</span>,
  },
};
