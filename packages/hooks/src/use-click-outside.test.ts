import { renderHook, act } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { useClickOutside } from './use-click-outside';

describe('useClickOutside', () => {
  it('returns a ref object', () => {
    const handler = vi.fn();
    const { result } = renderHook(() => useClickOutside(handler));
    expect(result.current).toHaveProperty('current');
  });

  it('calls handler when clicking outside the element', () => {
    const handler = vi.fn();
    const { result } = renderHook(() => useClickOutside<HTMLDivElement>(handler));

    const div = document.createElement('div');
    document.body.appendChild(div);

    // Assign the element to the ref
    Object.defineProperty(result.current, 'current', {
      value: div,
      writable: true,
    });

    // Click outside
    act(() => {
      document.dispatchEvent(new MouseEvent('mousedown', { bubbles: true }));
    });

    expect(handler).toHaveBeenCalledTimes(1);

    document.body.removeChild(div);
  });

  it('does not call handler when clicking inside the element', () => {
    const handler = vi.fn();
    const { result } = renderHook(() => useClickOutside<HTMLDivElement>(handler));

    const div = document.createElement('div');
    const inner = document.createElement('span');
    div.appendChild(inner);
    document.body.appendChild(div);

    Object.defineProperty(result.current, 'current', {
      value: div,
      writable: true,
    });

    // Click inside
    act(() => {
      inner.dispatchEvent(new MouseEvent('mousedown', { bubbles: true }));
    });

    expect(handler).not.toHaveBeenCalled();

    document.body.removeChild(div);
  });
});
