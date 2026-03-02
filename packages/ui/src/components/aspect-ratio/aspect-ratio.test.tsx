import { render, screen } from '@testing-library/react';

import { describe, expect, it } from 'vitest';

import { AspectRatio } from './aspect-ratio';

describe('AspectRatio', () => {
  it('renders children', () => {
    render(
      <AspectRatio ratio={16 / 9}>
        <div data-testid="child">Content</div>
      </AspectRatio>
    );
    expect(screen.getByTestId('child')).toBeInTheDocument();
  });

  it('renders with different ratios', () => {
    const { container } = render(
      <AspectRatio ratio={4 / 3}>
        <div>Content</div>
      </AspectRatio>
    );
    expect(container.firstChild).toBeInTheDocument();
  });

  it('renders with default 1:1 ratio', () => {
    const { container } = render(
      <AspectRatio>
        <div>Square</div>
      </AspectRatio>
    );
    expect(container.firstChild).toBeInTheDocument();
  });
});
