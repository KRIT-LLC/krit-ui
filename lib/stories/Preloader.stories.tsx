import type {Meta, StoryObj} from '@storybook/react';
import {Preloader} from '@/components/ui/preloader';

const meta = {
  title: 'Preloader',
  component: Preloader,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {}
} satisfies Meta<typeof Preloader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Demo: Story = {};
