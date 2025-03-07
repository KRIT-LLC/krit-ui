import type { Meta, StoryFn } from '@storybook/react';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/utils';

export default {
  title: 'Skeleton',
  component: Skeleton,
  tags: ['autodocs'],
  argTypes: {
    className: {
      control: {
        type: 'text',
      },
    },
  },
} satisfies Meta<typeof Skeleton>;

export const Demo: StoryFn = args => {
  return (
    <div className='flex flex-col space-y-3'>
      <Skeleton className={cn('h-[125px] w-[250px] rounded-xl', args.className)} />
      <div className='space-y-2'>
        <Skeleton className={cn('h-4 w-[250px]', args.className)} />
        <Skeleton className={cn('h-4 w-[250px]', args.className)} />
      </div>
    </div>
  );
};
