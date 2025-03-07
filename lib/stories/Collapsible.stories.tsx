import { useState } from 'react';
import type { Meta, StoryFn } from '@storybook/react';
import { ChevronRightIcon } from 'lucide-react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Separator } from '@/components/ui/separator';

const meta = {
  title: 'Collapsible',
  component: Collapsible,
  tags: ['autodocs'],
  argTypes: {},
} satisfies Meta<typeof Collapsible>;

export default meta;

export const Demo: StoryFn = () => {
  const [open, setOpen] = useState(false);

  return (
    <Collapsible open={open} onOpenChange={() => setOpen(!open)}>
      <CollapsibleTrigger className='flex'>
        <ChevronRightIcon className={`transition ${open ? 'rotate-90' : ''}`} />
        Trigger
      </CollapsibleTrigger>
      <Separator />
      <CollapsibleContent>Content</CollapsibleContent>
    </Collapsible>
  );
};
