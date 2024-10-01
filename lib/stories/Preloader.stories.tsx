import type { Meta, StoryFn } from '@storybook/react';
import { Preloader } from '@/components/ui/preloader';

const meta = {
  title: 'Preloader',
  component: Preloader,
  tags: ['autodocs'],
  argTypes: {},
} satisfies Meta<typeof Preloader>;

export default meta;

export const Demo: StoryFn = () => {
  return <Preloader />;
};
