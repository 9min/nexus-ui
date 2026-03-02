import { render, screen } from '@testing-library/react';
import * as React from 'react';
import { describe, expect, it } from 'vitest';

import { ScrollArea } from './scroll-area';

describe('ScrollArea', () => {
  it('renders children content', () => {
    render(
      <ScrollArea>
        <p>Scroll content</p>
      </ScrollArea>
    );

    expect(screen.getByText('Scroll content')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    const { container } = render(
      <ScrollArea className="custom-class">
        <p>Content</p>
      </ScrollArea>
    );

    const root = container.firstChild as HTMLElement;
    expect(root).toHaveClass('custom-class');
  });

  it('renders the scroll viewport', () => {
    const { container } = render(
      <ScrollArea>
        <p>Content inside viewport</p>
      </ScrollArea>
    );

    const viewport = container.querySelector('[data-radix-scroll-area-viewport]');
    expect(viewport).toBeInTheDocument();
    expect(screen.getByText('Content inside viewport')).toBeInTheDocument();
  });

  it('forwards ref', () => {
    const ref = React.createRef<HTMLDivElement>();
    render(
      <ScrollArea ref={ref}>
        <p>Content</p>
      </ScrollArea>
    );

    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });
});
