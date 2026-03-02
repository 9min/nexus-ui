import type { Meta, StoryObj } from '@storybook/react';

import { Textarea } from './textarea';

const meta: Meta<typeof Textarea> = {
  title: 'Components/Textarea',
  component: Textarea,
  argTypes: {
    disabled: { control: 'boolean' },
    placeholder: { control: 'text' },
    rows: { control: 'number' },
  },
};

export default meta;
type Story = StoryObj<typeof Textarea>;

export const Default: Story = {
  args: {},
};

export const WithPlaceholder: Story = {
  args: {
    placeholder: 'Type your message here...',
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    placeholder: 'Disabled textarea',
  },
};

export const WithLabel: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
      <label htmlFor="message-textarea">Your message</label>
      <Textarea id="message-textarea" placeholder="Type your message here..." />
    </div>
  ),
};
