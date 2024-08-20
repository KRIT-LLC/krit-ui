import type { StoryFn } from '@storybook/react';
import { NetworkErrorMessage } from '@/components/ui/network-error-message';

export const Demo: StoryFn = () => {
  return <NetworkErrorMessage />;
};

export default Demo;
