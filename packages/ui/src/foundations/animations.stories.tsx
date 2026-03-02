import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '../components/accordion';
import { Button } from '../components/button';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '../components/collapsible';
import { cn } from '../lib/utils';

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

interface AnimationDef {
  name: string;
  className: string;
  duration: string;
  easing: string;
}

const ANIMATION_GROUPS: { category: string; items: AnimationDef[] }[] = [
  {
    category: 'Fade',
    items: [
      { name: 'fade-in', className: 'animate-fade-in', duration: '150ms', easing: 'ease-out' },
      { name: 'fade-out', className: 'animate-fade-out', duration: '150ms', easing: 'ease-in' },
    ],
  },
  {
    category: 'Scale',
    items: [
      { name: 'scale-in', className: 'animate-scale-in', duration: '150ms', easing: 'ease-out' },
      { name: 'scale-out', className: 'animate-scale-out', duration: '150ms', easing: 'ease-in' },
    ],
  },
  {
    category: 'Slide In',
    items: [
      { name: 'slide-in-from-top', className: 'animate-slide-in-from-top', duration: '200ms', easing: 'ease-out' },
      { name: 'slide-in-from-bottom', className: 'animate-slide-in-from-bottom', duration: '200ms', easing: 'ease-out' },
      { name: 'slide-in-from-left', className: 'animate-slide-in-from-left', duration: '200ms', easing: 'ease-out' },
      { name: 'slide-in-from-right', className: 'animate-slide-in-from-right', duration: '200ms', easing: 'ease-out' },
    ],
  },
  {
    category: 'Slide Out',
    items: [
      { name: 'slide-out-to-top', className: 'animate-slide-out-to-top', duration: '200ms', easing: 'ease-out' },
      { name: 'slide-out-to-bottom', className: 'animate-slide-out-to-bottom', duration: '200ms', easing: 'ease-out' },
      { name: 'slide-out-to-left', className: 'animate-slide-out-to-left', duration: '200ms', easing: 'ease-out' },
      { name: 'slide-out-to-right', className: 'animate-slide-out-to-right', duration: '200ms', easing: 'ease-out' },
    ],
  },
  {
    category: 'Content',
    items: [
      { name: 'accordion-down', className: 'animate-accordion-down', duration: '200ms', easing: 'ease-out' },
      { name: 'accordion-up', className: 'animate-accordion-up', duration: '200ms', easing: 'ease-out' },
      { name: 'collapsible-down', className: 'animate-collapsible-down', duration: '200ms', easing: 'ease-out' },
      { name: 'collapsible-up', className: 'animate-collapsible-up', duration: '200ms', easing: 'ease-out' },
    ],
  },
];

/* ------------------------------------------------------------------ */
/*  Interactive Demo Component                                         */
/* ------------------------------------------------------------------ */

function AnimationCard({ anim }: { anim: AnimationDef }) {
  const [counter, setCounter] = useState(0);

  return (
    <div className={cn('flex flex-col items-center gap-3 rounded-lg border border-border p-4')}>
      <div className={cn('flex h-16 w-16 items-center justify-center overflow-hidden')}>
        <div
          key={counter}
          className={cn('h-12 w-12 rounded-md bg-primary', anim.className)}
        />
      </div>
      <div className={cn('text-center')}>
        <p className={cn('text-sm font-medium')}>{anim.name}</p>
        <p className={cn('font-mono text-xs text-muted-foreground')}>
          {anim.duration} · {anim.easing}
        </p>
      </div>
      <Button
        variant="outline"
        size="sm"
        onClick={() => setCounter((c) => c + 1)}
        aria-label={`Replay ${anim.name} animation`}
      >
        Replay
      </Button>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Page Component                                                     */
/* ------------------------------------------------------------------ */

function AnimationsPage() {
  return (
    <div className={cn('min-h-screen bg-background text-foreground')}>
      <div className={cn('mx-auto max-w-5xl space-y-12 p-8')}>
        <section className={cn('space-y-2')}>
          <h1 className={cn('text-3xl font-bold tracking-tight')}>Animations</h1>
          <p className={cn('text-lg text-muted-foreground')}>
            16 animation utilities for entrances, exits, and content transitions.
            Click &ldquo;Replay&rdquo; to re-trigger each animation.
          </p>
        </section>

        {/* Animation Groups */}
        {ANIMATION_GROUPS.filter((g) => g.category !== 'Content').map((group) => (
          <section key={group.category} className={cn('space-y-4')}>
            <h2 className={cn('text-2xl font-bold')}>{group.category}</h2>
            <div className={cn('grid gap-4 sm:grid-cols-2 lg:grid-cols-4')}>
              {group.items.map((anim) => (
                <AnimationCard key={anim.name} anim={anim} />
              ))}
            </div>
          </section>
        ))}

        {/* Content Animations — with real components */}
        <section className={cn('space-y-6')}>
          <h2 className={cn('text-2xl font-bold')}>Content</h2>
          <p className={cn('text-sm text-muted-foreground')}>
            Height-based animations used by Accordion and Collapsible components.
          </p>

          <div className={cn('grid gap-6 md:grid-cols-2')}>
            {/* Accordion Demo */}
            <div className={cn('space-y-2')}>
              <h3 className={cn('text-sm font-semibold')}>Accordion</h3>
              <p className={cn('font-mono text-xs text-muted-foreground')}>
                accordion-down / accordion-up · 200ms
              </p>
              <Accordion type="single" collapsible className={cn('rounded-lg border border-border')}>
                <AccordionItem value="item-1">
                  <AccordionTrigger className={cn('px-4')}>What are design tokens?</AccordionTrigger>
                  <AccordionContent className={cn('px-4')}>
                    Design tokens are the atomic values of a design system — colors, typography,
                    spacing, and motion. They bridge design and code.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                  <AccordionTrigger className={cn('px-4')}>Why use CSS custom properties?</AccordionTrigger>
                  <AccordionContent className={cn('px-4')}>
                    CSS custom properties enable runtime theming without JavaScript, making
                    dark mode and custom themes possible with a single class toggle.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                  <AccordionTrigger className={cn('px-4')}>How does Radix UI help?</AccordionTrigger>
                  <AccordionContent className={cn('px-4')}>
                    Radix provides unstyled, accessible primitives with focus management,
                    keyboard navigation, and ARIA attributes built in.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>

            {/* Collapsible Demo */}
            <div className={cn('space-y-2')}>
              <h3 className={cn('text-sm font-semibold')}>Collapsible</h3>
              <p className={cn('font-mono text-xs text-muted-foreground')}>
                collapsible-down / collapsible-up · 200ms
              </p>
              <Collapsible className={cn('rounded-lg border border-border')}>
                <CollapsibleTrigger asChild>
                  <Button variant="ghost" className={cn('w-full justify-start px-4')}>
                    Show more details
                  </Button>
                </CollapsibleTrigger>
                <CollapsibleContent className={cn('px-4 pb-4')}>
                  <p className={cn('text-sm text-muted-foreground')}>
                    The collapsible animation smoothly expands and collapses content using
                    CSS height transitions driven by Radix&apos;s measured content height
                    via <code className={cn('rounded bg-muted px-1 font-mono text-xs')}>--radix-collapsible-content-height</code>.
                  </p>
                </CollapsibleContent>
              </Collapsible>
            </div>
          </div>
        </section>

        {/* Timing Reference Table */}
        <section className={cn('space-y-6')}>
          <h2 className={cn('text-2xl font-bold')}>Timing Reference</h2>
          <div className={cn('overflow-x-auto rounded-lg border border-border')}>
            <table className={cn('w-full text-sm')}>
              <thead>
                <tr className={cn('border-b border-border bg-muted/50')}>
                  <th className={cn('px-4 py-2 text-left font-semibold')}>Animation</th>
                  <th className={cn('px-4 py-2 text-left font-semibold')}>Duration</th>
                  <th className={cn('px-4 py-2 text-left font-semibold')}>Easing</th>
                  <th className={cn('px-4 py-2 text-left font-semibold')}>Category</th>
                </tr>
              </thead>
              <tbody>
                {ANIMATION_GROUPS.flatMap((group) =>
                  group.items.map((anim) => (
                    <tr key={anim.name} className={cn('border-b border-border last:border-0')}>
                      <td className={cn('px-4 py-2 font-mono text-xs')}>{anim.name}</td>
                      <td className={cn('px-4 py-2 font-mono text-xs')}>{anim.duration}</td>
                      <td className={cn('px-4 py-2 font-mono text-xs')}>{anim.easing}</td>
                      <td className={cn('px-4 py-2 text-muted-foreground')}>{group.category}</td>
                    </tr>
                  )),
                )}
              </tbody>
            </table>
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
  title: 'Foundations/Animations',
  parameters: { layout: 'fullscreen' },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => <AnimationsPage />,
};
