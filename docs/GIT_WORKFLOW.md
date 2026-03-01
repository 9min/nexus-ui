# GIT_WORKFLOW.md — 브랜치 전략 및 협업 규칙

> **nexus-ui** 프로젝트의 Git 브랜치 전략, PR 워크플로우, 코드 리뷰, 버저닝 규칙을 정의합니다.

---

## 1. 브랜치 전략

### 1.1 브랜치 구조

```
main (보호됨)
├── feature/button-component
├── feature/dialog-component
├── feature/design-tokens
├── fix/button-focus-ring
├── docs/storybook-setup
└── chore/ci-pipeline
```

### 1.2 브랜치 네이밍 규칙

| 접두사 | 용도 | 예시 |
|--------|------|------|
| `feature/` | 새로운 기능 추가 | `feature/toast-component` |
| `fix/` | 버그 수정 | `fix/dialog-focus-trap` |
| `docs/` | 문서 작성/수정 | `docs/storybook-guide` |
| `chore/` | 빌드, 설정, 의존성 등 | `chore/update-dependencies` |
| `refactor/` | 기능 변경 없는 코드 개선 | `refactor/button-variants` |
| `test/` | 테스트 추가/수정 | `test/select-keyboard-nav` |

### 1.3 브랜치 보호 규칙

**`main` 브랜치:**
- 직접 커밋(Direct Commit) **절대 금지**
- PR을 통해서만 코드 변경 가능
- 최소 1명의 리뷰어 승인(Approve) 필수
- 모든 CI 검사(Status Checks) 통과 필수
- 브랜치 최신 상태(Up-to-date) 필수

---

## 2. PR 워크플로우

### 2.1 전체 흐름

```
1. main에서 feature 브랜치 생성
   └─ git checkout -b feature/button-component

2. 작업 후 커밋 (Conventional Commits)
   └─ git commit -m "feat(ui): add Button component"

3. Changeset 추가
   └─ pnpm changeset

4. 원격에 푸시
   └─ git push -u origin feature/button-component

5. PR 생성
   └─ GitHub에서 PR 생성 (템플릿 따르기)

6. 자동 검증
   ├─ GitHub Actions CI (Lint, Typecheck, Test, Build)
   ├─ Chromatic Visual Regression Test
   └─ CodeRabbit AI 코드 리뷰

7. 리뷰 & 수정
   ├─ CodeRabbit 지적 사항 해결
   └─ 동료 리뷰어 피드백 반영

8. 승인 & Merge
   └─ Squash and Merge → main

9. 자동 정리
   └─ 원격 feature 브랜치 자동 삭제
```

### 2.2 커밋 메시지 규칙 (Conventional Commits)

```
<type>(<scope>): <description>

[optional body]

[optional footer(s)]
```

| Type | 설명 |
|------|------|
| `feat` | 새로운 기능 |
| `fix` | 버그 수정 |
| `docs` | 문서 변경 |
| `style` | 코드 포매팅 (기능 변경 없음) |
| `refactor` | 리팩토링 (기능 변경 없음) |
| `test` | 테스트 추가/수정 |
| `chore` | 빌드, 설정, 의존성 등 |
| `perf` | 성능 개선 |

| Scope | 대상 |
|-------|------|
| `ui` | `@nexus-ui/ui` 패키지 |
| `hooks` | `@nexus-ui/hooks` 패키지 |
| `tokens` | `@nexus-ui/tokens` 패키지 |
| `docs` | Storybook, 문서 |
| `ci` | CI/CD 파이프라인 |
| `config` | 공유 설정 (ESLint, TSConfig) |

**예시:**

```
feat(ui): add Button component with variant support

- Implement solid, outline, ghost, link variants
- Add sm, md, lg size options
- Include loading and disabled states
- Full keyboard navigation and ARIA support
```

### 2.3 PR 템플릿

```markdown
## 변경 사항
<!-- 이 PR에서 변경한 내용을 요약합니다 -->

## 변경 유형
- [ ] 새 기능 (feature)
- [ ] 버그 수정 (fix)
- [ ] 문서 (docs)
- [ ] 리팩토링 (refactor)
- [ ] 테스트 (test)
- [ ] 기타 (chore)

## 체크리스트
- [ ] Changeset을 추가했습니다 (`pnpm changeset`)
- [ ] 타입 검사를 통과합니다 (`pnpm typecheck`)
- [ ] 린트를 통과합니다 (`pnpm lint`)
- [ ] 테스트를 통과합니다 (`pnpm test`)
- [ ] Storybook 스토리를 작성/업데이트했습니다
- [ ] 접근성(a11y) 요구사항을 충족합니다

## 스크린샷 (UI 변경 시)
<!-- Storybook 캡처 또는 브라우저 스크린샷 -->
```

---

## 3. CodeRabbit AI 코드 리뷰

### 3.1 개요

모든 PR에 대해 [CodeRabbit](https://coderabbit.ai)이 자동으로 코드 리뷰를 수행합니다.

### 3.2 리뷰 범위

| 카테고리 | 검사 항목 |
|----------|-----------|
| 보안 | XSS, 인젝션 취약점, 안전하지 않은 패턴 |
| 성능 | 불필요한 리렌더링, 번들 사이즈 영향 |
| 코드 품질 | 중복 코드, 복잡도, 네이밍 |
| 접근성 | ARIA 속성 누락, 키보드 내비게이션 |
| 스타일 가이드 | 프로젝트 컨벤션 위반 |
| 타입 안전성 | `any` 타입 사용, 타입 좁히기 누락 |

### 3.3 대응 규칙

1. **Critical / High**: 반드시 수정 후 재리뷰 요청
2. **Medium**: 가능한 수정, 합리적 사유가 있으면 코멘트로 설명
3. **Low / Suggestion**: 선택적 반영, 판단에 따라 결정

### 3.4 CodeRabbit 설정 (`.coderabbit.yaml`)

```yaml
# .coderabbit.yaml
language: ko
reviews:
  profile: assertive
  request_changes_workflow: true
  high_level_summary: true
  poem: false
  review_status: true
  collapse_walkthrough: false
  auto_review:
    enabled: true
    drafts: false
chat:
  auto_reply: true
```

---

## 4. Changesets 버저닝

### 4.1 개요

[Changesets](https://github.com/changesets/changesets)를 사용하여 각 PR의 변경 수준을 문서화하고, 릴리스 노트를 자동 생성합니다.

### 4.2 Changeset 추가 방법

```bash
# 인터랙티브 CLI로 changeset 생성
pnpm changeset
```

실행 시 다음을 선택합니다:
1. **변경된 패키지** 선택 (예: `@nexus-ui/ui`)
2. **변경 수준** 선택 (major / minor / patch)
3. **변경 설명** 입력

### 4.3 시맨틱 버저닝 규칙

| 수준 | 언제 사용 | 예시 |
|------|-----------|------|
| **Major** | 기존 API와 호환되지 않는 변경 | Props 이름 변경, 컴포넌트 제거 |
| **Minor** | 이전 버전과 호환되는 새 기능 | 새 컴포넌트 추가, 새 variant 추가 |
| **Patch** | 이전 버전과 호환되는 버그 수정 | 스타일 수정, 접근성 속성 보완 |

### 4.4 Changeset 파일 예시

```markdown
<!-- .changeset/happy-tiger-dance.md -->
---
"@nexus-ui/ui": minor
---

Button 컴포넌트에 `loading` 상태와 `leftIcon`, `rightIcon` props를 추가했습니다.
```

### 4.5 릴리스 프로세스

```
PR Merge → Changesets Action 트리거
    ↓
"Version Packages" PR 자동 생성
    ↓
Version PR에 모든 changeset이 취합됨
    ↓
Version PR Merge → NPM 자동 Publish
    ↓
CHANGELOG.md 자동 업데이트
```

---

## 5. 브랜치 자동 정리

### 5.1 원격 브랜치 자동 삭제

GitHub 레포지토리 설정에서 **"Automatically delete head branches"** 를 활성화하여, PR이 Merge 되면 원격 feature 브랜치가 자동 삭제됩니다.

> Settings → General → Pull Requests → "Automatically delete head branches" 체크

### 5.2 로컬 브랜치 정리

```bash
# 원격에서 삭제된 브랜치 참조 정리
git fetch -p

# Merge 완료된 로컬 브랜치 삭제
git branch --merged main | grep -v 'main' | xargs git branch -d

# main으로 전환
git checkout main
git pull origin main
```

### 5.3 권장 정리 루틴

PR Merge 후 로컬에서 다음을 순서대로 실행합니다:

```bash
git checkout main
git pull origin main
git fetch -p
git branch --merged main | grep -v 'main' | xargs git branch -d
```

---

## 6. Merge 전략

### 6.1 Squash and Merge (기본)

- 모든 PR은 **Squash and Merge**를 사용합니다.
- feature 브랜치의 여러 커밋이 하나의 깔끔한 커밋으로 합쳐져 main에 반영됩니다.
- Merge 커밋 메시지는 PR 제목을 따릅니다.

### 6.2 Merge 전 확인 사항

- [ ] 모든 CI 검사(Status Checks) 통과
- [ ] CodeRabbit AI 리뷰 승인 (Critical/High 이슈 없음)
- [ ] 최소 1명의 동료 리뷰어 승인
- [ ] Changeset 추가 완료 (코드 변경이 있는 경우)
- [ ] 브랜치가 main 최신 상태와 동기화

---

## 관련 문서

- [PRD.md](./PRD.md) — 제품 요구사항 정의서
- [ARCHITECTURE.md](./ARCHITECTURE.md) — 시스템 아키텍처
- [DESIGN.md](./DESIGN.md) — 설계 및 스타일링 시스템
- [DEVELOPMENT.md](./DEVELOPMENT.md) — 개발 환경 가이드
- [DEPLOYMENT.md](./DEPLOYMENT.md) — CI/CD 배포 파이프라인
- [CLAUDE.md](../CLAUDE.md) — AI 코딩 컨벤션
