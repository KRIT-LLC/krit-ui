import type {Meta, StoryObj} from '@storybook/react';
import {Form} from '@/components/ui/form';
import {useForm} from 'react-hook-form';

const meta = {
  title: 'Form',
  component: Form,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {}
} satisfies Meta<typeof Form>;

export default meta;
type Story = StoryObj<typeof meta>;

const form = useForm();

export const Demo: Story = {
  args: {
    ...form,
    children: 'Form',
  },
};
