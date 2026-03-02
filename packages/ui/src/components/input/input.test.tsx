import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import * as React from 'react';
import { describe, expect, it } from 'vitest';

import { Input } from './input';

describe('Input', () => {
  it('renders with default props', () => {
    render(<Input aria-label="test input" />);
    expect(screen.getByRole('textbox', { name: 'test input' })).toBeInTheDocument();
  });

  it('accepts value input', async () => {
    const user = userEvent.setup();
    render(<Input aria-label="test input" />);

    const input = screen.getByRole('textbox', { name: 'test input' });
    await user.type(input, 'Hello World');
    expect(input).toHaveValue('Hello World');
  });

  it('handles disabled state', async () => {
    const user = userEvent.setup();
    render(<Input aria-label="test input" disabled />);

    const input = screen.getByRole('textbox', { name: 'test input' });
    expect(input).toBeDisabled();
    await user.type(input, 'test');
    expect(input).toHaveValue('');
  });

  it('applies custom className', () => {
    render(<Input aria-label="test input" className="custom-class" />);
    expect(screen.getByRole('textbox', { name: 'test input' })).toHaveClass('custom-class');
  });

  it('forwards ref', () => {
    const ref = React.createRef<HTMLInputElement>();
    render(<Input ref={ref} aria-label="test input" />);
    expect(ref.current).toBeInstanceOf(HTMLInputElement);
  });

  it('renders with different types', () => {
    const { rerender } = render(<Input type="email" aria-label="email" />);
    expect(screen.getByLabelText('email')).toHaveAttribute('type', 'email');

    rerender(<Input type="password" aria-label="password" />);
    expect(screen.getByLabelText('password')).toHaveAttribute('type', 'password');
  });

  it('renders with placeholder text', () => {
    render(<Input placeholder="Enter your name" />);
    expect(screen.getByPlaceholderText('Enter your name')).toBeInTheDocument();
  });
});
