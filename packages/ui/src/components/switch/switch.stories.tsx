import type { Meta, StoryObj } from '@storybook/react';

import { Switch } from './switch';

const meta: Meta<typeof Switch> = {
  title: 'Components/Switch',
  component: Switch,
  argTypes: {
    checked: { control: 'boolean' },
    disabled: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof Switch>;

export const Default: Story = {
  args: {
    'aria-label': 'Toggle',
  },
};

export const Checked: Story = {
  args: {
    'aria-label': 'Toggle',
    defaultChecked: true,
  },
};

export const Disabled: Story = {
  args: {
    'aria-label': 'Toggle',
    disabled: true,
  },
};

export const WithLabel: Story = {
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
      <Switch id="airplane-mode" />
      <label htmlFor="airplane-mode">Airplane Mode</label>
    </div>
  ),
};
