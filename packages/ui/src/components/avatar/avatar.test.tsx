import { render, screen } from '@testing-library/react';
import * as React from 'react';
import { describe, expect, it } from 'vitest';

import { Avatar, AvatarFallback, AvatarImage } from './avatar';

describe('Avatar', () => {
  it('renders the avatar root', () => {
    const { container } = render(
      <Avatar data-testid="avatar-root">
        <AvatarFallback>JD</AvatarFallback>
      </Avatar>
    );

    expect(screen.getByTestId('avatar-root')).toBeInTheDocument();
    expect(container.firstChild).toBeTruthy();
  });

  it('renders fallback text when no image is provided', () => {
    render(
      <Avatar>
        <AvatarFallback>JD</AvatarFallback>
      </Avatar>
    );

    expect(screen.getByText('JD')).toBeInTheDocument();
  });

  it('renders fallback when image src is not set', () => {
    render(
      <Avatar>
        <AvatarImage src="" alt="User" />
        <AvatarFallback>AB</AvatarFallback>
      </Avatar>
    );

    expect(screen.getByText('AB')).toBeInTheDocument();
  });

  it('applies custom className to avatar root', () => {
    render(
      <Avatar className="custom-avatar" data-testid="avatar">
        <AvatarFallback>JD</AvatarFallback>
      </Avatar>
    );

    expect(screen.getByTestId('avatar')).toHaveClass('custom-avatar');
  });

  it('forwards ref on avatar root', () => {
    const ref = React.createRef<HTMLSpanElement>();
    render(
      <Avatar ref={ref}>
        <AvatarFallback>JD</AvatarFallback>
      </Avatar>
    );

    expect(ref.current).toBeInstanceOf(HTMLSpanElement);
  });

  it('applies custom className to fallback', () => {
    render(
      <Avatar>
        <AvatarFallback className="custom-fallback" data-testid="fallback">
          JD
        </AvatarFallback>
      </Avatar>
    );

    expect(screen.getByTestId('fallback')).toHaveClass('custom-fallback');
  });
});
