import type { Meta, StoryFn } from '@storybook/react';
import { NetworkErrorMessage } from '@/components/ui/network-error-message';

const meta = {
  title: 'NetworkErrorMessage',
  component: NetworkErrorMessage,
  tags: ['autodocs'],
  argTypes: {},
} satisfies Meta<typeof NetworkErrorMessage>;

export default meta;

export const Demo: StoryFn = () => {
  return <NetworkErrorMessage isError onRefetch={() => {}} />;
};
