import { typography } from '@nexus-ui/tokens';
import type { Meta, StoryObj } from '@storybook/react';

import { cn } from '../lib/utils';

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const FONT_FAMILIES = [
  {
    name: 'Sans — Pretendard',
    stack: typography.fontFamily.sans.join(', '),
    className: 'font-sans',
    sample: 'The quick brown fox jumps over the lazy dog. 0123456789',
  },
  {
    name: 'Mono — JetBrains Mono',
    stack: typography.fontFamily.mono.join(', '),
    className: 'font-mono',
    sample: 'const fn = (x: number) => x * 2; // 0123456789',
  },
];

const TYPE_SCALE = Object.entries(typography.fontSize).map(([name, [size, config]]) => ({
  name,
  size,
  lineHeight: config.lineHeight,
  pxSize: `${parseFloat(size) * 16}px`,
  pxLineHeight: `${parseFloat(config.lineHeight) * 16}px`,
}));

const FONT_WEIGHTS = Object.entries(typography.fontWeight).map(([name, value]) => ({
  name,
  value,
}));

/* ------------------------------------------------------------------ */
/*  Page Component                                                     */
/* ------------------------------------------------------------------ */

function TypographyPage() {
  return (
    <div className={cn('min-h-screen bg-background text-foreground')}>
      <div className={cn('mx-auto max-w-5xl space-y-12 p-8')}>
        <section className={cn('space-y-2')}>
          <h1 className={cn('text-3xl font-bold tracking-tight')}>Typography</h1>
          <p className={cn('text-lg text-muted-foreground')}>
            Font families, type scale, and weight system from design tokens.
          </p>
        </section>

        {/* Font Families */}
        <section className={cn('space-y-6')}>
          <h2 className={cn('text-2xl font-bold')}>Font Families</h2>
          <div className={cn('space-y-6')}>
            {FONT_FAMILIES.map((family) => (
              <div key={family.name} className={cn('space-y-2 rounded-lg border border-border p-4')}>
                <div className={cn('flex items-baseline justify-between')}>
                  <h3 className={cn('text-sm font-semibold')}>{family.name}</h3>
                </div>
                <p className={cn('text-xs text-muted-foreground')}>
                  <code className={cn('rounded bg-muted px-1 py-0.5 font-mono')}>{family.stack}</code>
                </p>
                <p className={cn('text-2xl', family.className)}>{family.sample}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Type Scale */}
        <section className={cn('space-y-6')}>
          <h2 className={cn('text-2xl font-bold')}>Type Scale</h2>
          <div className={cn('space-y-4')}>
            {TYPE_SCALE.map((step) => (
              <div
                key={step.name}
                className={cn('flex items-baseline gap-4 rounded-lg border border-border p-4')}
              >
                <div className={cn('w-24 shrink-0')}>
                  <p className={cn('text-sm font-semibold')}>{step.name}</p>
                  <p className={cn('font-mono text-xs text-muted-foreground')}>
                    {step.size} / {step.lineHeight}
                  </p>
                  <p className={cn('font-mono text-xs text-muted-foreground')}>
                    {step.pxSize} / {step.pxLineHeight}
                  </p>
                </div>
                <p
                  className={cn('flex-1 truncate')}
                  style={{ fontSize: step.size, lineHeight: step.lineHeight }}
                >
                  The quick brown fox jumps over the lazy dog
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Font Weights */}
        <section className={cn('space-y-6')}>
          <h2 className={cn('text-2xl font-bold')}>Font Weights</h2>
          <div className={cn('space-y-3')}>
            {FONT_WEIGHTS.map((w) => (
              <div
                key={w.name}
                className={cn('flex items-center gap-4 rounded-lg border border-border p-4')}
              >
                <div className={cn('w-24 shrink-0')}>
                  <p className={cn('text-sm font-semibold')}>{w.name}</p>
                  <p className={cn('font-mono text-xs text-muted-foreground')}>{w.value}</p>
                </div>
                <p className={cn('flex-1 text-xl')} style={{ fontWeight: Number(w.value) }}>
                  The quick brown fox jumps over the lazy dog
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Combined Specimen */}
        <section className={cn('space-y-6')}>
          <h2 className={cn('text-2xl font-bold')}>Combined Specimen</h2>
          <article className={cn('space-y-4 rounded-lg border border-border p-6')}>
            <h3 className={cn('text-2xl font-bold leading-tight')}>
              Building Scalable Design Systems
            </h3>
            <p className={cn('text-sm text-muted-foreground')}>
              Published on March 2, 2026 &middot; 5 min read
            </p>
            <p className={cn('text-base leading-relaxed')}>
              A design system is more than a component library. It is a shared language between
              design and engineering that accelerates product development while maintaining visual
              and functional consistency across every surface of your application.
            </p>
            <p className={cn('text-base leading-relaxed')}>
              By codifying decisions into tokens — colors, typography, spacing, motion — teams can
              iterate faster with confidence that their work aligns with the broader product vision.
            </p>
            <div className={cn('rounded bg-muted p-4 font-mono text-sm')}>
              <code>import {'{ Button }'} from &apos;@nexus-ui/ui&apos;;</code>
            </div>
            <p className={cn('text-xs text-muted-foreground')}>
              Caption: Tokens flow from primitives through semantic layers into component APIs.
            </p>
          </article>
        </section>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Story                                                              */
/* ------------------------------------------------------------------ */

const meta: Meta = {
  title: 'Foundations/Typography',
  parameters: { layout: 'fullscreen' },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => <TypographyPage />,
};
