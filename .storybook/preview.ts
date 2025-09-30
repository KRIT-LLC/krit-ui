import type { Preview } from '@storybook/react';
import '../lib/tailwind.css';
import { withI18n } from './decorators/withI18next';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  decorators: [withI18n],
};

export default preview;
