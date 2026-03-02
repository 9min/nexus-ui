import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { describe, expect, it } from 'vitest';

import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuSeparator,
  ContextMenuTrigger,
} from './context-menu';

function TestContextMenu() {
  return (
    <ContextMenu>
      <ContextMenuTrigger className="flex h-[150px] w-[300px] items-center justify-center rounded-md border border-dashed">
        Right click here
      </ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuLabel>Actions</ContextMenuLabel>
        <ContextMenuSeparator />
        <ContextMenuItem>Edit</ContextMenuItem>
        <ContextMenuItem>Duplicate</ContextMenuItem>
        <ContextMenuItem>Delete</ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
}

describe('ContextMenu', () => {
  it('renders trigger', () => {
    render(<TestContextMenu />);
    expect(screen.getByText('Right click here')).toBeInTheDocument();
  });

  it('opens menu on right click', async () => {
    const user = userEvent.setup();
    render(<TestContextMenu />);

    const trigger = screen.getByText('Right click here');
    await user.pointer({ keys: '[MouseRight]', target: trigger });

    expect(screen.getByText('Edit')).toBeInTheDocument();
    expect(screen.getByText('Duplicate')).toBeInTheDocument();
    expect(screen.getByText('Delete')).toBeInTheDocument();
  });

  it('renders label and separator', async () => {
    const user = userEvent.setup();
    render(<TestContextMenu />);

    const trigger = screen.getByText('Right click here');
    await user.pointer({ keys: '[MouseRight]', target: trigger });

    expect(screen.getByText('Actions')).toBeInTheDocument();
    expect(document.querySelector('[role="separator"]')).toBeInTheDocument();
  });
});
