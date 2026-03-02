import type { Meta, StoryObj } from '@storybook/react';

import { Button } from '../button';

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './tooltip';

const meta: Meta<typeof Tooltip> = {
  title: 'Components/Tooltip',
  component: Tooltip,
  decorators: [
    (Story) => (
      <TooltipProvider>
        <Story />
      </TooltipProvider>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Tooltip>;

export const Default: Story = {
  render: () => (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button variant="outline">Hover me</Button>
      </TooltipTrigger>
      <TooltipContent>
        <p>This is a tooltip</p>
      </TooltipContent>
    </Tooltip>
  ),
};

export const WithArrow: Story = {
  render: () => (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button variant="outline">With Arrow</Button>
      </TooltipTrigger>
      <TooltipContent>
        <p>Tooltip with additional content</p>
      </TooltipContent>
    </Tooltip>
  ),
};

export const Positioned: Story = {
  render: () => (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button variant="outline">Bottom Tooltip</Button>
      </TooltipTrigger>
      <TooltipContent side="bottom">
        <p>This tooltip appears below</p>
      </TooltipContent>
    </Tooltip>
  ),
};
