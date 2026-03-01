# ARCHITECTURE.md — 시스템 아키텍처

> **nexus-ui** 모노레포의 전체 구조, 빌드 파이프라인, 의존성 그래프를 정의합니다.

---

## 1. 모노레포 디렉토리 구조

```
nexus-ui/
├── apps/
│   ├── docs/                    # Storybook 문서 사이트
│   │   ├── .storybook/
│   │   │   ├── main.ts          # Storybook 설정
│   │   │   └── preview.ts       # 글로벌 데코레이터, 파라미터
│   │   ├── stories/             # 추가 문서 페이지 (MDX)
│   │   └── package.json
│   └── web/                     # 테스트용 Playground 앱 (Next.js)
│       ├── app/
│       ├── components/
│       └── package.json
│
├── packages/
│   ├── ui/                      # @nexus-ui/ui — 핵심 UI 컴포넌트
│   │   ├── src/
│   │   │   ├── components/
│   │   │   │   ├── button/
│   │   │   │   │   ├── button.tsx
│   │   │   │   │   ├── button.test.tsx
│   │   │   │   │   ├── button.stories.tsx
│   │   │   │   │   └── index.ts
│   │   │   │   ├── dialog/
│   │   │   │   ├── select/
│   │   │   │   ├── dropdown-menu/
│   │   │   │   └── toast/
│   │   │   ├── lib/
│   │   │   │   └── utils.ts     # cn() 유틸리티
│   │   │   └── index.ts         # 퍼블릭 API (배럴 export)
│   │   ├── tsup.config.ts
│   │   └── package.json
│   │
│   ├── hooks/                   # @nexus-ui/hooks — 공통 React 훅
│   │   ├── src/
│   │   │   ├── use-media-query.ts
│   │   │   ├── use-debounce.ts
│   │   │   ├── use-click-outside.ts
│   │   │   └── index.ts
│   │   ├── tsup.config.ts
│   │   └── package.json
│   │
│   ├── tokens/                  # @nexus-ui/tokens — 디자인 토큰
│   │   ├── src/
│   │   │   ├── colors.ts
│   │   │   ├── typography.ts
│   │   │   ├── spacing.ts
│   │   │   ├── css/
│   │   │   │   ├── light.css    # Light 테마 CSS Variables
│   │   │   │   └── dark.css     # Dark 테마 CSS Variables
│   │   │   └── index.ts
│   │   ├── tsup.config.ts
│   │   └── package.json
│   │
│   ├── tsconfig/                # 공유 TypeScript 설정
│   │   ├── base.json
│   │   ├── react-library.json
│   │   └── nextjs.json
│   │
│   └── eslint-config/           # 공유 ESLint 설정
│       ├── library.js
│       ├── react.js
│       └── package.json
│
├── .changeset/                  # Changesets 설정
│   └── config.json
├── .github/
│   └── workflows/               # GitHub Actions CI/CD
│       ├── ci.yml
│       ├── release.yml
│       └── docs.yml
├── turbo.json                   # Turborepo 파이프라인 설정
├── pnpm-workspace.yaml          # pnpm 워크스페이스 정의
├── package.json                 # 루트 패키지 (워크스페이스 스크립트)
├── CLAUDE.md                    # AI 코딩 컨벤션
└── docs/                        # 프로젝트 문서
    ├── PRD.md
    ├── ARCHITECTURE.md
    ├── DESIGN.md
    ├── DEVELOPMENT.md
    ├── GIT_WORKFLOW.md
    └── DEPLOYMENT.md
```

---

## 2. 패키지 역할 정의

### 2.1 `apps/docs` — Storybook 문서 사이트

- **역할**: 모든 컴포넌트의 시각적 문서화 및 인터랙티브 데모
- **기술**: Storybook 8 + React 18
- **배포**: Vercel (자동 배포)
- **특징**: 컴포넌트 스토리는 `packages/ui/src/components/*/` 내에 co-located, Storybook은 이를 참조

### 2.2 `apps/web` — Playground 앱

- **역할**: 실제 애플리케이션 환경에서 컴포넌트 통합 테스트
- **기술**: Next.js + React 18
- **특징**: `@nexus-ui/ui`를 `dependencies`로 참조, 실제 사용 시나리오 검증

### 2.3 `packages/ui` — 핵심 UI 컴포넌트

- **역할**: Button, Dialog, Select 등 모든 공개 UI 컴포넌트
- **의존성**: `@nexus-ui/tokens` (디자인 토큰), `@radix-ui/*` (Headless 프리미티브)
- **빌드**: tsup으로 ESM + CJS 빌드

### 2.4 `packages/hooks` — 공통 React 훅

- **역할**: 재사용 가능한 React 커스텀 훅
- **의존성**: React만 peerDependency
- **빌드**: tsup으로 ESM + CJS 빌드

### 2.5 `packages/tokens` — 디자인 토큰

- **역할**: 색상, 타이포그래피, 스페이싱 등 디자인 토큰 정의 및 CSS Variables 생성
- **의존성**: 없음 (최하위 레이어)
- **빌드**: tsup으로 JS 토큰 빌드 + CSS 파일 복사

### 2.6 `packages/tsconfig` — 공유 TypeScript 설정

- **역할**: 프로젝트 전체에서 사용하는 공통 `tsconfig` 프리셋
- **빌드**: 없음 (설정 파일만 참조)

### 2.7 `packages/eslint-config` — 공유 ESLint 설정

- **역할**: 코드 품질과 일관성을 위한 공통 린트 규칙
- **빌드**: 없음 (설정 파일만 참조)

---

## 3. 의존성 그래프

```
┌─────────────────────────────────────────────────────┐
│                    apps/ (소비자)                      │
│  ┌──────────────┐         ┌──────────────────┐       │
│  │  apps/docs   │         │    apps/web      │       │
│  │  (Storybook) │         │  (Playground)    │       │
│  └──────┬───────┘         └────────┬─────────┘       │
│         │                          │                  │
│         └──────────┬───────────────┘                  │
│                    │ depends on                       │
├────────────────────┼─────────────────────────────────┤
│                    ▼                                  │
│              packages/ (라이브러리)                     │
│                                                       │
│  ┌──────────────────┐    ┌──────────────────┐        │
│  │  @nexus-ui/ui    │───▶│ @nexus-ui/tokens │        │
│  │  (컴포넌트)       │    │  (디자인 토큰)    │        │
│  └──────────────────┘    └──────────────────┘        │
│         ▲                                             │
│         │ optional                                    │
│  ┌──────┴───────────┐                                │
│  │ @nexus-ui/hooks  │                                │
│  │  (React 훅)       │                                │
│  └──────────────────┘                                │
└─────────────────────────────────────────────────────┘
```

### 의존성 규칙

| 패키지 | dependencies | peerDependencies |
|--------|-------------|------------------|
| `@nexus-ui/tokens` | 없음 | 없음 |
| `@nexus-ui/hooks` | 없음 | `react`, `react-dom` |
| `@nexus-ui/ui` | `@nexus-ui/tokens`, `@radix-ui/*`, `class-variance-authority`, `clsx`, `tailwind-merge` | `react`, `react-dom` |

> **핵심 원칙**: `react`, `react-dom`은 반드시 `peerDependencies`로 선언하여 호스트 앱과 버전 충돌을 방지합니다.

---

## 4. 빌드 파이프라인

### 4.1 tsup 설정 (`packages/ui/tsup.config.ts` 예시)

```typescript
import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['esm', 'cjs'],
  dts: true,
  splitting: true,
  treeshake: true,
  clean: true,
  external: ['react', 'react-dom'],
  outDir: 'dist',
});
```

### 4.2 빌드 출력 구조

```
packages/ui/dist/
├── index.mjs          # ESM 번들
├── index.js           # CJS 번들
├── index.d.ts         # TypeScript 타입 정의
├── index.d.mts        # ESM 타입 정의
└── components/        # splitting 활성화 시 컴포넌트별 청크
    ├── button/
    ├── dialog/
    └── ...
```

### 4.3 `package.json` exports 필드

```json
{
  "name": "@nexus-ui/ui",
  "version": "0.0.0",
  "main": "./dist/index.js",
  "module": "./dist/index.mjs",
  "types": "./dist/index.d.ts",
  "sideEffects": false,
  "exports": {
    ".": {
      "import": {
        "types": "./dist/index.d.mts",
        "default": "./dist/index.mjs"
      },
      "require": {
        "types": "./dist/index.d.ts",
        "default": "./dist/index.js"
      }
    },
    "./styles.css": "./dist/styles.css"
  },
  "files": ["dist"],
  "peerDependencies": {
    "react": "^18.0.0",
    "react-dom": "^18.0.0"
  }
}
```

> **`types` 조건을 최상위에 배치**하여 TypeScript가 항상 올바른 타입 파일을 찾도록 합니다.

### 4.4 Tree-shaking 보장 전략

1. **ESM 빌드**: `format: ['esm']`으로 정적 import/export 보장
2. **sideEffects: false**: 번들러에게 사이드 이펙트 없음을 선언
3. **splitting: true**: 컴포넌트별 코드 분할로 불필요한 코드 제거 극대화
4. **external 처리**: React, React DOM 등 peerDependency를 번들에서 제외

---

## 5. Turborepo 파이프라인

### 5.1 `turbo.json`

```json
{
  "$schema": "https://turbo.build/schema.json",
  "tasks": {
    "build": {
      "dependsOn": ["^build"],
      "outputs": ["dist/**"]
    },
    "dev": {
      "cache": false,
      "persistent": true
    },
    "lint": {
      "dependsOn": ["^build"]
    },
    "typecheck": {
      "dependsOn": ["^build"]
    },
    "test": {
      "dependsOn": ["^build"]
    },
    "clean": {
      "cache": false
    }
  }
}
```

### 5.2 캐싱 전략

- **로컬 캐시**: `.turbo/` 디렉토리에 태스크 결과 캐싱
- **`dependsOn: ["^build"]`**: 의존 패키지의 빌드가 완료된 후에만 현재 패키지 태스크 실행
- **`outputs: ["dist/**"]`**: 빌드 결과물만 캐시 대상으로 지정
- **Remote Cache** (선택): Vercel Remote Cache 연동으로 CI/CD에서도 캐시 활용 가능

### 5.3 태스크 실행 순서

```
tokens (build) → ui (build) → hooks (build)
                                    ↓
                        docs (build) / web (build)
```

- `tokens`가 가장 먼저 빌드 (최하위 의존성)
- `ui`가 `tokens` 빌드 완료 후 빌드
- `hooks`는 독립적으로 빌드 가능
- `docs`, `web`은 모든 packages 빌드 완료 후 빌드

---

## 6. pnpm Workspace 설정

### 6.1 `pnpm-workspace.yaml`

```yaml
packages:
  - 'apps/*'
  - 'packages/*'
```

### 6.2 워크스페이스 내부 참조

```json
// apps/docs/package.json
{
  "dependencies": {
    "@nexus-ui/ui": "workspace:*"
  }
}
```

- `workspace:*` 프로토콜로 로컬 패키지를 심링크로 참조
- NPM 배포 시 `workspace:*`는 실제 버전 번호로 자동 치환

---

## 7. React 19 마이그레이션 고려

### 7.1 현재 설계 (React 18 기반)

- `React.forwardRef`를 사용하여 모든 컴포넌트에 ref 전달
- `peerDependencies`에 `"react": "^18.0.0"` 명시

### 7.2 React 19 대비 전략

| 항목 | React 18 (현재) | React 19 (마이그레이션) |
|------|-----------------|------------------------|
| Ref 전달 | `forwardRef()` 래핑 | props로 직접 `ref` 전달 |
| `peerDependencies` | `^18.0.0` | `^18.0.0 \|\| ^19.0.0` |
| Context | `useContext` | `use()` API |
| 비동기 | `useEffect` + state | `use()` + Suspense |

### 7.3 마이그레이션 최소화 설계 원칙

1. **`forwardRef` 사용은 유지하되 최소화**: 꼭 필요한 경우에만 사용하고, 내부적으로 래핑 레이어를 얇게 유지
2. **Radix UI 의존**: Radix UI가 React 19를 공식 지원하면 자연스럽게 호환
3. **점진적 업그레이드**: peerDependencies 범위를 `^18.0.0 || ^19.0.0`으로 확장하여 양쪽 모두 지원

---

## 관련 문서

- [PRD.md](./PRD.md) — 제품 요구사항 정의서
- [DESIGN.md](./DESIGN.md) — 설계 및 스타일링 시스템
- [DEVELOPMENT.md](./DEVELOPMENT.md) — 개발 환경 가이드
- [GIT_WORKFLOW.md](./GIT_WORKFLOW.md) — 브랜치 전략 및 협업 규칙
- [DEPLOYMENT.md](./DEPLOYMENT.md) — CI/CD 배포 파이프라인
- [CLAUDE.md](../CLAUDE.md) — AI 코딩 컨벤션
