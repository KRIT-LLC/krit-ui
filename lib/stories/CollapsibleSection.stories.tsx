import type { StoryFn } from '@storybook/react';
import { CollapsibleSection } from '@/components/ui/collapsible-section';

const Demo: StoryFn = (args) => {
  return <CollapsibleSection title={''} {...args} />;
};

export default Demo;
