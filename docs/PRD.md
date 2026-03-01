# PRD (Product Requirements Document)

> **nexus-ui** — 엔터프라이즈급 디자인 시스템 모노레포

| 항목 | 내용 |
|------|------|
| 문서 버전 | 1.0.0 |
| 최종 수정일 | 2026-03-02 |
| 상태 | Draft |

---

## 1. 프로젝트 비전 및 목표

### 1.1 비전

사내 모든 프론트엔드 애플리케이션(B2B 어드민, B2C 웹 등)에서 **일관된 사용자 경험**을 제공하면서 **개발 생산성을 극대화**하는 공통 UI 컴포넌트 라이브러리를 구축합니다.

### 1.2 핵심 목표

1. **통일된 디자인 언어** — 모든 프로덕트에서 동일한 디자인 토큰과 컴포넌트를 사용하여 브랜드 일관성 확보
2. **개발 생산성 극대화** — 반복적인 UI 구현을 제거하고, 검증된 컴포넌트를 재사용
3. **접근성(a11y) 보장** — WAI-ARIA 1.2 표준을 준수하는 컴포넌트로 모든 사용자에게 동등한 경험 제공
4. **자동화된 배포 파이프라인** — Changesets + GitHub Actions를 통한 시맨틱 버저닝 및 NPM 자동 배포
5. **프론트엔드 인프라 역량 증명** — 코어 인프라 설계 및 운영 역량을 팀 내에서 입증

### 1.3 성공 지표

| 지표 | 목표 |
|------|------|
| 컴포넌트 채택률 | 사내 신규 프로젝트 100%에서 nexus-ui 사용 |
| 번들 사이즈 | Button 컴포넌트 단독 import 시 < 5KB (gzip) |
| 접근성 | axe-core 검사 위반 0건 |
| 빌드 시간 | 전체 패키지 빌드 < 30초 (캐시 미사용 기준) |
| Storybook 문서화율 | 모든 공개 컴포넌트 100% 문서화 |

---

## 2. 대상 사용자

### 2.1 주요 사용자 (Primary)

**사내 프론트엔드 개발자**
- nexus-ui 패키지를 설치하여 컴포넌트를 가져다 쓰는 개발자
- TypeScript 자동완성, Props 타입 힌트에 높은 기대치
- Tree-shaking을 통해 사용하지 않는 코드가 번들에 포함되지 않기를 원함

### 2.2 보조 사용자 (Secondary)

**프로덕트 디자이너**
- Storybook을 통해 컴포넌트의 동작과 상태를 확인
- 디자인 토큰이 코드에 올바르게 반영되었는지 검증
- 컴포넌트 variant별 시각적 상태를 인터랙티브하게 탐색

---

## 3. 패키지 구성

| 패키지 | 스코프명 | 역할 |
|--------|----------|------|
| `packages/ui` | `@nexus-ui/ui` | 핵심 UI 컴포넌트 (Button, Dialog, Select 등) |
| `packages/hooks` | `@nexus-ui/hooks` | 공통 React 훅 (useMediaQuery, useDebounce 등) |
| `packages/tokens` | `@nexus-ui/tokens` | 디자인 토큰 (색상, 타이포그래피, 스페이싱 등) |

- **NPM 배포**: 공개 NPM 레지스트리, `@nexus-ui` 스코프
- **의존성 방향**: `@nexus-ui/tokens` → `@nexus-ui/ui` ← `@nexus-ui/hooks`

---

## 4. 핵심 컴포넌트 명세

### 4.1 Button

재사용 가능한 버튼 컴포넌트로, 다양한 시각적 변형과 상태를 지원합니다.

#### Props

| Prop | 타입 | 기본값 | 설명 |
|------|------|--------|------|
| `variant` | `'solid' \| 'outline' \| 'ghost' \| 'link'` | `'solid'` | 시각적 스타일 변형 |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | 버튼 크기 |
| `intent` | `'primary' \| 'secondary' \| 'destructive'` | `'primary'` | 의미론적 색상 |
| `disabled` | `boolean` | `false` | 비활성화 상태 |
| `loading` | `boolean` | `false` | 로딩 상태 (스피너 표시, 클릭 비활성화) |
| `leftIcon` | `ReactNode` | — | 텍스트 왼쪽 아이콘 |
| `rightIcon` | `ReactNode` | — | 텍스트 오른쪽 아이콘 |
| `asChild` | `boolean` | `false` | Radix Slot 패턴으로 자식 요소에 props 위임 |

#### 상태(State)

| 상태 | 설명 |
|------|------|
| Default | 기본 상태 |
| Hover | 마우스 오버 시 시각적 피드백 |
| Active | 클릭/탭 중 시각적 피드백 |
| Focus | 키보드 포커스 시 focus ring 표시 |
| Disabled | 상호작용 불가, 시각적으로 흐리게 표시 |
| Loading | 스피너 표시, 텍스트 유지, 클릭 불가 |

#### 접근성

- `<button>` 네이티브 요소 사용
- `disabled` 시 `aria-disabled="true"` 설정
- `loading` 시 `aria-busy="true"` 설정, 스피너에 `aria-label="로딩 중"` 추가
- 아이콘만 있는 버튼은 반드시 `aria-label` 필수

---

### 4.2 Dialog (Modal)

사용자의 주의를 집중시키는 모달 대화 상자입니다.

#### Props

| Prop | 타입 | 기본값 | 설명 |
|------|------|--------|------|
| `open` | `boolean` | — | 제어 모드: 열림/닫힘 상태 |
| `defaultOpen` | `boolean` | `false` | 비제어 모드: 초기 열림 상태 |
| `onOpenChange` | `(open: boolean) => void` | — | 상태 변경 콜백 |
| `modal` | `boolean` | `true` | true: 배경 인터랙션 차단, false: 비모달 |

#### 하위 컴포넌트

| 컴포넌트 | 역할 |
|----------|------|
| `Dialog.Trigger` | 다이얼로그를 여는 트리거 요소 |
| `Dialog.Portal` | React Portal을 통해 DOM 최상위에 렌더링 |
| `Dialog.Overlay` | 배경 오버레이 (클릭 시 닫기 옵션) |
| `Dialog.Content` | 다이얼로그 본문 컨텐츠 |
| `Dialog.Header` | 헤더 영역 (타이틀, 설명) |
| `Dialog.Footer` | 푸터 영역 (액션 버튼) |
| `Dialog.Title` | 다이얼로그 제목 (필수) |
| `Dialog.Description` | 다이얼로그 설명 |
| `Dialog.Close` | 닫기 버튼 |

#### 동작 명세

- **열기/닫기**: Trigger 클릭 또는 `open` prop 변경
- **ESC 키**: 다이얼로그 닫기 (비활성화 옵션 제공)
- **Overlay 클릭**: 다이얼로그 닫기 (비활성화 옵션 제공)
- **포커스 트랩**: 열린 상태에서 Tab 키로 다이얼로그 내부에서만 순환
- **포커스 복원**: 닫힌 후 트리거 요소로 포커스 자동 복원
- **애니메이션**: 열기/닫기 시 fade + scale 트랜지션

#### 접근성

- `role="dialog"` 및 `aria-modal="true"` 설정
- `Dialog.Title`을 `aria-labelledby`로 연결
- `Dialog.Description`을 `aria-describedby`로 연결
- 완전한 포커스 트랩 (Tab / Shift+Tab 순환)
- ESC 키로 닫기

---

### 4.3 Select

드롭다운 형태의 선택 컴포넌트로, 단일 선택과 다중 선택을 모두 지원합니다.

#### Props

| Prop | 타입 | 기본값 | 설명 |
|------|------|--------|------|
| `value` | `string \| string[]` | — | 제어 모드: 선택된 값 |
| `defaultValue` | `string \| string[]` | — | 비제어 모드: 초기 선택 값 |
| `onValueChange` | `(value: string \| string[]) => void` | — | 값 변경 콜백 |
| `multiple` | `boolean` | `false` | 다중 선택 모드 활성화 |
| `filterable` | `boolean` | `false` | 검색 필터 입력 활성화 |
| `placeholder` | `string` | — | 미선택 시 표시 텍스트 |
| `disabled` | `boolean` | `false` | 비활성화 |

#### 하위 컴포넌트

| 컴포넌트 | 역할 |
|----------|------|
| `Select.Trigger` | 드롭다운을 여는 트리거 |
| `Select.Content` | 드롭다운 목록 컨테이너 |
| `Select.Item` | 개별 선택 항목 |
| `Select.Group` | 항목 그룹핑 |
| `Select.Label` | 그룹 레이블 |
| `Select.Separator` | 구분선 |

#### 동작 명세

- **키보드 내비게이션**: Arrow Up/Down으로 항목 이동, Enter/Space로 선택, ESC로 닫기
- **검색(Filterable)**: 입력 시 실시간 항목 필터링, 매칭 항목 없을 시 "결과 없음" 표시
- **다중 선택**: 체크박스 UI, 선택된 항목 수 Badge 표시
- **Portal 렌더링**: 부모 요소의 overflow 영향을 받지 않도록 Portal 사용

#### 접근성

- `role="listbox"` 설정
- 각 항목에 `role="option"`, `aria-selected` 상태 반영
- 다중 선택 시 `aria-multiselectable="true"`
- 키보드만으로 완전한 조작 가능 (Tab → Enter → Arrow → Enter → ESC)

---

### 4.4 Dropdown Menu

컨텍스트 메뉴 형태의 드롭다운 메뉴로, 계층적 메뉴 구조를 지원합니다.

#### Props

| Prop | 타입 | 기본값 | 설명 |
|------|------|--------|------|
| `open` | `boolean` | — | 제어 모드 |
| `defaultOpen` | `boolean` | `false` | 비제어 모드 |
| `onOpenChange` | `(open: boolean) => void` | — | 상태 변경 콜백 |

#### 하위 컴포넌트

| 컴포넌트 | 역할 |
|----------|------|
| `DropdownMenu.Trigger` | 메뉴를 여는 트리거 |
| `DropdownMenu.Content` | 메뉴 컨텐츠 컨테이너 |
| `DropdownMenu.Item` | 기본 메뉴 항목 |
| `DropdownMenu.CheckboxItem` | 체크박스 형태 항목 |
| `DropdownMenu.RadioGroup` | 라디오 그룹 |
| `DropdownMenu.RadioItem` | 라디오 형태 항목 |
| `DropdownMenu.Sub` | 서브 메뉴 컨테이너 |
| `DropdownMenu.SubTrigger` | 서브 메뉴 트리거 |
| `DropdownMenu.SubContent` | 서브 메뉴 컨텐츠 |
| `DropdownMenu.Separator` | 구분선 |
| `DropdownMenu.Label` | 비인터랙티브 레이블 |

#### 동작 명세

- **트리거**: 클릭으로 메뉴 열기/닫기
- **키보드 내비게이션**: Arrow Up/Down으로 항목 이동, Arrow Right로 서브메뉴 진입, Arrow Left로 상위 복귀
- **서브 메뉴**: 호버 또는 Arrow Right로 서브 메뉴 확장, 자연스러운 지연(delay) 적용
- **Portal 렌더링**: DOM 최상위에 렌더링하여 z-index 및 overflow 이슈 방지
- **외부 클릭**: 메뉴 외부 클릭 시 자동 닫기

#### 접근성

- `role="menu"` 설정
- 각 항목에 `role="menuitem"`, `role="menuitemcheckbox"`, `role="menuitemradio"` 적절히 할당
- `aria-expanded`로 서브메뉴 상태 표시
- 완전한 키보드 내비게이션 지원

---

### 4.5 Toast

사용자에게 일시적인 알림 메시지를 표시하는 컴포넌트입니다.

#### Props (Toast 개별)

| Prop | 타입 | 기본값 | 설명 |
|------|------|--------|------|
| `variant` | `'info' \| 'success' \| 'warning' \| 'error'` | `'info'` | 알림 유형 |
| `title` | `string` | — | 알림 제목 |
| `description` | `string` | — | 알림 상세 설명 |
| `duration` | `number` | `5000` | 자동 닫힘 시간 (ms), `Infinity`로 수동 닫기만 허용 |
| `action` | `ReactNode` | — | 액션 버튼 (예: "되돌리기") |

#### Props (ToastProvider)

| Prop | 타입 | 기본값 | 설명 |
|------|------|--------|------|
| `position` | `'top-left' \| 'top-center' \| 'top-right' \| 'bottom-left' \| 'bottom-center' \| 'bottom-right'` | `'bottom-right'` | 토스트 표시 위치 |
| `maxToasts` | `number` | `5` | 동시 표시 최대 개수 |
| `swipeDirection` | `'right' \| 'left' \| 'up' \| 'down'` | `'right'` | 스와이프로 닫기 방향 |

#### 동작 명세

- **큐 관리**: 최대 표시 개수 초과 시 FIFO(선입선출) 방식으로 큐잉
- **자동 닫힘**: `duration` 경과 후 자동 제거, 마우스 호버 시 타이머 일시정지
- **수동 닫기**: X 버튼 클릭 또는 스와이프 제스처
- **스택 애니메이션**: 새 토스트 추가 시 기존 토스트 밀려나는 애니메이션
- **Imperative API**: `toast.info()`, `toast.success()`, `toast.warning()`, `toast.error()` 함수형 호출

#### 접근성

- `role="status"` 및 `aria-live="polite"` 설정 (일반 알림)
- `error` variant의 경우 `aria-live="assertive"` 설정 (즉시 알림)
- 자동 닫힘 타이머를 일시정지할 수 있는 키보드/마우스 인터랙션
- 닫기 버튼에 명확한 `aria-label` 제공

---

## 5. 접근성(a11y) 요구사항

### 5.1 WAI-ARIA 1.2 표준 준수

모든 인터랙티브 컴포넌트는 [WAI-ARIA 1.2](https://www.w3.org/TR/wai-aria-1.2/) 표준에 맞는 역할(role), 상태(state), 속성(property)을 구현합니다.

### 5.2 키보드 내비게이션

| 키 | 동작 |
|----|------|
| `Tab` / `Shift+Tab` | 포커스 가능한 요소 간 이동 |
| `Enter` / `Space` | 포커스된 요소 활성화 (버튼 클릭, 항목 선택 등) |
| `Arrow Up` / `Arrow Down` | 목록/메뉴 내 항목 이동 |
| `Arrow Left` / `Arrow Right` | 탭, 서브메뉴 등 수평 이동 |
| `Escape` | 열린 팝업/모달/드롭다운 닫기 |
| `Home` / `End` | 목록의 처음/끝으로 이동 |

### 5.3 스크린 리더 대응

- 모든 인터랙티브 요소에 의미있는 `aria-label` 또는 연결된 레이블 제공
- 동적 컨텐츠 변경 시 `aria-live` 영역을 통한 알림
- 상태 변경(열기/닫기, 선택/해제 등) 시 적절한 `aria-expanded`, `aria-selected`, `aria-checked` 업데이트
- `aria-describedby`를 활용한 추가 설명 제공

### 5.4 포커스 관리

- **포커스 트랩**: 모달/다이얼로그 내에서 Tab 키로 포커스가 외부로 빠져나가지 않도록 순환
- **포커스 복원**: 팝업 닫힘 시 트리거 요소로 포커스 자동 복원
- **포커스 가시성**: 키보드 사용 시 명확한 focus ring 표시 (`:focus-visible`)
- **논리적 탭 순서**: DOM 순서와 시각적 순서가 일치하도록 설계

### 5.5 고대비 모드

- `forced-colors` 미디어 쿼리를 통한 Windows 고대비 모드 지원
- 아이콘, 구분선 등에 `currentColor` 활용하여 색상 반전 시에도 가시성 확보
- 색상만으로 정보를 전달하지 않음 (아이콘 + 텍스트 병행)

---

## 6. 브라우저 지원

| 브라우저 | 최소 버전 |
|----------|-----------|
| Chrome | 90+ |
| Safari | 15+ |
| Firefox | 90+ |
| Edge | 90+ |

- **IE 11**: 지원하지 않음
- **모바일**: iOS Safari 15+, Android Chrome 90+
- 모든 컴포넌트는 위 브라우저에서 시각적/기능적 동등성을 보장

---

## 7. 비기능 요구사항

### 7.1 번들 사이즈 최적화

- **Tree-shaking 지원**: ESM 빌드로 사용하지 않는 코드가 최종 번들에 포함되지 않도록 보장
- **Side-effect free**: `package.json`에 `"sideEffects": false` 선언
- **코드 분할**: 각 컴포넌트는 독립 entry point로 import 가능 (`@nexus-ui/ui/button`)

### 7.2 TypeScript 지원

- 모든 컴포넌트 Props에 대한 완전한 타입 정의 (`.d.ts`) 자동 생성
- 제네릭 타입 지원 (예: Select의 value 타입)
- IDE 자동완성 및 인라인 문서(JSDoc) 제공

### 7.3 성능

- 컴포넌트 렌더링 시 불필요한 리렌더링 최소화
- 필요한 경우 `React.memo`, `useMemo`, `useCallback` 적용
- 큰 목록(Select, DropdownMenu)에 대한 가상화(Virtualization) 옵션 고려

### 7.4 테스팅

- **단위 테스트**: Vitest + React Testing Library로 모든 컴포넌트의 동작 검증
- **시각적 회귀 테스트**: Chromatic을 통한 Visual Regression 테스트
- **접근성 테스트**: axe-core 기반 자동 접근성 검증

---

## 8. 향후 로드맵

### Phase 1 (현재)
- 핵심 컴포넌트 5종 구현 (Button, Dialog, Select, Dropdown Menu, Toast)
- 디자인 토큰 시스템 구축
- Storybook 문서화 및 자동 배포

### Phase 2
- 추가 컴포넌트 확장 (Table, Tabs, Tooltip, Popover, Accordion 등)
- Form 통합 (React Hook Form 연동 가이드)
- 다국어(i18n) 지원

### Phase 3
- React 19 마이그레이션
- Server Components 호환성 확보
- 성능 모니터링 대시보드

---

## 관련 문서

- [ARCHITECTURE.md](./ARCHITECTURE.md) — 시스템 아키텍처
- [DESIGN.md](./DESIGN.md) — 설계 및 스타일링 시스템
- [DEVELOPMENT.md](./DEVELOPMENT.md) — 개발 환경 가이드
- [GIT_WORKFLOW.md](./GIT_WORKFLOW.md) — 브랜치 전략 및 협업 규칙
- [DEPLOYMENT.md](./DEPLOYMENT.md) — CI/CD 배포 파이프라인
- [CLAUDE.md](../CLAUDE.md) — AI 코딩 컨벤션
