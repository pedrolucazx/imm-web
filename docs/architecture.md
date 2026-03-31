# Arquitetura — imm-web

Frontend do Inside My Mind. Aplicação Next.js 15 com App Router, internacionalização nativa e design system sobre Chakra UI v3.

---

## Visão Geral

```text
Browser
  │
  ▼
Next.js 15 (App Router)
  ├── middleware.ts          → Detecta locale + guarda rotas autenticadas
  ├── app/[locale]/          → Roteamento i18n
  │   ├── (landing)/         → Público
  │   ├── (auth)/            → Não-autenticado
  │   └── (app)/             → Autenticado
  │
  ├── components/            → UI reutilizável
  ├── lib/                   → Serviços e hooks
  └── providers/             → Contexto global
        │
        ▼
  imm-api (REST)
```

---

## Roteamento

### Estrutura de Route Groups

O App Router usa grupos de rotas para separar layouts e guards sem afetar a URL:

```
app/[locale]/
├── (landing)/                 # Layout mínimo — sem sidebar, sem auth
│   └── page.tsx               # /
├── (auth)/                    # Layout de auth card centralizado
│   ├── login/page.tsx         # /login
│   ├── register/page.tsx      # /register
│   ├── forgot-password/       # /forgot-password
│   ├── reset-password/        # /reset-password
│   └── verify-email/          # /verify-email
└── (app)/                     # Layout com sidebar — requer autenticação
    ├── daily-lab/page.tsx     # /daily-lab  (tela principal)
    ├── habits/page.tsx        # /habits
    ├── history/page.tsx       # /history
    ├── analytics/page.tsx     # /analytics
    └── settings/page.tsx      # /settings
```

### Internacionalização

Gerenciada por **next-intl v4**. O segmento `[locale]` no topo da árvore injeta o locale em todas as rotas. O `middleware.ts` detecta o locale preferido do browser e redireciona quando necessário.

Locales suportados: `pt-BR`, `en-US`, `es-ES`.

Mensagens ficam em `i18n/messages/[locale].json`. O locale da interface é independente do idioma de estudo do hábito.

### Guards de autenticação

O `middleware.ts` verifica a presença do `accessToken` no storage. Rotas do grupo `(app)/` redirecionam para `/login` sem token. Rotas do grupo `(auth)/` redirecionam para `/daily-lab` com token válido.

---

## Camada de Estado e Dados

### TanStack Query

Todo acesso ao servidor passa por **TanStack Query v5**. Não há fetch direto em componentes. O `QueryClient` é configurado no `providers/QueryProvider.tsx` com staleTime e retry globais.

```typescript
// Padrão de uso
const { data, isLoading } = useQuery({
  queryKey: ["habits"],
  queryFn: () => habitService.list(),
});

const mutation = useMutation({
  mutationFn: habitService.create,
  onSuccess: () => queryClient.invalidateQueries({ queryKey: ["habits"] }),
});
```

### Serviços

Cada domínio tem um arquivo de serviço em `lib/` que encapsula as chamadas Axios. Os serviços não fazem cache — isso é responsabilidade dos hooks TanStack Query.

```
lib/
├── auth.service.ts            # login, register, refresh, logout, forgot/reset password
├── journal.service.ts         # createEntry, getEntries, getByDate
├── onboarding.service.ts      # getStatus, updateStep, complete
├── pronunciation.service.ts   # getUploadUrl, analyze, getWordCloud
├── analytics.service.ts       # getSummary
├── habit-utils.ts             # Utilitários de cálculo de streak e fases
└── endpoints.ts               # Constantes tipadas de endpoints da API
```

### Autenticação (`useAuth`)

Estado de autenticação centralizado em `lib/hooks/useAuth.ts`:

- Armazena `accessToken` em memória (não em localStorage — segurança)
- Refresh automático via interceptor Axios antes de cada requisição expirada
- `logout()` limpa estado + invalida queries + redireciona

```typescript
const { user, isAuthenticated, login, logout } = useAuth();
```

---

## Design System

### Chakra UI v3

O design system é construído sobre **Chakra UI v3** com customizações no `styles/theme.ts`.

**Convenções obrigatórias:**

| Padrão               | Correto                       | Incorreto                             |
| -------------------- | ----------------------------- | ------------------------------------- |
| Props booleanas      | `disabled`, `invalid`, `open` | `isDisabled`, `isInvalid`             |
| Paleta de cores      | `colorPalette="blue"`         | `colorScheme="blue"`                  |
| Stacks               | `VStack`, `HStack`            | `Stack direction="column"`            |
| Box com display flex | `<Box display="flex">`        | `<Flex>` com SystemStyleObject spread |
| Aplicação de estilos | `<Text {...s.title}>`         | `<Text css={s.title}>`                |
| Nested CSS           | `css={{ "& svg": { ... } }}`  | inline style prop                     |
| Tokens semânticos    | `"mutedFg"`                   | `"{colors.mutedFg}"`                  |

**Componentes do design system (`components/ui/`):**

Wrappers sobre snippets do Chakra CLI com customizações do projeto:

```
components/ui/
├── provider.tsx               # ChakraProvider + ColorModeProvider
├── toaster.tsx                # toaster.create() — nunca useToast()
├── tooltip.tsx
├── password-input.tsx
├── score-line-chart.tsx
└── field-wrapper.tsx          # Wrapper padrão para campos de formulário
```

**FieldWrapper** — wrapper padrão para todos os campos de formulário: deriva `invalid` de `error`, sempre renderiza `ErrorText` com `visibility: hidden` (previne layout shift).

**Ícones:** exclusivamente `@phosphor-icons/react`. Nunca `@chakra-ui/icons`.

---

## Componentes por Domínio

### `components/onboarding/`

Tour interativo construído sobre **@zag-js/tour**:

```
OnboardingWrapper.tsx          # Provider — verifica se é primeira sessão → dispara tour
OnboardingTour.tsx             # Máquina Zag — orquestra os 6 steps
TourStep.tsx                   # Popover posicionado via Zag (Welcome, Habits, DailyLab, Journal, Analytics, Finish)
TourBackdrop.tsx               # Overlay escurecido durante o tour
TourStep.styles.ts
```

**Fluxo:**

1. `OnboardingWrapper` checa `onboarding.currentStep` via `useOnboarding`
2. Se não completado, inicializa a máquina Zag
3. Cada step tem um `data-tour="[id]"` no elemento alvo da página
4. Ao finalizar, `onboarding.service.complete()` persiste `completedAt` na API

### `components/daily-lab/`

```
HabitChecklist/                # Toggle de conclusão por hábito + tarefa do dia
JournalEditor/                 # Editor de texto + gravador de áudio + sliders humor/energia
AIFeedbackPanel/               # Painel de feedback — rota para LanguageTeacherPanel ou BehavioralCoachPanel
```

O `JournalEditor` tem dois modos controlados por toggle:

- **Escrever**: textarea com placeholder no idioma-alvo
- **Gravar**: `usePronunciationRecorder` gerencia o ciclo MediaRecorder → upload → análise

### `components/habits/wizard/`

```
SkillCard.tsx                  # Seleção do tipo de hábito
SkillPlanForm.tsx              # Formulário de plano para hábitos de idioma
TrackingOptionsForm.tsx        # Opção de plano leve ou sem plano (hábitos comportamentais)
PlanReviewPanel.tsx            # Preview do plano + campo de feedback para regeneração
HabitCreationWizard.tsx        # Orquestrador dos 3 passos
```

### `components/Analytics/`

```
StreakCalendar/                # Heatmap GitHub-style via react-calendar-heatmap
HabitStatsGrid/                # Cards de overview (taxa conclusão, média de palavras)
WordCloudErrors/               # Word cloud de erros de pronúncia acumulados
```

---

## Logging

`logger` de `@/lib/logger` (consola). **Nunca `console.*`** em nenhuma parte do código.

```typescript
import { logger } from "@/lib/logger";
logger.info("mensagem");
logger.error("erro", error);
```

---

## Testes

### Estratégia

| Suite         | Runner     | O que testa                                           |
| ------------- | ---------- | ----------------------------------------------------- |
| `unit`        | Jest + RTL | Renderização, eventos, lógica de hooks, funções puras |
| `integration` | Jest + MSW | Chamadas de API completas mockadas sem rede real      |
| `e2e`         | Playwright | Fluxos de usuário completos no navegador Chromium     |

### MSW (Mock Service Worker)

Handlers MSW ficam em `tests/__setup__/msw/handlers.ts`. Nos testes de integração, o MSW intercepta as chamadas Axios antes de chegarem à rede — sem servidor real necessário.

### Playwright

Testes E2E em `tests/e2e/` rodam contra o servidor Next.js compilado (`yarn build`). Nunca contra o dev server — o build garante que o output de produção seja testado.

```bash
yarn build && yarn test:e2e        # CI
yarn test:e2e:ui                   # Local com UI interativa
```

---

## Providers e Contexto

```
providers/
├── QueryProvider.tsx              # QueryClient TanStack com configuração global
├── AuthProvider.tsx               # useAuth state + interceptors Axios
└── ChakraProvider (via ui/provider.tsx)
```

Ordem de composição em `app/[locale]/layout.tsx`:

```tsx
<ChakraProvider>
  <QueryProvider>
    <AuthProvider>
      <OnboardingWrapper>{children}</OnboardingWrapper>
    </AuthProvider>
  </QueryProvider>
</ChakraProvider>
```

---

## Pipeline de Build

```text
yarn build
    │
    ├── TypeScript check (tsc --noEmit)
    ├── Next.js compilation
    │   ├── Static pages (landing, auth)
    │   └── Server components + client bundles
    └── Output: .next/
```

Em CI, o build é executado no step de testes (obrigatório para E2E Playwright) e novamente no deploy Vercel.
