import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';

import { Tabs, TabsContent, TabsList, TabsTrigger } from './tabs';

function TestTabs({ defaultValue = 'account' }: { defaultValue?: string }) {
  return (
    <Tabs defaultValue={defaultValue}>
      <TabsList>
        <TabsTrigger value="account">Account</TabsTrigger>
        <TabsTrigger value="password">Password</TabsTrigger>
        <TabsTrigger value="settings">Settings</TabsTrigger>
      </TabsList>
      <TabsContent value="account">Account content</TabsContent>
      <TabsContent value="password">Password content</TabsContent>
      <TabsContent value="settings">Settings content</TabsContent>
    </Tabs>
  );
}

describe('Tabs', () => {
  it('renders tabs with default value showing correct content', () => {
    render(<TestTabs />);

    expect(screen.getByText('Account content')).toBeInTheDocument();
    expect(screen.queryByText('Password content')).not.toBeInTheDocument();
  });

  it('switches tab on click', async () => {
    const user = userEvent.setup();
    render(<TestTabs />);

    expect(screen.getByText('Account content')).toBeInTheDocument();

    await user.click(screen.getByRole('tab', { name: 'Password' }));

    expect(screen.queryByText('Account content')).not.toBeInTheDocument();
    expect(screen.getByText('Password content')).toBeInTheDocument();
  });

  it('has correct aria attributes', () => {
    render(<TestTabs />);

    expect(screen.getByRole('tablist')).toBeInTheDocument();
    expect(screen.getAllByRole('tab')).toHaveLength(3);
    expect(screen.getByRole('tabpanel')).toBeInTheDocument();
  });

  it('applies custom className to TabsList', () => {
    render(
      <Tabs defaultValue="tab1">
        <TabsList className="custom-list">
          <TabsTrigger value="tab1">Tab 1</TabsTrigger>
        </TabsList>
        <TabsContent value="tab1">Content 1</TabsContent>
      </Tabs>
    );

    expect(screen.getByRole('tablist')).toHaveClass('custom-list');
  });

  it('marks active tab with aria-selected', () => {
    render(<TestTabs defaultValue="password" />);

    expect(screen.getByRole('tab', { name: 'Password' })).toHaveAttribute(
      'aria-selected',
      'true'
    );
    expect(screen.getByRole('tab', { name: 'Account' })).toHaveAttribute(
      'aria-selected',
      'false'
    );
  });
});
