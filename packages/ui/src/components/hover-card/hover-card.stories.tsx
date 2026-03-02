import type { Meta, StoryObj } from '@storybook/react';

import { HoverCard, HoverCardContent, HoverCardTrigger } from './hover-card';

const meta: Meta<typeof HoverCard> = {
  title: 'Components/HoverCard',
  component: HoverCard,
};

export default meta;
type Story = StoryObj<typeof HoverCard>;

export const Default: Story = {
  render: () => (
    <HoverCard>
      <HoverCardTrigger asChild>
        <a href="/profile" className="text-sm font-medium underline underline-offset-4">
          @nexus-ui
        </a>
      </HoverCardTrigger>
      <HoverCardContent>
        <div className="space-y-2">
          <h4 className="text-sm font-semibold">@nexus-ui</h4>
          <p className="text-sm text-muted-foreground">
            Enterprise-grade design system built with Radix UI and Tailwind CSS.
          </p>
          <div className="flex items-center pt-2">
            <span className="text-xs text-muted-foreground">Joined December 2024</span>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  ),
};
