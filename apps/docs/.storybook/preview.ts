import type { Preview } from '@storybook/react';

import '../src/styles.css';

const preview: Preview = {
  tags: ['autodocs'],
  parameters: {
    docs: {
      source: {
        type: 'code',
      },
    },
    backgrounds: {
      grid: { disable: true },
    },
    options: {
      storySort: {
        order: [
          'Foundations', ['Overview', 'Colors', 'Typography', 'Spacing & Layout', 'Animations'],
          'Examples',
          'Components',
        ],
      },
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  globalTypes: {
    theme: {
      description: 'Global theme for components',
      toolbar: {
        title: 'Theme',
        icon: 'circlehollow',
        items: [
          { value: 'light', icon: 'sun', title: 'Light' },
          { value: 'dark', icon: 'moon', title: 'Dark' },
        ],
        dynamicTitle: true,
      },
    },
  },
  initialGlobals: {
    theme: 'light',
  },
  decorators: [
    (Story, context) => {
      const theme = context.globals.theme;
      document.documentElement.classList.toggle('dark', theme === 'dark');
      return Story();
    },
  ],
};

export default preview;
