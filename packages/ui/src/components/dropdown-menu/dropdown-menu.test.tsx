import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import * as React from 'react';
import { describe, expect, it, vi } from 'vitest';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './dropdown-menu';

function TestDropdownMenu({ onSelect }: { onSelect?: () => void }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>Open Menu</DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onSelect={onSelect}>Edit</DropdownMenuItem>
        <DropdownMenuItem>Duplicate</DropdownMenuItem>
        <DropdownMenuItem>Delete</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

describe('DropdownMenu', () => {
  it('renders trigger button', () => {
    render(<TestDropdownMenu />);
    expect(screen.getByText('Open Menu')).toBeInTheDocument();
  });

  it('opens menu when trigger is clicked', async () => {
    const user = userEvent.setup();
    render(<TestDropdownMenu />);

    await user.click(screen.getByText('Open Menu'));

    expect(screen.getByText('Edit')).toBeInTheDocument();
    expect(screen.getByText('Duplicate')).toBeInTheDocument();
    expect(screen.getByText('Delete')).toBeInTheDocument();
  });

  it('renders label and separator', async () => {
    const user = userEvent.setup();
    render(<TestDropdownMenu />);

    await user.click(screen.getByText('Open Menu'));

    expect(screen.getByText('Actions')).toBeInTheDocument();
    expect(document.querySelector('[role="separator"]')).toBeInTheDocument();
  });

  it('calls onSelect when menu item is clicked', async () => {
    const user = userEvent.setup();
    const onSelect = vi.fn();
    render(<TestDropdownMenu onSelect={onSelect} />);

    await user.click(screen.getByText('Open Menu'));
    await user.click(screen.getByText('Edit'));

    expect(onSelect).toHaveBeenCalledTimes(1);
  });

  it('has correct menu role', async () => {
    const user = userEvent.setup();
    render(<TestDropdownMenu />);

    await user.click(screen.getByText('Open Menu'));

    expect(screen.getByRole('menu')).toBeInTheDocument();
  });
});
