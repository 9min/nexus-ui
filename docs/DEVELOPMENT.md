# DEVELOPMENT.md — 개발 환경 가이드

> **nexus-ui** 로컬 개발 환경 설정, 워크스페이스 연동, 컴포넌트 주도 개발(CDD) 가이드입니다.

---

## 1. 환경 요구사항

| 도구 | 최소 버전 | 설명 |
|------|-----------|------|
| Node.js | 18.17+ | LTS 버전 권장 |
| pnpm | 9.0+ | 패키지 매니저 |
| Git | 2.40+ | 버전 관리 |

---

## 2. 초기 셋업

### 2.1 저장소 클론

```bash
git clone https://github.com/<org>/nexus-ui.git
cd nexus-ui
```

### 2.2 pnpm 설치 (미설치 시)

```bash
# corepack으로 설치 (Node.js 18.17+ 내장)
corepack enable
corepack prepare pnpm@latest --activate

# 또는 직접 설치
npm install -g pnpm
```

### 2.3 의존성 설치

```bash
pnpm install
```

> pnpm workspace가 자동으로 모든 패키지의 의존성을 설치하고, 내부 패키지 간 심링크를 생성합니다.

### 2.4 전체 빌드 확인

```bash
pnpm build
```

> Turborepo가 의존성 순서(tokens → ui → hooks → apps)에 맞게 자동으로 빌드합니다.

### 2.5 개발 서버 실행

```bash
# 전체 워크스페이스 dev 모드
pnpm dev

# 특정 앱만 실행
pnpm --filter @nexus-ui/docs dev    # Storybook만
pnpm --filter @nexus-ui/web dev     # Playground만

# 특정 패키지 watch 모드
pnpm --filter @nexus-ui/ui dev      # UI 패키지만
```

---

## 3. 주요 스크립트

### 3.1 루트 `package.json` 스크립트

| 스크립트 | 명령어 | 설명 |
|----------|--------|------|
| `dev` | `pnpm dev` | 모든 패키지/앱 개발 모드 실행 |
| `build` | `pnpm build` | 모든 패키지 프로덕션 빌드 |
| `lint` | `pnpm lint` | 전체 린트 검사 |
| `typecheck` | `pnpm typecheck` | 전체 타입 검사 |
| `test` | `pnpm test` | 전체 테스트 실행 |
| `test:watch` | `pnpm test:watch` | 테스트 감시 모드 |
| `clean` | `pnpm clean` | 모든 빌드 결과물 삭제 |
| `format` | `pnpm format` | Prettier로 코드 포매팅 |

### 3.2 필터를 활용한 개별 실행

```bash
# 특정 패키지에서만 실행
pnpm --filter @nexus-ui/ui test
pnpm --filter @nexus-ui/hooks lint

# 특정 패키지와 그 의존성까지 빌드
pnpm --filter @nexus-ui/ui... build
```

---

## 4. 워크스페이스 연동 (HMR)

### 4.1 동작 원리

```
packages/ui/src/button.tsx 수정 저장
        ↓
tsup watch 모드가 변경 감지 → dist/ 재빌드
        ↓
pnpm workspace 심링크를 통해 apps/docs, apps/web이 참조
        ↓
Storybook / Next.js의 HMR이 변경된 모듈 감지
        ↓
브라우저에 즉시 반영 (전체 새로고침 없이 핫 리로드)
```

### 4.2 개발 시 주의사항

1. **반드시 `pnpm dev`로 전체 실행**: 개별 앱만 실행하면 패키지 watch가 동작하지 않아 변경이 반영되지 않습니다.
2. **타입 에러 발생 시**: `pnpm build`를 한 번 실행하여 `.d.ts` 파일을 최신으로 갱신합니다.
3. **새 의존성 추가 후**: `pnpm install`을 다시 실행하여 심링크를 갱신합니다.

---

## 5. 컴포넌트 주도 개발 (CDD)

### 5.1 개발 순서

```
1. 디자인 토큰 확인/정의 (@nexus-ui/tokens)
        ↓
2. 컴포넌트 스켈레톤 작성 (packages/ui/src/components/<name>/)
        ↓
3. Storybook 스토리 작성 (.stories.tsx)
        ↓
4. Storybook에서 시각적 확인하며 구현
        ↓
5. 단위 테스트 작성 (.test.tsx)
        ↓
6. 접근성 검증 (axe-core, 키보드 내비게이션)
        ↓
7. Export 추가 및 문서화
```

### 5.2 Storybook 개발 서버

```bash
pnpm --filter @nexus-ui/docs dev
# http://localhost:6006 에서 Storybook 접속
```

### 5.3 스토리 작성 가이드

```tsx
// packages/ui/src/components/button/button.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './button';

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['solid', 'outline', 'ghost', 'link'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    intent: {
      control: 'select',
      options: ['primary', 'secondary', 'destructive'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

// 기본 스토리
export const Default: Story = {
  args: {
    children: '버튼',
  },
};

// Variant 별 스토리
export const Solid: Story = {
  args: { variant: 'solid', children: 'Solid' },
};

export const Outline: Story = {
  args: { variant: 'outline', children: 'Outline' },
};

// 상태 별 스토리
export const Loading: Story = {
  args: { loading: true, children: '저장 중' },
};

export const Disabled: Story = {
  args: { disabled: true, children: '비활성화' },
};
```

**스토리 작성 규칙:**

1. 모든 컴포넌트에 `tags: ['autodocs']`로 자동 문서 생성
2. 모든 Props에 대한 `argTypes` 정의
3. 주요 variant/상태 조합에 대한 개별 스토리 작성
4. 접근성 검증이 필요한 인터랙션 스토리 포함

---

## 6. 테스팅 가이드

### 6.1 단위 테스트 (Vitest + React Testing Library)

```bash
# 전체 테스트
pnpm test

# 감시 모드
pnpm test:watch

# 특정 패키지만
pnpm --filter @nexus-ui/ui test

# 특정 파일만
pnpm --filter @nexus-ui/ui test button
```

#### 테스트 파일 작성 예시

```tsx
// packages/ui/src/components/button/button.test.tsx
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { Button } from './button';

describe('Button', () => {
  it('렌더링된다', () => {
    render(<Button>클릭</Button>);
    expect(screen.getByRole('button', { name: '클릭' })).toBeInTheDocument();
  });

  it('클릭 이벤트가 동작한다', async () => {
    const onClick = vi.fn();
    render(<Button onClick={onClick}>클릭</Button>);
    await userEvent.click(screen.getByRole('button'));
    expect(onClick).toHaveBeenCalledOnce();
  });

  it('disabled 상태에서 클릭이 무시된다', async () => {
    const onClick = vi.fn();
    render(<Button disabled onClick={onClick}>클릭</Button>);
    await userEvent.click(screen.getByRole('button'));
    expect(onClick).not.toHaveBeenCalled();
  });

  it('loading 상태에서 aria-busy가 설정된다', () => {
    render(<Button loading>저장</Button>);
    expect(screen.getByRole('button')).toHaveAttribute('aria-busy', 'true');
  });

  it('variant에 따라 올바른 스타일이 적용된다', () => {
    const { rerender } = render(<Button variant="outline">테스트</Button>);
    expect(screen.getByRole('button')).toHaveClass('border');

    rerender(<Button variant="ghost">테스트</Button>);
    expect(screen.getByRole('button')).not.toHaveClass('border');
  });
});
```

#### 테스트 작성 원칙

1. **사용자 관점으로 테스트**: DOM 구현 세부사항이 아닌 사용자가 보는 것(텍스트, 역할)으로 쿼리
2. **`getByRole` 우선**: 접근성을 자연스럽게 검증하는 쿼리 방식
3. **`userEvent` 사용**: `fireEvent` 대신 실제 사용자 인터랙션에 가까운 `userEvent` 사용
4. **한 테스트, 한 검증**: 각 테스트 케이스는 하나의 동작만 검증

### 6.2 Chromatic Visual Regression 테스트

Chromatic은 Storybook 스토리를 기반으로 시각적 변경을 감지합니다.

#### 워크플로우

```
1. PR 생성 / 코드 푸시
        ↓
2. GitHub Actions에서 Chromatic 실행
        ↓
3. 모든 스토리의 스크린샷 캡처
        ↓
4. 이전 베이스라인과 픽셀 단위 비교
        ↓
5. 변경 감지 시 Chromatic 대시보드에서 리뷰
        ↓
6. 의도된 변경이면 Approve → 새 베이스라인
   의도치 않은 변경이면 Deny → PR에서 수정
```

#### 로컬에서 Chromatic 실행

```bash
# Chromatic 토큰은 환경 변수로 관리
npx chromatic --project-token=$CHROMATIC_PROJECT_TOKEN
```

### 6.3 접근성 테스트

```tsx
// axe-core 기반 접근성 자동 검증 (Storybook addon으로도 활용)
import { axe, toHaveNoViolations } from 'jest-axe';

expect.extend(toHaveNoViolations);

it('접근성 위반이 없다', async () => {
  const { container } = render(<Button>접근성 테스트</Button>);
  const results = await axe(container);
  expect(results).toHaveNoViolations();
});
```

---

## 7. 새 컴포넌트 추가 절차

### 7.1 파일 구조 생성

```
packages/ui/src/components/<component-name>/
├── <component-name>.tsx           # 컴포넌트 구현
├── <component-name>.test.tsx      # 단위 테스트
├── <component-name>.stories.tsx   # Storybook 스토리
└── index.ts                       # 로컬 배럴 export
```

### 7.2 네이밍 규칙

| 항목 | 규칙 | 예시 |
|------|------|------|
| 디렉토리명 | kebab-case | `dropdown-menu/` |
| 파일명 | kebab-case | `dropdown-menu.tsx` |
| 컴포넌트명 | PascalCase | `DropdownMenu` |
| Props 타입명 | PascalCase + Props | `DropdownMenuProps` |
| Variants 함수명 | camelCase + Variants | `dropdownMenuVariants` |
| 스토리 타이틀 | `Components/PascalCase` | `Components/DropdownMenu` |

### 7.3 Export 등록

```typescript
// 1. 로컬 배럴 (packages/ui/src/components/button/index.ts)
export { Button } from './button';
export type { ButtonProps } from './button';

// 2. 패키지 메인 배럴 (packages/ui/src/index.ts)
export { Button, type ButtonProps } from './components/button';
```

### 7.4 체크리스트

새 컴포넌트를 추가할 때 반드시 확인해야 할 항목:

- [ ] Radix UI Primitive를 래핑하여 구현했는가 (해당 시)
- [ ] CVA를 사용한 variant 정의가 있는가
- [ ] `cn()` 유틸리티로 className을 처리하는가
- [ ] `React.forwardRef`로 ref를 전달하는가
- [ ] Props 타입이 명시적으로 export 되었는가
- [ ] 모든 접근성 속성(role, aria-*)이 설정되었는가
- [ ] 키보드 내비게이션이 완전히 동작하는가
- [ ] Storybook 스토리가 모든 variant/상태를 커버하는가
- [ ] 단위 테스트가 핵심 동작을 검증하는가
- [ ] 패키지 메인 배럴(`index.ts`)에 export를 추가했는가

---

## 8. IDE 설정 (권장)

### 8.1 VSCode 추천 설정

```json
// .vscode/settings.json
{
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": "explicit"
  },
  "typescript.preferences.importModuleSpecifier": "relative",
  "tailwindCSS.experimental.classRegex": [
    ["cva\\(([^)]*)\\)", "[\"'`]([^\"'`]*).*?[\"'`]"],
    ["cn\\(([^)]*)\\)", "[\"'`]([^\"'`]*).*?[\"'`]"]
  ]
}
```

### 8.2 추천 확장 프로그램

| 확장 | 용도 |
|------|------|
| Tailwind CSS IntelliSense | Tailwind 클래스 자동완성 |
| ESLint | 실시간 린트 오류 표시 |
| Prettier | 코드 포매팅 |
| Error Lens | 인라인 오류 표시 |

---

## 관련 문서

- [PRD.md](./PRD.md) — 제품 요구사항 정의서
- [ARCHITECTURE.md](./ARCHITECTURE.md) — 시스템 아키텍처
- [DESIGN.md](./DESIGN.md) — 설계 및 스타일링 시스템
- [GIT_WORKFLOW.md](./GIT_WORKFLOW.md) — 브랜치 전략 및 협업 규칙
- [DEPLOYMENT.md](./DEPLOYMENT.md) — CI/CD 배포 파이프라인
- [CLAUDE.md](../CLAUDE.md) — AI 코딩 컨벤션
