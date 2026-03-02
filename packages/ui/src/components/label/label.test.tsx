import { render, screen } from '@testing-library/react';
import * as React from 'react';
import { describe, expect, it } from 'vitest';

import { Label } from './label';

describe('Label', () => {
  it('renders with text content', () => {
    render(<Label>Username</Label>);
    expect(screen.getByText('Username')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    render(<Label className="custom-class">Email</Label>);
    expect(screen.getByText('Email')).toHaveClass('custom-class');
  });

  it('forwards ref', () => {
    const ref = React.createRef<HTMLLabelElement>();
    render(<Label ref={ref}>Name</Label>);
    expect(ref.current).toBeInstanceOf(HTMLLabelElement);
  });

  it('associates with input via htmlFor', () => {
    render(
      <>
        <Label htmlFor="email-input">Email</Label>
        <input id="email-input" type="email" />
      </>
    );

    const label = screen.getByText('Email');
    expect(label).toHaveAttribute('for', 'email-input');
  });
});
