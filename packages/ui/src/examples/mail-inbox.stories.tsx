import type { Meta, StoryObj } from '@storybook/react';
import * as React from 'react';

import { Avatar, AvatarFallback, AvatarImage } from '../components/avatar';
import { Badge } from '../components/badge';
import { Button } from '../components/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../components/dialog';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '../components/hover-card';
import { Input } from '../components/input';
import { Label } from '../components/label';
import { ScrollArea } from '../components/scroll-area';
import { Separator } from '../components/separator';
import { Skeleton } from '../components/skeleton';
import { Textarea } from '../components/textarea';
import { ToggleGroup, ToggleGroupItem } from '../components/toggle';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../components/tooltip';
import { cn } from '../lib/utils';

/* ------------------------------------------------------------------ */
/*  Mock Data                                                          */
/* ------------------------------------------------------------------ */

const EMAILS = [
  {
    id: 1,
    sender: 'Sarah Johnson',
    avatar: 'SJ',
    email: 'sarah@example.com',
    subject: 'Project Update: Q1 Review',
    preview: 'Hi team, I wanted to share the latest progress on our Q1 objectives. We have exceeded...',
    body: 'Hi team,\n\nI wanted to share the latest progress on our Q1 objectives. We have exceeded our targets by 15% across all key metrics.\n\nKey highlights:\n- Revenue grew by 23% MoM\n- Customer satisfaction score reached 4.8/5\n- Team velocity improved by 30%\n\nLet me know if you have any questions about the detailed report.\n\nBest,\nSarah',
    date: '10:24 AM',
    unread: true,
    labels: ['work'],
  },
  {
    id: 2,
    sender: 'Mike Chen',
    avatar: 'MC',
    email: 'mike@example.com',
    subject: 'Design System Components',
    preview: 'The new component library is looking great! I have a few suggestions for the Button...',
    body: 'Hey,\n\nThe new component library is looking great! I have a few suggestions for the Button and Dialog components that I think could improve consistency.\n\nCan we schedule a quick review session this week?\n\nThanks,\nMike',
    date: '9:15 AM',
    unread: true,
    labels: ['design'],
  },
  {
    id: 3,
    sender: 'Emily Davis',
    avatar: 'ED',
    email: 'emily@example.com',
    subject: 'Team Lunch Friday',
    preview: 'Hey everyone! Just a reminder about our team lunch this Friday at noon. We will be going...',
    body: 'Hey everyone!\n\nJust a reminder about our team lunch this Friday at noon. We will be going to the Italian place downtown.\n\nPlease RSVP by Thursday.\n\nCheers,\nEmily',
    date: 'Yesterday',
    unread: false,
    labels: ['personal'],
  },
  {
    id: 4,
    sender: 'Alex Kim',
    avatar: 'AK',
    email: 'alex@example.com',
    subject: 'Bug Report: Login Flow',
    preview: 'Found a critical bug in the login flow. When users try to reset their password...',
    body: 'Hi,\n\nFound a critical bug in the login flow. When users try to reset their password with a special character in their email, the form throws a validation error.\n\nSteps to reproduce:\n1. Go to /forgot-password\n2. Enter email with + character\n3. Submit form\n\nExpected: Email should be accepted\nActual: Validation error shown\n\nPriority: High\n\nAlex',
    date: 'Yesterday',
    unread: false,
    labels: ['work', 'urgent'],
  },
  {
    id: 5,
    sender: 'Lisa Park',
    avatar: 'LP',
    email: 'lisa@example.com',
    subject: 'Conference Tickets',
    preview: 'Great news! We got 4 tickets for the React Summit conference in November...',
    body: 'Great news!\n\nWe got 4 tickets for the React Summit conference in November. Please let me know if you are interested in attending.\n\nDeadline to confirm: Next Monday.\n\nLisa',
    date: 'Mon',
    unread: false,
    labels: ['personal'],
  },
];

/* ------------------------------------------------------------------ */
/*  Page Component                                                     */
/* ------------------------------------------------------------------ */

function MailInboxPage() {
  const [selectedEmail, setSelectedEmail] = React.useState(EMAILS[0]);
  const [view, setView] = React.useState('all');

  return (
    <TooltipProvider>
      <div className={cn('flex h-screen flex-col bg-background text-foreground')}>
        {/* Header */}
        <header className={cn('flex h-14 items-center justify-between border-b border-border px-4')}>
          <div className={cn('flex items-center gap-4')}>
            <span className={cn('text-lg font-bold')}>Mail</span>
            <Badge variant="secondary">{EMAILS.filter((e) => e.unread).length} unread</Badge>
          </div>
          <div className={cn('flex items-center gap-2')}>
            <Input placeholder="Search mail..." className={cn('w-64')} aria-label="Search mail" />
            <Dialog>
              <DialogTrigger asChild>
                <Button size="sm">Compose</Button>
              </DialogTrigger>
              <DialogContent className={cn('sm:max-w-[500px]')}>
                <DialogHeader>
                  <DialogTitle>New Message</DialogTitle>
                  <DialogDescription>Compose a new email message.</DialogDescription>
                </DialogHeader>
                <div className={cn('space-y-4 py-4')}>
                  <div className={cn('space-y-2')}>
                    <Label htmlFor="compose-to">To</Label>
                    <Input id="compose-to" placeholder="recipient@example.com" />
                  </div>
                  <div className={cn('space-y-2')}>
                    <Label htmlFor="compose-subject">Subject</Label>
                    <Input id="compose-subject" placeholder="Subject" />
                  </div>
                  <div className={cn('space-y-2')}>
                    <Label htmlFor="compose-body">Message</Label>
                    <Textarea id="compose-body" placeholder="Write your message..." className={cn('min-h-[200px]')} />
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline">Save Draft</Button>
                  <Button>Send</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </header>

        {/* Main Content */}
        <div className={cn('flex flex-1 overflow-hidden')}>
          {/* Sidebar - Email List */}
          <aside className={cn('w-[380px] border-r border-border')}>
            <div className={cn('flex items-center gap-2 border-b border-border p-3')}>
              <ToggleGroup type="single" value={view} onValueChange={(v) => v && setView(v)}>
                <ToggleGroupItem value="all" aria-label="All mail" className={cn('text-xs')}>
                  All Mail
                </ToggleGroupItem>
                <ToggleGroupItem value="unread" aria-label="Unread mail" className={cn('text-xs')}>
                  Unread
                </ToggleGroupItem>
              </ToggleGroup>
            </div>
            <ScrollArea className={cn('h-[calc(100vh-112px)]')}>
              <div className={cn('flex flex-col')}>
                {EMAILS.filter((e) => view === 'all' || e.unread).map((email) => (
                  <button
                    key={email.id}
                    type="button"
                    className={cn(
                      'flex flex-col gap-1 border-b border-border p-4 text-left transition-colors hover:bg-accent',
                      selectedEmail.id === email.id && 'bg-accent',
                    )}
                    onClick={() => setSelectedEmail(email)}
                    aria-label={`Email from ${email.sender}: ${email.subject}`}
                  >
                    <div className={cn('flex items-center justify-between')}>
                      <div className={cn('flex items-center gap-2')}>
                        {email.unread && <span className={cn('h-2 w-2 rounded-full bg-primary')} />}
                        <span className={cn('text-sm font-medium', email.unread && 'font-bold')}>
                          {email.sender}
                        </span>
                      </div>
                      <span className={cn('text-xs text-muted-foreground')}>{email.date}</span>
                    </div>
                    <span className={cn('text-sm font-medium')}>{email.subject}</span>
                    <span className={cn('line-clamp-1 text-xs text-muted-foreground')}>{email.preview}</span>
                    <div className={cn('flex gap-1 pt-1')}>
                      {email.labels.map((label) => (
                        <Badge key={label} variant="outline" className={cn('text-xs')}>
                          {label}
                        </Badge>
                      ))}
                    </div>
                  </button>
                ))}
              </div>
            </ScrollArea>
          </aside>

          {/* Reading Panel */}
          <main className={cn('flex flex-1 flex-col')}>
            {selectedEmail ? (
              <>
                <div className={cn('border-b border-border p-6')}>
                  <div className={cn('flex items-start justify-between')}>
                    <div className={cn('flex items-start gap-4')}>
                      <HoverCard>
                        <HoverCardTrigger asChild>
                          <button type="button" className={cn('cursor-pointer')} aria-label={`View ${selectedEmail.sender}'s profile`}>
                            <Avatar>
                              <AvatarImage alt={selectedEmail.sender} />
                              <AvatarFallback>{selectedEmail.avatar}</AvatarFallback>
                            </Avatar>
                          </button>
                        </HoverCardTrigger>
                        <HoverCardContent className={cn('w-64')}>
                          <div className={cn('flex items-center gap-3')}>
                            <Avatar>
                              <AvatarImage alt={selectedEmail.sender} />
                              <AvatarFallback>{selectedEmail.avatar}</AvatarFallback>
                            </Avatar>
                            <div>
                              <p className={cn('text-sm font-medium')}>{selectedEmail.sender}</p>
                              <p className={cn('text-xs text-muted-foreground')}>{selectedEmail.email}</p>
                            </div>
                          </div>
                          <Separator className={cn('my-2')} />
                          <p className={cn('text-xs text-muted-foreground')}>
                            Team member since Jan 2023. 142 emails exchanged.
                          </p>
                        </HoverCardContent>
                      </HoverCard>
                      <div>
                        <h2 className={cn('text-xl font-bold')}>{selectedEmail.subject}</h2>
                        <p className={cn('text-sm text-muted-foreground')}>
                          From: {selectedEmail.sender} &lt;{selectedEmail.email}&gt;
                        </p>
                      </div>
                    </div>
                    <div className={cn('flex gap-1')}>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button variant="ghost" size="sm" aria-label="Reply">
                            &#8617;
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>Reply</TooltipContent>
                      </Tooltip>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button variant="ghost" size="sm" aria-label="Forward">
                            &#8618;
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>Forward</TooltipContent>
                      </Tooltip>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button variant="ghost" size="sm" aria-label="Archive">
                            &#128451;
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>Archive</TooltipContent>
                      </Tooltip>
                    </div>
                  </div>
                </div>
                <ScrollArea className={cn('flex-1 p-6')}>
                  <div className={cn('whitespace-pre-wrap text-sm leading-relaxed')}>
                    {selectedEmail.body}
                  </div>
                  <Separator className={cn('my-6')} />
                  <div className={cn('space-y-3')}>
                    <Label htmlFor="quick-reply">Quick Reply</Label>
                    <Textarea id="quick-reply" placeholder="Type your reply..." className={cn('min-h-[100px]')} />
                    <div className={cn('flex justify-end')}>
                      <Button size="sm">Send Reply</Button>
                    </div>
                  </div>
                </ScrollArea>
              </>
            ) : (
              /* Loading Skeleton */
              <div className={cn('flex flex-1 flex-col gap-4 p-6')}>
                <Skeleton className={cn('h-8 w-64')} />
                <Skeleton className={cn('h-4 w-48')} />
                <Separator />
                <Skeleton className={cn('h-4 w-full')} />
                <Skeleton className={cn('h-4 w-full')} />
                <Skeleton className={cn('h-4 w-3/4')} />
              </div>
            )}
          </main>
        </div>
      </div>
    </TooltipProvider>
  );
}

/* ------------------------------------------------------------------ */
/*  Story                                                              */
/* ------------------------------------------------------------------ */

const meta: Meta = {
  title: 'Examples/Mail Inbox',
  tags: ['!autodocs'],
  parameters: { layout: 'fullscreen' },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => <MailInboxPage />,
};
