import type { Meta, StoryObj } from '@storybook/react';

import { Avatar, AvatarFallback, AvatarImage } from '../components/avatar';
import { Badge } from '../components/badge';
import { Button } from '../components/button';
import { Card, CardContent } from '../components/card';
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuTrigger,
} from '../components/context-menu';
import { Input } from '../components/input';
import { Label } from '../components/label';
import { Progress } from '../components/progress';
import { ScrollArea } from '../components/scroll-area';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../components/select';
import { Separator } from '../components/separator';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '../components/sheet';
import { Textarea } from '../components/textarea';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../components/tooltip';
import { cn } from '../lib/utils';

/* ------------------------------------------------------------------ */
/*  Mock Data                                                          */
/* ------------------------------------------------------------------ */

interface Task {
  id: string;
  title: string;
  description: string;
  priority: 'low' | 'medium' | 'high';
  assignee: { name: string; avatar: string };
  labels: string[];
}

interface Column {
  id: string;
  title: string;
  tasks: Task[];
}

const INITIAL_COLUMNS: Column[] = [
  {
    id: 'todo',
    title: 'To Do',
    tasks: [
      {
        id: 'TASK-001',
        title: 'Setup CI/CD pipeline',
        description: 'Configure GitHub Actions for automated testing and deployment.',
        priority: 'high',
        assignee: { name: 'Alex Chen', avatar: 'AC' },
        labels: ['infra', 'devops'],
      },
      {
        id: 'TASK-002',
        title: 'Design token system',
        description: 'Create design tokens for colors, spacing, and typography.',
        priority: 'medium',
        assignee: { name: 'Maria Santos', avatar: 'MS' },
        labels: ['design'],
      },
      {
        id: 'TASK-005',
        title: 'Write API documentation',
        description: 'Document all REST API endpoints with examples.',
        priority: 'low',
        assignee: { name: 'James Park', avatar: 'JP' },
        labels: ['docs'],
      },
    ],
  },
  {
    id: 'in-progress',
    title: 'In Progress',
    tasks: [
      {
        id: 'TASK-003',
        title: 'Implement Button component',
        description: 'Build Button with variants, sizes, and loading state.',
        priority: 'high',
        assignee: { name: 'Sarah Kim', avatar: 'SK' },
        labels: ['component', 'ui'],
      },
      {
        id: 'TASK-006',
        title: 'Add unit tests for hooks',
        description: 'Write tests for useMediaQuery and useDebounce hooks.',
        priority: 'medium',
        assignee: { name: 'Alex Chen', avatar: 'AC' },
        labels: ['testing'],
      },
    ],
  },
  {
    id: 'review',
    title: 'In Review',
    tasks: [
      {
        id: 'TASK-004',
        title: 'Accessibility audit',
        description: 'Review all components for WCAG 2.1 AA compliance.',
        priority: 'high',
        assignee: { name: 'Emily Davis', avatar: 'ED' },
        labels: ['a11y'],
      },
    ],
  },
  {
    id: 'done',
    title: 'Done',
    tasks: [
      {
        id: 'TASK-007',
        title: 'Project scaffolding',
        description: 'Set up monorepo with Turborepo and pnpm.',
        priority: 'medium',
        assignee: { name: 'Alex Chen', avatar: 'AC' },
        labels: ['infra'],
      },
      {
        id: 'TASK-008',
        title: 'Storybook configuration',
        description: 'Configure Storybook with addons and theme.',
        priority: 'low',
        assignee: { name: 'Maria Santos', avatar: 'MS' },
        labels: ['tooling'],
      },
    ],
  },
];

const PRIORITY_CONFIG = {
  low: { label: 'Low', variant: 'secondary' as const },
  medium: { label: 'Medium', variant: 'default' as const },
  high: { label: 'High', variant: 'destructive' as const },
};

/* ------------------------------------------------------------------ */
/*  Sub-components                                                     */
/* ------------------------------------------------------------------ */

function TaskCard({ task }: { task: Task }) {
  return (
    <ContextMenu>
      <ContextMenuTrigger>
        <Sheet>
          <SheetTrigger asChild>
            <Card className={cn('cursor-pointer transition-colors hover:bg-accent')}>
              <CardContent className={cn('p-4')}>
                <div className={cn('mb-2 flex items-center justify-between')}>
                  <span className={cn('text-xs text-muted-foreground')}>{task.id}</span>
                  <Badge variant={PRIORITY_CONFIG[task.priority].variant} className={cn('text-xs')}>
                    {PRIORITY_CONFIG[task.priority].label}
                  </Badge>
                </div>
                <h4 className={cn('mb-1 text-sm font-medium')}>{task.title}</h4>
                <p className={cn('line-clamp-2 text-xs text-muted-foreground')}>{task.description}</p>
                <div className={cn('mt-3 flex items-center justify-between')}>
                  <div className={cn('flex gap-1')}>
                    {task.labels.map((label) => (
                      <Badge key={label} variant="outline" className={cn('text-xs')}>
                        {label}
                      </Badge>
                    ))}
                  </div>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <span>
                        <Avatar className={cn('h-6 w-6')}>
                          <AvatarImage alt={task.assignee.name} />
                          <AvatarFallback className={cn('text-xs')}>{task.assignee.avatar}</AvatarFallback>
                        </Avatar>
                      </span>
                    </TooltipTrigger>
                    <TooltipContent>{task.assignee.name}</TooltipContent>
                  </Tooltip>
                </div>
              </CardContent>
            </Card>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>{task.title}</SheetTitle>
              <SheetDescription>{task.id}</SheetDescription>
            </SheetHeader>
            <div className={cn('space-y-4 py-6')}>
              <div className={cn('space-y-2')}>
                <Label htmlFor={`title-${task.id}`}>Title</Label>
                <Input id={`title-${task.id}`} defaultValue={task.title} />
              </div>
              <div className={cn('space-y-2')}>
                <Label htmlFor={`desc-${task.id}`}>Description</Label>
                <Textarea id={`desc-${task.id}`} defaultValue={task.description} className={cn('min-h-[100px]')} />
              </div>
              <div className={cn('space-y-2')}>
                <Label htmlFor={`priority-${task.id}`}>Priority</Label>
                <Select defaultValue={task.priority}>
                  <SelectTrigger id={`priority-${task.id}`}>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Separator />
              <div className={cn('flex items-center gap-3')}>
                <Avatar>
                  <AvatarImage alt={task.assignee.name} />
                  <AvatarFallback>{task.assignee.avatar}</AvatarFallback>
                </Avatar>
                <div>
                  <p className={cn('text-sm font-medium')}>{task.assignee.name}</p>
                  <p className={cn('text-xs text-muted-foreground')}>Assignee</p>
                </div>
              </div>
            </div>
            <SheetFooter>
              <Button className={cn('w-full')}>Save Changes</Button>
            </SheetFooter>
          </SheetContent>
        </Sheet>
      </ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuItem>Edit Task</ContextMenuItem>
        <ContextMenuItem>Assign To...</ContextMenuItem>
        <ContextMenuItem>Change Priority</ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuItem>Move to To Do</ContextMenuItem>
        <ContextMenuItem>Move to In Progress</ContextMenuItem>
        <ContextMenuItem>Move to Done</ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuItem className={cn('text-destructive')}>Delete Task</ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
}

/* ------------------------------------------------------------------ */
/*  Page Component                                                     */
/* ------------------------------------------------------------------ */

function KanbanBoardPage() {
  const totalTasks = INITIAL_COLUMNS.reduce((sum, col) => sum + col.tasks.length, 0);
  const doneTasks = INITIAL_COLUMNS.find((c) => c.id === 'done')?.tasks.length ?? 0;
  const progressPercent = Math.round((doneTasks / totalTasks) * 100);

  return (
    <TooltipProvider>
      <div className={cn('flex h-screen flex-col bg-background text-foreground')}>
        {/* Header */}
        <header className={cn('border-b border-border')}>
          <div className={cn('flex h-14 items-center justify-between px-6')}>
            <div className={cn('flex items-center gap-4')}>
              <span className={cn('text-lg font-bold')}>Project Board</span>
              <Badge variant="secondary">{totalTasks} tasks</Badge>
            </div>
            <div className={cn('flex items-center gap-3')}>
              <div className={cn('flex items-center gap-2')}>
                <span className={cn('text-sm text-muted-foreground')}>Progress</span>
                <Progress value={progressPercent} className={cn('w-32')} aria-label="Project progress" />
                <span className={cn('text-sm font-medium')}>{progressPercent}%</span>
              </div>
              <Button size="sm">New Task</Button>
            </div>
          </div>
        </header>

        {/* Board */}
        <main className={cn('flex-1 overflow-auto p-6')}>
          <div className={cn('flex gap-4')}>
            {INITIAL_COLUMNS.map((column) => (
              <section
                key={column.id}
                className={cn('flex w-72 flex-shrink-0 flex-col rounded-lg bg-muted/50 p-3')}
                aria-label={`${column.title} column`}
              >
                <div className={cn('mb-3 flex items-center justify-between')}>
                  <h3 className={cn('text-sm font-semibold')}>{column.title}</h3>
                  <Badge variant="outline" className={cn('text-xs')}>
                    {column.tasks.length}
                  </Badge>
                </div>
                <ScrollArea className={cn('flex-1')}>
                  <div className={cn('space-y-2')}>
                    {column.tasks.map((task) => (
                      <TaskCard key={task.id} task={task} />
                    ))}
                  </div>
                </ScrollArea>
                <Button variant="ghost" size="sm" className={cn('mt-2 w-full justify-start text-muted-foreground')}>
                  + Add a card
                </Button>
              </section>
            ))}
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
  title: 'Examples/Kanban Board',
  parameters: { layout: 'fullscreen' },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => <KanbanBoardPage />,
};
