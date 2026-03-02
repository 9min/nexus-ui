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
import { Button } from '../components/button';
import { Checkbox } from '../components/checkbox';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../components/dropdown-menu';
import { Input } from '../components/input';
import { Popover, PopoverContent, PopoverTrigger } from '../components/popover';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../components/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../components/table';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../components/tooltip';
import { cn } from '../lib/utils';

/* ------------------------------------------------------------------ */
/*  Mock Data                                                          */
/* ------------------------------------------------------------------ */

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  status: 'active' | 'inactive' | 'pending';
  department: string;
  joinDate: string;
}

const USERS: User[] = [
  { id: 'USR-001', name: 'Olivia Martin', email: 'olivia@example.com', role: 'Admin', status: 'active', department: 'Engineering', joinDate: '2023-01-15' },
  { id: 'USR-002', name: 'Jackson Lee', email: 'jackson@example.com', role: 'Editor', status: 'active', department: 'Design', joinDate: '2023-03-22' },
  { id: 'USR-003', name: 'Isabella Nguyen', email: 'isabella@example.com', role: 'Viewer', status: 'pending', department: 'Marketing', joinDate: '2023-06-10' },
  { id: 'USR-004', name: 'William Kim', email: 'will@example.com', role: 'Editor', status: 'active', department: 'Engineering', joinDate: '2023-02-28' },
  { id: 'USR-005', name: 'Sofia Davis', email: 'sofia@example.com', role: 'Admin', status: 'active', department: 'Product', joinDate: '2022-11-05' },
  { id: 'USR-006', name: 'Liam Johnson', email: 'liam@example.com', role: 'Viewer', status: 'inactive', department: 'Sales', joinDate: '2023-08-19' },
  { id: 'USR-007', name: 'Emma Wilson', email: 'emma@example.com', role: 'Editor', status: 'active', department: 'Design', joinDate: '2023-04-12' },
  { id: 'USR-008', name: 'Noah Brown', email: 'noah@example.com', role: 'Viewer', status: 'pending', department: 'Engineering', joinDate: '2024-01-03' },
  { id: 'USR-009', name: 'Ava Garcia', email: 'ava@example.com', role: 'Admin', status: 'active', department: 'Product', joinDate: '2022-09-15' },
  { id: 'USR-010', name: 'James Miller', email: 'james@example.com', role: 'Editor', status: 'inactive', department: 'Marketing', joinDate: '2023-07-21' },
];

const STATUS_CONFIG: Record<User['status'], { label: string; variant: 'default' | 'secondary' | 'destructive' }> = {
  active: { label: 'Active', variant: 'default' },
  pending: { label: 'Pending', variant: 'secondary' },
  inactive: { label: 'Inactive', variant: 'destructive' },
};

const DEPARTMENTS = ['All', 'Engineering', 'Design', 'Marketing', 'Product', 'Sales'];
const PAGE_SIZE = 5;

/* ------------------------------------------------------------------ */
/*  Page Component                                                     */
/* ------------------------------------------------------------------ */

function DataTablePage() {
  const [search, setSearch] = React.useState('');
  const [department, setDepartment] = React.useState('All');
  const [selectedIds, setSelectedIds] = React.useState<Set<string>>(new Set());
  const [page, setPage] = React.useState(0);
  const [sortField, setSortField] = React.useState<'name' | 'joinDate'>('name');
  const [sortDir, setSortDir] = React.useState<'asc' | 'desc'>('asc');

  const filtered = USERS.filter((u) => {
    const matchSearch =
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase());
    const matchDept = department === 'All' || u.department === department;
    return matchSearch && matchDept;
  }).sort((a, b) => {
    const mul = sortDir === 'asc' ? 1 : -1;
    return a[sortField].localeCompare(b[sortField]) * mul;
  });

  const pageCount = Math.ceil(filtered.length / PAGE_SIZE);
  const paged = filtered.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE);

  const allPageSelected = paged.length > 0 && paged.every((u) => selectedIds.has(u.id));

  function toggleAll() {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (allPageSelected) {
        paged.forEach((u) => next.delete(u.id));
      } else {
        paged.forEach((u) => next.add(u.id));
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

  function handleSort(field: 'name' | 'joinDate') {
    if (sortField === field) {
      setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortField(field);
      setSortDir('asc');
    }
  }

  return (
    <TooltipProvider>
      <div className={cn('min-h-screen bg-background text-foreground p-6')}>
        <div className={cn('mx-auto max-w-5xl space-y-6')}>
          <div>
            <h1 className={cn('text-3xl font-bold tracking-tight')}>Users</h1>
            <p className={cn('text-muted-foreground')}>Manage user accounts and permissions.</p>
          </div>

          {/* Toolbar */}
          <div className={cn('flex items-center justify-between gap-4')}>
            <div className={cn('flex items-center gap-2')}>
              <Input
                placeholder="Search users..."
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setPage(0);
                }}
                className={cn('w-64')}
                aria-label="Search users"
              />
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" size="sm">
                    Filter {department !== 'All' && `(${department})`}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className={cn('w-48')}>
                  <div className={cn('space-y-2')}>
                    <p className={cn('text-sm font-medium')}>Department</p>
                    <Select value={department} onValueChange={(v) => { setDepartment(v); setPage(0); }}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {DEPARTMENTS.map((d) => (
                          <SelectItem key={d} value={d}>{d}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </PopoverContent>
              </Popover>
            </div>
            <div className={cn('flex items-center gap-2')}>
              {selectedIds.size > 0 && (
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="destructive" size="sm">
                      Delete ({selectedIds.size})
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Delete users?</AlertDialogTitle>
                      <AlertDialogDescription>
                        This will permanently delete {selectedIds.size} selected user(s). This action cannot be undone.
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
              )}
              <Button size="sm">Add User</Button>
            </div>
          </div>

          {/* Table */}
          <div className={cn('rounded-md border border-border')}>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className={cn('w-12')}>
                    <Checkbox
                      checked={allPageSelected}
                      onCheckedChange={toggleAll}
                      aria-label="Select all users on this page"
                    />
                  </TableHead>
                  <TableHead>
                    <button
                      type="button"
                      onClick={() => handleSort('name')}
                      className={cn('flex items-center gap-1 hover:text-foreground')}
                      aria-label="Sort by name"
                    >
                      Name {sortField === 'name' && (sortDir === 'asc' ? '\u2191' : '\u2193')}
                    </button>
                  </TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Department</TableHead>
                  <TableHead>
                    <button
                      type="button"
                      onClick={() => handleSort('joinDate')}
                      className={cn('flex items-center gap-1 hover:text-foreground')}
                      aria-label="Sort by join date"
                    >
                      Joined {sortField === 'joinDate' && (sortDir === 'asc' ? '\u2191' : '\u2193')}
                    </button>
                  </TableHead>
                  <TableHead className={cn('w-12')} />
                </TableRow>
              </TableHeader>
              <TableBody>
                {paged.map((user) => (
                  <TableRow key={user.id} className={cn(selectedIds.has(user.id) && 'bg-accent')}>
                    <TableCell>
                      <Checkbox
                        checked={selectedIds.has(user.id)}
                        onCheckedChange={() => toggleOne(user.id)}
                        aria-label={`Select ${user.name}`}
                      />
                    </TableCell>
                    <TableCell>
                      <div>
                        <p className={cn('font-medium')}>{user.name}</p>
                        <p className={cn('text-sm text-muted-foreground')}>{user.email}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{user.role}</Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant={STATUS_CONFIG[user.status].variant}>
                        {STATUS_CONFIG[user.status].label}
                      </Badge>
                    </TableCell>
                    <TableCell>{user.department}</TableCell>
                    <TableCell>{user.joinDate}</TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm" aria-label={`Actions for ${user.name}`}>
                                &#8943;
                              </Button>
                            </DropdownMenuTrigger>
                          </TooltipTrigger>
                          <TooltipContent>Actions</TooltipContent>
                        </Tooltip>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem>View Profile</DropdownMenuItem>
                          <DropdownMenuItem>Edit User</DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className={cn('text-destructive')}>Delete</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
                {paged.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={7} className={cn('h-24 text-center text-muted-foreground')}>
                      No users found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>

          {/* Pagination */}
          <div className={cn('flex items-center justify-between')}>
            <p className={cn('text-sm text-muted-foreground')}>
              Showing {filtered.length === 0 ? 0 : page * PAGE_SIZE + 1}-{Math.min((page + 1) * PAGE_SIZE, filtered.length)} of{' '}
              {filtered.length} users
            </p>
            <div className={cn('flex items-center gap-2')}>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setPage((p) => Math.max(0, p - 1))}
                disabled={page === 0}
              >
                Previous
              </Button>
              {Array.from({ length: pageCount }, (_, i) => (
                <Button
                  key={i}
                  variant={page === i ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setPage(i)}
                  aria-label={`Page ${i + 1}`}
                  aria-current={page === i ? 'page' : undefined}
                >
                  {i + 1}
                </Button>
              ))}
              <Button
                variant="outline"
                size="sm"
                onClick={() => setPage((p) => Math.min(pageCount - 1, p + 1))}
                disabled={page >= pageCount - 1}
              >
                Next
              </Button>
            </div>
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
}

/* ------------------------------------------------------------------ */
/*  Story                                                              */
/* ------------------------------------------------------------------ */

const meta: Meta = {
  title: 'Examples/Data Table',
  parameters: { layout: 'fullscreen' },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => <DataTablePage />,
};
