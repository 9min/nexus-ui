import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import { Popover, PopoverContent, PopoverTrigger } from './popover';

function TestPopover({ onOpenChange }: { onOpenChange?: (open: boolean) => void }) {
  return (
    <Popover onOpenChange={onOpenChange}>
      <PopoverTrigger>Open Popover</PopoverTrigger>
      <PopoverContent>
        <p>Popover content</p>
      </PopoverContent>
    </Popover>
  );
}

describe('Popover', () => {
  it('renders the trigger element', () => {
    render(<TestPopover />);
    expect(screen.getByText('Open Popover')).toBeInTheDocument();
  });

  it('opens when trigger is clicked', async () => {
    const user = userEvent.setup();
    render(<TestPopover />);

    await user.click(screen.getByText('Open Popover'));

    await waitFor(() => {
      expect(screen.getByText('Popover content')).toBeInTheDocument();
    });
  });

  it('closes when Escape key is pressed', async () => {
    const user = userEvent.setup();
    render(<TestPopover />);

    await user.click(screen.getByText('Open Popover'));

    await waitFor(() => {
      expect(screen.getByText('Popover content')).toBeInTheDocument();
    });

    await user.keyboard('{Escape}');

    await waitFor(() => {
      expect(screen.queryByText('Popover content')).not.toBeInTheDocument();
    });
  });

  it('calls onOpenChange when opened and closed', async () => {
    const user = userEvent.setup();
    const onOpenChange = vi.fn();
    render(<TestPopover onOpenChange={onOpenChange} />);

    await user.click(screen.getByText('Open Popover'));
    expect(onOpenChange).toHaveBeenCalledWith(true);

    await user.keyboard('{Escape}');
    await waitFor(() => {
      expect(onOpenChange).toHaveBeenCalledWith(false);
    });
  });
});
