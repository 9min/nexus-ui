import type { Meta, StoryObj } from '@storybook/react';

import { Button } from '../button';

import { Popover, PopoverContent, PopoverTrigger } from './popover';

const meta: Meta<typeof Popover> = {
  title: 'Components/Popover',
  component: Popover,
};

export default meta;
type Story = StoryObj<typeof Popover>;

export const Default: Story = {
  render: () => (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">Open Popover</Button>
      </PopoverTrigger>
      <PopoverContent>
        <p className="text-sm text-muted-foreground">
          This is the popover content. It can contain any elements.
        </p>
      </PopoverContent>
    </Popover>
  ),
};

export const WithForm: Story = {
  render: () => (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">Update Settings</Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="grid gap-4">
          <div className="space-y-2">
            <h4 className="font-medium leading-none">Settings</h4>
            <p className="text-sm text-muted-foreground">Configure your preferences.</p>
          </div>
          <div className="grid gap-2">
            <label className="text-sm font-medium" htmlFor="width">
              Width
            </label>
            <input
              id="width"
              type="text"
              defaultValue="100%"
              className="h-8 rounded-md border border-input bg-background px-3 text-sm"
            />
            <label className="text-sm font-medium" htmlFor="height">
              Height
            </label>
            <input
              id="height"
              type="text"
              defaultValue="auto"
              className="h-8 rounded-md border border-input bg-background px-3 text-sm"
            />
          </div>
        </div>
      </PopoverContent>
    </Popover>
  ),
};
