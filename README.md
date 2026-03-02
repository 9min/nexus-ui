# nexus-ui

<div align="center">

Enterprise-grade React design system built with Radix UI, Tailwind CSS, and TypeScript.

[![CI](https://github.com/9min/nexus-ui/actions/workflows/ci.yml/badge.svg)](https://github.com/9min/nexus-ui/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://github.com/9min/nexus-ui/pulls)

</div>

---

## Features

- **23 accessible components** built on [Radix UI](https://www.radix-ui.com/) primitives
- **3 utility hooks** for common UI patterns
- **Design token system** with CSS Variables and light/dark theme support
- **CVA-based variant management** for type-safe styling
- **Tree-shakeable** ESM and CJS builds
- **Full Storybook documentation** for every component
- **136+ tests** with Vitest and React Testing Library
- **WAI-ARIA 1.2 compliant** with keyboard navigation and focus management

## Packages

| Package                                 | Description                                 | Version                                                                                                     |
| --------------------------------------- | ------------------------------------------- | ----------------------------------------------------------------------------------------------------------- |
| [`@nexus-ui/ui`](./packages/ui)         | React component library                     | [![npm](https://img.shields.io/npm/v/@nexus-ui/ui.svg)](https://www.npmjs.com/package/@nexus-ui/ui)         |
| [`@nexus-ui/hooks`](./packages/hooks)   | Utility React hooks                         | [![npm](https://img.shields.io/npm/v/@nexus-ui/hooks.svg)](https://www.npmjs.com/package/@nexus-ui/hooks)   |
| [`@nexus-ui/tokens`](./packages/tokens) | Design tokens (colors, typography, spacing) | [![npm](https://img.shields.io/npm/v/@nexus-ui/tokens.svg)](https://www.npmjs.com/package/@nexus-ui/tokens) |

## Components

### Form

| Component                                              | Description                                                           |
| ------------------------------------------------------ | --------------------------------------------------------------------- |
| [Button](./packages/ui/src/components/button)          | Multi-variant button with loading state, icons, and `asChild` support |
| [Input](./packages/ui/src/components/input)            | Text input with consistent styling                                    |
| [Textarea](./packages/ui/src/components/textarea)      | Multi-line text input                                                 |
| [Label](./packages/ui/src/components/label)            | Accessible form label                                                 |
| [Checkbox](./packages/ui/src/components/checkbox)      | Checkbox with indeterminate state                                     |
| [Switch](./packages/ui/src/components/switch)          | Toggle switch                                                         |
| [RadioGroup](./packages/ui/src/components/radio-group) | Radio button group                                                    |
| [Select](./packages/ui/src/components/select)          | Accessible select dropdown                                            |

### Overlay

| Component                                                  | Description                                       |
| ---------------------------------------------------------- | ------------------------------------------------- |
| [Dialog](./packages/ui/src/components/dialog)              | Modal dialog with focus trap and portal           |
| [AlertDialog](./packages/ui/src/components/alert-dialog)   | Confirmation dialog with cancel/action            |
| [Popover](./packages/ui/src/components/popover)            | Floating popover panel                            |
| [Tooltip](./packages/ui/src/components/tooltip)            | Informational tooltip on hover/focus              |
| [DropdownMenu](./packages/ui/src/components/dropdown-menu) | Accessible dropdown menu with sub-menus           |
| [Toast](./packages/ui/src/components/toast)                | Notification toast with variants and auto-dismiss |

### Display

| Component                                           | Description                         |
| --------------------------------------------------- | ----------------------------------- |
| [Badge](./packages/ui/src/components/badge)         | Status badge with variants          |
| [Avatar](./packages/ui/src/components/avatar)       | User avatar with image and fallback |
| [Progress](./packages/ui/src/components/progress)   | Progress bar indicator              |
| [Separator](./packages/ui/src/components/separator) | Visual divider                      |

### Navigation

| Component                                           | Description                  |
| --------------------------------------------------- | ---------------------------- |
| [Tabs](./packages/ui/src/components/tabs)           | Tabbed interface             |
| [Accordion](./packages/ui/src/components/accordion) | Collapsible content sections |

### Layout

| Component                                                   | Description                    |
| ----------------------------------------------------------- | ------------------------------ |
| [ScrollArea](./packages/ui/src/components/scroll-area)      | Custom styled scrollable area  |
| [Slider](./packages/ui/src/components/slider)               | Range slider input             |
| [Toggle / ToggleGroup](./packages/ui/src/components/toggle) | Toggle button and toggle group |

## Hooks

| Hook              | Description                            |
| ----------------- | -------------------------------------- |
| `useMediaQuery`   | Subscribe to CSS media query changes   |
| `useDebounce`     | Debounce a rapidly changing value      |
| `useClickOutside` | Detect clicks outside a target element |

## Quick Start

### Installation

```bash
pnpm add @nexus-ui/ui @nexus-ui/tokens
```

### Tailwind CSS Setup

Add the nexus-ui content path to your `tailwind.config.js`:

```js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{ts,tsx}', './node_modules/@nexus-ui/ui/dist/**/*.{js,mjs}'],
  // ...
};
```

### Import Tokens CSS

```tsx
// app entry point (e.g., main.tsx or layout.tsx)
import '@nexus-ui/tokens/styles.css';
```

### Usage

```tsx
import { Button } from '@nexus-ui/ui';

function App() {
  return (
    <Button variant="solid" size="md" intent="primary">
      Get Started
    </Button>
  );
}
```

## Development

### Prerequisites

| Tool    | Version |
| ------- | ------- |
| Node.js | >= 20   |
| pnpm    | >= 9.0  |

### Setup

```bash
git clone https://github.com/9min/nexus-ui.git
cd nexus-ui
pnpm install
```

### Commands

| Command          | Description                                                |
| ---------------- | ---------------------------------------------------------- |
| `pnpm dev`       | Start all dev servers (Storybook + packages in watch mode) |
| `pnpm build`     | Build all packages                                         |
| `pnpm test`      | Run all tests                                              |
| `pnpm lint`      | Lint all packages                                          |
| `pnpm typecheck` | Type-check all packages                                    |
| `pnpm format`    | Format code with Prettier                                  |
| `pnpm clean`     | Remove all build artifacts                                 |
| `pnpm changeset` | Create a changeset for versioning                          |

## Project Structure

```text
nexus-ui/
├── apps/
│   └── docs/                 # Storybook documentation site
├── packages/
│   ├── ui/                   # @nexus-ui/ui — Component library
│   │   └── src/components/   # 23 components
│   ├── hooks/                # @nexus-ui/hooks — Utility hooks
│   ├── tokens/               # @nexus-ui/tokens — Design tokens + CSS
│   ├── tsconfig/             # Shared TypeScript configs
│   └── eslint-config/        # Shared ESLint config
├── .github/workflows/        # CI, release, and docs pipelines
├── docs/                     # Architecture, design, and workflow docs
├── turbo.json                # Turborepo pipeline config
└── pnpm-workspace.yaml       # pnpm workspace definition
```

## Design Tokens

nexus-ui uses **CSS Custom Properties** (variables) for theming. Tokens cover colors, typography, spacing, and border radius.

Themes are toggled via a CSS class on the root element:

```html
<!-- Light theme (default) -->
<html class="light">
  ...
</html>

<!-- Dark theme -->
<html class="dark">
  ...
</html>
```

All component styles reference token variables (e.g., `bg-primary`, `text-foreground`, `border-border`), ensuring consistent theming across your app. See [docs/DESIGN.md](./docs/DESIGN.md) for the full token reference.

## Contributing

1. Create a branch from `main` using the appropriate prefix:
   - `feature/` — new functionality
   - `fix/` — bug fixes
   - `docs/` — documentation
   - `chore/` — tooling, dependencies
   - `refactor/` — code improvements
   - `test/` — test additions

2. Use [Conventional Commits](https://www.conventionalcommits.org/):

   ```text
   feat(ui): add Tooltip component
   fix(hooks): resolve useDebounce cleanup on unmount
   ```

3. Add a [changeset](https://github.com/changesets/changesets) if your change affects published packages:

   ```bash
   pnpm changeset
   ```

4. Open a PR against `main`. All CI checks (lint, typecheck, test, build) must pass.

See [docs/GIT_WORKFLOW.md](./docs/GIT_WORKFLOW.md) for the full workflow and branching rules.

## Tech Stack

| Technology                                             | Purpose                              |
| ------------------------------------------------------ | ------------------------------------ |
| [React 18](https://react.dev/)                         | UI framework                         |
| [TypeScript](https://www.typescriptlang.org/)          | Type safety                          |
| [Tailwind CSS](https://tailwindcss.com/)               | Utility-first styling                |
| [Radix UI](https://www.radix-ui.com/)                  | Accessible headless primitives       |
| [Turborepo](https://turbo.build/)                      | Monorepo build orchestration         |
| [tsup](https://tsup.egoist.dev/)                       | TypeScript bundler (ESM + CJS + DTS) |
| [Vitest](https://vitest.dev/)                          | Unit testing                         |
| [Storybook 8](https://storybook.js.org/)               | Component documentation              |
| [Changesets](https://github.com/changesets/changesets) | Versioning and changelogs            |

## Browser Support

| Browser | Minimum Version |
| ------- | --------------- |
| Chrome  | 90+             |
| Safari  | 15+             |
| Firefox | 90+             |
| Edge    | 90+             |

## License

MIT
