import type { Meta, StoryObj } from '@storybook/react';

import { ScrollArea, ScrollBar } from './scroll-area';

const meta: Meta<typeof ScrollArea> = {
  title: 'Components/ScrollArea',
  component: ScrollArea,
};

export default meta;
type Story = StoryObj<typeof ScrollArea>;

export const Default: Story = {
  render: () => (
    <ScrollArea style={{ height: 300 }}>
      <div style={{ padding: '1rem' }}>
        {Array.from({ length: 50 }, (_, i) => (
          <div key={i} style={{ padding: '0.25rem 0' }}>
            Item {i + 1}
          </div>
        ))}
      </div>
    </ScrollArea>
  ),
};

export const Horizontal: Story = {
  render: () => (
    <ScrollArea style={{ width: 300 }}>
      <div style={{ display: 'flex', gap: '1rem', padding: '1rem', width: 1200 }}>
        {Array.from({ length: 20 }, (_, i) => (
          <div
            key={i}
            style={{
              flexShrink: 0,
              width: 100,
              height: 100,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: '0.5rem',
              border: '1px solid #e5e7eb',
            }}
          >
            Item {i + 1}
          </div>
        ))}
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  ),
};
