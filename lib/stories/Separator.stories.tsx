import type {Meta, StoryFn} from '@storybook/react';
import {Separator} from '@/components/ui/separator.tsx';


export default {
  title: 'Separator',
  component: Separator,
  tags: ['autodocs'],
  argTypes: {
    orientation: {
      control: 'inline-radio',
      options: ['horizontal', 'vertical'],
      mapping: {
        horizontal: 'horizontal',
        vertical: 'vertical'
      },
    },
    decorative: {
      control: false,
    },
  },
  args: {}
} satisfies Meta<typeof Separator>;

export const Demo: StoryFn = (args) => {
  return <div style={{width: '100%', height: 300}}>
    <Separator className="bg-line-error" {...args} />
  </div>
};
