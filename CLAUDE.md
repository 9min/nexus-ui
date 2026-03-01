# CLAUDE.md — AI 코딩 컨벤션

> **nexus-ui** 프로젝트에서 AI(Claude)가 코드를 작성할 때 반드시 따라야 하는 규칙과 컨벤션입니다.

---

## 프로젝트 개요

- **프로젝트**: nexus-ui — 엔터프라이즈급 디자인 시스템 모노레포
- **기술 스택**: pnpm, Turborepo, React 18, TypeScript, Tailwind CSS, Radix UI, tsup, Storybook, Changesets
- **패키지 구성**: `@nexus-ui/ui`, `@nexus-ui/hooks`, `@nexus-ui/tokens`
- **NPM 배포**: 공개 NPM 레지스트리, `@nexus-ui` 스코프

---

## 컴포넌트 작성 철학

### Radix UI Primitives 래핑 필수

복잡한 상태 관리가 필요한 인터랙티브 컴포넌트(Dialog, Select, DropdownMenu, Toast 등)는 **절대 밑바닥부터 구현하지 않는다**. 반드시 Radix UI Primitives를 래핑하여 사용한다.

```tsx
// ✅ 올바른 방법: Radix UI 래핑
import * as DialogPrimitive from '@radix-ui/react-dialog';

const DialogContent = React.forwardRef<
  React.ComponentRef<typeof DialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <DialogPrimitive.Portal>
    <DialogPrimitive.Overlay className={cn('fixed inset-0 bg-black/50', className)} />
    <DialogPrimitive.Content ref={ref} className={cn('fixed ...', className)} {...props}>
      {children}
    </DialogPrimitive.Content>
  </DialogPrimitive.Portal>
));
```

```tsx
// ❌ 금지: 직접 구현
const Dialog = ({ open, onClose }) => {
  // Focus trap, Portal, ESC 핸들링 등을 직접 구현하지 않는다
};
```

**이유**: Focus trap, Portal 렌더링, 키보드 내비게이션, ARIA 속성 관리 등은 엣지 케이스가 매우 많아 직접 구현 시 접근성 문제가 발생할 확률이 높다.

### CVA 기반 Variant 정의

모든 시각적 변형은 `class-variance-authority`를 사용하여 타입 안전하게 관리한다.

```tsx
// ✅ CVA로 variant 정의
import { cva, type VariantProps } from 'class-variance-authority';

const buttonVariants = cva('base-classes', {
  variants: {
    variant: { solid: '...', outline: '...', ghost: '...', link: '...' },
    size: { sm: '...', md: '...', lg: '...' },
    intent: { primary: '...', secondary: '...', destructive: '...' },
  },
  defaultVariants: { variant: 'solid', size: 'md', intent: 'primary' },
});
```

---

## 스타일링 규칙

### cn() 유틸리티 필수 사용

Tailwind CSS 클래스를 조합할 때 반드시 `cn()` 유틸리티를 사용한다.

```typescript
// packages/ui/src/lib/utils.ts
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

```tsx
// ✅ cn() 사용
<div className={cn('p-4 bg-background', isActive && 'bg-primary', className)} />

// ❌ 금지: 직접 문자열 결합
<div className={`p-4 bg-background ${isActive ? 'bg-primary' : ''} ${className}`} />
```

### 디자인 토큰 참조

색상값은 절대 하드코딩하지 않는다. 반드시 CSS Variables를 통해 토큰을 참조한다.

```tsx
// ✅ 토큰 참조
<div className="bg-primary text-primary-foreground" />
<div className="border-border" />

// ❌ 금지: 하드코딩
<div className="bg-blue-500 text-white" />
<div className="border-gray-200" />
```

### inline style 금지

```tsx
// ✅ Tailwind 클래스 사용
<div className="mt-4 p-2" />

// ❌ 금지: inline style
<div style={{ marginTop: 16, padding: 8 }} />
```

---

## TypeScript 규칙

### forwardRef 사용

모든 컴포넌트는 `React.forwardRef`를 사용하여 ref를 상위로 노출한다. (React 19 마이그레이션 시 점진적으로 제거 예정)

```tsx
const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, intent, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, intent }), className)}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = 'Button';
```

### Props 타입 명시적 Export

모든 컴포넌트의 Props 타입은 반드시 명시적으로 export 한다.

```tsx
// ✅ Props 타입 export
export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  loading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  asChild?: boolean;
}

export { Button, buttonVariants };
export type { ButtonProps };
```

### any 타입 금지

```tsx
// ✅ 올바른 타입 지정
const handleChange = (value: string) => { ... };

// ❌ 금지
const handleChange = (value: any) => { ... };
```

### 타입 Import 구분

타입 import에는 `type` 키워드를 사용한다.

```tsx
// ✅ type import
import type { ButtonProps } from './button';
import { type VariantProps, cva } from 'class-variance-authority';

// ❌ 피하기: 일반 import로 타입 가져오기
import { ButtonProps } from './button';
```

---

## 패키지 구조 규칙

### 패키지 간 의존성

```
@nexus-ui/tokens  (의존성 없음, 최하위 레이어)
    ↓
@nexus-ui/ui      (tokens 의존, radix-ui 의존)
    ↑
@nexus-ui/hooks   (React만 peerDependency)
```

- `react`, `react-dom`은 반드시 `peerDependencies`로 선언
- 패키지 간 순환 참조 금지

### Import 경로

```tsx
// ✅ 패키지 스코프로 import (외부에서 사용 시)
import { Button } from '@nexus-ui/ui';
import { useDebounce } from '@nexus-ui/hooks';

// ✅ 상대 경로 (패키지 내부에서 사용 시)
import { cn } from '../../lib/utils';

// ❌ 금지: 다른 패키지의 내부 경로 직접 접근
import { cn } from '@nexus-ui/ui/src/lib/utils';
```

---

## 파일 네이밍 및 디렉토리 규칙

### 디렉토리 구조

```
packages/ui/src/components/<component-name>/
├── <component-name>.tsx           # 컴포넌트 구현
├── <component-name>.test.tsx      # 단위 테스트
├── <component-name>.stories.tsx   # Storybook 스토리
└── index.ts                       # 배럴 export
```

### 네이밍 규칙

| 항목 | 규칙 | 예시 |
|------|------|------|
| 디렉토리/파일 | kebab-case | `dropdown-menu.tsx` |
| 컴포넌트 | PascalCase | `DropdownMenu` |
| Props 타입 | PascalCase + Props | `DropdownMenuProps` |
| CVA 변수 | camelCase + Variants | `dropdownMenuVariants` |
| 훅 | camelCase + use 접두사 | `useMediaQuery` |
| 유틸리티 | camelCase | `cn`, `formatDate` |

### Export 규칙

```typescript
// 1. 컴포넌트 로컬 배럴 (components/button/index.ts)
export { Button, buttonVariants } from './button';
export type { ButtonProps } from './button';

// 2. 패키지 메인 배럴 (src/index.ts)
export { Button, buttonVariants, type ButtonProps } from './components/button';
```

---

## 접근성 필수 사항

### 모든 인터랙티브 요소에 접근성 속성 필수

```tsx
// ✅ 접근성 속성 포함
<button aria-label="닫기" aria-disabled={disabled}>
  <CloseIcon aria-hidden="true" />
</button>

// ❌ 금지: 접근성 속성 누락
<button>
  <CloseIcon />
</button>
```

### 필수 체크리스트

- [ ] 적절한 `role` 속성 (role="dialog", role="menu" 등)
- [ ] `aria-label` 또는 연결된 레이블
- [ ] `aria-expanded`, `aria-selected`, `aria-checked` 등 상태 속성
- [ ] 키보드 내비게이션 (Tab, Arrow, Enter/Space, Escape)
- [ ] 포커스 관리 (focus trap, focus restoration)
- [ ] `aria-live` 영역 (동적 컨텐츠 변경 시)
- [ ] `:focus-visible` 스타일

---

## 테스팅 규칙

### 테스트 작성 필수

모든 컴포넌트는 반드시 단위 테스트를 포함해야 한다.

```tsx
// ✅ 사용자 관점 테스트 (role, label 기반 쿼리)
expect(screen.getByRole('button', { name: '저장' })).toBeInTheDocument();

// ❌ 피하기: 구현 세부사항 테스트
expect(container.querySelector('.btn-primary')).toBeTruthy();
```

### 테스트 도구

- **단위 테스트**: Vitest + React Testing Library
- **사용자 인터랙션**: `@testing-library/user-event` (`fireEvent` 대신)
- **시각적 회귀**: Chromatic (Storybook 기반)

---

## 금지 사항 요약

| 항목 | 금지 이유 |
|------|-----------|
| inline style (`style={}`) | Tailwind 클래스와 충돌, 일관성 저해 |
| `any` 타입 | 타입 안전성 파괴 |
| 접근성 속성 누락 | WAI-ARIA 1.2 미준수 |
| 색상 하드코딩 | 테마 시스템 무력화 |
| Headless 컴포넌트 직접 구현 | Radix UI로 대체 (접근성 보장) |
| `className` 직접 문자열 결합 | `cn()` 유틸리티 미사용 |
| 패키지 내부 경로 직접 import | 캡슐화 위반 |
| `fireEvent` 사용 | `userEvent` 사용 권장 |
| 순환 참조 | 빌드 에러 유발 |

---

## 주요 명령어

```bash
pnpm dev          # 전체 개발 서버
pnpm build        # 전체 빌드
pnpm lint         # 전체 린트
pnpm typecheck    # 전체 타입 검사
pnpm test         # 전체 테스트
pnpm changeset    # Changeset 추가
pnpm clean        # 빌드 결과물 삭제
```

---

## 관련 문서

- [docs/PRD.md](./docs/PRD.md) — 제품 요구사항 정의서
- [docs/ARCHITECTURE.md](./docs/ARCHITECTURE.md) — 시스템 아키텍처
- [docs/DESIGN.md](./docs/DESIGN.md) — 설계 및 스타일링 시스템
- [docs/DEVELOPMENT.md](./docs/DEVELOPMENT.md) — 개발 환경 가이드
- [docs/GIT_WORKFLOW.md](./docs/GIT_WORKFLOW.md) — 브랜치 전략 및 협업 규칙
- [docs/DEPLOYMENT.md](./docs/DEPLOYMENT.md) — CI/CD 배포 파이프라인
