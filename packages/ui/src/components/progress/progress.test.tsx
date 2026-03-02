import { render, screen } from '@testing-library/react';
import * as React from 'react';
import { describe, expect, it } from 'vitest';

import { Progress } from './progress';

describe('Progress', () => {
  it('renders the progressbar', () => {
    render(<Progress value={50} />);

    const progressbar = screen.getByRole('progressbar');
    expect(progressbar).toBeInTheDocument();
  });

  it('shows correct value via aria-valuenow', () => {
    render(<Progress value={60} />);

    const progressbar = screen.getByRole('progressbar');
    expect(progressbar).toHaveAttribute('aria-valuenow', '60');
  });

  it('renders at 0%', () => {
    render(<Progress value={0} />);

    const progressbar = screen.getByRole('progressbar');
    expect(progressbar).toHaveAttribute('aria-valuenow', '0');
  });

  it('renders at 100%', () => {
    render(<Progress value={100} />);

    const progressbar = screen.getByRole('progressbar');
    expect(progressbar).toHaveAttribute('aria-valuenow', '100');
  });

  it('applies custom className', () => {
    render(<Progress value={50} className="custom-class" />);

    const progressbar = screen.getByRole('progressbar');
    expect(progressbar).toHaveClass('custom-class');
  });

  it('forwards ref', () => {
    const ref = React.createRef<HTMLDivElement>();
    render(<Progress value={50} ref={ref} />);

    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });
});
