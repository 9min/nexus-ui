import { spacing, borderRadius } from '@nexus-ui/tokens';
import type { Meta, StoryObj } from '@storybook/react';

import { cn } from '../lib/utils';

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const SPACING_SCALE = Object.entries(spacing).map(([key, value]) => ({
  key,
  value,
  px: value === '0px' ? '0' : `${parseFloat(value) * 16}px`,
}));

/**
 * Maps spacing token keys to Tailwind width classes.
 * Used to render horizontal bars at the correct width.
 */
const SPACING_WIDTH_MAP: Record<string, string> = {
  '0': 'w-0',
  '0.5': 'w-0.5',
  '1': 'w-1',
  '1.5': 'w-1.5',
  '2': 'w-2',
  '3': 'w-3',
  '4': 'w-4',
  '5': 'w-5',
  '6': 'w-6',
  '8': 'w-8',
  '10': 'w-10',
  '12': 'w-12',
  '16': 'w-16',
};

const SPACING_PAD_MAP: Record<string, string> = {
  '0': 'p-0',
  '0.5': 'p-0.5',
  '1': 'p-1',
  '1.5': 'p-1.5',
  '2': 'p-2',
  '3': 'p-3',
  '4': 'p-4',
  '5': 'p-5',
  '6': 'p-6',
  '8': 'p-8',
  '10': 'p-10',
  '12': 'p-12',
  '16': 'p-16',
};

const GAP_MAP: Record<string, string> = {
  '1': 'gap-1',
  '2': 'gap-2',
  '4': 'gap-4',
  '8': 'gap-8',
};

const BORDER_RADII = Object.entries(borderRadius).map(([key, value]) => ({
  key,
  value,
}));

/* ------------------------------------------------------------------ */
/*  Page Component                                                     */
/* ------------------------------------------------------------------ */

function SpacingPage() {
  return (
    <div className={cn('min-h-screen bg-background text-foreground')}>
      <div className={cn('mx-auto max-w-5xl space-y-12 p-8')}>
        <section className={cn('space-y-2')}>
          <h1 className={cn('text-3xl font-bold tracking-tight')}>Spacing & Layout</h1>
          <p className={cn('text-lg text-muted-foreground')}>
            Spacing scale and border radius tokens for consistent layout composition.
          </p>
        </section>

        {/* Spacing Scale */}
        <section className={cn('space-y-6')}>
          <h2 className={cn('text-2xl font-bold')}>Spacing Scale</h2>
          <p className={cn('text-sm text-muted-foreground')}>
            13 steps from 0 to 4rem. Each bar represents the token value.
          </p>
          <div className={cn('space-y-2')}>
            {SPACING_SCALE.map((step) => (
              <div key={step.key} className={cn('flex items-center gap-4')}>
                <div className={cn('w-16 shrink-0 text-right')}>
                  <span className={cn('font-mono text-sm font-medium')}>{step.key}</span>
                </div>
                <div className={cn('flex items-center gap-3')}>
                  <div
                    className={cn('h-4 rounded bg-primary', SPACING_WIDTH_MAP[step.key])}
                  />
                </div>
                <span className={cn('font-mono text-xs text-muted-foreground')}>
                  {step.value} ({step.px})
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* Spacing in Context — Padding */}
        <section className={cn('space-y-6')}>
          <h2 className={cn('text-2xl font-bold')}>Spacing in Context</h2>

          <div className={cn('space-y-4')}>
            <h3 className={cn('text-lg font-semibold')}>Padding</h3>
            <div className={cn('flex flex-wrap gap-6')}>
              {['2', '4', '8'].map((key) => (
                <div key={key} className={cn('space-y-1')}>
                  <p className={cn('font-mono text-xs text-muted-foreground')}>p-{key}</p>
                  <div className={cn('rounded border border-dashed border-primary/40 bg-primary/5')}>
                    <div className={cn(SPACING_PAD_MAP[key])}>
                      <div className={cn('rounded bg-primary/20 p-2 text-center text-xs font-medium')}>
                        content
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className={cn('space-y-4')}>
            <h3 className={cn('text-lg font-semibold')}>Gap</h3>
            <div className={cn('flex flex-wrap gap-8')}>
              {Object.entries(GAP_MAP).map(([key, gapClass]) => (
                <div key={key} className={cn('space-y-1')}>
                  <p className={cn('font-mono text-xs text-muted-foreground')}>gap-{key}</p>
                  <div className={cn('flex rounded border border-dashed border-primary/40 p-2', gapClass)}>
                    {[1, 2, 3].map((i) => (
                      <div
                        key={i}
                        className={cn('h-8 w-8 rounded bg-primary/30')}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Border Radius */}
        <section className={cn('space-y-6')}>
          <h2 className={cn('text-2xl font-bold')}>Border Radius</h2>
          <p className={cn('text-sm text-muted-foreground')}>
            7 radius variants from none to full.
          </p>
          <div className={cn('flex flex-wrap gap-6')}>
            {BORDER_RADII.map((r) => (
              <div key={r.key} className={cn('flex flex-col items-center gap-2')}>
                <div
                  className={cn('h-16 w-16 bg-primary')}
                  style={{ borderRadius: r.value }}
                />
                <span className={cn('text-sm font-medium')}>{r.key}</span>
                <span className={cn('font-mono text-xs text-muted-foreground')}>{r.value}</span>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Story                                                              */
/* ------------------------------------------------------------------ */

const meta: Meta = {
  title: 'Foundations/Spacing & Layout',
  parameters: { layout: 'fullscreen' },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => <SpacingPage />,
};
