import type { Meta, StoryObj } from '@storybook/react';

import { RadioGroup, RadioGroupItem } from './radio-group';

const meta: Meta<typeof RadioGroup> = {
  title: 'Components/RadioGroup',
  component: RadioGroup,
};

export default meta;
type Story = StoryObj<typeof RadioGroup>;

export const Default: Story = {
  render: () => (
    <RadioGroup defaultValue="option-1">
      <RadioGroupItem value="option-1" id="option-1" />
      <RadioGroupItem value="option-2" id="option-2" />
      <RadioGroupItem value="option-3" id="option-3" />
    </RadioGroup>
  ),
};

export const WithLabels: Story = {
  render: () => (
    <RadioGroup defaultValue="comfortable">
      <div className="flex items-center gap-2">
        <RadioGroupItem value="default" id="r1" />
        <label htmlFor="r1">Default</label>
      </div>
      <div className="flex items-center gap-2">
        <RadioGroupItem value="comfortable" id="r2" />
        <label htmlFor="r2">Comfortable</label>
      </div>
      <div className="flex items-center gap-2">
        <RadioGroupItem value="compact" id="r3" />
        <label htmlFor="r3">Compact</label>
      </div>
    </RadioGroup>
  ),
};

export const Disabled: Story = {
  render: () => (
    <RadioGroup defaultValue="option-1" disabled>
      <div className="flex items-center gap-2">
        <RadioGroupItem value="option-1" id="d1" />
        <label htmlFor="d1">Option 1</label>
      </div>
      <div className="flex items-center gap-2">
        <RadioGroupItem value="option-2" id="d2" />
        <label htmlFor="d2">Option 2</label>
      </div>
    </RadioGroup>
  ),
};
