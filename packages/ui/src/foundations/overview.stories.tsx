import { colors, typography, spacing } from '@nexus-ui-kit/tokens';
import type { Meta, StoryObj } from '@storybook/react';

import { Badge } from '../components/badge';
import { Button } from '../components/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/card';
import { Separator } from '../components/separator';
import { cn } from '../lib/utils';

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const STATS = [
  { label: 'Primitive Colors', value: '57' },
  { label: 'Semantic Tokens', value: '26' },
  { label: 'Font Families', value: '2' },
  { label: 'Type Scale Steps', value: '7' },
  { label: 'Spacing Steps', value: '13' },
  { label: 'Radius Variants', value: '7' },
  { label: 'Animations', value: '16' },
];

const SEMANTIC_PREVIEW = [
  { name: 'primary', bg: 'bg-primary', fg: 'text-primary-foreground' },
  { name: 'secondary', bg: 'bg-secondary', fg: 'text-secondary-foreground' },
  { name: 'destructive', bg: 'bg-destructive', fg: 'text-destructive-foreground' },
  { name: 'muted', bg: 'bg-muted', fg: 'text-muted-foreground' },
  { name: 'accent', bg: 'bg-accent', fg: 'text-accent-foreground' },
];

const ARCHITECTURE_LAYERS = [
  {
    title: 'Primitive Tokens',
    description: 'Raw values — colors, font sizes, spacing',
    examples: 'gray.500, blue.600, 0.75rem',
    color: 'bg-muted',
  },
  {
    title: 'Semantic Tokens',
    description: 'Contextual meaning — CSS custom properties',
    examples: '--primary, --background, --border',
    color: 'bg-accent',
  },
  {
    title: 'Component Tokens',
    description: 'Tailwind classes consumed by UI components',
    examples: 'bg-primary, text-foreground, border-border',
    color: 'bg-primary/10',
  },
];

/* ------------------------------------------------------------------ */
/*  Page Component                                                     */
/* ------------------------------------------------------------------ */

function OverviewPage() {
  return (
    <div className={cn('min-h-screen bg-background text-foreground')}>
      <div className={cn('mx-auto max-w-5xl space-y-12 p-8')}>
        {/* Hero */}
        <section className={cn('space-y-4 text-center')}>
          <div className={cn('flex items-center justify-center gap-2')}>
            <h1 className={cn('text-3xl font-bold tracking-tight')}>Nexus UI Design System</h1>
            <Badge>v0.1.0</Badge>
          </div>
          <p className={cn('mx-auto max-w-2xl text-lg text-muted-foreground')}>
            An enterprise-grade design system built with Radix UI, Tailwind CSS, and CSS custom
            properties. Themeable, accessible, and composable.
          </p>
        </section>

        <Separator />

        {/* Token Architecture */}
        <section className={cn('space-y-6')}>
          <h2 className={cn('text-2xl font-bold')}>Token Architecture</h2>
          <p className={cn('text-muted-foreground')}>
            A three-layer token system ensures consistency, theming, and maintainability.
          </p>
          <div className={cn('grid gap-4 md:grid-cols-3')}>
            {ARCHITECTURE_LAYERS.map((layer, i) => (
              <Card key={layer.title}>
                <CardHeader>
                  <div className={cn('flex items-center gap-2')}>
                    <div className={cn('flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold', layer.color)}>
                      {i + 1}
                    </div>
                    <CardTitle className={cn('text-base')}>{layer.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className={cn('space-y-2')}>
                  <p className={cn('text-sm text-muted-foreground')}>{layer.description}</p>
                  <code className={cn('block rounded bg-muted px-2 py-1 font-mono text-xs')}>
                    {layer.examples}
                  </code>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className={cn('flex items-center justify-center gap-2 text-sm text-muted-foreground')}>
            <span className={cn('rounded bg-muted px-2 py-1')}>Primitive</span>
            <span aria-hidden="true">&rarr;</span>
            <span className={cn('rounded bg-accent px-2 py-1')}>Semantic</span>
            <span aria-hidden="true">&rarr;</span>
            <span className={cn('rounded bg-primary/10 px-2 py-1')}>Component</span>
          </div>
        </section>

        <Separator />

        {/* Quick Reference Cards */}
        <section className={cn('space-y-6')}>
          <h2 className={cn('text-2xl font-bold')}>Quick Reference</h2>
          <div className={cn('grid gap-4 sm:grid-cols-2')}>
            {/* Colors Preview */}
            <Card>
              <CardHeader>
                <CardTitle className={cn('text-base')}>Colors</CardTitle>
              </CardHeader>
              <CardContent>
                <div className={cn('flex gap-1')}>
                  {SEMANTIC_PREVIEW.map((c) => (
                    <div
                      key={c.name}
                      className={cn('flex h-10 flex-1 items-center justify-center rounded text-xs font-medium', c.bg, c.fg)}
                    >
                      {c.name}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Typography Preview */}
            <Card>
              <CardHeader>
                <CardTitle className={cn('text-base')}>Typography</CardTitle>
              </CardHeader>
              <CardContent className={cn('space-y-1')}>
                {Object.entries(typography.fontSize).map(([name, [size]]) => (
                  <p key={name} className={cn('truncate text-muted-foreground')} style={{ fontSize: size }}>
                    {name} — The quick brown fox
                  </p>
                ))}
              </CardContent>
            </Card>

            {/* Spacing Preview */}
            <Card>
              <CardHeader>
                <CardTitle className={cn('text-base')}>Spacing</CardTitle>
              </CardHeader>
              <CardContent>
                <div className={cn('flex flex-wrap gap-1')}>
                  {Object.entries(spacing).slice(0, 8).map(([key, val]) => (
                    <div key={key} className={cn('flex flex-col items-center')}>
                      <div
                        className={cn('rounded bg-primary')}
                        style={{ width: val, height: val, minWidth: 4, minHeight: 4 }}
                      />
                      <span className={cn('mt-1 font-mono text-[10px] text-muted-foreground')}>{key}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Animation Preview */}
            <Card>
              <CardHeader>
                <CardTitle className={cn('text-base')}>Animations</CardTitle>
              </CardHeader>
              <CardContent>
                <div className={cn('flex flex-wrap gap-2')}>
                  {['animate-fade-in', 'animate-scale-in', 'animate-slide-in-from-bottom'].map((anim) => (
                    <div
                      key={anim}
                      className={cn('h-8 w-8 rounded bg-primary', anim)}
                      style={{ animationIterationCount: 'infinite', animationDirection: 'alternate', animationDuration: '1.5s' }}
                    />
                  ))}
                </div>
                <p className={cn('mt-2 text-xs text-muted-foreground')}>16 animation utilities</p>
              </CardContent>
            </Card>
          </div>
        </section>

        <Separator />

        {/* Theme Comparison */}
        <section className={cn('space-y-6')}>
          <h2 className={cn('text-2xl font-bold')}>Theme Comparison</h2>
          <div className={cn('grid gap-4 md:grid-cols-2')}>
            {/* Light */}
            <div className={cn('overflow-hidden rounded-lg border border-border')}>
              <div className={cn('bg-white p-4 text-[#09090b]')}>
                <p className={cn('mb-2 text-xs font-semibold uppercase tracking-wider opacity-60')}>Light</p>
                <div className={cn('space-y-2')}>
                  <div className={cn('flex gap-2')}>
                    <Button variant="solid" size="sm" className={cn('pointer-events-none bg-[hsl(222.2,47.4%,11.2%)] text-[hsl(210,40%,98%)]')}>Primary</Button>
                    <Button variant="outline" size="sm" className={cn('pointer-events-none border-[hsl(214.3,31.8%,91.4%)] text-[#09090b]')}>Outline</Button>
                  </div>
                  <div className={cn('flex gap-1')}>
                    {[colors.gray[100], colors.gray[200], colors.gray[300], colors.gray[400], colors.gray[500]].map((c, i) => (
                      /* Primitive hex swatch — no Tailwind class available */
                      <div key={i} className={cn('h-6 flex-1 rounded')} style={{ backgroundColor: c }} />
                    ))}
                  </div>
                </div>
              </div>
            </div>
            {/* Dark */}
            <div className={cn('overflow-hidden rounded-lg border border-border')}>
              <div className={cn('bg-[#09090b] p-4 text-[#fafafa]')}>
                <p className={cn('mb-2 text-xs font-semibold uppercase tracking-wider opacity-60')}>Dark</p>
                <div className={cn('space-y-2')}>
                  <div className={cn('flex gap-2')}>
                    <Button variant="solid" size="sm" className={cn('pointer-events-none bg-[hsl(210,40%,98%)] text-[hsl(222.2,47.4%,11.2%)]')}>Primary</Button>
                    <Button variant="outline" size="sm" className={cn('pointer-events-none border-[hsl(217.2,32.6%,17.5%)] text-[#fafafa]')}>Outline</Button>
                  </div>
                  <div className={cn('flex gap-1')}>
                    {[colors.gray[950], colors.gray[900], colors.gray[800], colors.gray[700], colors.gray[600]].map((c, i) => (
                      /* Primitive hex swatch — no Tailwind class available */
                      <div key={i} className={cn('h-6 flex-1 rounded')} style={{ backgroundColor: c }} />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <Separator />

        {/* Statistics */}
        <section className={cn('space-y-6')}>
          <h2 className={cn('text-2xl font-bold')}>At a Glance</h2>
          <div className={cn('grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-7')}>
            {STATS.map((stat) => (
              <div key={stat.label} className={cn('flex flex-col items-center rounded-lg border border-border p-4 text-center')}>
                <span className={cn('text-2xl font-bold')}>{stat.value}</span>
                <span className={cn('text-xs text-muted-foreground')}>{stat.label}</span>
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
  title: 'Foundations/Overview',
  tags: ['!autodocs'],
  parameters: { layout: 'fullscreen' },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => <OverviewPage />,
};
