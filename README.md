# imm-web

> Frontend application for **Inside My Mind** — a SaaS platform for habit tracking and AI-powered journaling.

[![CI](https://github.com/pedrolucazx/imm-web/actions/workflows/ci.yml/badge.svg?branch=develop)](https://github.com/pedrolucazx/imm-web/actions/workflows/ci.yml)

![Next.js](https://img.shields.io/badge/Next.js_15-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)
![React](https://img.shields.io/badge/React_19-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript_5-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Chakra UI](https://img.shields.io/badge/Chakra_UI_v3-319795?style=for-the-badge&logo=chakraui&logoColor=white)
![TanStack Query](https://img.shields.io/badge/TanStack_Query-FF4154?style=for-the-badge&logo=reactquery&logoColor=white)
![Playwright](https://img.shields.io/badge/Playwright-45BA4B?style=for-the-badge&logo=playwright&logoColor=white)
![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)

---

## Table of Contents

- [Overview](#overview)
- [Architecture](#architecture)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Available Scripts](#available-scripts)
- [Testing](#testing)
- [CI/CD Pipeline](#cicd-pipeline)
- [Deployment](#deployment)
- [Branch Strategy](#branch-strategy)
- [Contributing](#contributing)

---

## Overview

`imm-web` is the frontend of the **Inside My Mind** platform. It consumes the [`imm-api`](https://github.com/pedrolucazx/imm-api) REST API through typed HTTP hooks — no direct database access. The UI follows a neo-brutalism design system built on top of Chakra UI v3, with full internationalization support and server-side rendering via the Next.js App Router.

> Architecture decisions, data flow, and sprint roadmap are documented in [docs/architecture.pdf](./docs/architecture.pdf).

---

## Architecture

```text
imm-web (Next.js App Router)
├── app/[locale]/                  # i18n routing via next-intl
│   ├── (auth)/                    # Unauthenticated pages (login, register)
│   └── (landing)/                 # Public landing page
├── components/ui/                 # Chakra UI wrapped design system
├── lib/                           # API client, hooks, services
│   ├── hooks/useAuth.ts           # Auth state & token management
│   ├── auth.service.ts            # Auth API calls
│   └── endpoints.ts               # Typed API endpoint map
└── providers/                     # React context providers
```

All server communication goes through **TanStack Query** hooks — components never call the API directly. Authentication state is centralized in `useAuth`.

---

## Tech Stack

| Layer                  | Technology                               |
| ---------------------- | ---------------------------------------- |
| Framework              | Next.js 15 (App Router)                  |
| Language               | TypeScript 5                             |
| UI Library             | React 19                                 |
| Design System          | Chakra UI v3 (neo-brutalism)             |
| Icons                  | Phosphor Icons (`@phosphor-icons/react`) |
| HTTP / State           | TanStack Query v5 + Axios                |
| Forms                  | React Hook Form v7                       |
| Animations             | N/A (no dedicated library at the moment) |
| Internationalization   | next-intl v4                             |
| Unit/Integration Tests | Jest + React Testing Library + MSW       |
| E2E Tests              | Playwright (Chromium)                    |
| Deployment             | Vercel                                   |

---

## Project Structure

```text
imm-web/
├── app/
│   └── [locale]/                  # Locale-aware App Router root
│       ├── (auth)/
│       │   ├── login/             # Login page
│       │   └── register/          # Registration page
│       └── (landing)/             # Public landing page
├── components/
│   └── ui/                        # Custom wrapped Chakra UI components
│       ├── Button.tsx
│       ├── Input.tsx
│       └── ...
├── lib/
│   ├── hooks/
│   │   └── useAuth.ts             # Authentication hook
│   ├── auth.service.ts            # Auth API service layer
│   └── endpoints.ts               # Typed API endpoint constants
├── providers/                     # React context providers (QueryClient, Chakra, etc.)
├── i18n/                          # next-intl config and locale request handler
├── styles/                        # Global CSS
├── types/                         # Shared TypeScript type definitions
├── middleware.ts                  # Locale routing middleware
├── tests/
│   ├── __setup__/                 # Jest & MSW global setup
│   ├── unit/                      # Component + hook unit tests
│   ├── integration/               # API integration tests (MSW)
│   └── e2e/                       # Playwright E2E tests
├── .github/
│   └── workflows/
│       ├── ci.yml                 # Code quality + tests pipeline
│       └── cd.yml                 # Deploy to Vercel on CI success
├── .env.example
├── jest.config.ts
├── next.config.ts
├── playwright.config.ts
└── tsconfig.json
```

---

## Prerequisites

- **Node.js** >= 20
- **yarn** >= 1.22
- A running instance of [`imm-api`](https://github.com/pedrolucazx/imm-api) (local or remote)
- **Git**

---

## Getting Started

```bash
# 1. Clone the repository
git clone git@github.com:pedrolucazx/imm-web.git
cd imm-web

# 2. Install dependencies
yarn install

# 3. Set up environment variables
cp .env.example .env.local
# Fill in the API URL — see Environment Variables section

# 4. Start the development server
yarn dev
```

The app will be available at `http://localhost:3000`.

> Make sure `imm-api` is running on `http://localhost:3001` (or update `NEXT_PUBLIC_API_URL` accordingly).

---

## Environment Variables

Copy `.env.example` to `.env.local` and configure the values:

```env
# imm-api base URL
# Local: http://localhost:3001
# Homolog: https://imm-homolog.onrender.com
# Production: https://imm-production.onrender.com
NEXT_PUBLIC_API_URL=http://localhost:3001
```

| Variable              | Required | Description                       |
| --------------------- | -------- | --------------------------------- |
| `NEXT_PUBLIC_API_URL` | Yes      | Base URL of the `imm-api` backend |

---

## Available Scripts

| Script                  | Description                                    |
| ----------------------- | ---------------------------------------------- |
| `yarn dev`              | Start Next.js development server               |
| `yarn build`            | Build the application for production           |
| `yarn start`            | Start the production build                     |
| `yarn lint`             | Run ESLint                                     |
| `yarn lint:fix`         | Run ESLint with auto-fix                       |
| `yarn format`           | Format all source files with Prettier          |
| `yarn format:check`     | Check formatting without writing               |
| `yarn test`             | Run unit and integration tests (Jest)          |
| `yarn test:unit`        | Run unit tests only                            |
| `yarn test:integration` | Run integration tests only                     |
| `yarn test:e2e`         | Run Playwright E2E tests (requires build)      |
| `yarn test:e2e:ui`      | Run Playwright with interactive UI             |
| `yarn test:watch`       | Run Jest in watch mode                         |
| `yarn test:coverage`    | Run Jest and generate coverage report          |
| `yarn commit`           | Interactive conventional commit via Commitizen |

---

## Testing

The project uses two separate test runners with distinct responsibilities:

### Jest — Unit & Integration

| Suite         | Location             | Description                                         |
| ------------- | -------------------- | --------------------------------------------------- |
| `unit`        | `tests/unit/`        | Component rendering, hook logic, isolated functions |
| `integration` | `tests/integration/` | API calls mocked with MSW (no real network)         |

```bash
yarn test
yarn test:unit
yarn test:integration
yarn test:coverage
```

### Playwright — E2E

Full browser tests running against Chromium. Tests live in `tests/e2e/` and run against the real Next.js server.

```bash
# Run E2E tests (production build required in CI)
yarn build && yarn test:e2e

# Interactive UI (local development)
yarn test:e2e:ui
```

Configuration: [`playwright.config.ts`](playwright.config.ts)

- Retries: 1 (CI only)
- Workers: 2 (CI), unlimited (local)
- Trace: on first retry
- Screenshots: on failure only

---

## CI/CD Pipeline

Every push and pull request to `develop` or `main` triggers the pipeline defined in `.github/workflows/ci.yml`:

```text
code_quality ──► tests ──► ai_review ──► quality_gate
     │              │           │              │
  ESLint         unit        CodeRabbit     required
  Prettier    integration   (PRs only,     status check
  tsc           E2E         non-blocking)  for branch merge
               (build
              required)
```

| Stage          | Blocks pipeline                | Trigger   |
| -------------- | ------------------------------ | --------- |
| `code_quality` | Yes                            | push + PR |
| `tests`        | Yes                            | push + PR |
| `ai_review`    | No (`continue-on-error: true`) | PR only   |
| `quality_gate` | Yes                            | push + PR |

`quality_gate` is the required status check in branch protection. It depends only on `code_quality` and `tests` — the AI review never blocks a merge.

> **Note:** E2E tests in CI run `yarn build` before `yarn start`. Do not run Playwright against the dev server in CI.

---

## Deployment

Deployments are triggered by the CD pipeline (`.github/workflows/cd.yml`) after CI passes, using the `amondnet/vercel-action` GitHub Action.

| Environment  | Branch    | Target            |
| ------------ | --------- | ----------------- |
| Homologation | `develop` | Vercel Preview    |
| Production   | `main`    | Vercel Production |

Vercel is configured via the GitHub Action — no manual deployment needed. Only the CI pipeline triggers deploys.

---

## Branch Strategy

```text
feature/* ──► develop (homolog) ──► main (production)
                   │                       │
             auto-deploys to         admin-only merge
             Vercel Preview          to Vercel Production
```

- All work goes to `develop` via pull requests
- `main` is protected — only the admin can merge `develop → main`
- Branch protection requires the **Quality Gate** check to pass before any merge

---

## Contributing

1. Create a branch from `develop`: `git checkout -b feat/your-feature develop`
2. Implement your changes, following the component and hook patterns in `components/ui/` and `lib/`
3. Write tests — unit for components/hooks, integration for API calls
4. Verify everything passes locally:

   ```bash
   yarn lint && yarn format:check && yarn test
   ```

5. Commit with [Conventional Commits](https://www.conventionalcommits.org/):

   ```bash
   yarn commit
   # or manually: git commit -m "feat(auth): add remember me checkbox"
   ```

6. Open a pull request targeting `develop`

**Accepted commit types:** `feat`, `fix`, `chore`, `docs`, `test`, `refactor`, `perf`, `ci`

**Chakra UI v3 conventions enforced by CodeRabbit:**

- Imports: base components from `@chakra-ui/react`, custom wrappers from `components/ui/`
- Props: `open` (not `isOpen`), `disabled` (not `isDisabled`), `invalid` (not `isInvalid`)
- Use `colorPalette` (not `colorScheme`), `VStack`/`HStack` (not `Stack`)
- Compound components: `Dialog.Root`, `Table.Root`, `Tabs.Root`, `Menu.Root`
- Icons: `@phosphor-icons/react` only — never `@chakra-ui/icons`

Pre-commit hooks (Husky + lint-staged) run lint and format checks automatically before each commit.

---

## License

This project is public and open for learning purposes.
