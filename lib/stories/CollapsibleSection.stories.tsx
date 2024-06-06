import type { Meta, StoryObj } from '@storybook/react';
import { CollapsibleSection } from '@/components/ui/collapsible-section';

const meta = {
  title: 'CollapsibleSection',
  component: CollapsibleSection,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {},
} satisfies Meta<typeof CollapsibleSection>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Demo: Story = {
  args: {
    title: 'Title',
    count: 12,
  },
};
