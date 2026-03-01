import type { Meta, StoryObj } from '@storybook/react';
import * as React from 'react';

import { Button } from '../button';

import { Toaster } from './toaster';
import { toast } from './use-toast';

const meta: Meta = {
  title: 'Components/Toast',
  decorators: [
    (Story) => (
      <>
        <Story />
        <Toaster />
      </>
    ),
  ],
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => (
    <Button onClick={() => toast({ title: 'Default Toast', description: 'This is a notification.' })}>
      Show Toast
    </Button>
  ),
};

export const Info: Story = {
  render: () => (
    <Button onClick={() => toast.info({ title: 'Info', description: 'Here is some information.' })}>
      Show Info
    </Button>
  ),
};

export const Success: Story = {
  render: () => (
    <Button onClick={() => toast.success({ title: 'Success', description: 'Operation completed.' })}>
      Show Success
    </Button>
  ),
};

export const Warning: Story = {
  render: () => (
    <Button onClick={() => toast.warning({ title: 'Warning', description: 'Please be careful.' })}>
      Show Warning
    </Button>
  ),
};

export const Error: Story = {
  render: () => (
    <Button onClick={() => toast.error({ title: 'Error', description: 'Something went wrong.' })}>
      Show Error
    </Button>
  ),
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
      <Button onClick={() => toast({ title: 'Default', description: 'Default toast.' })}>
        Default
      </Button>
      <Button onClick={() => toast.info({ title: 'Info', description: 'Info toast.' })}>
        Info
      </Button>
      <Button onClick={() => toast.success({ title: 'Success', description: 'Success toast.' })}>
        Success
      </Button>
      <Button onClick={() => toast.warning({ title: 'Warning', description: 'Warning toast.' })}>
        Warning
      </Button>
      <Button onClick={() => toast.error({ title: 'Error', description: 'Error toast.' })}>
        Error
      </Button>
    </div>
  ),
};
