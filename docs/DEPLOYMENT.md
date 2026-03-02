# DEPLOYMENT.md — CI/CD 배포 파이프라인

> **nexus-ui** 프로젝트의 GitHub Actions 워크플로우, NPM 배포, Storybook 배포를 정의합니다.

---

## 1. 파이프라인 개요

```
[PR 생성/업데이트]
    ↓
Workflow 1: CI (PR 검증)
├── Lint
├── Typecheck
├── Test (Vitest)
├── Build
└── Chromatic VRT (비활성 — 토큰 설정 후 활성화 예정)
    ↓ (모두 통과 + 리뷰 승인)
[main Merge]
    ↓
Workflow 2: Release
├── Changesets Version Check
├── Version Bump (자동)
├── NPM Publish
└── Git Tag 생성
    ↓ (Publish 성공)
Workflow 3: Docs
├── Storybook Build
└── Vercel 배포
```

---

## 2. Workflow 1 — PR 검증 (`ci.yml`)

모든 PR에 대해 코드 품질, 타입 안전성, 테스트, 빌드를 병렬로 검증합니다.

### 2.1 YAML 구조

```yaml
# .github/workflows/ci.yml
name: CI

on:
  pull_request:
    branches: [main]

concurrency:
  group: ci-${{ github.ref }}
  cancel-in-progress: true

jobs:
  lint:
    name: Lint
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - uses: pnpm/action-setup@v4
        with:
          version: 9

      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'pnpm'

      - run: pnpm install --frozen-lockfile
      - run: pnpm lint

  typecheck:
    name: Typecheck
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - uses: pnpm/action-setup@v4
        with:
          version: 9

      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'pnpm'

      - run: pnpm install --frozen-lockfile
      - run: pnpm typecheck

  test:
    name: Test
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - uses: pnpm/action-setup@v4
        with:
          version: 9

      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'pnpm'

      - run: pnpm install --frozen-lockfile
      - run: pnpm test

  build:
    name: Build
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - uses: pnpm/action-setup@v4
        with:
          version: 9

      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'pnpm'

      - run: pnpm install --frozen-lockfile
      - run: pnpm build

  chromatic:
    name: Chromatic
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
        with:
          fetch-depth: 0  # Chromatic은 전체 git 이력이 필요

      - uses: pnpm/action-setup@v4
        with:
          version: 9

      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'pnpm'

      - run: pnpm install --frozen-lockfile
      - run: pnpm build

      - uses: chromaui/action@latest
        with:
          projectToken: ${{ secrets.CHROMATIC_PROJECT_TOKEN }}
          workingDir: apps/docs
          exitZeroOnChanges: true  # 변경 감지 시에도 CI 실패하지 않음 (리뷰로 처리)
```

### 2.2 병렬 실행 전략

```
ci.yml 트리거
    ├── lint       ─────────→ ✅
    ├── typecheck  ─────────→ ✅
    ├── test       ─────────→ ✅
    ├── build      ─────────→ ✅
    └── chromatic  ─────────→ ⏸️ (비활성 — CHROMATIC_PROJECT_TOKEN 설정 후 활성화)
```

- 5개 잡이 **동시에 병렬 실행**되어 총 실행 시간을 최소화합니다.
- `concurrency` 설정으로 같은 PR의 이전 실행이 자동 취소됩니다.
- 하나라도 실패하면 PR Merge가 차단됩니다 (Branch Protection 설정).

---

## 3. Workflow 2 — Release (`release.yml`)

main 브랜치에 Merge 시 Changesets를 기반으로 버전 범프 및 NPM 배포를 수행합니다.

### 3.1 YAML 구조

```yaml
# .github/workflows/release.yml
name: Release

on:
  push:
    branches: [main]

concurrency:
  group: release-${{ github.ref }}
  cancel-in-progress: false  # 릴리스는 중복 실행 방지하되 취소하지 않음

permissions:
  contents: write
  pull-requests: write

jobs:
  release:
    name: Release
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - uses: pnpm/action-setup@v4
        with:
          version: 9

      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'pnpm'
          registry-url: 'https://registry.npmjs.org'

      - run: pnpm install --frozen-lockfile
      - run: pnpm build

      - name: Create Release Pull Request or Publish
        id: changesets
        uses: changesets/action@v1
        with:
          version: pnpm changeset version
          publish: pnpm changeset publish
          title: 'chore: version packages'
          commit: 'chore: version packages'
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
          NPM_TOKEN: ${{ secrets.NPM_TOKEN }}
          NODE_AUTH_TOKEN: ${{ secrets.NPM_TOKEN }}
```

### 3.2 동작 흐름

```
main에 PR Merge
    ↓
Changesets Action 실행
    ↓
┌─── changeset 파일이 있는 경우 ───┐
│                                    │
│  "Version Packages" PR 생성/갱신    │
│  (package.json 버전 + CHANGELOG)   │
│                                    │
└────────────────────────────────────┘
    ↓ (Version PR을 Merge 하면)
┌─── 배포 실행 ───┐
│                   │
│  pnpm build       │
│  changeset publish│
│  → NPM Registry   │
│  → Git Tags       │
│                   │
└───────────────────┘
```

### 3.3 NPM Publish 설정

```json
// .changeset/config.json
{
  "$schema": "https://unpkg.com/@changesets/config@3.0.0/schema.json",
  "changelog": "@changesets/cli/changelog",
  "commit": false,
  "fixed": [],
  "linked": [],
  "access": "public",
  "baseBranch": "main",
  "updateInternalDependencies": "patch",
  "ignore": []
}
```

- **`access: "public"`**: 공개 NPM 레지스트리에 배포
- **`updateInternalDependencies: "patch"`**: 내부 패키지 의존성 자동 업데이트

---

## 4. Workflow 3 — Docs 배포 (`docs.yml`)

NPM Publish 성공 후 Storybook을 빌드하여 Vercel에 자동 배포합니다.

### 4.1 YAML 구조

```yaml
# .github/workflows/docs.yml
name: Deploy Docs

on:
  workflow_run:
    workflows: ['Release']
    types: [completed]
    branches: [main]

jobs:
  deploy-docs:
    name: Deploy Storybook
    runs-on: ubuntu-latest
    if: ${{ github.event.workflow_run.conclusion == 'success' }}
    steps:
      - uses: actions/checkout@v4

      - uses: pnpm/action-setup@v4
        with:
          version: 9

      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'pnpm'

      - run: pnpm install --frozen-lockfile
      - run: pnpm build

      - name: Build Storybook
        run: pnpm --filter @nexus-ui/docs build-storybook

      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v25
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
          vercel-args: '--prod'
          working-directory: apps/docs/storybook-static
```

### 4.2 Vercel 대체 방안

Vercel 대신 GitHub Pages를 사용할 수도 있습니다:

```yaml
      - name: Deploy to GitHub Pages
        uses: peaceiris/actions-gh-pages@v4
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: apps/docs/storybook-static
```

---

## 5. 필수 시크릿 설정

GitHub 레포지토리 **Settings → Secrets and variables → Actions**에 다음 시크릿을 등록합니다:

| 시크릿 | 용도 | 획득 방법 |
|--------|------|-----------|
| `NPM_TOKEN` | NPM 패키지 배포 인증 | npmjs.com → Access Tokens → Automation |
| `CHROMATIC_PROJECT_TOKEN` | Chromatic VRT | chromatic.com → 프로젝트 설정 |
| `VERCEL_TOKEN` | Vercel 배포 인증 | vercel.com → Settings → Tokens |
| `VERCEL_ORG_ID` | Vercel 조직 식별 | vercel.com → Settings → General |
| `VERCEL_PROJECT_ID` | Vercel 프로젝트 식별 | vercel.com → Project Settings |

> `GITHUB_TOKEN`은 GitHub Actions에서 자동 제공되므로 별도 등록 불필요합니다.

---

## 6. Branch Protection 설정

GitHub 레포지토리 **Settings → Branches → Branch protection rules**에서 `main` 브랜치에 다음 규칙을 적용합니다:

| 설정 | 값 |
|------|-----|
| Require a pull request before merging | ✅ |
| Require approvals | 1 |
| Require status checks to pass before merging | ✅ |
| Required status checks | `lint`, `typecheck`, `test`, `build` |
| Require branches to be up to date before merging | ✅ |
| Do not allow bypassing the above settings | ✅ |
| Automatically delete head branches | ✅ |

---

## 7. 전체 배포 요약

```
개발자 코드 작성
    ↓
feature/* 브랜치에서 PR 생성
    ↓
┌── CI Workflow ──────────────────────┐
│  Lint ✅  Typecheck ✅  Test ✅      │
│  Build ✅  Chromatic ⏸️              │
└─────────────────────────────────────┘
    ↓
CodeRabbit 리뷰 + 동료 리뷰 → 승인
    ↓
Squash & Merge → main
    ↓
┌── Release Workflow ─────────────────┐
│  Changesets: Version PR 생성/갱신    │
│  (Version PR Merge 시)              │
│  → NPM Publish (@nexus-ui/*)       │
│  → Git Tag (v0.1.0 등)             │
└─────────────────────────────────────┘
    ↓
┌── Docs Workflow ────────────────────┐
│  Storybook 빌드                     │
│  → Vercel 프로덕션 배포              │
└─────────────────────────────────────┘
```

---

## 관련 문서

- [PRD.md](./PRD.md) — 제품 요구사항 정의서
- [ARCHITECTURE.md](./ARCHITECTURE.md) — 시스템 아키텍처
- [DESIGN.md](./DESIGN.md) — 설계 및 스타일링 시스템
- [DEVELOPMENT.md](./DEVELOPMENT.md) — 개발 환경 가이드
- [GIT_WORKFLOW.md](./GIT_WORKFLOW.md) — 브랜치 전략 및 협업 규칙
- [CLAUDE.md](../CLAUDE.md) — AI 코딩 컨벤션
