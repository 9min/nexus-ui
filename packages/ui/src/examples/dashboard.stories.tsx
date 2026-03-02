import type { Meta, StoryObj } from '@storybook/react';

import { Avatar, AvatarFallback, AvatarImage } from '../components/avatar';
import { Badge } from '../components/badge';
import { Button } from '../components/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../components/dropdown-menu';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from '../components/navigation-menu';
import { Progress } from '../components/progress';
import { ScrollArea } from '../components/scroll-area';
import { Separator } from '../components/separator';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../components/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/tabs';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../components/tooltip';
import { cn } from '../lib/utils';

/* ------------------------------------------------------------------ */
/*  Mock Data                                                          */
/* ------------------------------------------------------------------ */

const KPI_DATA = [
  { title: 'Total Revenue', value: '$45,231.89', change: '+20.1%', trend: 'up' as const },
  { title: 'Subscriptions', value: '+2,350', change: '+180.1%', trend: 'up' as const },
  { title: 'Sales', value: '+12,234', change: '+19%', trend: 'up' as const },
  { title: 'Active Now', value: '+573', change: '+201', trend: 'up' as const },
];

const RECENT_SALES = [
  { name: 'Olivia Martin', email: 'olivia@example.com', amount: '+$1,999.00', avatar: 'OM' },
  { name: 'Jackson Lee', email: 'jackson@example.com', amount: '+$39.00', avatar: 'JL' },
  { name: 'Isabella Nguyen', email: 'isabella@example.com', amount: '+$299.00', avatar: 'IN' },
  { name: 'William Kim', email: 'will@example.com', amount: '+$99.00', avatar: 'WK' },
  { name: 'Sofia Davis', email: 'sofia@example.com', amount: '+$39.00', avatar: 'SD' },
];

const TABLE_DATA = [
  { id: 'INV-001', customer: 'Olivia Martin', status: 'Paid', amount: '$1,999.00', date: '2024-01-15' },
  { id: 'INV-002', customer: 'Jackson Lee', status: 'Pending', amount: '$39.00', date: '2024-01-14' },
  { id: 'INV-003', customer: 'Isabella Nguyen', status: 'Paid', amount: '$299.00', date: '2024-01-13' },
  { id: 'INV-004', customer: 'William Kim', status: 'Failed', amount: '$99.00', date: '2024-01-12' },
  { id: 'INV-005', customer: 'Sofia Davis', status: 'Paid', amount: '$39.00', date: '2024-01-11' },
  { id: 'INV-006', customer: 'Liam Johnson', status: 'Pending', amount: '$549.00', date: '2024-01-10' },
];

const TEAM_PROGRESS = [
  { name: 'Engineering', progress: 72 },
  { name: 'Design', progress: 85 },
  { name: 'Marketing', progress: 58 },
  { name: 'Sales', progress: 91 },
];

/* ------------------------------------------------------------------ */
/*  Page Component                                                     */
/* ------------------------------------------------------------------ */

function DashboardPage() {
  return (
    <TooltipProvider>
      <div className={cn('min-h-screen bg-background text-foreground')}>
        {/* Top Navigation */}
        <header className={cn('sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur')}>
          <div className={cn('flex h-14 items-center gap-4 px-6')}>
            <span className={cn('text-lg font-bold')}>Nexus</span>
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger>Overview</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className={cn('grid w-[400px] gap-3 p-4 md:grid-cols-2')}>
                      <li>
                        <NavigationMenuLink className={cn(navigationMenuTriggerStyle(), 'w-full justify-start')}>
                          Dashboard
                        </NavigationMenuLink>
                      </li>
                      <li>
                        <NavigationMenuLink className={cn(navigationMenuTriggerStyle(), 'w-full justify-start')}>
                          Analytics
                        </NavigationMenuLink>
                      </li>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    Customers
                  </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    Products
                  </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    Settings
                  </NavigationMenuLink>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>

            <div className={cn('ml-auto flex items-center gap-2')}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="sm" aria-label="Notifications">
                    <span aria-hidden="true">&#128276;</span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Notifications</TooltipContent>
              </Tooltip>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className={cn('gap-2')} aria-label="User menu">
                    <Avatar className={cn('h-6 w-6')}>
                      <AvatarImage alt="User" />
                      <AvatarFallback>JD</AvatarFallback>
                    </Avatar>
                    <span className={cn('text-sm')}>John Doe</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Profile</DropdownMenuItem>
                  <DropdownMenuItem>Settings</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Log out</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className={cn('p-6')}>
          <div className={cn('mb-6 flex items-center justify-between')}>
            <h1 className={cn('text-3xl font-bold tracking-tight')}>Dashboard</h1>
            <Button>Download Report</Button>
          </div>

          <Tabs defaultValue="overview">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
              <TabsTrigger value="reports">Reports</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className={cn('space-y-6')}>
              {/* KPI Cards */}
              <div className={cn('grid gap-4 sm:grid-cols-2 lg:grid-cols-4')}>
                {KPI_DATA.map((kpi) => (
                  <Card key={kpi.title}>
                    <CardHeader className={cn('flex flex-row items-center justify-between pb-2')}>
                      <CardTitle className={cn('text-sm font-medium')}>{kpi.title}</CardTitle>
                      <span className={cn('text-muted-foreground')} aria-hidden="true">$</span>
                    </CardHeader>
                    <CardContent>
                      <div className={cn('text-2xl font-bold')}>{kpi.value}</div>
                      <p className={cn('text-xs text-muted-foreground')}>
                        <span className={cn('text-emerald-600')}>{kpi.change}</span> from last month
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Charts + Recent Sales */}
              <div className={cn('grid gap-4 lg:grid-cols-7')}>
                {/* Chart placeholder */}
                <Card className={cn('lg:col-span-4')}>
                  <CardHeader>
                    <CardTitle>Revenue Overview</CardTitle>
                    <CardDescription>Monthly revenue for the current year</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className={cn('flex h-[200px] items-end gap-2')}>
                      {[40, 65, 45, 80, 55, 70, 90, 75, 60, 85, 95, 78].map((h, i) => (
                        <Tooltip key={i}>
                          <TooltipTrigger asChild>
                            <div
                              className={cn('flex-1 rounded-t bg-primary/80 transition-colors hover:bg-primary')}
                              style={{ height: `${h}%` }}
                              role="img"
                              aria-label={`Month ${i + 1}: ${h}%`}
                            />
                          </TooltipTrigger>
                          <TooltipContent>{`$${(h * 520).toLocaleString()}`}</TooltipContent>
                        </Tooltip>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Recent Sales */}
                <Card className={cn('lg:col-span-3')}>
                  <CardHeader>
                    <CardTitle>Recent Sales</CardTitle>
                    <CardDescription>You made 265 sales this month.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ScrollArea className={cn('h-[230px]')}>
                      <div className={cn('space-y-4')}>
                        {RECENT_SALES.map((sale) => (
                          <div key={sale.email} className={cn('flex items-center gap-4')}>
                            <Avatar className={cn('h-9 w-9')}>
                              <AvatarImage alt={sale.name} />
                              <AvatarFallback>{sale.avatar}</AvatarFallback>
                            </Avatar>
                            <div className={cn('flex-1 space-y-1')}>
                              <p className={cn('text-sm font-medium leading-none')}>{sale.name}</p>
                              <p className={cn('text-sm text-muted-foreground')}>{sale.email}</p>
                            </div>
                            <div className={cn('font-medium')}>{sale.amount}</div>
                          </div>
                        ))}
                      </div>
                    </ScrollArea>
                  </CardContent>
                </Card>
              </div>

              {/* Team Progress */}
              <Card>
                <CardHeader>
                  <CardTitle>Team Progress</CardTitle>
                  <CardDescription>Sprint completion rates by department</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className={cn('space-y-4')}>
                    {TEAM_PROGRESS.map((team) => (
                      <div key={team.name} className={cn('space-y-2')}>
                        <div className={cn('flex items-center justify-between text-sm')}>
                          <span className={cn('font-medium')}>{team.name}</span>
                          <span className={cn('text-muted-foreground')}>{team.progress}%</span>
                        </div>
                        <Progress value={team.progress} aria-label={`${team.name} progress`} />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Separator />

              {/* Invoice Table */}
              <Card>
                <CardHeader>
                  <CardTitle>Recent Invoices</CardTitle>
                  <CardDescription>A list of recent invoices and their statuses.</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Invoice</TableHead>
                        <TableHead>Customer</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead className={cn('text-right')}>Amount</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {TABLE_DATA.map((row) => (
                        <TableRow key={row.id}>
                          <TableCell className={cn('font-medium')}>{row.id}</TableCell>
                          <TableCell>{row.customer}</TableCell>
                          <TableCell>
                            <Badge
                              variant={
                                row.status === 'Paid'
                                  ? 'default'
                                  : row.status === 'Pending'
                                    ? 'secondary'
                                    : 'destructive'
                              }
                            >
                              {row.status}
                            </Badge>
                          </TableCell>
                          <TableCell>{row.date}</TableCell>
                          <TableCell className={cn('text-right')}>{row.amount}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="analytics">
              <Card>
                <CardHeader>
                  <CardTitle>Analytics</CardTitle>
                  <CardDescription>Detailed analytics will appear here.</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className={cn('text-muted-foreground')}>Analytics content placeholder.</p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="reports">
              <Card>
                <CardHeader>
                  <CardTitle>Reports</CardTitle>
                  <CardDescription>Generated reports will appear here.</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className={cn('text-muted-foreground')}>Reports content placeholder.</p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </TooltipProvider>
  );
}

/* ------------------------------------------------------------------ */
/*  Story                                                              */
/* ------------------------------------------------------------------ */

const meta: Meta = {
  title: 'Examples/Dashboard',
  tags: ['!autodocs'],
  parameters: { layout: 'fullscreen' },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => <DashboardPage />,
};
