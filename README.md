# imm-web

> Frontend do **Inside My Mind** — rastreamento de hábitos com feedback de IA.

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
- [Funcionalidades](#funcionalidades)
- [Arquitetura](#arquitetura)
- [Stack de Tecnologias](#stack-de-tecnologias)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Pré-requisitos](#pré-requisitos)
- [Como Começar](#como-começar)
- [Variáveis de Ambiente](#variáveis-de-ambiente)
- [Scripts Disponíveis](#scripts-disponíveis)
- [Testes](#testes)
- [Pipeline CI/CD](#pipeline-cicd)
- [Deployment](#deployment)
- [Estratégia de Branches](#estratégia-de-branches)
- [Contribuindo](#contribuindo)

---

## O que é Inside My Mind?

**Inside My Mind** é uma aplicação de rastreamento de hábitos que usa IA para gerar feedback personalizado. Você registra seu progresso diário, escreve sobre sua experiência e recebe análise de um dos três agentes especializados: um planejador de hábitos, um professor de idiomas ou um coach comportamental.

É um projeto de código aberto, feito para aprendizado e portfólio.

---

## Funcionalidades

**Daily Lab** — painel principal para registrar hábitos concluídos, escrever entradas e receber feedback de IA no dia.

**Agentes de IA**

- **Habit Planner**: gera um plano de 66 dias com fases progressivas ao criar um novo hábito
- **Language Teacher**: avalia gramática, vocabulário e fluência nas entradas de hábitos de idiomas
- **Behavioral Coach**: identifica padrões de humor e sugere ajustes de rotina para hábitos comportamentais

**Internacionalização** — interface disponível em Português, Inglês e Espanhol. O idioma da interface é independente do idioma de estudo — você pode usar o app em pt-br enquanto aprende inglês.

**Analytics** — heatmap de streak, taxas de conclusão e histórico de progresso por hábito.

---

## Arquitetura

```text
imm-web (Next.js App Router)
├── app/[locale]/                  # Roteamento i18n via next-intl
│   ├── (auth)/                    # Páginas não-autenticadas (login, register)
│   └── (landing)/                 # Página de landing pública
├── components/ui/                 # Design system customizado sobre Chakra UI
├── lib/                           # API client, hooks, serviços
│   ├── hooks/useAuth.ts           # Autenticação e gerenciamento de tokens
│   ├── auth.service.ts            # Chamadas de API de autenticação
│   └── endpoints.ts               # Mapa tipado de endpoints da API
└── providers/                     # Provedores de contexto (QueryClient, Chakra, etc.)
```

`imm-web` consome a API REST [`imm-api`](https://github.com/pedrolucazx/imm-api) através de hooks HTTP tipados — sem acesso direto ao banco de dados. Toda comunicação com o servidor passa por hooks TanStack Query. Estado de autenticação é centralizado em `useAuth`.

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
| `yarn dev`              | Inicia dev server do Next.js                     |
| `yarn build`            | Compila a aplicação para produção                |
| `yarn start`            | Inicia o build de produção                       |
| `yarn lint`             | Executa ESLint                                   |
| `yarn lint:fix`         | Executa ESLint com auto-fix                      |
| `yarn format`           | Formata todos os arquivos com Prettier           |
| `yarn format:check`     | Verifica formatação sem escrever                 |
| `yarn test`             | Executa testes unitários e de integração (Jest)  |
| `yarn test:unit`        | Executa apenas testes unitários                  |
| `yarn test:integration` | Executa apenas testes de integração              |
| `yarn test:e2e`         | Executa testes E2E com Playwright (requer build) |
| `yarn test:e2e:ui`      | Executa Playwright com UI interativa             |
| `yarn test:watch`       | Executa Jest em watch mode                       |
| `yarn test:coverage`    | Executa Jest e gera relatório de coverage        |
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

Testes completos de browser executando contra Chromium. Os testes ficam em `tests/e2e/` e rodam contra o servidor Next.js compilado.

```bash
# Build obrigatório antes de rodar em CI
yarn build && yarn test:e2e

# UI interativa para desenvolvimento local
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
2. Implemente suas mudanças seguindo os padrões de componentes e hooks em `components/ui/` e `lib/`
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

**Convenções do Chakra UI v3:**

- Imports: componentes base de `@chakra-ui/react`, custom wrappers de `components/ui/`
- Props: `open` (não `isOpen`), `disabled` (não `isDisabled`), `invalid` (não `isInvalid`)
- Use `colorPalette` (não `colorScheme`), `VStack`/`HStack` (não `Stack`)
- Componentes compostos: `Dialog.Root`, `Table.Root`, `Tabs.Root`, `Menu.Root`
- Ícones: `@phosphor-icons/react` apenas — nunca `@chakra-ui/icons`

Pre-commit hooks (Husky + lint-staged) executam checagens de lint e format automaticamente antes de cada commit.

---

## Licença

Este projeto está licenciado sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.
