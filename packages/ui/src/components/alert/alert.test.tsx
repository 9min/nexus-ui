import { render, screen } from '@testing-library/react';
import * as React from 'react';
import { describe, expect, it } from 'vitest';

import { Alert, AlertDescription, AlertTitle } from './alert';

describe('Alert', () => {
  it('renders with role="alert"', () => {
    render(<Alert>Alert content</Alert>);
    const alert = screen.getByRole('alert');
    expect(alert).toBeInTheDocument();
    expect(alert).toHaveTextContent('Alert content');
  });

  it('renders with default variant', () => {
    render(<Alert>Default</Alert>);
    const alert = screen.getByRole('alert');
    expect(alert).toHaveClass('bg-background', 'text-foreground');
  });

  it('renders with destructive variant', () => {
    render(<Alert variant="destructive">Error</Alert>);
    const alert = screen.getByRole('alert');
    expect(alert).toHaveClass('border-destructive/50', 'text-destructive');
  });

  it('renders with success variant', () => {
    render(<Alert variant="success">Success</Alert>);
    const alert = screen.getByRole('alert');
    expect(alert).toHaveClass('border-success/50', 'text-success');
  });

  it('renders with warning variant', () => {
    render(<Alert variant="warning">Warning</Alert>);
    const alert = screen.getByRole('alert');
    expect(alert).toHaveClass('border-warning/50', 'text-warning');
  });

  it('renders with info variant', () => {
    render(<Alert variant="info">Info</Alert>);
    const alert = screen.getByRole('alert');
    expect(alert).toHaveClass('border-info/50', 'text-info');
  });

  it('applies custom className', () => {
    render(<Alert className="custom-class">Custom</Alert>);
    const alert = screen.getByRole('alert');
    expect(alert).toHaveClass('custom-class');
  });

  it('forwards ref', () => {
    const ref = React.createRef<HTMLDivElement>();
    render(<Alert ref={ref}>Ref Alert</Alert>);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });
});

describe('AlertTitle', () => {
  it('renders a heading', () => {
    render(
      <Alert>
        <AlertTitle>Title</AlertTitle>
      </Alert>
    );
    const title = screen.getByText('Title');
    expect(title).toBeInTheDocument();
    expect(title.tagName).toBe('H5');
    expect(title).toHaveClass('mb-1', 'font-medium', 'leading-none', 'tracking-tight');
  });

  it('applies custom className', () => {
    render(
      <Alert>
        <AlertTitle className="custom-title">Title</AlertTitle>
      </Alert>
    );
    expect(screen.getByText('Title')).toHaveClass('custom-title');
  });

  it('forwards ref', () => {
    const ref = React.createRef<HTMLHeadingElement>();
    render(
      <Alert>
        <AlertTitle ref={ref}>Ref Title</AlertTitle>
      </Alert>
    );
    expect(ref.current).toBeInstanceOf(HTMLHeadingElement);
  });
});

describe('AlertDescription', () => {
  it('renders description text', () => {
    render(
      <Alert>
        <AlertDescription>Description text</AlertDescription>
      </Alert>
    );
    const description = screen.getByText('Description text');
    expect(description).toBeInTheDocument();
    expect(description).toHaveClass('text-sm');
  });

  it('applies custom className', () => {
    render(
      <Alert>
        <AlertDescription className="custom-desc">Description</AlertDescription>
      </Alert>
    );
    expect(screen.getByText('Description')).toHaveClass('custom-desc');
  });

  it('forwards ref', () => {
    const ref = React.createRef<HTMLParagraphElement>();
    render(
      <Alert>
        <AlertDescription ref={ref}>Ref Desc</AlertDescription>
      </Alert>
    );
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });
});
