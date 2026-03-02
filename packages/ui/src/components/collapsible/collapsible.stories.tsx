import type { Meta, StoryObj } from '@storybook/react';

import { Collapsible, CollapsibleContent, CollapsibleTrigger } from './collapsible';

const meta: Meta<typeof Collapsible> = {
  title: 'Components/Collapsible',
  component: Collapsible,
};

export default meta;
type Story = StoryObj<typeof Collapsible>;

export const Default: Story = {
  render: () => (
    <Collapsible className="w-[350px] space-y-2">
      <div className="flex items-center justify-between space-x-4 px-4">
        <h4 className="text-sm font-semibold">Collapsible Section</h4>
        <CollapsibleTrigger className="rounded-md border px-3 py-1 text-sm">
          Toggle
        </CollapsibleTrigger>
      </div>
      <div className="rounded-md border px-4 py-3 text-sm">Always visible item</div>
      <CollapsibleContent className="space-y-2">
        <div className="rounded-md border px-4 py-3 text-sm">Hidden item 1</div>
        <div className="rounded-md border px-4 py-3 text-sm">Hidden item 2</div>
      </CollapsibleContent>
    </Collapsible>
  ),
};

export const DefaultOpen: Story = {
  render: () => (
    <Collapsible defaultOpen className="w-[350px] space-y-2">
      <div className="flex items-center justify-between space-x-4 px-4">
        <h4 className="text-sm font-semibold">Open by default</h4>
        <CollapsibleTrigger className="rounded-md border px-3 py-1 text-sm">
          Toggle
        </CollapsibleTrigger>
      </div>
      <CollapsibleContent className="space-y-2">
        <div className="rounded-md border px-4 py-3 text-sm">Item 1</div>
        <div className="rounded-md border px-4 py-3 text-sm">Item 2</div>
      </CollapsibleContent>
    </Collapsible>
  ),
};
