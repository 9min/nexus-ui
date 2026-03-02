import { render, screen } from '@testing-library/react';
import * as React from 'react';
import { describe, expect, it } from 'vitest';

import { Badge } from './badge';

describe('Badge', () => {
  it('renders with default variant', () => {
    render(<Badge>New</Badge>);
    const badge = screen.getByText('New');
    expect(badge).toBeInTheDocument();
    expect(badge).toHaveClass('bg-primary', 'text-primary-foreground');
  });

  it('renders with secondary variant', () => {
    render(<Badge variant="secondary">Secondary</Badge>);
    const badge = screen.getByText('Secondary');
    expect(badge).toHaveClass('bg-secondary', 'text-secondary-foreground');
  });

  it('renders with destructive variant', () => {
    render(<Badge variant="destructive">Error</Badge>);
    const badge = screen.getByText('Error');
    expect(badge).toHaveClass('bg-destructive', 'text-destructive-foreground');
  });

  it('renders with outline variant', () => {
    render(<Badge variant="outline">Outline</Badge>);
    const badge = screen.getByText('Outline');
    expect(badge).toHaveClass('text-foreground');
    expect(badge).not.toHaveClass('bg-primary');
  });

  it('renders with success, warning, and info variants', () => {
    const { rerender } = render(<Badge variant="success">Success</Badge>);
    expect(screen.getByText('Success')).toHaveClass('bg-success');

    rerender(<Badge variant="warning">Warning</Badge>);
    expect(screen.getByText('Warning')).toHaveClass('bg-warning');

    rerender(<Badge variant="info">Info</Badge>);
    expect(screen.getByText('Info')).toHaveClass('bg-info');
  });

  it('applies custom className', () => {
    render(<Badge className="custom-class">Tag</Badge>);
    expect(screen.getByText('Tag')).toHaveClass('custom-class');
  });

  it('forwards ref', () => {
    const ref = React.createRef<HTMLDivElement>();
    render(<Badge ref={ref}>Ref Badge</Badge>);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });
});
