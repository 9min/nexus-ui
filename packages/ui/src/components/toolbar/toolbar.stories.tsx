import type { Meta, StoryObj } from '@storybook/react';

import {
  Toolbar,
  ToolbarButton,
  ToolbarLink,
  ToolbarSeparator,
  ToolbarToggleGroup,
  ToolbarToggleItem,
} from './toolbar';

const meta: Meta<typeof Toolbar> = {
  title: 'Components/Toolbar',
  component: Toolbar,
};

export default meta;
type Story = StoryObj<typeof Toolbar>;

export const Default: Story = {
  render: () => (
    <Toolbar aria-label="Text formatting">
      <ToolbarToggleGroup type="multiple" aria-label="Text style">
        <ToolbarToggleItem value="bold" aria-label="Bold">
          B
        </ToolbarToggleItem>
        <ToolbarToggleItem value="italic" aria-label="Italic">
          I
        </ToolbarToggleItem>
        <ToolbarToggleItem value="underline" aria-label="Underline">
          U
        </ToolbarToggleItem>
      </ToolbarToggleGroup>
      <ToolbarSeparator />
      <ToolbarLink href="#" aria-label="Documentation">
        Docs
      </ToolbarLink>
    </Toolbar>
  ),
};

export const WithButtons: Story = {
  render: () => (
    <Toolbar aria-label="Actions">
      <ToolbarButton aria-label="Copy">Copy</ToolbarButton>
      <ToolbarButton aria-label="Paste">Paste</ToolbarButton>
      <ToolbarSeparator />
      <ToolbarButton aria-label="Undo">Undo</ToolbarButton>
      <ToolbarButton aria-label="Redo">Redo</ToolbarButton>
    </Toolbar>
  ),
};

export const SingleToggleGroup: Story = {
  render: () => (
    <Toolbar aria-label="Text alignment">
      <ToolbarToggleGroup type="single" defaultValue="left" aria-label="Alignment">
        <ToolbarToggleItem value="left" aria-label="Align left">
          Left
        </ToolbarToggleItem>
        <ToolbarToggleItem value="center" aria-label="Align center">
          Center
        </ToolbarToggleItem>
        <ToolbarToggleItem value="right" aria-label="Align right">
          Right
        </ToolbarToggleItem>
      </ToolbarToggleGroup>
    </Toolbar>
  ),
};

export const Combined: Story = {
  render: () => (
    <Toolbar aria-label="Editor toolbar">
      <ToolbarToggleGroup type="multiple" aria-label="Text style">
        <ToolbarToggleItem value="bold" aria-label="Bold">
          B
        </ToolbarToggleItem>
        <ToolbarToggleItem value="italic" aria-label="Italic">
          I
        </ToolbarToggleItem>
        <ToolbarToggleItem value="underline" aria-label="Underline">
          U
        </ToolbarToggleItem>
      </ToolbarToggleGroup>
      <ToolbarSeparator />
      <ToolbarToggleGroup type="single" defaultValue="left" aria-label="Alignment">
        <ToolbarToggleItem value="left" aria-label="Align left">
          Left
        </ToolbarToggleItem>
        <ToolbarToggleItem value="center" aria-label="Align center">
          Center
        </ToolbarToggleItem>
        <ToolbarToggleItem value="right" aria-label="Align right">
          Right
        </ToolbarToggleItem>
      </ToolbarToggleGroup>
      <ToolbarSeparator />
      <ToolbarButton aria-label="Save">Save</ToolbarButton>
      <ToolbarLink href="#" aria-label="Help">
        Help
      </ToolbarLink>
    </Toolbar>
  ),
};
