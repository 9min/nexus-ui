import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import * as React from 'react';
import { describe, expect, it, vi } from 'vitest';

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './select';

function TestSelect({ onValueChange }: { onValueChange?: (value: string) => void }) {
  return (
    <Select onValueChange={onValueChange}>
      <SelectTrigger aria-label="Fruit">
        <SelectValue placeholder="Select a fruit" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="apple">Apple</SelectItem>
        <SelectItem value="banana">Banana</SelectItem>
        <SelectItem value="cherry">Cherry</SelectItem>
      </SelectContent>
    </Select>
  );
}

describe('Select', () => {
  it('renders trigger with placeholder', () => {
    render(<TestSelect />);
    expect(screen.getByText('Select a fruit')).toBeInTheDocument();
  });

  it('opens dropdown when trigger is clicked', async () => {
    const user = userEvent.setup();
    render(<TestSelect />);

    await user.click(screen.getByLabelText('Fruit'));

    expect(screen.getByText('Apple')).toBeInTheDocument();
    expect(screen.getByText('Banana')).toBeInTheDocument();
    expect(screen.getByText('Cherry')).toBeInTheDocument();
  });

  it('selects an item and calls onValueChange', async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();
    render(<TestSelect onValueChange={onValueChange} />);

    await user.click(screen.getByLabelText('Fruit'));
    await user.click(screen.getByText('Banana'));

    expect(onValueChange).toHaveBeenCalledWith('banana');
  });

  it('has correct combobox role on trigger', () => {
    render(<TestSelect />);
    expect(screen.getByRole('combobox')).toBeInTheDocument();
  });
});
