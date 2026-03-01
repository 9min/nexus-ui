import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import * as React from 'react';
import { describe, expect, it } from 'vitest';

import { Toaster } from './toaster';
import { toast } from './use-toast';

function TestApp() {
  return (
    <div>
      <button onClick={() => toast({ title: 'Test Toast', description: 'This is a test' })}>
        Show Toast
      </button>
      <button
        onClick={() => toast.success({ title: 'Success', description: 'Operation succeeded' })}
      >
        Show Success
      </button>
      <button onClick={() => toast.error({ title: 'Error', description: 'Something went wrong' })}>
        Show Error
      </button>
      <Toaster />
    </div>
  );
}

describe('Toast', () => {
  it('shows toast when triggered', async () => {
    const user = userEvent.setup();
    render(<TestApp />);

    await user.click(screen.getByText('Show Toast'));

    await waitFor(() => {
      expect(screen.getByText('Test Toast')).toBeInTheDocument();
      expect(screen.getByText('This is a test')).toBeInTheDocument();
    });
  });

  it('shows success variant toast', async () => {
    const user = userEvent.setup();
    render(<TestApp />);

    await user.click(screen.getByText('Show Success'));

    await waitFor(() => {
      expect(screen.getByText('Success')).toBeInTheDocument();
      expect(screen.getByText('Operation succeeded')).toBeInTheDocument();
    });
  });

  it('shows error variant toast', async () => {
    const user = userEvent.setup();
    render(<TestApp />);

    await user.click(screen.getByText('Show Error'));

    await waitFor(() => {
      expect(screen.getByText('Error')).toBeInTheDocument();
      expect(screen.getByText('Something went wrong')).toBeInTheDocument();
    });
  });

  it('renders close button with aria-label', async () => {
    const user = userEvent.setup();
    render(<TestApp />);

    await user.click(screen.getByText('Show Toast'));

    await waitFor(() => {
      const closeButtons = screen.getAllByLabelText('Close');
      expect(closeButtons.length).toBeGreaterThan(0);
    });
  });
});
