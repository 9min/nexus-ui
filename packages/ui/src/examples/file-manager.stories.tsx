import type { Meta, StoryObj } from '@storybook/react';
import * as React from 'react';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '../components/alert-dialog';
import { Badge } from '../components/badge';
import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '../components/breadcrumb';
import { Card, CardContent } from '../components/card';
import { Checkbox } from '../components/checkbox';
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuTrigger,
} from '../components/context-menu';
import { Input } from '../components/input';
import { Separator } from '../components/separator';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../components/table';
import {
  Toolbar,
  ToolbarButton,
  ToolbarSeparator,
  ToolbarToggleGroup,
  ToolbarToggleItem,
} from '../components/toolbar';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../components/tooltip';
import { cn } from '../lib/utils';

/* ------------------------------------------------------------------ */
/*  Mock Data                                                          */
/* ------------------------------------------------------------------ */

interface FileItem {
  id: string;
  name: string;
  type: 'folder' | 'document' | 'image' | 'code' | 'archive';
  size: string;
  modified: string;
  icon: string;
}

const FILES: FileItem[] = [
  { id: '1', name: 'src', type: 'folder', size: '--', modified: 'Jan 15, 2024', icon: '\uD83D\uDCC1' },
  { id: '2', name: 'public', type: 'folder', size: '--', modified: 'Jan 14, 2024', icon: '\uD83D\uDCC1' },
  { id: '3', name: 'node_modules', type: 'folder', size: '--', modified: 'Jan 13, 2024', icon: '\uD83D\uDCC1' },
  { id: '4', name: 'package.json', type: 'code', size: '2.4 KB', modified: 'Jan 15, 2024', icon: '\uD83D\uDCCB' },
  { id: '5', name: 'tsconfig.json', type: 'code', size: '1.1 KB', modified: 'Jan 12, 2024', icon: '\uD83D\uDCCB' },
  { id: '6', name: 'README.md', type: 'document', size: '4.8 KB', modified: 'Jan 15, 2024', icon: '\uD83D\uDCC4' },
  { id: '7', name: 'logo.png', type: 'image', size: '24 KB', modified: 'Jan 10, 2024', icon: '\uD83D\uDDBC\uFE0F' },
  { id: '8', name: 'banner.jpg', type: 'image', size: '128 KB', modified: 'Jan 11, 2024', icon: '\uD83D\uDDBC\uFE0F' },
  { id: '9', name: 'backup.zip', type: 'archive', size: '15.3 MB', modified: 'Jan 9, 2024', icon: '\uD83D\uDCE6' },
  { id: '10', name: '.env.example', type: 'code', size: '0.3 KB', modified: 'Jan 8, 2024', icon: '\uD83D\uDD12' },
];

const TYPE_COLORS: Record<FileItem['type'], string> = {
  folder: 'default',
  document: 'secondary',
  image: 'secondary',
  code: 'outline',
  archive: 'secondary',
};

/* ------------------------------------------------------------------ */
/*  Page Component                                                     */
/* ------------------------------------------------------------------ */

function FileManagerPage() {
  const [viewMode, setViewMode] = React.useState<'list' | 'grid'>('list');
  const [selectedIds, setSelectedIds] = React.useState<Set<string>>(new Set());
  const [search, setSearch] = React.useState('');

  const filtered = FILES.filter((f) =>
    f.name.toLowerCase().includes(search.toLowerCase()),
  );

  const allSelected = filtered.length > 0 && filtered.every((f) => selectedIds.has(f.id));

  function toggleAll() {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (allSelected) {
        filtered.forEach((f) => next.delete(f.id));
      } else {
        filtered.forEach((f) => next.add(f.id));
      }
      return next;
    });
  }

  function toggleOne(id: string) {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  return (
    <TooltipProvider>
      <div className={cn('min-h-screen bg-background text-foreground')}>
        {/* Header */}
        <header className={cn('border-b border-border')}>
          <div className={cn('flex h-14 items-center px-6')}>
            <span className={cn('text-lg font-bold')}>File Manager</span>
          </div>
        </header>

        <main className={cn('p-6')}>
          {/* Breadcrumb */}
          <Breadcrumb className={cn('mb-4')}>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="#">Home</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="#">Documents</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbEllipsis />
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>nexus-ui</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          {/* Toolbar */}
          <Toolbar className={cn('mb-4')} aria-label="File actions">
            <Tooltip>
              <TooltipTrigger asChild>
                <ToolbarButton aria-label="New folder">&#128193; New Folder</ToolbarButton>
              </TooltipTrigger>
              <TooltipContent>Create new folder</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <ToolbarButton aria-label="Upload files">&#11014; Upload</ToolbarButton>
              </TooltipTrigger>
              <TooltipContent>Upload files</TooltipContent>
            </Tooltip>
            <ToolbarSeparator />
            {selectedIds.size > 0 && (
              <>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <ToolbarButton aria-label="Download selected">&#11015; Download</ToolbarButton>
                  </TooltipTrigger>
                  <TooltipContent>Download selected</TooltipContent>
                </Tooltip>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <ToolbarButton aria-label="Delete selected">&#128465; Delete</ToolbarButton>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Delete files?</AlertDialogTitle>
                      <AlertDialogDescription>
                        This will permanently delete {selectedIds.size} selected item(s).
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction onClick={() => setSelectedIds(new Set())}>
                        Delete
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
                <ToolbarSeparator />
              </>
            )}
            <div className={cn('flex-1')} />
            <Input
              placeholder="Search files..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className={cn('w-48')}
              aria-label="Search files"
            />
            <ToolbarSeparator />
            <ToolbarToggleGroup type="single" value={viewMode} onValueChange={(v) => v && setViewMode(v as 'list' | 'grid')}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <ToolbarToggleItem value="list" aria-label="List view">&#9776;</ToolbarToggleItem>
                </TooltipTrigger>
                <TooltipContent>List view</TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger asChild>
                  <ToolbarToggleItem value="grid" aria-label="Grid view">&#9638;</ToolbarToggleItem>
                </TooltipTrigger>
                <TooltipContent>Grid view</TooltipContent>
              </Tooltip>
            </ToolbarToggleGroup>
          </Toolbar>

          {selectedIds.size > 0 && (
            <p className={cn('mb-2 text-sm text-muted-foreground')}>
              {selectedIds.size} item(s) selected
            </p>
          )}

          {/* File List / Grid */}
          {viewMode === 'list' ? (
            <div className={cn('rounded-md border border-border')}>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className={cn('w-12')}>
                      <Checkbox
                        checked={allSelected}
                        onCheckedChange={toggleAll}
                        aria-label="Select all files"
                      />
                    </TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Size</TableHead>
                    <TableHead>Modified</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filtered.map((file) => (
                    <ContextMenu key={file.id}>
                      <ContextMenuTrigger asChild>
                        <TableRow className={cn(selectedIds.has(file.id) && 'bg-accent')}>
                          <TableCell>
                            <Checkbox
                              checked={selectedIds.has(file.id)}
                              onCheckedChange={() => toggleOne(file.id)}
                              aria-label={`Select ${file.name}`}
                            />
                          </TableCell>
                          <TableCell>
                            <div className={cn('flex items-center gap-2')}>
                              <span aria-hidden="true">{file.icon}</span>
                              <span className={cn('font-medium')}>{file.name}</span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge variant={TYPE_COLORS[file.type] as 'default' | 'secondary' | 'outline'}>
                              {file.type}
                            </Badge>
                          </TableCell>
                          <TableCell>{file.size}</TableCell>
                          <TableCell>{file.modified}</TableCell>
                        </TableRow>
                      </ContextMenuTrigger>
                      <ContextMenuContent>
                        <ContextMenuItem>Open</ContextMenuItem>
                        <ContextMenuItem>Rename</ContextMenuItem>
                        <ContextMenuSub>
                          <ContextMenuSubTrigger>Move to</ContextMenuSubTrigger>
                          <ContextMenuSubContent>
                            <ContextMenuItem>Documents</ContextMenuItem>
                            <ContextMenuItem>Downloads</ContextMenuItem>
                            <ContextMenuItem>Desktop</ContextMenuItem>
                          </ContextMenuSubContent>
                        </ContextMenuSub>
                        <ContextMenuItem>Copy</ContextMenuItem>
                        <ContextMenuSeparator />
                        <ContextMenuItem>Share</ContextMenuItem>
                        <ContextMenuItem>Get Info</ContextMenuItem>
                        <ContextMenuSeparator />
                        <ContextMenuItem className={cn('text-destructive')}>Delete</ContextMenuItem>
                      </ContextMenuContent>
                    </ContextMenu>
                  ))}
                </TableBody>
              </Table>
            </div>
          ) : (
            <ContextMenu>
              <ContextMenuTrigger>
                <div className={cn('grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6')}>
                  {filtered.map((file) => (
                    <Card
                      key={file.id}
                      className={cn(
                        'cursor-pointer transition-colors hover:bg-accent',
                        selectedIds.has(file.id) && 'ring-2 ring-primary',
                      )}
                      onClick={() => toggleOne(file.id)}
                    >
                      <CardContent className={cn('flex flex-col items-center p-4')}>
                        <span className={cn('mb-2 text-3xl')} aria-hidden="true">{file.icon}</span>
                        <span className={cn('text-center text-sm font-medium leading-tight')}>{file.name}</span>
                        <span className={cn('text-xs text-muted-foreground')}>{file.size}</span>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </ContextMenuTrigger>
              <ContextMenuContent>
                <ContextMenuItem>New Folder</ContextMenuItem>
                <ContextMenuItem>Upload File</ContextMenuItem>
                <ContextMenuSeparator />
                <ContextMenuItem>Paste</ContextMenuItem>
                <ContextMenuItem>Select All</ContextMenuItem>
                <ContextMenuSeparator />
                <ContextMenuSub>
                  <ContextMenuSubTrigger>Sort By</ContextMenuSubTrigger>
                  <ContextMenuSubContent>
                    <ContextMenuItem>Name</ContextMenuItem>
                    <ContextMenuItem>Date Modified</ContextMenuItem>
                    <ContextMenuItem>Size</ContextMenuItem>
                    <ContextMenuItem>Type</ContextMenuItem>
                  </ContextMenuSubContent>
                </ContextMenuSub>
              </ContextMenuContent>
            </ContextMenu>
          )}

          <Separator className={cn('my-4')} />

          {/* Status bar */}
          <div className={cn('flex items-center justify-between text-sm text-muted-foreground')}>
            <span>{filtered.length} items</span>
            <span>Last updated: Jan 15, 2024</span>
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
  title: 'Examples/File Manager',
  parameters: { layout: 'fullscreen' },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => <FileManagerPage />,
};
