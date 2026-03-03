# nexus-ui

<div align="center">

Radix UI, Tailwind CSS, TypeScript 기반의 엔터프라이즈급 React 디자인 시스템

[![CI](https://github.com/9min/nexus-ui/actions/workflows/ci.yml/badge.svg)](https://github.com/9min/nexus-ui/actions/workflows/ci.yml)
[![Release](https://github.com/9min/nexus-ui/actions/workflows/release.yml/badge.svg)](https://github.com/9min/nexus-ui/actions/workflows/release.yml)
[![npm](https://img.shields.io/npm/v/@nexus-ui-kit/ui.svg?label=%40nexus-ui-kit%2Fui)](https://www.npmjs.com/package/@nexus-ui-kit/ui)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://github.com/9min/nexus-ui/pulls)

</div>

---

## 주요 특징

- [Radix UI](https://www.radix-ui.com/) 프리미티브 기반 **접근성 준수 컴포넌트 36개**
- 공통 UI 패턴을 위한 **유틸리티 훅 3개**
- CSS Variables 기반 **디자인 토큰 시스템** (라이트/다크 테마 지원)
- **CVA 기반 Variant 관리**로 타입 안전한 스타일링
- **Tree-shakeable** ESM 및 CJS 빌드
- **Storybook 문서화** 완비 — Foundations 토큰 문서 5페이지 + Examples 조합 페이지 10개 포함
- Vitest + React Testing Library **225개 테스트**
- **WAI-ARIA 1.2 준수** (키보드 내비게이션, 포커스 관리)

## 패키지

| 패키지                                  | 설명                                   | 버전                                                                                                        |
| --------------------------------------- | -------------------------------------- | ----------------------------------------------------------------------------------------------------------- |
| [`@nexus-ui-kit/ui`](./packages/ui)         | React 컴포넌트 라이브러리              | [![npm](https://img.shields.io/npm/v/@nexus-ui-kit/ui.svg)](https://www.npmjs.com/package/@nexus-ui-kit/ui)         |
| [`@nexus-ui-kit/hooks`](./packages/hooks)   | 유틸리티 React 훅                      | [![npm](https://img.shields.io/npm/v/@nexus-ui-kit/hooks.svg)](https://www.npmjs.com/package/@nexus-ui-kit/hooks)   |
| [`@nexus-ui-kit/tokens`](./packages/tokens) | 디자인 토큰 (색상, 타이포그래피, 간격) | [![npm](https://img.shields.io/npm/v/@nexus-ui-kit/tokens.svg)](https://www.npmjs.com/package/@nexus-ui-kit/tokens) |

## 컴포넌트

### 폼

| 컴포넌트                                               | 설명                                                |
| ------------------------------------------------------ | --------------------------------------------------- |
| [Button](./packages/ui/src/components/button)          | 로딩 상태, 아이콘, `asChild` 지원 다중 Variant 버튼 |
| [Input](./packages/ui/src/components/input)            | 일관된 스타일의 텍스트 입력                         |
| [Textarea](./packages/ui/src/components/textarea)      | 여러 줄 텍스트 입력                                 |
| [Label](./packages/ui/src/components/label)            | 접근성 준수 폼 레이블                               |
| [Checkbox](./packages/ui/src/components/checkbox)      | 불확정 상태 지원 체크박스                           |
| [Switch](./packages/ui/src/components/switch)          | 토글 스위치                                         |
| [RadioGroup](./packages/ui/src/components/radio-group) | 라디오 버튼 그룹                                    |
| [Select](./packages/ui/src/components/select)          | 접근성 준수 셀렉트 드롭다운                         |

### 오버레이

| 컴포넌트                                                   | 설명                                      |
| ---------------------------------------------------------- | ----------------------------------------- |
| [Dialog](./packages/ui/src/components/dialog)              | 포커스 트랩과 포털을 갖춘 모달 다이얼로그 |
| [AlertDialog](./packages/ui/src/components/alert-dialog)   | 취소/확인 액션이 있는 확인 다이얼로그     |
| [Popover](./packages/ui/src/components/popover)            | 플로팅 팝오버 패널                        |
| [Tooltip](./packages/ui/src/components/tooltip)            | 호버/포커스 시 정보 표시 툴팁             |
| [DropdownMenu](./packages/ui/src/components/dropdown-menu) | 서브메뉴 지원 접근성 준수 드롭다운 메뉴 |
| [Toast](./packages/ui/src/components/toast)                | Variant 및 자동 닫기 지원 알림 토스트   |
| [HoverCard](./packages/ui/src/components/hover-card)       | 호버 시 추가 정보 표시 카드             |
| [Sheet](./packages/ui/src/components/sheet)                | 슬라이드 인/아웃 사이드 패널            |
| [ContextMenu](./packages/ui/src/components/context-menu)   | 우클릭 컨텍스트 메뉴                    |

### 표시

| 컴포넌트                                            | 설명                                |
| --------------------------------------------------- | ----------------------------------- |
| [Badge](./packages/ui/src/components/badge)       | Variant 지원 상태 뱃지              |
| [Avatar](./packages/ui/src/components/avatar)     | 이미지 및 폴백을 갖춘 사용자 아바타 |
| [Progress](./packages/ui/src/components/progress) | 진행률 표시 바                      |
| [Separator](./packages/ui/src/components/separator) | 시각적 구분선                     |
| [Card](./packages/ui/src/components/card)         | 헤더, 콘텐츠, 푸터를 갖춘 카드 컨테이너 |
| [Alert](./packages/ui/src/components/alert)       | Variant 지원 알림 메시지            |
| [Skeleton](./packages/ui/src/components/skeleton) | 로딩 상태 플레이스홀더              |
| [Table](./packages/ui/src/components/table)       | 접근성 준수 데이터 테이블           |

### 내비게이션

| 컴포넌트                                            | 설명                     |
| --------------------------------------------------- | ------------------------ |
| [Tabs](./packages/ui/src/components/tabs)                       | 탭 인터페이스                      |
| [Accordion](./packages/ui/src/components/accordion)             | 접을 수 있는 콘텐츠 섹션           |
| [Breadcrumb](./packages/ui/src/components/breadcrumb)           | 페이지 경로 탐색 표시              |
| [NavigationMenu](./packages/ui/src/components/navigation-menu) | 사이트 내비게이션 메뉴             |
| [Menubar](./packages/ui/src/components/menubar)                 | 데스크톱 스타일 메뉴바             |
| [Toolbar](./packages/ui/src/components/toolbar)                 | 액션 버튼 모음 툴바               |

### 레이아웃

| 컴포넌트                                                    | 설명                      |
| ----------------------------------------------------------- | ------------------------- |
| [ScrollArea](./packages/ui/src/components/scroll-area)      | 커스텀 스타일 스크롤 영역          |
| [Slider](./packages/ui/src/components/slider)               | 범위 슬라이더 입력                 |
| [Toggle / ToggleGroup](./packages/ui/src/components/toggle) | 토글 버튼 및 토글 그룹             |
| [AspectRatio](./packages/ui/src/components/aspect-ratio)    | 고정 비율 콘텐츠 컨테이너          |
| [Collapsible](./packages/ui/src/components/collapsible)     | 접기/펼치기 가능한 콘텐츠 영역     |

## 훅

| 훅                | 설명                          |
| ----------------- | ----------------------------- |
| `useMediaQuery`   | CSS 미디어 쿼리 변화 구독     |
| `useDebounce`     | 빠르게 변화하는 값의 디바운스 |
| `useClickOutside` | 대상 요소 외부 클릭 감지      |

## 빠른 시작

### 설치

```bash
# pnpm
pnpm add @nexus-ui-kit/ui @nexus-ui-kit/tokens

# npm
npm install @nexus-ui-kit/ui @nexus-ui-kit/tokens

# yarn
yarn add @nexus-ui-kit/ui @nexus-ui-kit/tokens
```

### Tailwind CSS 설정

`tailwind.config.js`에 nexus-ui 콘텐츠 경로를 추가합니다:

```js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{ts,tsx}', './node_modules/@nexus-ui-kit/ui/dist/**/*.{js,mjs}'],
  // ...
};
```

### 토큰 CSS 임포트

```tsx
// 앱 진입점 (예: main.tsx 또는 layout.tsx)
import '@nexus-ui-kit/tokens/styles.css';
```

### 사용 예시

```tsx
import { Button } from '@nexus-ui-kit/ui';

function App() {
  return (
    <Button variant="solid" size="md" intent="primary">
      시작하기
    </Button>
  );
}
```

## 개발 환경

### 사전 요구사항

| 도구    | 버전   |
| ------- | ------ |
| Node.js | >= 20  |
| pnpm    | >= 9.0 |

### 설정

```bash
git clone https://github.com/9min/nexus-ui.git
cd nexus-ui
pnpm install
```

### 명령어

| 명령어           | 설명                                                |
| ---------------- | --------------------------------------------------- |
| `pnpm dev`       | 전체 개발 서버 실행 (Storybook + 패키지 watch 모드) |
| `pnpm build`     | 전체 패키지 빌드                                    |
| `pnpm test`      | 전체 테스트 실행                                    |
| `pnpm lint`      | 전체 패키지 린트                                    |
| `pnpm typecheck` | 전체 패키지 타입 검사                               |
| `pnpm format`    | Prettier로 코드 포맷팅                              |
| `pnpm clean`     | 전체 빌드 결과물 삭제                               |
| `pnpm changeset` | 버저닝을 위한 changeset 생성                        |

## 프로젝트 구조

```text
nexus-ui/
├── apps/
│   └── docs/                 # Storybook 문서 사이트 (Foundations, Examples 포함)
├── packages/
│   ├── ui/                   # @nexus-ui-kit/ui — 컴포넌트 라이브러리
│   │   └── src/components/   # 36개 컴포넌트
│   ├── hooks/                # @nexus-ui-kit/hooks — 유틸리티 훅
│   ├── tokens/               # @nexus-ui-kit/tokens — 디자인 토큰 + CSS
│   ├── tsconfig/             # 공유 TypeScript 설정
│   └── eslint-config/        # 공유 ESLint 설정
├── .github/workflows/        # CI, 릴리스, 문서 배포 파이프라인
├── docs/                     # 아키텍처, 설계, 워크플로우 문서
├── turbo.json                # Turborepo 파이프라인 설정
└── pnpm-workspace.yaml       # pnpm 워크스페이스 정의
```

## 디자인 토큰

nexus-ui는 테마 시스템에 **CSS Custom Properties**(변수)를 사용합니다. 토큰은 색상, 타이포그래피, 간격, 테두리 둥글기를 포함합니다.

테마는 루트 요소의 CSS 클래스를 통해 전환됩니다:

```html
<!-- 라이트 테마 (기본값) -->
<html class="light">
  ...
</html>

<!-- 다크 테마 -->
<html class="dark">
  ...
</html>
```

모든 컴포넌트 스타일은 토큰 변수(예: `bg-primary`, `text-foreground`, `border-border`)를 참조하여 앱 전체에서 일관된 테마를 보장합니다. 전체 토큰 참조는 [docs/DESIGN.md](./docs/DESIGN.md)를 확인하세요.

## 기여 방법

1. `main`에서 적절한 접두사를 사용하여 브랜치를 생성합니다:
   - `feature/` — 새로운 기능
   - `fix/` — 버그 수정
   - `docs/` — 문서
   - `chore/` — 도구, 의존성
   - `refactor/` — 코드 개선
   - `test/` — 테스트 추가

2. [Conventional Commits](https://www.conventionalcommits.org/) 형식을 사용합니다:

   ```text
   feat(ui): add Tooltip component
   fix(hooks): resolve useDebounce cleanup on unmount
   ```

3. 배포 패키지에 영향을 주는 변경이라면 [changeset](https://github.com/changesets/changesets)을 추가합니다:

   ```bash
   pnpm changeset
   ```

4. `main`을 대상으로 PR을 생성합니다. 모든 CI 검사(lint, typecheck, test, build)를 통과해야 합니다.

전체 워크플로우 및 브랜치 규칙은 [docs/GIT_WORKFLOW.md](./docs/GIT_WORKFLOW.md)를 참조하세요.

## 기술 스택

| 기술                                                   | 용도                                |
| ------------------------------------------------------ | ----------------------------------- |
| [React 18](https://react.dev/)                         | UI 프레임워크                       |
| [TypeScript](https://www.typescriptlang.org/)          | 타입 안전성                         |
| [Tailwind CSS](https://tailwindcss.com/)               | 유틸리티 우선 스타일링              |
| [Radix UI](https://www.radix-ui.com/)                  | 접근성 준수 헤드리스 프리미티브     |
| [Turborepo](https://turbo.build/)                      | 모노레포 빌드 오케스트레이션        |
| [tsup](https://tsup.egoist.dev/)                       | TypeScript 번들러 (ESM + CJS + DTS) |
| [Vitest](https://vitest.dev/)                          | 단위 테스트                         |
| [Storybook 8](https://storybook.js.org/)               | 컴포넌트 문서화                     |
| [Changesets](https://github.com/changesets/changesets) | 버저닝 및 변경 이력                 |

## 브라우저 지원

| 브라우저 | 최소 버전 |
| -------- | --------- |
| Chrome   | 90+       |
| Safari   | 15+       |
| Firefox  | 90+       |
| Edge     | 90+       |

## 감사의 말

이 프로젝트는 [shadcn/ui](https://ui.shadcn.com/)의 컴포넌트 설계 패턴과 스타일링 접근 방식에서 영감을 받았습니다. shadcn/ui는 MIT 라이선스로 배포됩니다.

## 라이선스

[MIT](./LICENSE)
