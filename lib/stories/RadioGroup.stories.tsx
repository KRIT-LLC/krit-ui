import type { Meta, StoryFn } from '@storybook/react';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

const meta = {
  title: 'RadioGroup',
  component: RadioGroup,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {},
} satisfies Meta<typeof RadioGroup>;

export default meta;

export const Demo: StoryFn = () => {
  return (
    <RadioGroup defaultValue='active'>
      <div className='flex items-center gap-2'>
        <RadioGroupItem value='Active' id='active' />
        <Label htmlFor='active'>Active</Label>
      </div>
      <div className='flex items-center gap-2'>
        <RadioGroupItem value='Inactive' id='inactive' />
        <Label htmlFor='inactive'>Inactive</Label>
      </div>
    </RadioGroup>
  );
};
