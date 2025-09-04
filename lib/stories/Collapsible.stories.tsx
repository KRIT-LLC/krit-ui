import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { ChevronUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { CollapsibleSection } from '@/components/ui/collapsible-section';
import { cn } from '@/utils';

const meta: Meta<typeof CollapsibleSection> = {
  title: 'Components/UI/Collapsible Section',
  component: CollapsibleSection,
  tags: ['autodocs'],
  argTypes: {
    defaultExpanded: { control: 'boolean' },
    isLoading: { control: 'boolean' },
    isError: { control: 'boolean' },
    onRefetch: { action: 'refetch' },
    onAdd: { action: 'add' },
  },
  parameters: {
    docs: {
      description: {
        component:
          'Раскрывающаяся секция с поддержкой состояний загрузки, ошибок и динамическим контентом',
      },
    },
  },
  decorators: [
    Story => (
      <div className='max-w-2xl p-6 bg-background-primary rounded-xl'>
        <Story />
      </div>
    ),
  ],
};

export default meta;

const sampleContent = (
  <div className='space-y-2'>
    {[...Array(3)].map((_, i) => (
      <div key={i} className='p-3 bg-background-secondary rounded'>
        Item {i + 1}
      </div>
    ))}
  </div>
);

export const BasicUsage: StoryObj<typeof Collapsible> = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <Collapsible open={isOpen} onOpenChange={setIsOpen} className='w-[350px] space-y-2'>
        <div className='flex items-center justify-between space-x-4 px-4'>
          <h4 className='text-sm font-semibold'>Basic Collapsible Example</h4>
          <CollapsibleTrigger asChild>
            <Button variant='ghost' size='sm'>
              <ChevronUp
                className={cn('h-4 w-4 transition-transform', isOpen ? 'rotate-0' : 'rotate-180')}
              />
              <span className='sr-only'>{isOpen ? 'Collapse' : 'Expand'}</span>
            </Button>
          </CollapsibleTrigger>
        </div>

        <CollapsibleContent className='space-y-2'>
          <div className='rounded-md border px-4 py-3 font-mono text-sm'>Collapsible Content</div>
          <div className='rounded-md border px-4 py-3 font-mono text-sm'>
            Additional Information
          </div>
        </CollapsibleContent>
      </Collapsible>
    );
  },
};

export const Default: StoryObj<typeof CollapsibleSection> = {
  args: {
    title: 'Section Title',
    children: sampleContent,
    count: 3,
  },
};

export const ExpandedByDefault: StoryObj<typeof CollapsibleSection> = {
  args: {
    ...Default.args,
    defaultExpanded: true,
  },
};

export const WithLoadingState: StoryObj<typeof CollapsibleSection> = {
  args: {
    ...Default.args,
    isLoading: true,
  },
};

export const WithErrorState: StoryObj<typeof CollapsibleSection> = {
  args: {
    ...Default.args,
    isError: true,
  },
};

export const WithCustomActions: StoryObj<typeof CollapsibleSection> = {
  args: {
    ...Default.args,
    right: <Button variant='ghost'>Settings</Button>,
    icon: <span>📁</span>,
  },
};

export const EmptyState: StoryObj<typeof CollapsibleSection> = {
  args: {
    ...Default.args,
    count: 0,
    placeholder: 'No items found',
  },
};
