import type { Meta, StoryObj } from '@storybook/react';
import { Dot } from '@/components/ui/dot';

const meta: Meta<typeof Dot> = {
  title: 'Components/UI/Dot',
  component: Dot,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Декоративный элемент в виде точки для разделения контента',
      },
    },
  },
  argTypes: {
    className: {
      control: 'text',
      description: 'Кастомизация стилей через CSS-классы',
    },
  },
};

export default meta;

type Story = StoryObj<typeof Dot>;

export const Default: Story = {
  args: {},
};

export const Customized: Story = {
  args: {
    className: 'text-red-500 text-2xl',
  },
  decorators: [
    Story => (
      <div className='flex gap-2 items-center'>
        <Story />
        <span>Custom Dot Separator</span>
        <Story />
      </div>
    ),
  ],
};
