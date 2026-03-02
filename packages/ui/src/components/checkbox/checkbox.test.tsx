import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import * as React from 'react';
import { describe, expect, it, vi } from 'vitest';

import { Checkbox } from './checkbox';

describe('Checkbox', () => {
  it('renders unchecked by default', () => {
    render(<Checkbox aria-label="test checkbox" />);
    const checkbox = screen.getByRole('checkbox', { name: 'test checkbox' });
    expect(checkbox).toBeInTheDocument();
    expect(checkbox).not.toBeChecked();
  });

  it('toggles on click', async () => {
    const user = userEvent.setup();
    render(<Checkbox aria-label="test checkbox" />);

    const checkbox = screen.getByRole('checkbox', { name: 'test checkbox' });
    expect(checkbox).not.toBeChecked();

    await user.click(checkbox);
    expect(checkbox).toBeChecked();

    await user.click(checkbox);
    expect(checkbox).not.toBeChecked();
  });

  it('renders as checked when defaultChecked', () => {
    render(<Checkbox aria-label="test checkbox" defaultChecked />);
    expect(screen.getByRole('checkbox', { name: 'test checkbox' })).toBeChecked();
  });

  it('handles disabled state', async () => {
    const user = userEvent.setup();
    render(<Checkbox aria-label="test checkbox" disabled />);

    const checkbox = screen.getByRole('checkbox', { name: 'test checkbox' });
    expect(checkbox).toBeDisabled();

    await user.click(checkbox);
    expect(checkbox).not.toBeChecked();
  });

  it('forwards ref', () => {
    const ref = React.createRef<HTMLButtonElement>();
    render(<Checkbox ref={ref} aria-label="test checkbox" />);
    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
  });

  it('calls onCheckedChange when toggled', async () => {
    const user = userEvent.setup();
    const onCheckedChange = vi.fn();
    render(<Checkbox aria-label="test checkbox" onCheckedChange={onCheckedChange} />);

    await user.click(screen.getByRole('checkbox', { name: 'test checkbox' }));
    expect(onCheckedChange).toHaveBeenCalledWith(true);
  });
});
