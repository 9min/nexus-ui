import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import * as React from 'react';
import { describe, expect, it } from 'vitest';

import { Textarea } from './textarea';

describe('Textarea', () => {
  it('renders with default props', () => {
    render(<Textarea aria-label="test textarea" />);
    expect(screen.getByRole('textbox', { name: 'test textarea' })).toBeInTheDocument();
  });

  it('accepts text input', async () => {
    const user = userEvent.setup();
    render(<Textarea aria-label="test textarea" />);

    const textarea = screen.getByRole('textbox', { name: 'test textarea' });
    await user.type(textarea, 'Hello World');
    expect(textarea).toHaveValue('Hello World');
  });

  it('handles disabled state', async () => {
    const user = userEvent.setup();
    render(<Textarea aria-label="test textarea" disabled />);

    const textarea = screen.getByRole('textbox', { name: 'test textarea' });
    expect(textarea).toBeDisabled();
    await user.type(textarea, 'test');
    expect(textarea).toHaveValue('');
  });

  it('applies custom className', () => {
    render(<Textarea aria-label="test textarea" className="custom-class" />);
    expect(screen.getByRole('textbox', { name: 'test textarea' })).toHaveClass('custom-class');
  });

  it('forwards ref', () => {
    const ref = React.createRef<HTMLTextAreaElement>();
    render(<Textarea ref={ref} aria-label="test textarea" />);
    expect(ref.current).toBeInstanceOf(HTMLTextAreaElement);
  });

  it('renders with placeholder text', () => {
    render(<Textarea placeholder="Enter your message" />);
    expect(screen.getByPlaceholderText('Enter your message')).toBeInTheDocument();
  });
});
