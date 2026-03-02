import type { Meta, StoryObj } from '@storybook/react';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '../components/accordion';
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
import { Card, CardContent } from '../components/card';
import { Label } from '../components/label';
import { RadioGroup, RadioGroupItem } from '../components/radio-group';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../components/select';
import { Separator } from '../components/separator';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../components/tooltip';
import { cn } from '../lib/utils';

/* ------------------------------------------------------------------ */
/*  Mock Data                                                          */
/* ------------------------------------------------------------------ */

const PRODUCT = {
  name: 'Premium Wireless Headphones',
  brand: 'Nexus Audio',
  price: 299.99,
  originalPrice: 399.99,
  rating: 4.8,
  reviewCount: 2847,
  description:
    'Experience immersive sound with our premium wireless headphones. Featuring active noise cancellation, 40-hour battery life, and ultra-comfortable memory foam ear cushions.',
  colors: [
    { name: 'Midnight Black', value: 'black' },
    { name: 'Silver Mist', value: 'silver' },
    { name: 'Ocean Blue', value: 'blue' },
  ],
};

const REVIEWS = [
  {
    author: 'Alex Chen',
    avatar: 'AC',
    rating: 5,
    date: '2024-01-10',
    text: 'Best headphones I have ever owned. The noise cancellation is incredible and the battery lasts all week.',
  },
  {
    author: 'Maria Santos',
    avatar: 'MS',
    rating: 4,
    date: '2024-01-08',
    text: 'Great sound quality and very comfortable for long sessions. Wish the case was a bit more compact.',
  },
  {
    author: 'James Park',
    avatar: 'JP',
    rating: 5,
    date: '2024-01-05',
    text: 'Worth every penny. The spatial audio feature is a game changer for music and movies.',
  },
];

const SPECS = [
  { label: 'Driver Size', value: '40mm' },
  { label: 'Frequency Response', value: '20Hz - 40kHz' },
  { label: 'Battery Life', value: '40 hours' },
  { label: 'Charging', value: 'USB-C, 10min = 3hrs' },
  { label: 'Weight', value: '250g' },
  { label: 'Connectivity', value: 'Bluetooth 5.3' },
];

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

function StarRating({ rating }: { rating: number }) {
  return (
    <span role="img" className={cn('flex items-center gap-0.5')} aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }, (_, i) => (
        <span key={i} className={cn(i < Math.floor(rating) ? 'text-yellow-500' : 'text-muted-foreground/30')}>
          &#9733;
        </span>
      ))}
    </span>
  );
}

/* ------------------------------------------------------------------ */
/*  Page Component                                                     */
/* ------------------------------------------------------------------ */

function EcommerceProductPage() {
  return (
    <TooltipProvider>
      <div className={cn('min-h-screen bg-background text-foreground')}>
        {/* Header */}
        <header className={cn('border-b border-border')}>
          <div className={cn('flex h-14 items-center px-6')}>
            <span className={cn('text-lg font-bold')}>Nexus Store</span>
            <nav className={cn('ml-8 flex items-center gap-4')} aria-label="Main navigation">
              <Button variant="ghost" size="sm">Electronics</Button>
              <Button variant="ghost" size="sm">Audio</Button>
              <Button variant="ghost" size="sm">Accessories</Button>
            </nav>
            <div className={cn('ml-auto flex items-center gap-2')}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="sm" aria-label="Shopping cart">
                    &#128722; <Badge className={cn('ml-1')}>3</Badge>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Cart (3 items)</TooltipContent>
              </Tooltip>
            </div>
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
                <BreadcrumbLink href="#">Electronics</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="#">Audio</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Headphones</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          {/* Product Layout */}
          <div className={cn('grid gap-8 lg:grid-cols-2')}>
            {/* Product Images */}
            <div className={cn('space-y-4')}>
              <Card>
                <CardContent className={cn('p-2')}>
                  <AspectRatio ratio={1}>
                    <div className={cn('flex h-full items-center justify-center rounded-md bg-muted')}>
                      <span className={cn('text-6xl')} aria-hidden="true">&#127911;</span>
                    </div>
                  </AspectRatio>
                </CardContent>
              </Card>
              <div className={cn('grid grid-cols-4 gap-2')}>
                {Array.from({ length: 4 }, (_, i) => (
                  <Card key={i} className={cn('cursor-pointer', i === 0 && 'ring-2 ring-primary')}>
                    <CardContent className={cn('p-1')}>
                      <AspectRatio ratio={1}>
                        <div className={cn('flex h-full items-center justify-center rounded bg-muted')}>
                          <span className={cn('text-xl')} aria-hidden="true">&#127911;</span>
                        </div>
                      </AspectRatio>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Product Details */}
            <div className={cn('space-y-6')}>
              <div>
                <p className={cn('text-sm text-muted-foreground')}>{PRODUCT.brand}</p>
                <h1 className={cn('text-3xl font-bold')}>{PRODUCT.name}</h1>
                <div className={cn('mt-2 flex items-center gap-3')}>
                  <StarRating rating={PRODUCT.rating} />
                  <span className={cn('text-sm text-muted-foreground')}>
                    {PRODUCT.rating} ({PRODUCT.reviewCount.toLocaleString()} reviews)
                  </span>
                </div>
              </div>

              <div className={cn('flex items-baseline gap-3')}>
                <span className={cn('text-3xl font-bold')}>${PRODUCT.price}</span>
                <span className={cn('text-lg text-muted-foreground line-through')}>${PRODUCT.originalPrice}</span>
                <Badge variant="secondary">
                  {Math.round((1 - PRODUCT.price / PRODUCT.originalPrice) * 100)}% OFF
                </Badge>
              </div>

              <Separator />

              <p className={cn('text-muted-foreground')}>{PRODUCT.description}</p>

              {/* Color Selection */}
              <div className={cn('space-y-3')}>
                <Label className={cn('text-sm font-medium')}>Color</Label>
                <RadioGroup defaultValue="black" className={cn('flex gap-3')}>
                  {PRODUCT.colors.map((color) => (
                    <Label
                      key={color.value}
                      htmlFor={`color-${color.value}`}
                      className={cn(
                        'flex cursor-pointer items-center gap-2 rounded-md border border-border px-3 py-2 text-sm',
                        'hover:bg-accent',
                      )}
                    >
                      <RadioGroupItem value={color.value} id={`color-${color.value}`} />
                      {color.name}
                    </Label>
                  ))}
                </RadioGroup>
              </div>

              {/* Quantity */}
              <div className={cn('space-y-3')}>
                <Label htmlFor="quantity">Quantity</Label>
                <Select defaultValue="1">
                  <SelectTrigger id="quantity" className={cn('w-24')}>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {[1, 2, 3, 4, 5].map((n) => (
                      <SelectItem key={n} value={String(n)}>
                        {n}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className={cn('flex gap-3')}>
                <Button className={cn('flex-1')} size="lg">Add to Cart</Button>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="outline" size="lg" aria-label="Add to wishlist">
                      &#9825;
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Add to Wishlist</TooltipContent>
                </Tooltip>
              </div>

              {/* Accordion: Specs + Shipping */}
              <Accordion type="multiple" defaultValue={['specs']}>
                <AccordionItem value="specs">
                  <AccordionTrigger>Specifications</AccordionTrigger>
                  <AccordionContent>
                    <div className={cn('space-y-2')}>
                      {SPECS.map((spec) => (
                        <div key={spec.label} className={cn('flex justify-between text-sm')}>
                          <span className={cn('text-muted-foreground')}>{spec.label}</span>
                          <span className={cn('font-medium')}>{spec.value}</span>
                        </div>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="shipping">
                  <AccordionTrigger>Shipping &amp; Returns</AccordionTrigger>
                  <AccordionContent>
                    <div className={cn('space-y-2 text-sm text-muted-foreground')}>
                      <p>Free shipping on orders over $100.</p>
                      <p>Estimated delivery: 3-5 business days.</p>
                      <p>30-day return policy for unused items.</p>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>

          <Separator className={cn('my-10')} />

          {/* Reviews Section */}
          <section aria-label="Customer reviews">
            <h2 className={cn('mb-6 text-2xl font-bold')}>Customer Reviews</h2>
            <div className={cn('space-y-4')}>
              {REVIEWS.map((review) => (
                <Card key={review.author}>
                  <CardContent className={cn('pt-6')}>
                    <div className={cn('flex items-start gap-4')}>
                      <Avatar>
                        <AvatarImage alt={review.author} />
                        <AvatarFallback>{review.avatar}</AvatarFallback>
                      </Avatar>
                      <div className={cn('flex-1')}>
                        <div className={cn('flex items-center justify-between')}>
                          <span className={cn('font-medium')}>{review.author}</span>
                          <span className={cn('text-sm text-muted-foreground')}>{review.date}</span>
                        </div>
                        <StarRating rating={review.rating} />
                        <p className={cn('mt-2 text-sm text-muted-foreground')}>{review.text}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        </main>
      </div>
    </TooltipProvider>
  );
}

/* ------------------------------------------------------------------ */
/*  Story                                                              */
/* ------------------------------------------------------------------ */

const meta: Meta = {
  title: 'Examples/E-Commerce Product',
  parameters: { layout: 'fullscreen' },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => <EcommerceProductPage />,
};
