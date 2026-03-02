import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from './alert-dialog';

function TestAlertDialog({ onOpenChange }: { onOpenChange?: (open: boolean) => void }) {
  return (
    <AlertDialog onOpenChange={onOpenChange}>
      <AlertDialogTrigger>Delete Item</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete the item.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

describe('AlertDialog', () => {
  it('opens when trigger is clicked', async () => {
    const user = userEvent.setup();
    render(<TestAlertDialog />);

    expect(screen.queryByRole('alertdialog')).not.toBeInTheDocument();

    await user.click(screen.getByText('Delete Item'));

    expect(screen.getByRole('alertdialog')).toBeInTheDocument();
  });

  it('shows title and description when open', async () => {
    const user = userEvent.setup();
    render(<TestAlertDialog />);

    await user.click(screen.getByText('Delete Item'));

    expect(screen.getByText('Are you sure?')).toBeInTheDocument();
    expect(
      screen.getByText('This action cannot be undone. This will permanently delete the item.')
    ).toBeInTheDocument();
  });

  it('closes when action button is clicked', async () => {
    const user = userEvent.setup();
    render(<TestAlertDialog />);

    await user.click(screen.getByText('Delete Item'));
    expect(screen.getByRole('alertdialog')).toBeInTheDocument();

    await user.click(screen.getByText('Continue'));

    await waitFor(() => {
      expect(screen.queryByRole('alertdialog')).not.toBeInTheDocument();
    });
  });

  it('closes when cancel button is clicked', async () => {
    const user = userEvent.setup();
    render(<TestAlertDialog />);

    await user.click(screen.getByText('Delete Item'));
    expect(screen.getByRole('alertdialog')).toBeInTheDocument();

    await user.click(screen.getByText('Cancel'));

    await waitFor(() => {
      expect(screen.queryByRole('alertdialog')).not.toBeInTheDocument();
    });
  });

  it('calls onOpenChange when opened and closed', async () => {
    const user = userEvent.setup();
    const onOpenChange = vi.fn();
    render(<TestAlertDialog onOpenChange={onOpenChange} />);

    await user.click(screen.getByText('Delete Item'));
    expect(onOpenChange).toHaveBeenCalledWith(true);

    await user.click(screen.getByText('Cancel'));
    await waitFor(() => {
      expect(onOpenChange).toHaveBeenCalledWith(false);
    });
  });
});
