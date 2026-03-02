import type { Meta, StoryObj } from '@storybook/react';

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './card';

const meta: Meta<typeof Card> = {
  title: 'Components/Card',
  component: Card,
};

export default meta;
type Story = StoryObj<typeof Card>;

export const Default: Story = {
  render: () => (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Card Title</CardTitle>
        <CardDescription>Card description goes here.</CardDescription>
      </CardHeader>
      <CardContent>
        <p>Card content with any elements you need.</p>
      </CardContent>
      <CardFooter>
        <p className="text-sm text-muted-foreground">Card footer</p>
      </CardFooter>
    </Card>
  ),
};

export const Simple: Story = {
  render: () => (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Notifications</CardTitle>
        <CardDescription>You have 3 unread messages.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-4">
            <span className="flex h-2 w-2 rounded-full bg-primary" />
            <div className="flex-1 space-y-1">
              <p className="text-sm font-medium leading-none">New comment on your post</p>
              <p className="text-sm text-muted-foreground">5 minutes ago</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <span className="flex h-2 w-2 rounded-full bg-primary" />
            <div className="flex-1 space-y-1">
              <p className="text-sm font-medium leading-none">New follower</p>
              <p className="text-sm text-muted-foreground">2 hours ago</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <span className="flex h-2 w-2 rounded-full bg-primary" />
            <div className="flex-1 space-y-1">
              <p className="text-sm font-medium leading-none">Your report is ready</p>
              <p className="text-sm text-muted-foreground">1 day ago</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  ),
};

export const WithFooterActions: Story = {
  render: () => (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Create project</CardTitle>
        <CardDescription>Deploy your new project in one-click.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label htmlFor="project-name" className="text-sm font-medium leading-none">
              Name
            </label>
            <input
              id="project-name"
              placeholder="Name of your project"
              className="flex h-10 w-full rounded-md border border-border bg-background px-3 py-2 text-sm"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="project-framework" className="text-sm font-medium leading-none">
              Framework
            </label>
            <select
              id="project-framework"
              className="flex h-10 w-full rounded-md border border-border bg-background px-3 py-2 text-sm"
            >
              <option>Next.js</option>
              <option>Remix</option>
              <option>Astro</option>
              <option>Vite</option>
            </select>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <button
          type="button"
          className="inline-flex h-10 items-center justify-center rounded-md border border-border bg-background px-4 py-2 text-sm font-medium"
        >
          Cancel
        </button>
        <button
          type="button"
          className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground"
        >
          Deploy
        </button>
      </CardFooter>
    </Card>
  ),
};

export const ContentOnly: Story = {
  render: () => (
    <Card className="w-[350px]">
      <CardContent className="pt-6">
        <p>A card with only content and no header or footer.</p>
      </CardContent>
    </Card>
  ),
};
