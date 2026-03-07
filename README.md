# imm-web

> Aplicação frontend para **Inside My Mind** — Rastreamento de hábitos e journaling potencializado por inteligência artificial com três agentes inteligentes.

[![CI](https://github.com/pedrolucazx/imm-web/actions/workflows/ci.yml/badge.svg?branch=develop)](https://github.com/pedrolucazx/imm-web/actions/workflows/ci.yml)

![Next.js](https://img.shields.io/badge/Next.js_15-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)
![React](https://img.shields.io/badge/React_19-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript_5-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Chakra UI](https://img.shields.io/badge/Chakra_UI_v3-319795?style=for-the-badge&logo=chakraui&logoColor=white)
![TanStack Query](https://img.shields.io/badge/TanStack_Query-FF4154?style=for-the-badge&logo=reactquery&logoColor=white)
![Playwright](https://img.shields.io/badge/Playwright-45BA4B?style=for-the-badge&logo=playwright&logoColor=white)
![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)

---

## Índice

- [O que é Inside My Mind?](#o-que-é-inside-my-mind)
- [Funcionalidades Principais](#funcionalidades-principais)
- [Arquitetura](#arquitetura)
- [Stack de Tecnologias](#stack-de-tecnologias)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Pré-requisitos](#pré-requisitos)
- [Como Começar](#como-começar)
- [Variáveis de Ambiente](#variáveis-de-ambiente)
- [Scripts Disponíveis](#scripts-disponíveis)
- [Testes](#testes)
- [Pipeline CI/CD](#pipelineCICD)
- [Deployment](#deployment)
- [Estratégia de Branches](#estratégia-de-branches)
- [Contribuindo](#contribuindo)

---

## O que é Inside My Mind?

**Inside My Mind** é uma aplicação gratuita e de código aberto que ajuda você a construir hábitos consistentes ao longo de 66 dias — o tempo médio que a ciência mostra ser necessário para transformar um comportamento em uma rotina automática.

O diferencial é que o app conta com três agentes de IA que trabalham para você **sem custo nenhum**: um que monta seu plano personalizado, um que corrige sua escrita em outros idiomas e um que analisa seu humor e padrões comportamentais ao longo do tempo. Tudo rodando dentro de cotas gratuitas de IA sem monetização.

É um projeto de portfólio e aprendizado que qualquer pessoa pode usar, estudar e contribuir.

---

## Funcionalidades Principais

### Daily Lab — Seu Dashboard de Hábitos

A interface principal onde você rastreia todos os hábitos ativos com indicadores visuais de progresso. Cada dia você:

1. **Marca hábitos concluídos** — Cards interativos mostrando seu streak atual e progresso diário
2. **Registra sua experiência** — Escreva livremente ou em um idioma-alvo com feedback alimentado por IA
3. **Receba insights personalizados** — Obtenha análise de um dos três agentes de IA especializados

### Feedback Inteligente de IA

Dependendo do tipo de hábito, receba feedback especializado:

- **Aprendizado de Idiomas**: Scores de gramática, vocabulário e fluência com correções de erros detalhadas
- **Rastreamento Comportamental**: Padrões de humor, níveis de energia e micro-hábitos acionáveis para amanhã
- **Planos Personalizados**: Roadmaps de 66 dias com três fases progressivas (Fundação, Produção, Consolidação)

### Internacionalização Completa (i18n)

- Suporte para Português, Inglês e Espanhol
- **Distinção crítica**: Idioma da interface ≠ Idioma de aprendizado do hábito
- Exemplo: Use o app em português enquanto estuda inglês — o Language Teacher analisa seu inglês e explica erros em português

### Analytics & Insights

- **Calendário de Streak**: Heatmap estilo GitHub mostrando sua consistência diária
- **Rastreamento de Progresso**: Taxas de conclusão, tendências de contagem de palavras e gráficos de correlação de humor
- **Reconhecimento de Padrões**: Analytics visuais para entender seus padrões comportamentais

---

## Visão Geral

`imm-web` é o frontend da plataforma **Inside My Mind**. Consome a API REST [`imm-api`](https://github.com/pedrolucazx/imm-api) através de hooks HTTP tipados — sem acesso direto ao banco de dados. A UI segue um sistema de design neo-brutalism construído em cima do Chakra UI v3, com suporte completo de internacionalização e server-side rendering via Next.js App Router.

> Decisões de arquitetura, fluxo de dados e roadmap de sprints estão documentados em [docs/architecture.pdf](./docs/architecture.pdf).

---

## Arquitetura

```text
imm-web (Next.js App Router)
├── app/[locale]/                  # Roteamento i18n via next-intl
│   ├── (auth)/                    # Páginas não-autenticadas (login, register)
│   └── (landing)/                 # Página de landing pública
├── components/ui/                 # Chakra UI wrapped design system
├── lib/                           # API client, hooks, serviços
│   ├── hooks/useAuth.ts           # Hook de autenticação e gerenciamento de tokens
│   ├── auth.service.ts            # Chamadas de API de autenticação
│   └── endpoints.ts               # Mapa typado de endpoints da API
└── providers/                     # Provedores de contexto React
```

Toda comunicação com servidor passa por hooks **TanStack Query** — componentes nunca chamam a API diretamente. Estado de autenticação é centralizado em `useAuth`.

---

## Stack de Tecnologias

| Camada                  | Tecnologia                               |
| ----------------------- | ---------------------------------------- |
| Framework               | Next.js 15 (App Router)                  |
| Linguagem               | TypeScript 5                             |
| Biblioteca de UI        | React 19                                 |
| Design System           | Chakra UI v3 (neo-brutalism)             |
| Ícones                  | Phosphor Icons (`@phosphor-icons/react`) |
| HTTP / Estado           | TanStack Query v5 + Axios                |
| Formulários             | React Hook Form v7                       |
| Animações               | Nenhuma biblioteca dedicada no momento   |
| Internacionalização     | next-intl v4                             |
| Testes Unit/Integration | Jest + React Testing Library + MSW       |
| Testes E2E              | Playwright (Chromium)                    |
| Deployment              | Vercel                                   |

---

## Estrutura do Projeto

```text
imm-web/
├── app/
│   └── [locale]/                  # Raiz do App Router consciente de locale
│       ├── (auth)/
│       │   ├── login/             # Página de login
│       │   └── register/          # Página de registro
│       └── (landing)/             # Página de landing pública
├── components/
│   └── ui/                        # Componentes Chakra UI customizados e wrapped
│       ├── Button.tsx
│       ├── Input.tsx
│       └── ...
├── lib/
│   ├── hooks/
│   │   └── useAuth.ts             # Hook de autenticação
│   ├── auth.service.ts            # Camada de serviço de auth API
│   └── endpoints.ts               # Constantes de endpoints API tipadas
├── providers/                     # Provedores de contexto React (QueryClient, Chakra, etc.)
├── i18n/                          # Configuração next-intl e request handler
├── styles/                        # CSS global
├── types/                         # Definições de tipos TypeScript compartilhadas
├── middleware.ts                  # Middleware de roteamento de locale
├── tests/
│   ├── __setup__/                 # Setup global de Jest & MSW
│   ├── unit/                      # Testes unitários de componentes + hooks
│   ├── integration/               # Testes de integração de API (MSW)
│   └── e2e/                       # Testes E2E com Playwright
├── .github/
│   └── workflows/
│       ├── ci.yml                 # Pipeline de code quality + testes
│       └── cd.yml                 # Deploy para Vercel após CI bem-sucedido
├── .env.example
├── jest.config.ts
├── next.config.ts
├── playwright.config.ts
└── tsconfig.json
```

---

## Pré-requisitos

- **Node.js** >= 20
- **yarn** >= 1.22
- Uma instância rodando de [`imm-api`](https://github.com/pedrolucazx/imm-api) (local ou remota)
- **Git**

---

## Como Começar

```bash
# 1. Clone o repositório
git clone git@github.com:pedrolucazx/imm-web.git
cd imm-web

# 2. Instale as dependências
yarn install

# 3. Configure as variáveis de ambiente
cp .env.example .env.local
# Preencha a URL da API — veja a seção Variáveis de Ambiente

# 4. Inicie o servidor de desenvolvimento
yarn dev
```

O app estará disponível em `http://localhost:3000`.

> Certifique-se que `imm-api` está rodando em `http://localhost:3001` (ou atualize `NEXT_PUBLIC_API_URL` conforme necessário).

---

## Variáveis de Ambiente

Copie `.env.example` para `.env.local` e configure os valores:

```env
# URL base da imm-api
# Local: http://localhost:3001
# Homolog: https://imm-homolog.onrender.com
# Production: https://imm-production.onrender.com
NEXT_PUBLIC_API_URL=http://localhost:3001
```

| Variável              | Obrigatória | Descrição                     |
| --------------------- | ----------- | ----------------------------- |
| `NEXT_PUBLIC_API_URL` | Sim         | URL base do backend `imm-api` |

---

## Scripts Disponíveis

| Script                  | Descrição                                        |
| ----------------------- | ------------------------------------------------ |
| `yarn dev`              | Inicie dev server do Next.js                     |
| `yarn build`            | Compile a aplicação para produção                |
| `yarn start`            | Inicie o build de produção                       |
| `yarn lint`             | Execute ESLint                                   |
| `yarn lint:fix`         | Execute ESLint com auto-fix                      |
| `yarn format`           | Formate todos os arquivos com Prettier           |
| `yarn format:check`     | Verifique formatação sem escrever                |
| `yarn test`             | Execute testes unitários e de integração (Jest)  |
| `yarn test:unit`        | Execute apenas testes unitários                  |
| `yarn test:integration` | Execute apenas testes de integração              |
| `yarn test:e2e`         | Execute testes E2E com Playwright (requer build) |
| `yarn test:e2e:ui`      | Execute Playwright com UI interativa             |
| `yarn test:watch`       | Execute Jest em watch mode                       |
| `yarn test:coverage`    | Execute Jest e gere relatório de coverage        |
| `yarn commit`           | Conventional commit interativo via Commitizen    |

---

## Testes

O projeto usa dois test runners separados com responsabilidades distintas:

### Jest — Unit & Integration

| Suite         | Localização          | Descrição                                             |
| ------------- | -------------------- | ----------------------------------------------------- |
| `unit`        | `tests/unit/`        | Renderização de componentes, lógica de hooks, funções |
| `integration` | `tests/integration/` | Chamadas de API mockadas com MSW (sem rede real)      |

```bash
yarn test
yarn test:unit
yarn test:integration
yarn test:coverage
```

### Playwright — E2E

Testes completos de browser executando contra Chromium. Testes vivem em `tests/e2e/` e rodam contra o servidor real de Next.js.

```bash
# Execute testes E2E (build de produção obrigatório em CI)
yarn build && yarn test:e2e

# UI Interativa (desenvolvimento local)
yarn test:e2e:ui
```

Configuração: [`playwright.config.ts`](playwright.config.ts)

- Retries: 1 (CI only)
- Workers: 2 (CI), ilimitados (local)
- Trace: no primeiro retry
- Screenshots: apenas em falha

---

## Pipeline CI/CD

Todo push e pull request para `develop` ou `main` dispara o pipeline definido em `.github/workflows/ci.yml`:

```text
code_quality ──► tests ──► ai_review ──► quality_gate
     │              │           │              │
  ESLint         unit        CodeRabbit     required
  Prettier    integration   (PRs only,     status check
  tsc           E2E         non-blocking)  for branch merge
              (build
             required)
```

| Estágio        | Bloqueia pipeline               | Trigger   |
| -------------- | ------------------------------- | --------- |
| `code_quality` | Sim                             | push + PR |
| `tests`        | Sim                             | push + PR |
| `ai_review`    | Não (`continue-on-error: true`) | PR only   |
| `quality_gate` | Sim                             | push + PR |

`quality_gate` é o status check obrigatório na branch protection. Depende apenas de `code_quality` e `tests` — a review de IA nunca bloqueia um merge.

> **Nota:** Testes E2E em CI executam `yarn build` antes de `yarn start`. Não execute Playwright contra o dev server em CI.

---

## Deployment

Deployments são disparados pelo pipeline CD (`.github/workflows/cd.yml`) após CI passar, usando a GitHub Action `amondnet/vercel-action`.

| Ambiente    | Branch    | Alvo              |
| ----------- | --------- | ----------------- |
| Homologação | `develop` | Vercel Preview    |
| Produção    | `main`    | Vercel Production |

Vercel é configurado via GitHub Action — nenhum deployment manual necessário. Apenas o pipeline de CI dispara deploys.

---

## Estratégia de Branches

```text
feature/* ──► develop (homolog) ──► main (production)
                   │                       │
              auto-deploys to         admin-only merge
              Vercel Preview          to Vercel Production
```

- Todo trabalho vai para `develop` via pull requests
- `main` é protegida — apenas o admin pode fazer merge `develop → main`
- Branch protection exige que o check **Quality Gate** passe antes de qualquer merge

---

## Contribuindo

1. Crie uma branch a partir de `develop`: `git checkout -b feat/sua-feature develop`
2. Implemente suas mudanças, seguindo os padrões de componentes e hooks em `components/ui/` e `lib/`
3. Escreva testes — unitários para componentes/hooks, integração para chamadas de API
4. Verifique se tudo passa localmente:

   ```bash
   yarn lint && yarn format:check && yarn test
   ```

5. Faça commit com [Conventional Commits](https://www.conventionalcommits.org/):

   ```bash
   yarn commit
   # ou manualmente: git commit -m "feat(auth): adicionar checkbox de lembrar-me"
   ```

6. Abra um pull request direcionado para `develop`

**Tipos de commit aceitos:** `feat`, `fix`, `chore`, `docs`, `test`, `refactor`, `perf`, `ci`

**Convenções do Chakra UI v3 enforçadas por CodeRabbit:**

- Imports: componentes base de `@chakra-ui/react`, custom wrappers de `components/ui/`
- Props: `open` (não `isOpen`), `disabled` (não `isDisabled`), `invalid` (não `isInvalid`)
- Use `colorPalette` (não `colorScheme`), `VStack`/`HStack` (não `Stack`)
- Componentes compostos: `Dialog.Root`, `Table.Root`, `Tabs.Root`, `Menu.Root`
- Ícones: `@phosphor-icons/react` apenas — nunca `@chakra-ui/icons`

Pre-commit hooks (Husky + lint-staged) executam checagens de lint e format automaticamente antes de cada commit.

---

---

## Por Que Este Projeto Importa para Seu Portfólio

Este frontend mostra práticas de desenvolvimento React e Next.js moderno que impactam diretamente em decisões de hiring:

- **Advanced State Management**: TanStack Query para estado de servidor, React Hook Form para formulários complexos, context para auth — sem bloat de Redux.
- **Type Safety**: TypeScript end-to-end com strict mode garante correção em compile-time em componentes e chamadas de API.
- **Internacionalização em Escala**: next-intl com roteamento consciente de locale e middleware, suportando 3+ idiomas perfeitamente.
- **Domain de Design System**: Chakra UI v3 com componentes customizados e wrapped, design responsivo e estética neo-brutalism coesa.
- **Testes Abrangentes**: Jest, React Testing Library, MSW (API mockada) e Playwright E2E — qualidade pronta para produção.
- **Performance**: Server components, code splitting, otimização de imagens e meta tags de SEO via best practices Next.js.
- **Acessibilidade**: ARIA labels, navegação por teclado, conformidade de contraste de cores e HTML semântico.
- **Automação de Deployment**: Pipeline CI/CD do GitHub Actions com linting, testes e deploys automáticos para Vercel.

**O que Recrutadores Veem:**

- Você entende React moderno full-stack (App Router, Server Components, Streaming)
- Você se importa com qualidade de código (linting, formatação, pre-commit hooks, branch protection)
- Você consegue estruturar um projeto escalável (componentes modulares, hooks, services)
- Você lançou features production-grade (internacionalização, analytics, integração real de API)

---

## Licença

Este projeto é público e aberto para fins de aprendizado.
