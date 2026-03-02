import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { describe, expect, it } from 'vitest';

import {
  Toolbar,
  ToolbarButton,
  ToolbarLink,
  ToolbarSeparator,
  ToolbarToggleGroup,
  ToolbarToggleItem,
} from './toolbar';

describe('Toolbar', () => {
  it('renders toolbar with role', () => {
    render(
      <Toolbar aria-label="Formatting">
        <ToolbarButton>Bold</ToolbarButton>
      </Toolbar>
    );
    expect(screen.getByRole('toolbar')).toBeInTheDocument();
  });

  it('renders toolbar button', () => {
    render(
      <Toolbar>
        <ToolbarButton>Bold</ToolbarButton>
        <ToolbarButton>Italic</ToolbarButton>
      </Toolbar>
    );
    expect(screen.getByText('Bold')).toBeInTheDocument();
    expect(screen.getByText('Italic')).toBeInTheDocument();
  });

  it('renders separator', () => {
    render(
      <Toolbar>
        <ToolbarButton>Bold</ToolbarButton>
        <ToolbarSeparator />
        <ToolbarButton>Link</ToolbarButton>
      </Toolbar>
    );
    expect(document.querySelector('[role="separator"]')).toBeInTheDocument();
  });

  it('renders toggle group', async () => {
    const user = userEvent.setup();
    render(
      <Toolbar>
        <ToolbarToggleGroup type="multiple">
          <ToolbarToggleItem value="bold">Bold</ToolbarToggleItem>
          <ToolbarToggleItem value="italic">Italic</ToolbarToggleItem>
        </ToolbarToggleGroup>
      </Toolbar>
    );

    const boldButton = screen.getByText('Bold');
    await user.click(boldButton);
    expect(boldButton).toHaveAttribute('data-state', 'on');
  });

  it('renders toolbar link', () => {
    render(
      <Toolbar>
        <ToolbarLink href="/docs">Docs</ToolbarLink>
      </Toolbar>
    );
    expect(screen.getByText('Docs')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    render(
      <Toolbar className="custom-class">
        <ToolbarButton>Button</ToolbarButton>
      </Toolbar>
    );
    expect(screen.getByRole('toolbar')).toHaveClass('custom-class');
  });
});
