import { render, screen } from '@testing-library/react';
import * as React from 'react';
import { describe, expect, it } from 'vitest';

import { Slider } from './slider';

describe('Slider', () => {
  it('renders a slider', () => {
    render(<Slider defaultValue={[50]} aria-label="Volume" />);

    const slider = screen.getByRole('slider');
    expect(slider).toBeInTheDocument();
  });

  it('has the correct default value', () => {
    render(<Slider defaultValue={[75]} aria-label="Volume" />);

    const slider = screen.getByRole('slider');
    expect(slider).toHaveAttribute('aria-valuenow', '75');
  });

  it('applies custom className', () => {
    const { container } = render(
      <Slider defaultValue={[50]} aria-label="Volume" className="custom-class" />
    );

    const root = container.firstChild as HTMLElement;
    expect(root).toHaveClass('custom-class');
  });

  it('forwards ref', () => {
    const ref = React.createRef<HTMLSpanElement>();
    render(<Slider defaultValue={[50]} aria-label="Volume" ref={ref} />);

    expect(ref.current).toBeInstanceOf(HTMLSpanElement);
  });
});
