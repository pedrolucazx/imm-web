import { test, expect, type Page } from "@playwright/test";
import { CONSENT_KEY, CONSENT_VERSION } from "@/lib/consent-constants";

const CONSENT_DATA = JSON.stringify({
  version: CONSENT_VERSION,
  timestamp: new Date().toISOString(),
  accepted: true,
});

const E2E_EMAIL = process.env.E2E_EMAIL ?? "niwimo6438@jsncos.com";
const E2E_PASSWORD = process.env.E2E_PASSWORD ?? "";

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

async function setConsent(page: Page) {
  await page.goto("/pt-BR/");
  await page.evaluate(({ key, value }) => localStorage.setItem(key, value), {
    key: CONSENT_KEY,
    value: CONSENT_DATA,
  });
  await page.reload();
  await page.waitForLoadState("networkidle");
}

async function login(page: Page) {
  await page.goto("/pt-BR/login");
  await page.getByLabel(/e-mail/i).fill(E2E_EMAIL);
  await page.locator('input[type="password"]').fill(E2E_PASSWORD);
  await page.getByRole("button", { name: /entrar →/i }).click();
  await page.waitForURL(/\/daily-lab/, { timeout: 15000 });
}

async function goToHabits(page: Page) {
  // Client-side navigation to preserve the auth context already initialized after login
  await page.getByRole("link", { name: /hábitos/i }).click();
  // Wait for habits API to resolve: either empty state or a habit card must appear
  await expect(
    page
      .getByText("Nenhum hábito ainda")
      .or(page.getByText(/DIA \d+\/66/))
      .first()
  ).toBeVisible({ timeout: 20000 });
}

async function openWizard(page: Page, fromEmptyState = false) {
  if (fromEmptyState) {
    await page.getByRole("button", { name: /criar primeiro hábito/i }).click();
  } else {
    await page.getByRole("button", { name: /\+ novo hábito/i }).click();
  }
  await expect(page.getByText("✨ Novo Hábito")).toBeVisible();
}

async function waitForPlan(page: Page) {
  // Loading state appears first
  await expect(page.getByText(/gerando seu plano/i)).toBeVisible({ timeout: 10000 });
  // Wait for AI to return the plan (can take up to 60s)
  await expect(page.getByText(/plano gerado pela ia/i)).toBeVisible({ timeout: 60000 });
}

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001";

async function deleteAllHabitsViaApi() {
  const loginRes = await fetch(`${API_URL}/api/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email: E2E_EMAIL, password: E2E_PASSWORD }),
  });
  const { token } = (await loginRes.json()) as { token: string };

  const habitsRes = await fetch(`${API_URL}/api/habits`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  const habits = (await habitsRes.json()) as { id: string }[];

  await Promise.all(
    habits.map((h) =>
      fetch(`${API_URL}/api/habits/${h.id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      })
    )
  );
}

// ---------------------------------------------------------------------------
// Suite
// ---------------------------------------------------------------------------

test.describe.serial("Criação de hábitos — fluxo completo", () => {
  test.skip(!E2E_PASSWORD, "Defina a variável E2E_PASSWORD para rodar este teste");

  test.beforeAll(async () => {
    await deleteAllHabitsViaApi();
  });

  test.beforeEach(async ({ page }) => {
    await setConsent(page);
    await login(page);
    await goToHabits(page);
  });

  // -------------------------------------------------------------------------
  // Cenário 1: hábito de idioma (skill-building) com plano — usuário gosta
  // -------------------------------------------------------------------------
  test("hábito 1 — Inglês com plano, gosta e confirma sem regenerar", async ({ page }) => {
    await openWizard(page);

    // Step 1 — nome + habilidade
    await page.getByLabel(/nome do hábito/i).fill("Praticar Inglês Todos os Dias");
    await page.getByRole("button", { name: /inglês/i }).click();
    await page.getByRole("button", { name: /próximo →/i }).click();

    // Step 2 — SkillPlanForm (plano obrigatório para skill-building)
    await page
      .getByLabel(/dificuldades e objetivos/i)
      .fill("Trava ao falar inglês. Vocabulário limitado para tópicos profissionais.");
    await page.getByRole("button", { name: /gerar meu plano/i }).click();

    // Step 3 — aguarda plano da IA
    await waitForPlan(page);

    // Gostou — confirma direto sem regenerar
    await expect(page.getByRole("button", { name: /regenerar/i })).toBeVisible();
    await page.getByRole("button", { name: /confirmar e criar/i }).click();

    // Hábito deve aparecer na lista
    await expect(page.getByText("Praticar Inglês Todos os Dias").first()).toBeVisible({
      timeout: 15000,
    });
  });

  // -------------------------------------------------------------------------
  // Cenário 2: hábito comportamental sem plano (tracking manual)
  // -------------------------------------------------------------------------
  test("hábito 2 — Fitness sem plano", async ({ page }) => {
    await openWizard(page);

    // Step 1
    await page.getByLabel(/nome do hábito/i).fill("Treinar na Academia");
    await page.getByRole("button", { name: /fitness/i }).click();
    await page.getByRole("button", { name: /próximo →/i }).click();

    // Step 2 — TrackingOptionsForm, toggle wantPlan OFF (padrão)
    await expect(page.getByText(/entendido! você vai rastrear/i)).toBeVisible();
    await page.getByRole("button", { name: /^próximo →$/i }).click();

    // Step 3 — sem plano, botão de confirmar já está disponível
    await expect(page.getByRole("button", { name: /confirmar e criar/i })).toBeVisible();
    await page.getByRole("button", { name: /confirmar e criar/i }).click();

    // Hábito deve aparecer na lista
    await expect(page.getByText("Treinar na Academia").first()).toBeVisible({ timeout: 15000 });
  });

  // -------------------------------------------------------------------------
  // Cenário 3: hábito de idioma (skill-building) com plano — não gosta, dá feedback e regenera
  // -------------------------------------------------------------------------
  test("hábito 3 — Espanhol com plano, não gosta, fornece feedback e regenera", async ({
    page,
  }) => {
    await openWizard(page);

    // Step 1 — skill-building obriga plano, sem toggle necessário
    await page.getByLabel(/nome do hábito/i).fill("Aprender Espanhol");
    await page.getByRole("button", { name: /espanhol/i }).click();
    await page.getByRole("button", { name: /próximo →/i }).click();

    // Step 2 — SkillPlanForm (plano obrigatório)
    await page
      .getByLabel(/dificuldades e objetivos/i)
      .fill("Nunca estudei espanhol formalmente. Quero começar do zero.");
    await page.getByRole("button", { name: /gerar meu plano/i }).click();

    // Step 3 — aguarda plano da IA
    await waitForPlan(page);

    // Aguarda o rate-limit do backend (5s entre requests de IA) antes de regenerar
    await page.waitForTimeout(6000);

    // Não gostou — preenche feedback (placeholder real: "Ex: as tarefas diárias...") e regenera
    await page
      .getByPlaceholder(/ex: as tarefas/i)
      .fill(
        "As tarefas eram longas demais para o meu nível. Preciso de algo mais curto para começar."
      );
    await page.getByRole("button", { name: /regenerar/i }).click();

    // Aguarda o novo plano gerado com o feedback
    await waitForPlan(page);

    // Confirma o plano regenerado (garante que não há erro de rate-limit antes de clicar)
    await expect(page.getByRole("button", { name: /confirmar e criar/i })).toBeVisible({
      timeout: 10000,
    });
    await page.getByRole("button", { name: /confirmar e criar/i }).click();

    // Hábito deve aparecer na lista
    await expect(page.getByText("Aprender Espanhol").first()).toBeVisible({ timeout: 30000 });
  });
});
