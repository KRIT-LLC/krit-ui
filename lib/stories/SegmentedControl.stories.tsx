import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { CheckIcon, XIcon } from 'lucide-react';
import { SegmentedControl } from '@/components/ui/segmented-control';

const meta = {
  title: 'SegmentedControl',
  component: SegmentedControl,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof SegmentedControl>;

export default meta;

export const Demo: StoryObj<typeof meta> = {
  render: args => {
    const [value, setValue] = useState(args.defaultValue);

    return (
      <SegmentedControl {...args} defaultValue={value} onClick={newValue => setValue(newValue)} />
    );
  },
  args: {
    defaultValue: 'active',
    options: [
      { label: 'Active', value: 'active', icon: <CheckIcon /> },
      { label: 'Inactive', value: 'inactive', icon: <XIcon /> },
    ],
  },
};
