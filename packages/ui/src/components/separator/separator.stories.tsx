import type { Meta, StoryObj } from '@storybook/react';

import { Separator } from './separator';

const meta: Meta<typeof Separator> = {
  title: 'Components/Separator',
  component: Separator,
};

export default meta;
type Story = StoryObj<typeof Separator>;

export const Default: Story = {};

export const Vertical: Story = {
  render: () => (
    <div className="flex h-5 items-center space-x-4 text-sm">
      <span>Blog</span>
      <Separator orientation="vertical" />
      <span>Docs</span>
      <Separator orientation="vertical" />
      <span>Source</span>
    </div>
  ),
};

export const InContent: Story = {
  render: () => (
    <div className="space-y-1">
      <h4 className="text-sm font-medium leading-none">Nexus UI</h4>
      <p className="text-sm text-muted-foreground">
        An enterprise design system built with Radix UI and Tailwind CSS.
      </p>
      <Separator className="my-4" />
      <div className="flex h-5 items-center space-x-4 text-sm">
        <span>Components</span>
        <Separator orientation="vertical" />
        <span>Hooks</span>
        <Separator orientation="vertical" />
        <span>Tokens</span>
      </div>
    </div>
  ),
};
