import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import * as React from 'react';
import { describe, expect, it, vi } from 'vitest';

import { Switch } from './switch';

describe('Switch', () => {
  it('renders unchecked by default', () => {
    render(<Switch aria-label="Toggle" />);

    const switchEl = screen.getByRole('switch');
    expect(switchEl).toBeInTheDocument();
    expect(switchEl).toHaveAttribute('data-state', 'unchecked');
  });

  it('toggles on click', async () => {
    const user = userEvent.setup();
    render(<Switch aria-label="Toggle" />);

    const switchEl = screen.getByRole('switch');
    expect(switchEl).toHaveAttribute('data-state', 'unchecked');

    await user.click(switchEl);
    expect(switchEl).toHaveAttribute('data-state', 'checked');

    await user.click(switchEl);
    expect(switchEl).toHaveAttribute('data-state', 'unchecked');
  });

  it('renders as checked when defaultChecked', () => {
    render(<Switch aria-label="Toggle" defaultChecked />);

    const switchEl = screen.getByRole('switch');
    expect(switchEl).toHaveAttribute('data-state', 'checked');
  });

  it('handles disabled state', async () => {
    const user = userEvent.setup();
    const onCheckedChange = vi.fn();
    render(<Switch aria-label="Toggle" disabled onCheckedChange={onCheckedChange} />);

    const switchEl = screen.getByRole('switch');
    expect(switchEl).toBeDisabled();

    await user.click(switchEl);
    expect(onCheckedChange).not.toHaveBeenCalled();
    expect(switchEl).toHaveAttribute('data-state', 'unchecked');
  });

  it('forwards ref', () => {
    const ref = React.createRef<HTMLButtonElement>();
    render(<Switch aria-label="Toggle" ref={ref} />);

    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
  });

  it('calls onCheckedChange when toggled', async () => {
    const user = userEvent.setup();
    const onCheckedChange = vi.fn();
    render(<Switch aria-label="Toggle" onCheckedChange={onCheckedChange} />);

    await user.click(screen.getByRole('switch'));
    expect(onCheckedChange).toHaveBeenCalledWith(true);

    await user.click(screen.getByRole('switch'));
    expect(onCheckedChange).toHaveBeenCalledWith(false);
  });

  it('applies custom className', () => {
    render(<Switch aria-label="Toggle" className="custom-class" />);
    expect(screen.getByRole('switch')).toHaveClass('custom-class');
  });
});
