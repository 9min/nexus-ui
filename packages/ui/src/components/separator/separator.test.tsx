import { render, screen } from '@testing-library/react';
import * as React from 'react';
import { describe, expect, it } from 'vitest';

import { Separator } from './separator';

describe('Separator', () => {
  it('renders horizontal separator by default', () => {
    render(<Separator />);
    const separator = screen.getByRole('none');
    expect(separator).toBeInTheDocument();
    expect(separator).toHaveClass('h-[1px]', 'w-full');
  });

  it('renders vertical separator', () => {
    render(<Separator orientation="vertical" />);
    const separator = screen.getByRole('none');
    expect(separator).toHaveClass('h-full', 'w-[1px]');
  });

  it('applies custom className', () => {
    render(<Separator className="my-4" />);
    const separator = screen.getByRole('none');
    expect(separator).toHaveClass('my-4');
  });

  it('renders with separator role when not decorative', () => {
    render(<Separator decorative={false} />);
    const separator = screen.getByRole('separator');
    expect(separator).toBeInTheDocument();
  });

  it('forwards ref', () => {
    const ref = React.createRef<HTMLDivElement>();
    render(<Separator ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });
});
