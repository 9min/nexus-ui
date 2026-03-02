import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import { RadioGroup, RadioGroupItem } from './radio-group';

function TestRadioGroup({
  defaultValue,
  onValueChange,
}: {
  defaultValue?: string;
  onValueChange?: (value: string) => void;
}) {
  return (
    <RadioGroup defaultValue={defaultValue} onValueChange={onValueChange}>
      <div>
        <RadioGroupItem value="apple" id="apple" />
        <label htmlFor="apple">Apple</label>
      </div>
      <div>
        <RadioGroupItem value="banana" id="banana" />
        <label htmlFor="banana">Banana</label>
      </div>
      <div>
        <RadioGroupItem value="cherry" id="cherry" />
        <label htmlFor="cherry">Cherry</label>
      </div>
    </RadioGroup>
  );
}

describe('RadioGroup', () => {
  it('renders radio group with items', () => {
    render(<TestRadioGroup />);

    const radios = screen.getAllByRole('radio');
    expect(radios).toHaveLength(3);
  });

  it('selects item on click', async () => {
    const user = userEvent.setup();
    render(<TestRadioGroup />);

    const appleRadio = screen.getByRole('radio', { name: 'Apple' });
    expect(appleRadio).not.toBeChecked();

    await user.click(appleRadio);
    expect(appleRadio).toBeChecked();
  });

  it('renders with default value', () => {
    render(<TestRadioGroup defaultValue="banana" />);

    expect(screen.getByRole('radio', { name: 'Banana' })).toBeChecked();
    expect(screen.getByRole('radio', { name: 'Apple' })).not.toBeChecked();
  });

  it('calls onValueChange when selection changes', async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();
    render(<TestRadioGroup onValueChange={onValueChange} />);

    await user.click(screen.getByRole('radio', { name: 'Cherry' }));
    expect(onValueChange).toHaveBeenCalledWith('cherry');
  });

  it('has correct radiogroup role', () => {
    render(<TestRadioGroup />);

    expect(screen.getByRole('radiogroup')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    render(
      <RadioGroup className="custom-class">
        <RadioGroupItem value="a" aria-label="Option A" />
      </RadioGroup>
    );

    expect(screen.getByRole('radiogroup')).toHaveClass('custom-class');
  });
});
