# DESIGN.md — 설계 및 스타일링 시스템

> **nexus-ui** 컴포넌트의 설계 패턴, 디자인 토큰, 테마 시스템을 정의합니다.

---

## 1. 컴포넌트 설계 패턴

### 1.1 CVA (class-variance-authority) 기반 Variant 설계

모든 컴포넌트의 시각적 변형(variant)은 CVA를 사용하여 타입 안전하게 관리합니다.

```typescript
import { cva, type VariantProps } from 'class-variance-authority';

const buttonVariants = cva(
  // 기본 클래스 (모든 variant에 공통 적용)
  'inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      // 시각적 스타일
      variant: {
        solid: 'bg-primary text-primary-foreground shadow hover:bg-primary/90',
        outline: 'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
        link: 'text-primary underline-offset-4 hover:underline',
      },
      // 의미론적 색상
      intent: {
        primary: '',    // variant와 조합하여 결정
        secondary: '',
        destructive: '',
      },
      // 크기
      size: {
        sm: 'h-8 px-3 text-xs gap-1.5',
        md: 'h-10 px-4 text-sm gap-2',
        lg: 'h-12 px-6 text-base gap-2.5',
      },
    },
    // variant 간 조합 규칙
    compoundVariants: [
      {
        variant: 'solid',
        intent: 'destructive',
        class: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
      },
      {
        variant: 'outline',
        intent: 'destructive',
        class: 'border-destructive text-destructive hover:bg-destructive/10',
      },
    ],
    defaultVariants: {
      variant: 'solid',
      intent: 'primary',
      size: 'md',
    },
  }
);

// 타입 자동 추출
type ButtonVariants = VariantProps<typeof buttonVariants>;
```

### 1.2 Variant 설계 3축

| 축 | 값 | 설명 |
|----|-----|------|
| **Variant** | `solid`, `outline`, `ghost`, `link` | 시각적 형태 (배경, 테두리 등) |
| **Intent** | `primary`, `secondary`, `destructive` | 의미론적 색상 (주요 동작, 보조, 위험) |
| **Size** | `sm`, `md`, `lg` | 물리적 크기 (높이, 패딩, 폰트) |

> **Compound Variants**: 두 축의 조합에 따른 특수 스타일을 `compoundVariants`로 처리합니다.

### 1.3 cn() 유틸리티

Tailwind CSS 클래스 충돌을 방지하기 위해 `clsx` + `tailwind-merge`를 결합한 유틸리티 함수를 사용합니다.

```typescript
// packages/ui/src/lib/utils.ts
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

**사용 예시:**

```tsx
<button className={cn(
  buttonVariants({ variant, intent, size }),
  className // 사용자 커스텀 클래스 (충돌 시 우선 적용)
)}>
```

> `tailwind-merge`가 `bg-primary`와 `bg-red-500`이 동시에 있을 때 후자만 유지하는 등의 충돌 해소를 자동으로 처리합니다.

### 1.4 컴포넌트 합성 패턴 (Compound Component)

복합 컴포넌트(Dialog, Select 등)는 Radix UI의 Compound Component 패턴을 따릅니다.

```tsx
// 사용 예시
<Dialog>
  <Dialog.Trigger asChild>
    <Button>열기</Button>
  </Dialog.Trigger>
  <Dialog.Portal>
    <Dialog.Overlay />
    <Dialog.Content>
      <Dialog.Header>
        <Dialog.Title>제목</Dialog.Title>
        <Dialog.Description>설명</Dialog.Description>
      </Dialog.Header>
      {/* 컨텐츠 */}
      <Dialog.Footer>
        <Dialog.Close asChild>
          <Button variant="outline">취소</Button>
        </Dialog.Close>
      </Dialog.Footer>
    </Dialog.Content>
  </Dialog.Portal>
</Dialog>
```

---

## 2. 디자인 토큰 시스템

### 2.1 토큰 계층 구조

```
Primitive Tokens (원시 토큰)
    ↓ 참조
Semantic Tokens (의미론적 토큰)
    ↓ 참조
Component Tokens (컴포넌트 토큰)
```

### 2.2 Primitive Tokens (원시 토큰)

절대적인 값을 정의합니다. 직접 컴포넌트에서 사용하지 않습니다.

#### 색상 스케일

```typescript
// packages/tokens/src/colors.ts
export const colors = {
  // Gray 스케일 (중립)
  gray: {
    50:  '#f9fafb',
    100: '#f3f4f6',
    200: '#e5e7eb',
    300: '#d1d5db',
    400: '#9ca3af',
    500: '#6b7280',
    600: '#4b5563',
    700: '#374151',
    800: '#1f2937',
    900: '#111827',
    950: '#030712',
  },
  // Blue 스케일 (Primary)
  blue: {
    50:  '#eff6ff',
    100: '#dbeafe',
    200: '#bfdbfe',
    300: '#93c5fd',
    400: '#60a5fa',
    500: '#3b82f6',
    600: '#2563eb',
    700: '#1d4ed8',
    800: '#1e40af',
    900: '#1e3a8a',
    950: '#172554',
  },
  // Red 스케일 (Destructive)
  red: {
    50:  '#fef2f2',
    100: '#fee2e2',
    200: '#fecaca',
    300: '#fca5a5',
    400: '#f87171',
    500: '#ef4444',
    600: '#dc2626',
    700: '#b91c1c',
    800: '#991b1b',
    900: '#7f1d1d',
    950: '#450a0a',
  },
  // Green 스케일 (Success)
  green: {
    50:  '#f0fdf4',
    100: '#dcfce7',
    200: '#bbf7d0',
    300: '#86efac',
    400: '#4ade80',
    500: '#22c55e',
    600: '#16a34a',
    700: '#15803d',
    800: '#166534',
    900: '#14532d',
    950: '#052e16',
  },
  // Amber 스케일 (Warning)
  amber: {
    50:  '#fffbeb',
    100: '#fef3c7',
    200: '#fde68a',
    300: '#fcd34d',
    400: '#fbbf24',
    500: '#f59e0b',
    600: '#d97706',
    700: '#b45309',
    800: '#92400e',
    900: '#78350f',
    950: '#451a03',
  },
  // 순수 색상
  white: '#ffffff',
  black: '#000000',
} as const;
```

#### 타이포그래피

```typescript
// packages/tokens/src/typography.ts
export const typography = {
  fontFamily: {
    sans: ['Pretendard', 'system-ui', '-apple-system', 'sans-serif'],
    mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
  },
  fontSize: {
    xs:   ['0.75rem',  { lineHeight: '1rem' }],     // 12px
    sm:   ['0.875rem', { lineHeight: '1.25rem' }],   // 14px
    base: ['1rem',     { lineHeight: '1.5rem' }],     // 16px
    lg:   ['1.125rem', { lineHeight: '1.75rem' }],    // 18px
    xl:   ['1.25rem',  { lineHeight: '1.75rem' }],    // 20px
    '2xl': ['1.5rem',  { lineHeight: '2rem' }],       // 24px
    '3xl': ['1.875rem', { lineHeight: '2.25rem' }],   // 30px
  },
  fontWeight: {
    normal:   '400',
    medium:   '500',
    semibold: '600',
    bold:     '700',
  },
} as const;
```

#### 스페이싱 & 라운딩

```typescript
// packages/tokens/src/spacing.ts
export const spacing = {
  0:    '0px',
  0.5:  '0.125rem',   // 2px
  1:    '0.25rem',     // 4px
  1.5:  '0.375rem',   // 6px
  2:    '0.5rem',      // 8px
  3:    '0.75rem',     // 12px
  4:    '1rem',        // 16px
  5:    '1.25rem',     // 20px
  6:    '1.5rem',      // 24px
  8:    '2rem',        // 32px
  10:   '2.5rem',      // 40px
  12:   '3rem',        // 48px
  16:   '4rem',        // 64px
} as const;

export const borderRadius = {
  none: '0px',
  sm:   '0.25rem',     // 4px
  md:   '0.375rem',    // 6px
  lg:   '0.5rem',      // 8px
  xl:   '0.75rem',     // 12px
  '2xl': '1rem',       // 16px
  full: '9999px',
} as const;
```

### 2.3 Semantic Tokens (의미론적 토큰)

CSS Variables로 정의하여 테마 전환에 활용합니다.

```css
/* packages/tokens/src/css/light.css */
:root {
  /* 배경 */
  --background: 0 0% 100%;
  --foreground: 222.2 84% 4.9%;

  /* 카드 */
  --card: 0 0% 100%;
  --card-foreground: 222.2 84% 4.9%;

  /* Popover */
  --popover: 0 0% 100%;
  --popover-foreground: 222.2 84% 4.9%;

  /* Primary */
  --primary: 221.2 83.2% 53.3%;
  --primary-foreground: 210 40% 98%;

  /* Secondary */
  --secondary: 210 40% 96.1%;
  --secondary-foreground: 222.2 47.4% 11.2%;

  /* Destructive */
  --destructive: 0 84.2% 60.2%;
  --destructive-foreground: 210 40% 98%;

  /* Muted */
  --muted: 210 40% 96.1%;
  --muted-foreground: 215.4 16.3% 46.9%;

  /* Accent */
  --accent: 210 40% 96.1%;
  --accent-foreground: 222.2 47.4% 11.2%;

  /* 테두리 & 입력 */
  --border: 214.3 31.8% 91.4%;
  --input: 214.3 31.8% 91.4%;
  --ring: 221.2 83.2% 53.3%;

  /* 라운딩 */
  --radius: 0.5rem;

  /* Toast 색상 */
  --success: 142.1 76.2% 36.3%;
  --success-foreground: 355.7 100% 97.3%;
  --warning: 38 92% 50%;
  --warning-foreground: 48 96% 89%;
  --info: 221.2 83.2% 53.3%;
  --info-foreground: 210 40% 98%;
}
```

```css
/* packages/tokens/src/css/dark.css */
.dark {
  --background: 222.2 84% 4.9%;
  --foreground: 210 40% 98%;

  --card: 222.2 84% 4.9%;
  --card-foreground: 210 40% 98%;

  --popover: 222.2 84% 4.9%;
  --popover-foreground: 210 40% 98%;

  --primary: 217.2 91.2% 59.8%;
  --primary-foreground: 222.2 47.4% 11.2%;

  --secondary: 217.2 32.6% 17.5%;
  --secondary-foreground: 210 40% 98%;

  --destructive: 0 62.8% 30.6%;
  --destructive-foreground: 210 40% 98%;

  --muted: 217.2 32.6% 17.5%;
  --muted-foreground: 215 20.2% 65.1%;

  --accent: 217.2 32.6% 17.5%;
  --accent-foreground: 210 40% 98%;

  --border: 217.2 32.6% 17.5%;
  --input: 217.2 32.6% 17.5%;
  --ring: 224.3 76.3% 48%;

  --radius: 0.5rem;

  --success: 142.1 70.6% 45.3%;
  --success-foreground: 144.9 80.4% 10%;
  --warning: 48 96% 89%;
  --warning-foreground: 38 92% 50%;
  --info: 217.2 91.2% 59.8%;
  --info-foreground: 222.2 47.4% 11.2%;
}
```

### 2.4 Component Tokens (컴포넌트 토큰)

Tailwind CSS 설정에서 Semantic Tokens를 참조합니다.

```typescript
// tailwind.config.ts (공유 설정)
import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class',
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        success: {
          DEFAULT: 'hsl(var(--success))',
          foreground: 'hsl(var(--success-foreground))',
        },
        warning: {
          DEFAULT: 'hsl(var(--warning))',
          foreground: 'hsl(var(--warning-foreground))',
        },
        info: {
          DEFAULT: 'hsl(var(--info))',
          foreground: 'hsl(var(--info-foreground))',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
    },
  },
};

export default config;
```

---

## 3. 테마 시스템

### 3.1 테마 전환 원리

```
[사용자 토글] → <html class="dark"> 추가/제거
                        ↓
              CSS Variables 세트 전환 (light.css ↔ dark.css)
                        ↓
              Tailwind 유틸리티 클래스가 참조하는 값이 자동 변경
                        ↓
              모든 컴포넌트 스타일이 일괄 업데이트
```

### 3.2 테마 적용 방법

```tsx
// 호스트 앱에서 사용
import '@nexus-ui-kit/tokens/styles.css'; // 토큰 CSS import

function App() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  return (
    <html className={theme === 'dark' ? 'dark' : ''}>
      <body>
        {/* 모든 nexus-ui 컴포넌트가 테마에 반응 */}
      </body>
    </html>
  );
}
```

### 3.3 시스템 테마 감지

```typescript
// @nexus-ui-kit/hooks에서 제공
function useTheme() {
  // prefers-color-scheme 미디어 쿼리 감지
  // localStorage 기반 사용자 선호 저장
  // 'light' | 'dark' | 'system' 지원
}
```

### 3.4 핵심 원칙

1. **하드코딩 금지**: 컴포넌트 내부에서 절대 색상값을 직접 사용하지 않음
2. **토큰 참조만 허용**: 모든 색상은 `hsl(var(--token-name))` 형태로 참조
3. **단일 전환 지점**: `<html>` 요소의 `class`만 변경하면 전체 테마 전환 완료
4. **확장 가능**: 새로운 테마 추가 시 CSS Variables 세트만 추가하면 됨

---

## 4. 고대비 모드 대응

```css
/* forced-colors 미디어 쿼리 */
@media (forced-colors: active) {
  .nexus-button {
    border: 1px solid ButtonText;
  }

  .nexus-button:disabled {
    border-color: GrayText;
    color: GrayText;
  }

  .nexus-focus-ring {
    outline: 2px solid Highlight;
  }
}
```

---

## 5. 애니메이션 설계

### 5.1 기본 트랜지션

```typescript
// Tailwind 설정에서 정의
const animation = {
  keyframes: {
    'fade-in': {
      from: { opacity: '0' },
      to: { opacity: '1' },
    },
    'fade-out': {
      from: { opacity: '1' },
      to: { opacity: '0' },
    },
    'scale-in': {
      from: { opacity: '0', transform: 'scale(0.95)' },
      to: { opacity: '1', transform: 'scale(1)' },
    },
    'scale-out': {
      from: { opacity: '1', transform: 'scale(1)' },
      to: { opacity: '0', transform: 'scale(0.95)' },
    },
    'slide-in-from-top': {
      from: { transform: 'translateY(-100%)' },
      to: { transform: 'translateY(0)' },
    },
    'slide-in-from-bottom': {
      from: { transform: 'translateY(100%)' },
      to: { transform: 'translateY(0)' },
    },
  },
  animation: {
    'fade-in': 'fade-in 150ms ease-out',
    'fade-out': 'fade-out 150ms ease-in',
    'scale-in': 'scale-in 150ms ease-out',
    'scale-out': 'scale-out 150ms ease-in',
    'slide-in-from-top': 'slide-in-from-top 200ms ease-out',
    'slide-in-from-bottom': 'slide-in-from-bottom 200ms ease-out',
  },
};
```

### 5.2 모션 접근성

```css
/* 모션 민감 사용자 대응 */
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## 관련 문서

- [PRD.md](./PRD.md) — 제품 요구사항 정의서
- [ARCHITECTURE.md](./ARCHITECTURE.md) — 시스템 아키텍처
- [DEVELOPMENT.md](./DEVELOPMENT.md) — 개발 환경 가이드
- [GIT_WORKFLOW.md](./GIT_WORKFLOW.md) — 브랜치 전략 및 협업 규칙
- [DEPLOYMENT.md](./DEPLOYMENT.md) — CI/CD 배포 파이프라인
- [CLAUDE.md](../CLAUDE.md) — AI 코딩 컨벤션
