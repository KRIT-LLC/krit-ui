import type { Meta, StoryObj } from '@storybook/react';
import { AlertTriangle, Bell, CheckCircle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const meta: Meta<typeof Badge> = {
  title: 'Components/UI/Badge',
  component: Badge,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'radio',
      options: [
        'default',
        'gradient',
        'secondary',
        'accent',
        'theme',
        'pale',
        'destructive',
        'success',
        'grey',
        'outline',
      ],
    },
    size: {
      control: 'radio',
      options: ['sm', 'md', 'lg'],
    },
    iconVariant: {
      control: 'radio',
      options: ['square', 'circle'],
      if: { arg: 'variant', eq: 'secondary' },
    },
    layout: {
      control: 'radio',
      options: ['row', 'col'],
    },
    icon: {
      control: 'select',
      options: ['none', 'bell', 'alert', 'check'],
      mapping: {
        bell: <Bell className='h-3.5 w-3.5' />,
        alert: <AlertTriangle className='h-3.5 w-3.5' />,
        check: <CheckCircle className='h-3.5 w-3.5' />,
        none: null,
      },
    },
    iconRight: {
      control: 'select',
      options: ['none', 'bell', 'alert', 'check'],
      mapping: {
        bell: <Bell className='h-3.5 w-3.5' />,
        alert: <AlertTriangle className='h-3.5 w-3.5' />,
        check: <CheckCircle className='h-3.5 w-3.5' />,
        none: null,
      },
    },
    children: {
      control: 'text',
      defaultValue: 'Status Label',
    },
  },
  parameters: {
    docs: {
      description: {
        component: 'Индикатор для отображения статусов, уведомлений и меток с поддержкой иконок',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Badge>;

export const Default: Story = {
  args: {
    children: 'New Feature',
  },
};

export const WithIcons: Story = {
  args: {
    icon: 'bell',
    iconRight: 'check',
    children: 'Notifications',
  },
};

export const SecondaryVariant: Story = {
  args: {
    variant: 'secondary',
    iconVariant: 'secondary',
    children: 'Security Alert',
    icon: 'alert',
  },
};

export const OutlineBadge: Story = {
  args: {
    variant: 'outline',
    children: 'Draft Version',
  },
};

export const SmallSize: Story = {
  args: {
    size: 'sm',
    children: 'Compact',
  },
};

export const VerticalLayout: Story = {
  args: {
    layout: 'truncate',
    children: 'Multi\nLine',
    icon: 'check',
  },
};

export const Clickable: Story = {
  args: {
    children: 'Clickable Badge',
    onClick: () => console.log('Badge clicked!'),
  },
};

export const SuccessState: Story = {
  args: {
    variant: 'success',
    iconVariant: 'default',
    icon: 'check',
    children: 'Payment Successful',
  },
};

export const ErrorState: Story = {
  args: {
    variant: 'destructive',
    iconVariant: 'default',
    icon: 'alert',
    children: 'Connection Error',
  },
};
