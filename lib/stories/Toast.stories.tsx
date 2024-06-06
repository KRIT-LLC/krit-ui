import type {Meta, StoryFn} from '@storybook/react';
import {Toaster} from '@/components/ui/toaster';
import {Button} from '../components/ui/button';

export default {
  title: 'Toaster',
  component: Toaster,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {}
} satisfies Meta<typeof Toaster>;


export const Demo: StoryFn = (args) => {
  return <div>
    <Button>Вывести оповещение</Button>
    <Toaster {...args}/>
  </div>;
};
