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
- [Arquitetura](#arquitetura) · [Documento completo](docs/architecture.md)
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

É um projeto de código aberto, feito para aprendizado e portfólio, 100% gratuito e sem funcionalidades bloqueadas.

---

## Funcionalidades

**Landing Page** — apresentação do projeto, agentes de IA e call-to-action para cadastro.

**Autenticação completa**

- Cadastro com verificação de e-mail obrigatória
- Login com bloqueio até confirmação de conta
- Recuperação de senha via e-mail (forgot password → reset password)

**Onboarding Tour** — tour interativo de 6 passos exibido automaticamente na primeira sessão. Pode ser reiniciado nas Configurações.

**Daily Lab** — painel principal para marcar hábitos como concluídos, escrever entradas de journal e receber feedback de IA.

**Agentes de IA**

- **Habit Planner**: gera plano de 66 dias com preview e regeneração via feedback
- **Language Teacher**: avalia gramática, vocabulário e fluência; modo de gravação para prática de pronúncia com score por palavra
- **Behavioral Coach**: identifica padrões de humor e sugere micro-ações

**Histórico** — visualização de entradas por dia (calendário) e lista de entradas recentes.

**Analytics** — heatmap de streak, taxa de conclusão, gráfico de humor e word cloud de erros de pronúncia.

**Configurações** — editar perfil (nome, bio, timezone), trocar idioma da interface, reiniciar tour, excluir conta.

**Internacionalização** — interface disponível em Português, Inglês e Espanhol. O idioma da interface é independente do idioma de estudo.

**Políticas de privacidade** — banner de cookies na primeira visita com modal de política completa; consentimento sincronizado com o backend após login.

---

## Arquitetura

```text
imm-web (Next.js App Router)
├── app/[locale]/              # Roteamento i18n via next-intl
│   ├── (landing)/             # Página pública de apresentação
│   ├── (auth)/                # Fluxos não-autenticados
│   │   ├── login/
│   │   ├── register/
│   │   ├── forgot-password/
│   │   ├── reset-password/
│   │   └── verify-email/
│   └── (app)/                 # Área autenticada (guarded por middleware)
│       ├── daily-lab/
│       ├── habits/
│       ├── history/
│       ├── analytics/
│       └── settings/
├── components/                # Componentes reutilizáveis
│   ├── ui/                    # Design system sobre Chakra UI v3
│   └── onboarding/            # Tour interativo (@zag-js/tour)
├── lib/                       # Serviços, hooks e utilitários
│   ├── hooks/                 # Domain hooks (useAuth, useOnboarding, etc.)
│   ├── *.service.ts           # Chamadas de API por domínio
│   └── endpoints.ts           # Mapa tipado de endpoints
└── providers/                 # React context providers
```

`imm-web` consome a API REST [`imm-api`](https://github.com/pedrolucazx/imm-api) através de hooks TanStack Query tipados — sem acesso direto ao banco de dados. Estado de autenticação é centralizado em `useAuth`.

---

## Stack de Tecnologias

| Camada                  | Tecnologia                               |
| ----------------------- | ---------------------------------------- |
| Framework               | Next.js 15 (App Router)                  |
| Linguagem               | TypeScript 5                             |
| Biblioteca de UI        | React 19                                 |
| Design System           | Chakra UI v3                             |
| Ícones                  | Phosphor Icons (`@phosphor-icons/react`) |
| HTTP / Estado           | TanStack Query v5 + Axios                |
| Formulários             | React Hook Form v7                       |
| Internacionalização     | next-intl v4                             |
| Tour / Onboarding       | `@zag-js/tour` v1 + `@zag-js/react`      |
| Testes Unit/Integration | Jest + React Testing Library + MSW       |
| Testes E2E              | Playwright (Chromium)                    |
| Deployment              | Vercel                                   |

---

## Estrutura do Projeto

```text
imm-web/
├── app/
│   └── [locale]/
│       ├── (landing)/
│       │   └── page.tsx                   # Landing page pública
│       ├── (auth)/
│       │   ├── login/page.tsx
│       │   ├── register/page.tsx
│       │   ├── forgot-password/page.tsx
│       │   ├── reset-password/page.tsx
│       │   └── verify-email/page.tsx
│       └── (app)/
│           ├── daily-lab/page.tsx         # Dashboard diário principal
│           ├── habits/page.tsx            # Listagem + wizard de criação
│           ├── history/page.tsx           # Histórico por dia + recentes
│           ├── analytics/page.tsx         # Métricas e progresso
│           └── settings/page.tsx          # Perfil, idioma, tour, excluir conta
├── components/
│   ├── onboarding/
│   │   ├── OnboardingTour.tsx             # Orquestrador (máquina Zag)
│   │   ├── OnboardingWrapper.tsx          # Provider de inicialização
│   │   ├── TourStep.tsx                   # Popover de cada step
│   │   └── TourBackdrop.tsx               # Overlay durante o tour
│   ├── daily-lab/                         # Checklist, JournalEditor, AIFeedbackPanel
│   ├── habits/                            # HabitCard, wizard (SkillPlanForm, etc.)
│   ├── Analytics/                         # StreakCalendar, WordCloudErrors, charts
│   └── ui/                                # Componentes Chakra customizados
├── lib/
│   ├── hooks/
│   │   ├── useAuth.ts                     # Auth state + token management
│   │   ├── useOnboarding.ts               # Tour state e controle
│   │   ├── useForgotPassword.ts
│   │   ├── useResetPassword.ts
│   │   ├── useVerifyEmail.ts
│   │   ├── usePronunciationRecorder.ts    # Gravação de áudio
│   │   └── useWordCloud.ts
│   ├── auth.service.ts
│   ├── journal.service.ts
│   ├── onboarding.service.ts
│   ├── pronunciation.service.ts
│   ├── analytics.service.ts
│   ├── endpoints.ts                       # Constantes de endpoints tipados
│   └── constants.ts
├── providers/                             # QueryClient, Chakra, AuthProvider
├── i18n/                                  # next-intl config + messages (pt-BR, en-US, es-ES)
├── styles/
│   └── theme.ts                           # Chakra UI theme customizado
├── types/                                 # Tipos TypeScript compartilhados
├── middleware.ts                          # Locale routing + auth guard
├── tests/
│   ├── __setup__/                         # Jest setup + MSW handlers
│   ├── unit/                              # Componentes e hooks
│   ├── integration/                       # Chamadas de API com MSW
│   └── e2e/                               # Playwright (Chromium)
├── .github/workflows/
│   ├── ci.yml
│   └── cd.yml
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
- Uma instância de [`imm-api`](https://github.com/pedrolucazx/imm-api) rodando (local ou remota)
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

> Certifique-se que `imm-api` está rodando em `http://localhost:3001` (ou ajuste `NEXT_PUBLIC_API_URL`).

---

## Variáveis de Ambiente

```env
# URL base da imm-api
# Local:    http://localhost:3001
# Produção: https://api.insidemymind.tech
NEXT_PUBLIC_API_URL=http://localhost:3001
```

| Variável              | Obrigatória | Descrição                     |
| --------------------- | ----------- | ----------------------------- |
| `NEXT_PUBLIC_API_URL` | Sim         | URL base do backend `imm-api` |

---

## Scripts Disponíveis

| Script                  | Descrição                                      |
| ----------------------- | ---------------------------------------------- |
| `yarn dev`              | Dev server Next.js                             |
| `yarn build`            | Build de produção                              |
| `yarn start`            | Inicia build compilado                         |
| `yarn lint`             | ESLint                                         |
| `yarn lint:fix`         | ESLint com auto-fix                            |
| `yarn format`           | Prettier em todos os arquivos                  |
| `yarn format:check`     | Verifica formatação sem escrever               |
| `yarn test`             | Unit + integration (Jest)                      |
| `yarn test:unit`        | Apenas testes unitários                        |
| `yarn test:integration` | Apenas testes de integração                    |
| `yarn test:e2e`         | E2E com Playwright (requer `yarn build` antes) |
| `yarn test:e2e:ui`      | Playwright com interface interativa            |
| `yarn test:watch`       | Jest em watch mode                             |
| `yarn test:coverage`    | Jest com relatório de cobertura                |
| `yarn commit`           | Conventional commit via Commitizen             |

---

## Testes

### Jest — Unit & Integration

| Suite         | Localização          | Descrição                                        |
| ------------- | -------------------- | ------------------------------------------------ |
| `unit`        | `tests/unit/`        | Componentes, hooks, funções puras                |
| `integration` | `tests/integration/` | Chamadas de API mockadas com MSW (sem rede real) |

```bash
yarn test
yarn test:unit
yarn test:integration
yarn test:coverage
```

### Playwright — E2E

Testes de navegador executando contra Chromium, com a aplicação compilada:

```bash
yarn build && yarn test:e2e
yarn test:e2e:ui   # UI interativa para desenvolvimento local
```

Configuração em [`playwright.config.ts`](playwright.config.ts): retries em CI, trace no primeiro retry, screenshots apenas em falha.

---

## Pipeline CI/CD

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

---

## Deployment

Deploy automático via Vercel. Ao fazer push para `main`, o CI roda e — após aprovação do Quality Gate — o pipeline CD dispara o deploy de produção.

| Ambiente | Branch | Alvo                        |
| -------- | ------ | --------------------------- |
| Produção | `main` | `https://insidemymind.tech` |

---

## Estratégia de Branches

```text
feature/* ──► develop ──► main (production)
                │               │
           CI obrigatório   admin-only merge
           (Quality Gate)   → deploy Vercel
```

- Todo trabalho vai para `develop` via pull requests
- `main` é protegida — apenas o admin pode fazer merge
- Branch protection exige que o check **Quality Gate** passe antes de qualquer merge

---

## Contribuindo

1. Crie uma branch a partir de `develop`: `git checkout -b feat/sua-feature develop`
2. Siga os padrões de componentes em `components/ui/` e hooks em `lib/hooks/`
3. Escreva testes — unitários para componentes/hooks, integração para chamadas de API
4. Verifique localmente: `yarn lint && yarn format:check && yarn test`
5. Faça commit com [Conventional Commits](https://www.conventionalcommits.org/):

   ```bash
   yarn commit
   ```

6. Abra um pull request direcionado para `develop`

**Chakra UI v3 — convenções:**

- Imports base: `@chakra-ui/react` | custom wrappers: `components/ui/`
- Props: `open`, `disabled`, `invalid`, `required` (não `isOpen`, `isDisabled`, etc.)
- Use `colorPalette` (não `colorScheme`), `VStack`/`HStack` normalmente
- Ícones: `@phosphor-icons/react` exclusivamente

Pre-commit hooks (Husky + lint-staged) executam lint e format antes de cada commit.

---

## Licença

MIT — veja [LICENSE](LICENSE).
