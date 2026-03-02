import type { Meta, StoryObj } from '@storybook/react';

import { Checkbox } from './checkbox';

const meta: Meta<typeof Checkbox> = {
  title: 'Components/Checkbox',
  component: Checkbox,
  argTypes: {
    disabled: { control: 'boolean' },
    defaultChecked: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof Checkbox>;

export const Default: Story = {
  args: {
    'aria-label': 'Default checkbox',
  },
};

export const Checked: Story = {
  args: {
    defaultChecked: true,
    'aria-label': 'Checked checkbox',
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    'aria-label': 'Disabled checkbox',
  },
};

export const WithLabel: Story = {
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
      <Checkbox id="terms-checkbox" />
      <label htmlFor="terms-checkbox">Accept terms and conditions</label>
    </div>
  ),
};
