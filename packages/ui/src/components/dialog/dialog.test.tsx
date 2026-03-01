import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import * as React from 'react';
import { describe, expect, it, vi } from 'vitest';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './dialog';

function TestDialog({ onOpenChange }: { onOpenChange?: (open: boolean) => void }) {
  return (
    <Dialog onOpenChange={onOpenChange}>
      <DialogTrigger>Open Dialog</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Test Title</DialogTitle>
          <DialogDescription>Test Description</DialogDescription>
        </DialogHeader>
        <p>Dialog body content</p>
        <DialogFooter>
          <button>Cancel</button>
          <button>Save</button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

describe('Dialog', () => {
  it('opens when trigger is clicked', async () => {
    const user = userEvent.setup();
    render(<TestDialog />);

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();

    await user.click(screen.getByText('Open Dialog'));

    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByText('Test Title')).toBeInTheDocument();
    expect(screen.getByText('Test Description')).toBeInTheDocument();
  });

  it('closes when close button is clicked', async () => {
    const user = userEvent.setup();
    render(<TestDialog />);

    await user.click(screen.getByText('Open Dialog'));
    expect(screen.getByRole('dialog')).toBeInTheDocument();

    await user.click(screen.getByLabelText('Close'));

    await waitFor(() => {
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    });
  });

  it('closes when ESC key is pressed', async () => {
    const user = userEvent.setup();
    render(<TestDialog />);

    await user.click(screen.getByText('Open Dialog'));
    expect(screen.getByRole('dialog')).toBeInTheDocument();

    await user.keyboard('{Escape}');

    await waitFor(() => {
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    });
  });

  it('calls onOpenChange when opened/closed', async () => {
    const user = userEvent.setup();
    const onOpenChange = vi.fn();
    render(<TestDialog onOpenChange={onOpenChange} />);

    await user.click(screen.getByText('Open Dialog'));
    expect(onOpenChange).toHaveBeenCalledWith(true);

    await user.keyboard('{Escape}');
    await waitFor(() => {
      expect(onOpenChange).toHaveBeenCalledWith(false);
    });
  });

  it('renders header, footer and body content', async () => {
    const user = userEvent.setup();
    render(<TestDialog />);

    await user.click(screen.getByText('Open Dialog'));

    expect(screen.getByText('Test Title')).toBeInTheDocument();
    expect(screen.getByText('Test Description')).toBeInTheDocument();
    expect(screen.getByText('Dialog body content')).toBeInTheDocument();
    expect(screen.getByText('Cancel')).toBeInTheDocument();
    expect(screen.getByText('Save')).toBeInTheDocument();
  });

  it('has correct aria attributes', async () => {
    const user = userEvent.setup();
    render(<TestDialog />);

    await user.click(screen.getByText('Open Dialog'));

    const dialog = screen.getByRole('dialog');
    expect(dialog).toHaveAttribute('aria-describedby');
    expect(dialog).toHaveAttribute('aria-labelledby');
  });
});
