import type { Meta, StoryFn } from '@storybook/react';
import { Toaster } from '@/components/ui/toaster';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/useToast';

export default {
  title: 'Toaster',
  component: Toaster,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {},
} satisfies Meta<typeof Toaster>;

export const Demo: StoryFn = (args) => {
  const { toast } = useToast();

  const makeToast = () => toast({ title: 'Toast Title', description: 'Toast Description' });

  return (
    <>
      <Button onClick={makeToast}>Make toast</Button>
      <Toaster {...args} />
    </>
  );
};
