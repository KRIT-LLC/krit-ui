import type { Meta, StoryFn } from '@storybook/react';
import { Toaster } from '@/components/ui/toaster';
import { ToastAction } from '@/components/ui/toast';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/useToast';

export default {
  title: 'Toaster',
  component: Toaster,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Toaster>;

export const Demo: StoryFn = (args) => {
  const { toast } = useToast();

  const makeToast = () => toast(
    { title: 'Toast Title', description: 'Toast Description', variant: 'default' }
  );
  const makeError = () => toast(
    { title: 'Toast Title', description: 'Toast Description', variant: 'destructive' }
  );
  const makeSuccess = () => toast(
    {
      title: 'Toast Title',
      description: 'Toast Description',
      variant: 'success',
    }
  );
  const makeToastWithAction = () => toast(
    {
      title: 'Toast Title',
      description: 'Toast Description',
      variant: 'success',
      action: <ToastAction altText="Try again">Try again</ToastAction>,
    }
  );

  return (
    <>
      <div style={{display: 'flex', gap: '1rem', flexDirection: 'column'}}>
        <Button onClick={makeToast}>Make toast</Button>
        <Button onClick={makeError} variant='destructive'>Make error</Button>
        <Button onClick={makeSuccess}>Make success</Button>
        <div>Для тоста с кнопкой необходимо доработать верстку</div>
        <Button onClick={makeToastWithAction}>Make toast with action button</Button>
      </div>
      <Toaster {...args} />
    </>
  );
};
