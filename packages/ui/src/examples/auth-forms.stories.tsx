import type { Meta, StoryObj } from '@storybook/react';
import * as React from 'react';

import { Alert, AlertDescription } from '../components/alert';
import { Avatar, AvatarFallback, AvatarImage } from '../components/avatar';
import { Badge } from '../components/badge';
import { Button } from '../components/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../components/card';
import { Checkbox } from '../components/checkbox';
import { Input } from '../components/input';
import { Label } from '../components/label';
import { Progress } from '../components/progress';
import { RadioGroup, RadioGroupItem } from '../components/radio-group';
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
import { Toaster } from '../components/toast/toaster';
import { toast } from '../components/toast/use-toast';
import { cn } from '../lib/utils';

/* ------------------------------------------------------------------ */
/*  Mock Data                                                          */
/* ------------------------------------------------------------------ */

const ROLES = [
  { value: 'developer', label: 'Developer', desc: 'Build and ship software' },
  { value: 'designer', label: 'Designer', desc: 'Create visual experiences' },
  { value: 'manager', label: 'Manager', desc: 'Lead and organize teams' },
  { value: 'other', label: 'Other', desc: 'Something else entirely' },
];

const INTERESTS = [
  'React', 'TypeScript', 'Design Systems', 'Accessibility', 'Performance', 'Testing',
];

/* ------------------------------------------------------------------ */
/*  Sub-components                                                     */
/* ------------------------------------------------------------------ */

function LoginForm() {
  const [showError, setShowError] = React.useState(false);

  return (
    <Card className={cn('w-full max-w-md')}>
      <CardHeader className={cn('text-center')}>
        <CardTitle className={cn('text-2xl')}>Welcome back</CardTitle>
        <CardDescription>Enter your credentials to sign in to your account.</CardDescription>
      </CardHeader>
      <CardContent className={cn('space-y-4')}>
        {showError && (
          <Alert variant="destructive">
            <AlertDescription>Invalid email or password. Please try again.</AlertDescription>
          </Alert>
        )}
        <div className={cn('space-y-2')}>
          <Label htmlFor="login-email">Email</Label>
          <Input id="login-email" type="email" placeholder="name@example.com" />
        </div>
        <div className={cn('space-y-2')}>
          <div className={cn('flex items-center justify-between')}>
            <Label htmlFor="login-password">Password</Label>
            <Button variant="link" className={cn('h-auto p-0 text-xs')}>Forgot password?</Button>
          </div>
          <Input id="login-password" type="password" placeholder="Enter your password" />
        </div>
        <div className={cn('flex items-center gap-2')}>
          <Checkbox id="remember-me" />
          <Label htmlFor="remember-me" className={cn('text-sm')}>Remember me</Label>
        </div>
      </CardContent>
      <CardFooter className={cn('flex flex-col gap-4')}>
        <Button
          className={cn('w-full')}
          onClick={() => {
            setShowError(true);
            toast.error({ title: 'Sign in failed', description: 'Invalid credentials.' });
          }}
        >
          Sign In
        </Button>
        <div className={cn('relative w-full')}>
          <Separator />
          <span className={cn('absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-card px-2 text-xs text-muted-foreground')}>
            or continue with
          </span>
        </div>
        <div className={cn('grid w-full grid-cols-2 gap-2')}>
          <Button variant="outline" aria-label="Sign in with GitHub">GitHub</Button>
          <Button variant="outline" aria-label="Sign in with Google">Google</Button>
        </div>
      </CardFooter>
    </Card>
  );
}

function SignUpForm() {
  return (
    <Card className={cn('w-full max-w-md')}>
      <CardHeader className={cn('text-center')}>
        <CardTitle className={cn('text-2xl')}>Create an account</CardTitle>
        <CardDescription>Enter your details to get started.</CardDescription>
      </CardHeader>
      <CardContent className={cn('space-y-4')}>
        <div className={cn('grid grid-cols-2 gap-4')}>
          <div className={cn('space-y-2')}>
            <Label htmlFor="signup-first">First name</Label>
            <Input id="signup-first" placeholder="John" />
          </div>
          <div className={cn('space-y-2')}>
            <Label htmlFor="signup-last">Last name</Label>
            <Input id="signup-last" placeholder="Doe" />
          </div>
        </div>
        <div className={cn('space-y-2')}>
          <Label htmlFor="signup-email">Email</Label>
          <Input id="signup-email" type="email" placeholder="name@example.com" />
        </div>
        <div className={cn('space-y-2')}>
          <Label htmlFor="signup-password">Password</Label>
          <Input id="signup-password" type="password" placeholder="Create a password" />
          <p className={cn('text-xs text-muted-foreground')}>Must be at least 8 characters.</p>
        </div>
        <div className={cn('space-y-2')}>
          <Label htmlFor="signup-confirm">Confirm password</Label>
          <Input id="signup-confirm" type="password" placeholder="Confirm your password" />
        </div>
        <div className={cn('flex items-start gap-2')}>
          <Checkbox id="agree-terms" className={cn('mt-0.5')} />
          <Label htmlFor="agree-terms" className={cn('text-sm leading-tight')}>
            I agree to the Terms of Service and Privacy Policy
          </Label>
        </div>
      </CardContent>
      <CardFooter>
        <Button
          className={cn('w-full')}
          onClick={() => toast.success({ title: 'Account created', description: 'Welcome! Please check your email to verify.' })}
        >
          Create Account
        </Button>
      </CardFooter>
    </Card>
  );
}

function ForgotPasswordForm() {
  const [sent, setSent] = React.useState(false);

  return (
    <Card className={cn('w-full max-w-md')}>
      <CardHeader className={cn('text-center')}>
        <CardTitle className={cn('text-2xl')}>Reset password</CardTitle>
        <CardDescription>
          {sent
            ? 'Check your email for a reset link.'
            : 'Enter your email and we will send you a reset link.'}
        </CardDescription>
      </CardHeader>
      <CardContent className={cn('space-y-4')}>
        {sent ? (
          <Alert>
            <AlertDescription>
              We have sent a password reset link to your email address. The link will expire in 24 hours.
            </AlertDescription>
          </Alert>
        ) : (
          <div className={cn('space-y-2')}>
            <Label htmlFor="reset-email">Email</Label>
            <Input id="reset-email" type="email" placeholder="name@example.com" />
          </div>
        )}
      </CardContent>
      <CardFooter className={cn('flex flex-col gap-2')}>
        {sent ? (
          <Button variant="outline" className={cn('w-full')} onClick={() => setSent(false)}>
            Try another email
          </Button>
        ) : (
          <Button className={cn('w-full')} onClick={() => setSent(true)}>
            Send Reset Link
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}

function OnboardingWizard() {
  const [step, setStep] = React.useState(0);
  const totalSteps = 3;

  return (
    <Card className={cn('w-full max-w-lg')}>
      <CardHeader>
        <div className={cn('mb-2 flex items-center justify-between')}>
          <Badge variant="secondary">Step {step + 1} of {totalSteps}</Badge>
          <span className={cn('text-sm text-muted-foreground')}>{Math.round(((step + 1) / totalSteps) * 100)}%</span>
        </div>
        <Progress value={((step + 1) / totalSteps) * 100} aria-label="Onboarding progress" />
      </CardHeader>
      <CardContent className={cn('space-y-6')}>
        {step === 0 && (
          <div className={cn('space-y-4')}>
            <div className={cn('text-center')}>
              <CardTitle className={cn('text-xl')}>Tell us about yourself</CardTitle>
              <CardDescription>Select your role to personalize your experience.</CardDescription>
            </div>
            <RadioGroup defaultValue="developer" className={cn('space-y-3')}>
              {ROLES.map((role) => (
                <Label
                  key={role.value}
                  htmlFor={`role-${role.value}`}
                  className={cn(
                    'flex cursor-pointer items-start gap-3 rounded-lg border border-border p-4 hover:bg-accent',
                  )}
                >
                  <RadioGroupItem value={role.value} id={`role-${role.value}`} className={cn('mt-0.5')} />
                  <div>
                    <span className={cn('font-medium')}>{role.label}</span>
                    <p className={cn('text-sm text-muted-foreground')}>{role.desc}</p>
                  </div>
                </Label>
              ))}
            </RadioGroup>
          </div>
        )}

        {step === 1 && (
          <div className={cn('space-y-4')}>
            <div className={cn('text-center')}>
              <CardTitle className={cn('text-xl')}>Your profile</CardTitle>
              <CardDescription>Set up your profile details.</CardDescription>
            </div>
            <div className={cn('flex justify-center')}>
              <Avatar className={cn('h-20 w-20')}>
                <AvatarImage alt="Profile" />
                <AvatarFallback className={cn('text-2xl')}>JD</AvatarFallback>
              </Avatar>
            </div>
            <div className={cn('space-y-2')}>
              <Label htmlFor="onboard-display">Display name</Label>
              <Input id="onboard-display" placeholder="How should we call you?" />
            </div>
            <div className={cn('space-y-2')}>
              <Label htmlFor="onboard-company">Company</Label>
              <Select>
                <SelectTrigger id="onboard-company">
                  <SelectValue placeholder="Select your company size" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="solo">Just me</SelectItem>
                  <SelectItem value="small">2-10 people</SelectItem>
                  <SelectItem value="medium">11-50 people</SelectItem>
                  <SelectItem value="large">50+ people</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className={cn('space-y-4')}>
            <div className={cn('text-center')}>
              <CardTitle className={cn('text-xl')}>Preferences</CardTitle>
              <CardDescription>Customize your experience.</CardDescription>
            </div>
            <div>
              <Label className={cn('mb-3 block text-sm font-medium')}>Interests</Label>
              <div className={cn('flex flex-wrap gap-2')}>
                {INTERESTS.map((interest) => (
                  <Label
                    key={interest}
                    htmlFor={`interest-${interest.toLowerCase().replace(/\s+/g, '-')}`}
                    className={cn('flex cursor-pointer items-center gap-2 rounded-full border border-border px-3 py-1.5 text-sm hover:bg-accent')}
                  >
                    <Checkbox id={`interest-${interest.toLowerCase().replace(/\s+/g, '-')}`} />
                    {interest}
                  </Label>
                ))}
              </div>
            </div>
            <Separator />
            <div className={cn('flex items-center justify-between rounded-lg border border-border p-4')}>
              <div>
                <Label htmlFor="onboard-newsletter">Email newsletter</Label>
                <p className={cn('text-sm text-muted-foreground')}>Receive weekly tips and updates.</p>
              </div>
              <Switch id="onboard-newsletter" defaultChecked />
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter className={cn('flex justify-between')}>
        <Button
          variant="outline"
          onClick={() => setStep((s) => Math.max(0, s - 1))}
          disabled={step === 0}
        >
          Back
        </Button>
        <Button
          onClick={() => {
            if (step < totalSteps - 1) {
              setStep((s) => s + 1);
            } else {
              toast.success({ title: 'Setup complete!', description: 'Your account is ready to use.' });
            }
          }}
        >
          {step === totalSteps - 1 ? 'Complete Setup' : 'Continue'}
        </Button>
      </CardFooter>
    </Card>
  );
}

/* ------------------------------------------------------------------ */
/*  Page Component                                                     */
/* ------------------------------------------------------------------ */

function AuthFormsPage() {
  return (
    <div className={cn('min-h-screen bg-background text-foreground')}>
      <header className={cn('border-b border-border')}>
        <div className={cn('flex h-14 items-center px-6')}>
          <span className={cn('text-lg font-bold')}>Nexus Auth</span>
        </div>
      </header>

      <main className={cn('p-6')}>
        <Tabs defaultValue="login" className={cn('mx-auto max-w-2xl')}>
          <TabsList className={cn('grid w-full grid-cols-4')}>
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="signup">Sign Up</TabsTrigger>
            <TabsTrigger value="forgot">Forgot</TabsTrigger>
            <TabsTrigger value="onboarding">Onboarding</TabsTrigger>
          </TabsList>

          <TabsContent value="login" className={cn('flex justify-center pt-8')}>
            <LoginForm />
          </TabsContent>

          <TabsContent value="signup" className={cn('flex justify-center pt-8')}>
            <SignUpForm />
          </TabsContent>

          <TabsContent value="forgot" className={cn('flex justify-center pt-8')}>
            <ForgotPasswordForm />
          </TabsContent>

          <TabsContent value="onboarding" className={cn('flex justify-center pt-8')}>
            <OnboardingWizard />
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
  title: 'Examples/Auth Forms',
  tags: ['!autodocs'],
  parameters: { layout: 'fullscreen' },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => <AuthFormsPage />,
};
