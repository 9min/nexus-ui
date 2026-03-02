import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './tooltip';

function TestTooltip() {
  return (
    <TooltipProvider delayDuration={0}>
      <Tooltip>
        <TooltipTrigger>Hover me</TooltipTrigger>
        <TooltipContent>Tooltip text</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

describe('Tooltip', () => {
  it('renders the trigger element', () => {
    render(<TestTooltip />);
    expect(screen.getByText('Hover me')).toBeInTheDocument();
  });

  it('does not show tooltip content initially', () => {
    render(<TestTooltip />);
    expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
  });

  it('shows tooltip content on hover', async () => {
    const user = userEvent.setup();
    render(<TestTooltip />);

    await user.hover(screen.getByText('Hover me'));

    await waitFor(() => {
      expect(screen.getByRole('tooltip')).toBeInTheDocument();
    });
  });

  it('shows tooltip content via keyboard focus', async () => {
    const user = userEvent.setup();
    render(<TestTooltip />);

    await user.tab();

    await waitFor(() => {
      expect(screen.getByRole('tooltip')).toBeInTheDocument();
    });
  });
});
