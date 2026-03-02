import type { Meta, StoryObj } from '@storybook/react';

import { Alert, AlertDescription, AlertTitle } from '../components/alert';
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
import { Avatar, AvatarFallback, AvatarImage } from '../components/avatar';
import { Button } from '../components/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../components/card';
import { Checkbox } from '../components/checkbox';
import { Input } from '../components/input';
import { Label } from '../components/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../components/select';
import { Separator } from '../components/separator';
import { Switch } from '../components/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/tabs';
import { Textarea } from '../components/textarea';
import { Toaster } from '../components/toast/toaster';
import { toast } from '../components/toast/use-toast';
import { cn } from '../lib/utils';

/* ------------------------------------------------------------------ */
/*  Page Component                                                     */
/* ------------------------------------------------------------------ */

function SettingsPage() {
  return (
    <div className={cn('min-h-screen bg-background text-foreground')}>
      {/* Header */}
      <header className={cn('border-b border-border')}>
        <div className={cn('flex h-14 items-center px-6')}>
          <span className={cn('text-lg font-bold')}>Settings</span>
        </div>
      </header>

      <main className={cn('mx-auto max-w-4xl p-6')}>
        <div className={cn('mb-6')}>
          <h1 className={cn('text-3xl font-bold tracking-tight')}>Settings</h1>
          <p className={cn('text-muted-foreground')}>Manage your account settings and preferences.</p>
        </div>

        <Tabs defaultValue="profile" className={cn('space-y-6')}>
          <TabsList>
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="appearance">Appearance</TabsTrigger>
            <TabsTrigger value="danger">Danger Zone</TabsTrigger>
          </TabsList>

          {/* Profile Tab */}
          <TabsContent value="profile">
            <Card>
              <CardHeader>
                <CardTitle>Profile</CardTitle>
                <CardDescription>Update your personal information and profile picture.</CardDescription>
              </CardHeader>
              <CardContent className={cn('space-y-6')}>
                {/* Avatar */}
                <div className={cn('flex items-center gap-4')}>
                  <Avatar className={cn('h-16 w-16')}>
                    <AvatarImage alt="Profile picture" />
                    <AvatarFallback className={cn('text-lg')}>JD</AvatarFallback>
                  </Avatar>
                  <div>
                    <Button variant="outline" size="sm">Change Avatar</Button>
                    <p className={cn('mt-1 text-xs text-muted-foreground')}>JPG, PNG or GIF. Max 2MB.</p>
                  </div>
                </div>

                <Separator />

                <div className={cn('grid gap-4 sm:grid-cols-2')}>
                  <div className={cn('space-y-2')}>
                    <Label htmlFor="first-name">First name</Label>
                    <Input id="first-name" defaultValue="John" />
                  </div>
                  <div className={cn('space-y-2')}>
                    <Label htmlFor="last-name">Last name</Label>
                    <Input id="last-name" defaultValue="Doe" />
                  </div>
                </div>

                <div className={cn('space-y-2')}>
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" defaultValue="john@example.com" />
                </div>

                <div className={cn('space-y-2')}>
                  <Label htmlFor="bio">Bio</Label>
                  <Textarea
                    id="bio"
                    placeholder="Tell us about yourself"
                    defaultValue="Full-stack developer passionate about design systems."
                  />
                  <p className={cn('text-xs text-muted-foreground')}>Brief description for your profile. Max 160 characters.</p>
                </div>

                <div className={cn('space-y-2')}>
                  <Label htmlFor="timezone">Timezone</Label>
                  <Select defaultValue="utc-8">
                    <SelectTrigger id="timezone">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="utc-8">Pacific Time (UTC-8)</SelectItem>
                      <SelectItem value="utc-5">Eastern Time (UTC-5)</SelectItem>
                      <SelectItem value="utc+0">UTC</SelectItem>
                      <SelectItem value="utc+9">Korea Standard Time (UTC+9)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
              <CardFooter className={cn('flex justify-end gap-2')}>
                <Button variant="outline">Cancel</Button>
                <Button onClick={() => toast.success({ title: 'Profile updated', description: 'Your changes have been saved.' })}>
                  Save Changes
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          {/* Notifications Tab */}
          <TabsContent value="notifications">
            <Card>
              <CardHeader>
                <CardTitle>Notifications</CardTitle>
                <CardDescription>Configure how you receive notifications.</CardDescription>
              </CardHeader>
              <CardContent className={cn('space-y-6')}>
                <div className={cn('space-y-4')}>
                  <h3 className={cn('text-sm font-medium')}>Email Notifications</h3>
                  {[
                    { id: 'marketing', label: 'Marketing emails', desc: 'Receive emails about new products and features.' },
                    { id: 'social', label: 'Social notifications', desc: 'Receive emails for friend requests and follows.' },
                    { id: 'security', label: 'Security emails', desc: 'Receive emails about your account security.' },
                  ].map((item) => (
                    <div key={item.id} className={cn('flex items-center justify-between rounded-lg border border-border p-4')}>
                      <div className={cn('space-y-0.5')}>
                        <Label htmlFor={item.id}>{item.label}</Label>
                        <p className={cn('text-sm text-muted-foreground')}>{item.desc}</p>
                      </div>
                      <Switch id={item.id} defaultChecked={item.id === 'security'} />
                    </div>
                  ))}
                </div>

                <Separator />

                <div className={cn('space-y-4')}>
                  <h3 className={cn('text-sm font-medium')}>Push Notifications</h3>
                  <div className={cn('space-y-3')}>
                    {[
                      { id: 'push-all', label: 'All new messages' },
                      { id: 'push-mentions', label: 'Direct messages and mentions' },
                      { id: 'push-none', label: 'Nothing' },
                    ].map((item) => (
                      <div key={item.id} className={cn('flex items-center gap-2')}>
                        <Checkbox id={item.id} defaultChecked={item.id === 'push-mentions'} />
                        <Label htmlFor={item.id}>{item.label}</Label>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
              <CardFooter className={cn('flex justify-end')}>
                <Button onClick={() => toast.success({ title: 'Notifications updated', description: 'Your preferences have been saved.' })}>
                  Save Preferences
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          {/* Appearance Tab */}
          <TabsContent value="appearance">
            <Card>
              <CardHeader>
                <CardTitle>Appearance</CardTitle>
                <CardDescription>Customize the appearance of the application.</CardDescription>
              </CardHeader>
              <CardContent className={cn('space-y-6')}>
                <div className={cn('space-y-2')}>
                  <Label htmlFor="language">Language</Label>
                  <Select defaultValue="en">
                    <SelectTrigger id="language" className={cn('w-[200px]')}>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="ko">Korean</SelectItem>
                      <SelectItem value="ja">Japanese</SelectItem>
                      <SelectItem value="zh">Chinese</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className={cn('space-y-2')}>
                  <Label>Font size</Label>
                  <Select defaultValue="md">
                    <SelectTrigger className={cn('w-[200px]')}>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="sm">Small</SelectItem>
                      <SelectItem value="md">Medium</SelectItem>
                      <SelectItem value="lg">Large</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className={cn('flex items-center justify-between rounded-lg border border-border p-4')}>
                  <div className={cn('space-y-0.5')}>
                    <Label htmlFor="compact-mode">Compact mode</Label>
                    <p className={cn('text-sm text-muted-foreground')}>Reduce spacing and padding throughout the UI.</p>
                  </div>
                  <Switch id="compact-mode" />
                </div>
              </CardContent>
              <CardFooter className={cn('flex justify-end')}>
                <Button onClick={() => toast.success({ title: 'Appearance updated' })}>Save</Button>
              </CardFooter>
            </Card>
          </TabsContent>

          {/* Danger Zone Tab */}
          <TabsContent value="danger">
            <div className={cn('space-y-6')}>
              <Alert variant="destructive">
                <AlertTitle>Warning</AlertTitle>
                <AlertDescription>
                  Actions in this section are irreversible. Please proceed with caution.
                </AlertDescription>
              </Alert>

              <Card className={cn('border-destructive/50')}>
                <CardHeader>
                  <CardTitle>Delete Account</CardTitle>
                  <CardDescription>
                    Permanently delete your account and all associated data. This action cannot be undone.
                  </CardDescription>
                </CardHeader>
                <CardFooter>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="destructive">Delete Account</Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                          This action cannot be undone. This will permanently delete your account and remove all
                          your data from our servers.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() =>
                            toast.error({
                              title: 'Account deleted',
                              description: 'Your account has been permanently deleted.',
                            })
                          }
                        >
                          Delete
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </CardFooter>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </main>

      <Toaster />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Story                                                              */
/* ------------------------------------------------------------------ */

const meta: Meta = {
  title: 'Examples/Settings',
  parameters: { layout: 'fullscreen' },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => <SettingsPage />,
};
