import type {Meta, StoryFn} from '@storybook/react';
import {fn} from '@storybook/test';
import {Check, Plus} from 'lucide-react';
import DocumentListOutline from '../assets/document_list_outline.svg?react';
import {Badge} from '@/components/ui/badge';

const IconMap = {Check: <Check/>, Plus: <Plus/>, DocumentListOutline: <DocumentListOutline/>};

export default {
  title: 'Badge',
  component: Badge,
  argTypes: {
    variant: {
      control: 'select',
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
      control: 'inline-radio',
      options: ['default', 'sm', 'lg'],
    },
    icon: {
      options: ['none', ...Object.keys(IconMap)],
      mapping: {
        none: null,
        ...IconMap
      },
      control: {
        labels: {
          none: 'No Icon',
          ...Object.keys(IconMap)
        }
      }
    },
    iconRight: {
      options: ['none', ...Object.keys(IconMap)],
      mapping: {
        none: null,
        ...IconMap
      },
      control: {
        labels: {
          none: 'No Icon',
          ...Object.keys(IconMap)
        }
      }
    },
    iconVariant: {
      control: 'inline-radio',
      options: ['default', 'black', 'secondary'],
    },
    layout: {
      control: 'inline-radio',
      options: ['default', 'truncate'],
    },
    children: {
      control: 'text',
    },
  },
  args: {
    onClick: fn(),
    variant: 'default',
    size: 'default',
    icon: null,
    iconRight: null,
    iconVariant: 'default',
    layout: 'default',
    children: 'Badge',
  }
} satisfies Meta<typeof Badge>;

export const Demo: StoryFn = (args) => {
  const Icon = () => {
    return <>{args.icon}</>;
  };
  const IconRight = () => {
    return <>{args.iconRight}</>;
  };
  return <Badge
    variant={args.variant}
    size={args.size}
    layout={args.layout}
    icon={<Icon/>}
    iconRight={<IconRight/>}>
    {args.children}
  </Badge>;
};
