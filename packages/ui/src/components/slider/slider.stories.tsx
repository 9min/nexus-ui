import type { Meta, StoryObj } from '@storybook/react';

import { Slider } from './slider';

const meta: Meta<typeof Slider> = {
  title: 'Components/Slider',
  component: Slider,
};

export default meta;
type Story = StoryObj<typeof Slider>;

export const Default: Story = {
  args: {
    defaultValue: [50],
    'aria-label': 'Value',
  },
};

export const Range: Story = {
  args: {
    defaultValue: [30],
    min: 0,
    max: 100,
    step: 10,
    'aria-label': 'Range',
  },
};

export const WithLabel: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', width: 300 }}>
      <label htmlFor="volume-slider" style={{ fontSize: '0.875rem', fontWeight: 500 }}>
        Volume
      </label>
      <Slider id="volume-slider" defaultValue={[50]} aria-label="Volume" />
    </div>
  ),
};
