import type { Meta, StoryObj } from '@storybook/react';

import { Badge } from './badge';

const meta: Meta<typeof Badge> = {
  title: 'Components/Badge',
  component: Badge,
  argTypes: {
    variant: {
      control: 'select',
      options: [
        'default',
        'secondary',
        'destructive',
        'outline',
        'success',
        'warning',
        'info',
      ],
    },
  },
  args: {
    children: 'Badge',
  },
};

export default meta;
type Story = StoryObj<typeof Badge>;

export const Default: Story = {};

export const Secondary: Story = {
  args: { variant: 'secondary', children: 'Secondary' },
};

export const Destructive: Story = {
  args: { variant: 'destructive', children: 'Destructive' },
};

export const Outline: Story = {
  args: { variant: 'outline', children: 'Outline' },
};

export const Success: Story = {
  args: { variant: 'success', children: 'Success' },
};

export const Warning: Story = {
  args: { variant: 'warning', children: 'Warning' },
};

export const Info: Story = {
  args: { variant: 'info', children: 'Info' },
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-2">
      <Badge>Default</Badge>
      <Badge variant="secondary">Secondary</Badge>
      <Badge variant="destructive">Destructive</Badge>
      <Badge variant="outline">Outline</Badge>
      <Badge variant="success">Success</Badge>
      <Badge variant="warning">Warning</Badge>
      <Badge variant="info">Info</Badge>
    </div>
  ),
};
