import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';

import { Toggle, ToggleGroup, ToggleGroupItem } from './toggle';

describe('Toggle', () => {
  it('renders a toggle button', () => {
    render(<Toggle aria-label="Bold">B</Toggle>);

    const button = screen.getByRole('button', { name: 'Bold' });
    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute('aria-pressed', 'false');
  });

  it('toggles on click', async () => {
    const user = userEvent.setup();
    render(<Toggle aria-label="Bold">B</Toggle>);

    const button = screen.getByRole('button', { name: 'Bold' });
    expect(button).toHaveAttribute('aria-pressed', 'false');
    expect(button).toHaveAttribute('data-state', 'off');

    await user.click(button);
    expect(button).toHaveAttribute('aria-pressed', 'true');
    expect(button).toHaveAttribute('data-state', 'on');

    await user.click(button);
    expect(button).toHaveAttribute('aria-pressed', 'false');
    expect(button).toHaveAttribute('data-state', 'off');
  });

  it('applies custom className', () => {
    render(
      <Toggle aria-label="Bold" className="custom-class">
        B
      </Toggle>
    );

    expect(screen.getByRole('button', { name: 'Bold' })).toHaveClass('custom-class');
  });
});

describe('ToggleGroup', () => {
  it('renders group items', () => {
    render(
      <ToggleGroup type="multiple" aria-label="Text formatting">
        <ToggleGroupItem value="bold" aria-label="Bold">
          B
        </ToggleGroupItem>
        <ToggleGroupItem value="italic" aria-label="Italic">
          I
        </ToggleGroupItem>
        <ToggleGroupItem value="underline" aria-label="Underline">
          U
        </ToggleGroupItem>
      </ToggleGroup>
    );

    expect(screen.getByRole('button', { name: 'Bold' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Italic' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Underline' })).toBeInTheDocument();
  });

  it('selects an item on click in multiple mode', async () => {
    const user = userEvent.setup();
    render(
      <ToggleGroup type="multiple" aria-label="Text formatting">
        <ToggleGroupItem value="bold" aria-label="Bold">
          B
        </ToggleGroupItem>
        <ToggleGroupItem value="italic" aria-label="Italic">
          I
        </ToggleGroupItem>
      </ToggleGroup>
    );

    const boldButton = screen.getByRole('button', { name: 'Bold' });
    const italicButton = screen.getByRole('button', { name: 'Italic' });

    expect(boldButton).toHaveAttribute('data-state', 'off');
    expect(italicButton).toHaveAttribute('data-state', 'off');

    await user.click(boldButton);
    expect(boldButton).toHaveAttribute('data-state', 'on');
    expect(italicButton).toHaveAttribute('data-state', 'off');

    await user.click(italicButton);
    expect(boldButton).toHaveAttribute('data-state', 'on');
    expect(italicButton).toHaveAttribute('data-state', 'on');
  });

  it('applies custom className to group', () => {
    const { container } = render(
      <ToggleGroup type="multiple" aria-label="Formatting" className="custom-group">
        <ToggleGroupItem value="bold" aria-label="Bold">
          B
        </ToggleGroupItem>
      </ToggleGroup>
    );

    const group = container.querySelector('[role="group"]');
    expect(group).toHaveClass('custom-group');
  });
});
