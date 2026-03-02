import type { Meta, StoryObj } from '@storybook/react';

import { AspectRatio } from '../components/aspect-ratio';
import { Avatar, AvatarFallback, AvatarImage } from '../components/avatar';
import { Badge } from '../components/badge';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '../components/breadcrumb';
import { Button } from '../components/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/card';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '../components/collapsible';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '../components/hover-card';
import { ScrollArea } from '../components/scroll-area';
import { Separator } from '../components/separator';
import { Textarea } from '../components/textarea';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../components/tooltip';
import { cn } from '../lib/utils';

/* ------------------------------------------------------------------ */
/*  Mock Data                                                          */
/* ------------------------------------------------------------------ */

const AUTHOR = {
  name: 'Sarah Johnson',
  avatar: 'SJ',
  bio: 'Senior frontend engineer and design systems advocate. Writing about React, TypeScript, and building accessible UIs.',
  articles: 42,
  followers: '12.5K',
};

const ARTICLE = {
  title: 'Building Scalable Design Systems with React and TypeScript',
  date: 'January 15, 2024',
  readTime: '8 min read',
  tags: ['React', 'TypeScript', 'Design Systems'],
  sections: [
    'Introduction',
    'Why Design Systems?',
    'Architecture',
    'Component Patterns',
    'Testing Strategy',
    'Conclusion',
  ],
};

const COMMENTS = [
  {
    author: 'Mike Chen',
    avatar: 'MC',
    date: '2 hours ago',
    text: 'Great article! The section on component composition patterns was especially helpful for our team.',
  },
  {
    author: 'Emily Davis',
    avatar: 'ED',
    date: '5 hours ago',
    text: 'This is exactly what I needed. We are currently building a design system and this gave us a solid foundation to start from.',
  },
  {
    author: 'Alex Kim',
    avatar: 'AK',
    date: '1 day ago',
    text: 'Would love to see a follow-up article on how to handle theming and dark mode in design systems.',
  },
];

const RELATED_ARTICLES = [
  { title: 'Advanced TypeScript Patterns for React', author: 'James Park', readTime: '6 min' },
  { title: 'Accessible Component Design', author: 'Lisa Wang', readTime: '10 min' },
  { title: 'Monorepo Strategies for Design Systems', author: 'Sarah Johnson', readTime: '7 min' },
];

/* ------------------------------------------------------------------ */
/*  Page Component                                                     */
/* ------------------------------------------------------------------ */

function BlogArticlePage() {
  return (
    <TooltipProvider>
      <div className={cn('min-h-screen bg-background text-foreground')}>
        {/* Header */}
        <header className={cn('border-b border-border')}>
          <div className={cn('flex h-14 items-center px-6')}>
            <span className={cn('text-lg font-bold')}>Nexus Blog</span>
            <nav className={cn('ml-8 flex items-center gap-4')} aria-label="Main navigation">
              <Button variant="ghost" size="sm">Articles</Button>
              <Button variant="ghost" size="sm">Tutorials</Button>
              <Button variant="ghost" size="sm">Podcasts</Button>
            </nav>
          </div>
        </header>

        <main className={cn('mx-auto max-w-6xl p-6')}>
          {/* Breadcrumb */}
          <Breadcrumb className={cn('mb-6')}>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="#">Home</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="#">Blog</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Building Scalable Design Systems</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          <div className={cn('grid gap-8 lg:grid-cols-[1fr_300px]')}>
            {/* Article Content */}
            <article>
              {/* Hero Image */}
              <AspectRatio ratio={21 / 9} className={cn('mb-8 overflow-hidden rounded-lg')}>
                <div className={cn('flex h-full items-center justify-center bg-muted')}>
                  <span className={cn('text-4xl')} aria-hidden="true">&#128187;</span>
                </div>
              </AspectRatio>

              {/* Title & Meta */}
              <div className={cn('mb-8')}>
                <div className={cn('mb-3 flex flex-wrap gap-2')}>
                  {ARTICLE.tags.map((tag) => (
                    <Badge key={tag} variant="secondary">{tag}</Badge>
                  ))}
                </div>
                <h1 className={cn('text-4xl font-bold leading-tight')}>{ARTICLE.title}</h1>
                <div className={cn('mt-4 flex items-center gap-4')}>
                  <HoverCard>
                    <HoverCardTrigger asChild>
                      <button type="button" className={cn('flex items-center gap-2')}>
                        <Avatar className={cn('h-8 w-8')}>
                          <AvatarImage alt={AUTHOR.name} />
                          <AvatarFallback>{AUTHOR.avatar}</AvatarFallback>
                        </Avatar>
                        <span className={cn('text-sm font-medium')}>{AUTHOR.name}</span>
                      </button>
                    </HoverCardTrigger>
                    <HoverCardContent className={cn('w-72')}>
                      <div className={cn('flex items-start gap-3')}>
                        <Avatar>
                          <AvatarImage alt={AUTHOR.name} />
                          <AvatarFallback>{AUTHOR.avatar}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className={cn('text-sm font-medium')}>{AUTHOR.name}</p>
                          <p className={cn('mt-1 text-xs text-muted-foreground')}>{AUTHOR.bio}</p>
                          <div className={cn('mt-2 flex gap-3 text-xs text-muted-foreground')}>
                            <span>{AUTHOR.articles} articles</span>
                            <span>{AUTHOR.followers} followers</span>
                          </div>
                        </div>
                      </div>
                    </HoverCardContent>
                  </HoverCard>
                  <Separator orientation="vertical" className={cn('h-4')} />
                  <span className={cn('text-sm text-muted-foreground')}>{ARTICLE.date}</span>
                  <span className={cn('text-sm text-muted-foreground')}>{ARTICLE.readTime}</span>
                </div>
              </div>

              {/* Article Body */}
              <div className={cn('prose max-w-none space-y-6')}>
                <section>
                  <h2 className={cn('text-2xl font-bold')} id="introduction">Introduction</h2>
                  <p className={cn('leading-relaxed text-muted-foreground')}>
                    Design systems have become essential for teams building consistent, scalable user interfaces.
                    In this article, we will explore how to build a production-ready design system using React
                    and TypeScript, covering everything from architecture decisions to testing strategies.
                  </p>
                </section>

                <section>
                  <h2 className={cn('text-2xl font-bold')} id="why-design-systems">Why Design Systems?</h2>
                  <p className={cn('leading-relaxed text-muted-foreground')}>
                    A design system is more than a component library. It is a shared language between designers
                    and developers that ensures consistency, improves development velocity, and reduces maintenance
                    costs. Teams with mature design systems report 30-50% faster development cycles.
                  </p>
                </section>

                <section>
                  <h2 className={cn('text-2xl font-bold')} id="architecture">Architecture</h2>
                  <p className={cn('leading-relaxed text-muted-foreground')}>
                    We recommend a monorepo structure with separate packages for tokens, components, and hooks.
                    This separation of concerns allows teams to independently version and consume what they need.
                    Tools like Turborepo make managing this setup straightforward.
                  </p>
                  <Card className={cn('my-4 bg-muted/50')}>
                    <CardContent className={cn('p-4')}>
                      <pre className={cn('text-sm')}>
{`packages/
  tokens/   → CSS Variables, Tailwind config
  ui/       → React components
  hooks/    → Custom React hooks`}
                      </pre>
                    </CardContent>
                  </Card>
                </section>

                <section>
                  <h2 className={cn('text-2xl font-bold')} id="component-patterns">Component Patterns</h2>
                  <p className={cn('leading-relaxed text-muted-foreground')}>
                    We use Radix UI primitives for complex interactive components and CVA (class-variance-authority)
                    for type-safe variant management. This combination gives us accessible components with
                    flexible styling out of the box.
                  </p>
                </section>

                <section>
                  <h2 className={cn('text-2xl font-bold')} id="testing-strategy">Testing Strategy</h2>
                  <p className={cn('leading-relaxed text-muted-foreground')}>
                    Every component is tested with Vitest and React Testing Library, focusing on user behavior
                    rather than implementation details. We use Chromatic for visual regression testing through
                    Storybook integration.
                  </p>
                </section>

                <section>
                  <h2 className={cn('text-2xl font-bold')} id="conclusion">Conclusion</h2>
                  <p className={cn('leading-relaxed text-muted-foreground')}>
                    Building a design system is a journey, not a destination. Start small, focus on the components
                    your team uses most, and iterate based on feedback. The key is to maintain consistency and
                    invest in documentation.
                  </p>
                </section>
              </div>

              <Separator className={cn('my-8')} />

              {/* Share buttons */}
              <div className={cn('flex items-center gap-2')}>
                <span className={cn('text-sm font-medium')}>Share:</span>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="outline" size="sm" aria-label="Share on Twitter">&#120143;</Button>
                  </TooltipTrigger>
                  <TooltipContent>Share on Twitter</TooltipContent>
                </Tooltip>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="outline" size="sm" aria-label="Copy link">&#128279;</Button>
                  </TooltipTrigger>
                  <TooltipContent>Copy Link</TooltipContent>
                </Tooltip>
              </div>

              <Separator className={cn('my-8')} />

              {/* Comments */}
              <section aria-label="Comments">
                <h3 className={cn('mb-4 text-xl font-bold')}>Comments ({COMMENTS.length})</h3>

                {/* New comment form */}
                <div className={cn('mb-6 space-y-3')}>
                  <Textarea placeholder="Write a comment..." aria-label="Write a comment" />
                  <div className={cn('flex justify-end')}>
                    <Button size="sm">Post Comment</Button>
                  </div>
                </div>

                <div className={cn('space-y-4')}>
                  {COMMENTS.map((comment) => (
                    <Card key={comment.author}>
                      <CardContent className={cn('pt-4')}>
                        <div className={cn('flex items-start gap-3')}>
                          <Avatar className={cn('h-8 w-8')}>
                            <AvatarImage alt={comment.author} />
                            <AvatarFallback className={cn('text-xs')}>{comment.avatar}</AvatarFallback>
                          </Avatar>
                          <div className={cn('flex-1')}>
                            <div className={cn('flex items-center gap-2')}>
                              <span className={cn('text-sm font-medium')}>{comment.author}</span>
                              <span className={cn('text-xs text-muted-foreground')}>{comment.date}</span>
                            </div>
                            <p className={cn('mt-1 text-sm text-muted-foreground')}>{comment.text}</p>
                            <Button variant="ghost" size="sm" className={cn('mt-1 h-auto p-0 text-xs text-muted-foreground')}>
                              Reply
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </section>
            </article>

            {/* Sidebar */}
            <aside className={cn('space-y-6')}>
              {/* Table of Contents */}
              <Card>
                <CardHeader>
                  <CardTitle className={cn('text-sm')}>Table of Contents</CardTitle>
                </CardHeader>
                <CardContent>
                  <ScrollArea className={cn('h-[200px]')}>
                    <nav aria-label="Table of contents">
                      <ul className={cn('space-y-2')}>
                        {ARTICLE.sections.map((section) => (
                          <li key={section}>
                            <a
                              href={`#${section.toLowerCase().replace(/[^a-z0-9\s]/g, '').replace(/\s+/g, '-')}`}
                              className={cn('text-sm text-muted-foreground hover:text-foreground')}
                            >
                              {section}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </nav>
                  </ScrollArea>
                </CardContent>
              </Card>

              {/* Author Card */}
              <Card>
                <CardContent className={cn('pt-6')}>
                  <div className={cn('flex flex-col items-center text-center')}>
                    <Avatar className={cn('h-16 w-16')}>
                      <AvatarImage alt={AUTHOR.name} />
                      <AvatarFallback className={cn('text-lg')}>{AUTHOR.avatar}</AvatarFallback>
                    </Avatar>
                    <h3 className={cn('mt-3 font-medium')}>{AUTHOR.name}</h3>
                    <p className={cn('mt-1 text-xs text-muted-foreground')}>{AUTHOR.bio}</p>
                    <Button size="sm" className={cn('mt-3 w-full')}>Follow</Button>
                  </div>
                </CardContent>
              </Card>

              {/* Related Articles */}
              <Card>
                <CardHeader>
                  <CardTitle className={cn('text-sm')}>Related Articles</CardTitle>
                </CardHeader>
                <CardContent>
                  <Collapsible defaultOpen>
                    <CollapsibleTrigger asChild>
                      <Button variant="ghost" size="sm" className={cn('mb-2 w-full justify-start')}>
                        Show articles
                      </Button>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <div className={cn('space-y-3')}>
                        {RELATED_ARTICLES.map((article) => (
                          <div key={article.title} className={cn('space-y-1')}>
                            <p className={cn('text-sm font-medium leading-tight')}>
                              <button type="button" className={cn('text-left hover:underline')}>
                                {article.title}
                              </button>
                            </p>
                            <p className={cn('text-xs text-muted-foreground')}>
                              {article.author} &middot; {article.readTime}
                            </p>
                          </div>
                        ))}
                      </div>
                    </CollapsibleContent>
                  </Collapsible>
                </CardContent>
              </Card>
            </aside>
          </div>
        </main>
      </div>
    </TooltipProvider>
  );
}

/* ------------------------------------------------------------------ */
/*  Story                                                              */
/* ------------------------------------------------------------------ */

const meta: Meta = {
  title: 'Examples/Blog Article',
  parameters: { layout: 'fullscreen' },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => <BlogArticlePage />,
};
