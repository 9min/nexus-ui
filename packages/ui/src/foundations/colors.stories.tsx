import { colors } from '@nexus-ui-kit/tokens';
import type { Meta, StoryObj } from '@storybook/react';

import { cn } from '../lib/utils';

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const SEMANTIC_COLORS = [
  { name: 'background', bg: 'bg-background', fg: 'text-foreground', var: '--background' },
  { name: 'foreground', bg: 'bg-foreground', fg: 'text-background', var: '--foreground' },
  { name: 'primary', bg: 'bg-primary', fg: 'text-primary-foreground', var: '--primary' },
  { name: 'secondary', bg: 'bg-secondary', fg: 'text-secondary-foreground', var: '--secondary' },
  { name: 'destructive', bg: 'bg-destructive', fg: 'text-destructive-foreground', var: '--destructive' },
  { name: 'muted', bg: 'bg-muted', fg: 'text-muted-foreground', var: '--muted' },
  { name: 'accent', bg: 'bg-accent', fg: 'text-accent-foreground', var: '--accent' },
  { name: 'card', bg: 'bg-card', fg: 'text-card-foreground', var: '--card' },
  { name: 'popover', bg: 'bg-popover', fg: 'text-popover-foreground', var: '--popover' },
  { name: 'success', bg: 'bg-success', fg: 'text-success-foreground', var: '--success' },
  { name: 'warning', bg: 'bg-warning', fg: 'text-warning-foreground', var: '--warning' },
  { name: 'info', bg: 'bg-info', fg: 'text-info-foreground', var: '--info' },
];

const SEMANTIC_BORDER_TOKENS = [
  { name: 'border', className: 'border-border', var: '--border' },
  { name: 'input', className: 'border-input', var: '--input' },
  { name: 'ring', className: 'ring-ring', var: '--ring' },
];

type PaletteKey = 'gray' | 'blue' | 'red' | 'green' | 'amber';
const PALETTE_NAMES: PaletteKey[] = ['gray', 'blue', 'red', 'green', 'amber'];
const SHADES = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950] as const;

/* ------------------------------------------------------------------ */
/*  Page Component                                                     */
/* ------------------------------------------------------------------ */

function ColorsPage() {
  return (
    <div className={cn('min-h-screen bg-background text-foreground')}>
      <div className={cn('mx-auto max-w-5xl space-y-12 p-8')}>
        <section className={cn('space-y-2')}>
          <h1 className={cn('text-3xl font-bold tracking-tight')}>Colors</h1>
          <p className={cn('text-lg text-muted-foreground')}>
            Semantic tokens adapt to theme changes. Primitive palettes remain constant across themes.
          </p>
        </section>

        {/* Semantic Colors */}
        <section className={cn('space-y-6')}>
          <h2 className={cn('text-2xl font-bold')}>Semantic Colors</h2>
          <p className={cn('text-sm text-muted-foreground')}>
            These tokens respond to the light/dark theme toggle via CSS custom properties.
          </p>
          <div className={cn('grid gap-3 sm:grid-cols-2 lg:grid-cols-3')}>
            {SEMANTIC_COLORS.map((token) => (
              <div
                key={token.name}
                className={cn('flex items-center gap-3 rounded-lg border border-border p-3')}
              >
                <div className={cn('h-12 w-12 shrink-0 rounded-md', token.bg)} />
                <div className={cn('min-w-0')}>
                  <p className={cn('text-sm font-medium')}>{token.name}</p>
                  <p className={cn('truncate font-mono text-xs text-muted-foreground')}>
                    var({token.var})
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Border / Input / Ring Tokens */}
        <section className={cn('space-y-6')}>
          <h2 className={cn('text-xl font-bold')}>Border & Ring Tokens</h2>
          <div className={cn('flex flex-wrap gap-4')}>
            {SEMANTIC_BORDER_TOKENS.map((token) => (
              <div
                key={token.name}
                className={cn('flex items-center gap-3 rounded-lg border border-border p-3')}
              >
                <div className={cn('h-12 w-12 shrink-0 rounded-md border-2 bg-background', token.className)} />
                <div>
                  <p className={cn('text-sm font-medium')}>{token.name}</p>
                  <p className={cn('font-mono text-xs text-muted-foreground')}>var({token.var})</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Primitive Palettes */}
        <section className={cn('space-y-6')}>
          <h2 className={cn('text-2xl font-bold')}>Primitive Palettes</h2>
          <p className={cn('text-sm text-muted-foreground')}>
            Fixed hex values from <code className={cn('rounded bg-muted px-1 py-0.5 font-mono text-xs')}>@nexus-ui-kit/tokens</code>.
            These do not change between themes.
          </p>
          <div className={cn('space-y-6')}>
            {PALETTE_NAMES.map((palette) => (
              <div key={palette} className={cn('space-y-2')}>
                <h3 className={cn('text-sm font-semibold capitalize')}>{palette}</h3>
                <div className={cn('flex gap-1')}>
                  {SHADES.map((shade) => {
                    const hex = colors[palette][shade];
                    const isLight = shade <= 300;
                    return (
                      <div key={shade} className={cn('flex flex-1 flex-col items-center')}>
                        {/* Primitive hex swatch — no Tailwind class available */}
                        <div
                          className={cn('h-12 w-full rounded')}
                          style={{ backgroundColor: hex }}
                        />
                        <span
                          className={cn(
                            'mt-1 text-[10px] font-medium',
                            isLight ? 'text-foreground' : 'text-muted-foreground',
                          )}
                        >
                          {shade}
                        </span>
                        <span className={cn('font-mono text-[9px] text-muted-foreground')}>
                          {hex}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* White & Black */}
        <section className={cn('space-y-4')}>
          <h2 className={cn('text-xl font-bold')}>White & Black</h2>
          <div className={cn('flex gap-4')}>
            <div className={cn('flex flex-col items-center')}>
              {/* Primitive hex swatch — no Tailwind class available */}
              <div
                className={cn('h-16 w-24 rounded border border-border')}
                style={{ backgroundColor: colors.white }}
              />
              <span className={cn('mt-1 text-sm font-medium')}>white</span>
              <span className={cn('font-mono text-xs text-muted-foreground')}>{colors.white}</span>
            </div>
            <div className={cn('flex flex-col items-center')}>
              {/* Primitive hex swatch — no Tailwind class available */}
              <div
                className={cn('h-16 w-24 rounded border border-border')}
                style={{ backgroundColor: colors.black }}
              />
              <span className={cn('mt-1 text-sm font-medium')}>black</span>
              <span className={cn('font-mono text-xs text-muted-foreground')}>{colors.black}</span>
            </div>
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
  title: 'Foundations/Colors',
  tags: ['!autodocs'],
  parameters: { layout: 'fullscreen' },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => <ColorsPage />,
};
