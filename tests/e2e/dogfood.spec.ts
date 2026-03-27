/**
 * DOGFOOD — Exploração de criação de hábitos
 * Usuário: dogfood@imm.test / Dogfood@2109
 *
 * Cenários:
 *  1. Inglês  — skill-building, plano IA, gosta → confirma
 *  2. Fitness — behavioral, sem plano (tracking manual)
 *  3. Espanhol — skill-building, plano IA, não gosta → feedback → regenera → confirma
 */

import { test, expect, type Page, type BrowserContext } from "@playwright/test";
import { CONSENT_KEY, CONSENT_VERSION } from "@/lib/consent-constants";
import * as fs from "fs";
import * as path from "path";

// ─── Config ──────────────────────────────────────────────────────────────────
const EMAIL = "dogfood@imm.test";
const PASSWORD = "Dogfood@2109";
const OUT_DIR = path.join(__dirname, "dogfood");
const API_URL = "http://localhost:3001";

const CONSENT_DATA = JSON.stringify({
  version: CONSENT_VERSION,
  timestamp: new Date().toISOString(),
  accepted: true,
});

// ─── Bug tracking ────────────────────────────────────────────────────────────
interface BugEntry {
  scenario: string;
  step: string;
  severity: "critical" | "major" | "minor" | "info";
  description: string;
  screenshot?: string;
}

const bugs: BugEntry[] = [];
const consoleErrors: { scenario: string; msg: string }[] = [];

function logBug(entry: BugEntry) {
  bugs.push(entry);
  console.log(
    `\n🐛 [${entry.severity.toUpperCase()}] ${entry.scenario} — ${entry.step}\n   ${entry.description}`
  );
}

// ─── Helpers ─────────────────────────────────────────────────────────────────
async function shot(page: Page, name: string): Promise<string> {
  const file = path.join(OUT_DIR, `${name}.png`);
  await page.screenshot({ path: file, fullPage: false });
  return file;
}

async function setupPage(page: Page, context: BrowserContext, scenario: string) {
  // Capture console errors
  page.on("console", (m) => {
    if (m.type() === "error") consoleErrors.push({ scenario, msg: m.text() });
  });
  page.on("pageerror", (err) => {
    logBug({
      scenario,
      step: "runtime",
      severity: "critical",
      description: `JS exception: ${err.message}`,
    });
  });

  // Set consent via localStorage
  await page.goto("/pt-BR/");
  await page.evaluate(({ key, value }) => localStorage.setItem(key, value), {
    key: CONSENT_KEY,
    value: CONSENT_DATA,
  });
  await page.reload();
  await page.waitForLoadState("networkidle");
}

async function login(page: Page, scenario: string) {
  await page.goto("/pt-BR/login");
  await page.waitForLoadState("networkidle");

  await page.getByLabel(/e-mail/i).fill(EMAIL);
  await page.locator('input[type="password"]').fill(PASSWORD);

  const t0 = Date.now();
  await page.getByRole("button", { name: /entrar/i }).click();

  try {
    await page.waitForURL(/\/daily-lab/, { timeout: 15000 });
    console.log(`✓ [${scenario}] Login OK (${Date.now() - t0}ms)`);
  } catch {
    const file = await shot(page, `${scenario}-login-fail`);
    logBug({
      scenario,
      step: "login",
      severity: "critical",
      description: `Login não redirecionou para /daily-lab em 15s. URL: ${page.url()}`,
      screenshot: file,
    });
    throw new Error("Login failed");
  }
}

async function goToHabits(page: Page, scenario: string) {
  // Use client-side nav to preserve auth context
  const link = page.getByRole("link", { name: /hábitos/i });
  if (await link.isVisible()) {
    await link.click();
  } else {
    await page.goto("/pt-BR/habits");
  }

  const indicator = page
    .getByText("Nenhum hábito ainda")
    .or(page.getByText(/DIA \d+\/66/))
    .first();
  try {
    await expect(indicator).toBeVisible({ timeout: 20000 });
    console.log(`✓ [${scenario}] Página de hábitos carregada`);
  } catch {
    const file = await shot(page, `${scenario}-habits-load-fail`);
    logBug({
      scenario,
      step: "carregar hábitos",
      severity: "major",
      description: "Indicador de estado (vazio ou DIA X/66) não apareceu em 20s",
      screenshot: file,
    });
  }
}

async function waitForPlan(page: Page, scenario: string, attempt = "1ª") {
  // Loading spinner should appear first
  try {
    await expect(page.getByText(/gerando seu plano/i)).toBeVisible({ timeout: 10000 });
    console.log(`  ⏳ [${scenario}] Gerando plano... (${attempt} tentativa)`);
  } catch {
    const file = await shot(page, `${scenario}-no-loading-${attempt}`);
    logBug({
      scenario,
      step: `loading state (${attempt})`,
      severity: "minor",
      description:
        'Texto "gerando seu plano" não apareceu — spinner ausente ou plano retornou instantaneamente',
      screenshot: file,
    });
  }

  // Wait for AI response
  try {
    await expect(page.getByText(/plano gerado pela ia/i)).toBeVisible({ timeout: 90000 });
    console.log(`  ✓ [${scenario}] Plano IA recebido (${attempt} tentativa)`);
    await shot(page, `${scenario}-plan-received-${attempt}`);
  } catch {
    const file = await shot(page, `${scenario}-plan-timeout-${attempt}`);
    logBug({
      scenario,
      step: `plano IA (${attempt})`,
      severity: "critical",
      description: '"plano gerado pela ia" não apareceu em 90s — possível erro de IA ou timeout',
      screenshot: file,
    });
    throw new Error("Plan not received");
  }
}

// ─── Delete all habits before starting ───────────────────────────────────────
async function deleteAllHabits() {
  const loginRes = await fetch(`${API_URL}/api/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email: EMAIL, password: PASSWORD }),
  });
  const { token } = (await loginRes.json()) as { token: string };
  const habitsRes = await fetch(`${API_URL}/api/habits`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  const habits = (await habitsRes.json()) as { id: string }[];
  if (!Array.isArray(habits)) return;
  await Promise.all(
    habits.map((h) =>
      fetch(`${API_URL}/api/habits/${h.id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      })
    )
  );
  console.log(`🗑  Deleted ${habits.length} existing habit(s)`);
}

// ─── Suite ───────────────────────────────────────────────────────────────────
test.describe.serial("Dogfood — Criação de Hábitos", () => {
  test.beforeAll(async () => {
    fs.mkdirSync(OUT_DIR, { recursive: true });
    await deleteAllHabits();
  });

  // ── Cenário 1: Inglês com plano, gosta, confirma ─────────────────────────
  test("cenário 1 — Inglês com plano IA (gosta, confirma)", async ({ page, context }) => {
    const S = "c1-ingles";
    await setupPage(page, context, S);
    await login(page, S);
    await shot(page, `${S}-daily-lab`);
    await goToHabits(page, S);

    // Abrir wizard
    const btnNovo = page
      .getByRole("button", { name: /criar primeiro hábito|novo hábito/i })
      .first();
    await expect(btnNovo).toBeVisible({ timeout: 5000 });
    await btnNovo.click();
    await expect(page.getByText("✨ Novo Hábito")).toBeVisible({ timeout: 5000 });
    await shot(page, `${S}-wizard-open`);

    // Step 1 — nome + língua
    await page.getByLabel(/nome do hábito/i).fill("Praticar Inglês Todos os Dias");
    const btnIngles = page.getByRole("button", { name: /inglês/i });
    await expect(btnIngles).toBeVisible({ timeout: 5000 });
    await btnIngles.click();
    await shot(page, `${S}-step1`);

    // Verificar se botão de idioma ficou selecionado visualmente
    const isSelected = await btnIngles.getAttribute("aria-checked");
    if (isSelected !== "true") {
      logBug({
        scenario: S,
        step: "seleção de idioma",
        severity: "major",
        description: `Botão "Inglês" clicado mas aria-checked=${isSelected} (esperado "true")`,
      });
    }

    await page.getByRole("button", { name: /próximo →/i }).click();

    // Step 2 — SkillPlanForm
    await page
      .getByLabel(/dificuldades e objetivos/i)
      .fill("Trava ao falar inglês. Vocabulário limitado para tópicos profissionais.");
    await shot(page, `${S}-step2`);
    await page.getByRole("button", { name: /gerar meu plano/i }).click();

    // Step 3 — aguarda plano
    await waitForPlan(page, S, "1ª");

    // Verificar se botões de ação estão presentes
    const btnRegen = page.getByRole("button", { name: /regenerar/i });
    const btnConfirm = page.getByRole("button", { name: /confirmar e criar/i });
    await expect(btnRegen).toBeVisible({ timeout: 5000 });
    await expect(btnConfirm).toBeVisible({ timeout: 5000 });
    await shot(page, `${S}-plan-actions`);

    // Confirma sem regenerar
    await btnConfirm.click();
    try {
      await expect(page.getByText("Praticar Inglês Todos os Dias").first()).toBeVisible({
        timeout: 15000,
      });
      console.log(`✓ [${S}] Hábito criado e apareceu na lista`);
      await shot(page, `${S}-habit-created`);
    } catch {
      const file = await shot(page, `${S}-habit-missing`);
      logBug({
        scenario: S,
        step: "hábito criado",
        severity: "critical",
        description: '"Praticar Inglês Todos os Dias" não apareceu na lista após confirmar',
        screenshot: file,
      });
    }
  });

  // ── Cenário 2: Fitness sem plano ─────────────────────────────────────────
  test("cenário 2 — Fitness sem plano (tracking manual)", async ({ page, context }) => {
    const S = "c2-fitness";
    await setupPage(page, context, S);
    await login(page, S);
    await goToHabits(page, S);

    // Abrir wizard (já existe 1 hábito → botão "+ Novo Hábito")
    const btnNovo = page.getByRole("button", { name: /novo hábito/i }).first();
    await expect(btnNovo).toBeVisible({ timeout: 5000 });
    await btnNovo.click();
    await expect(page.getByText("✨ Novo Hábito")).toBeVisible({ timeout: 5000 });

    // Step 1
    await page.getByLabel(/nome do hábito/i).fill("Treinar na Academia");
    await page.getByRole("button", { name: /fitness/i }).click();
    await shot(page, `${S}-step1`);
    await page.getByRole("button", { name: /próximo →/i }).click();

    // Step 2 — TrackingOptionsForm (sem plano por padrão para behavioral)
    const msgTracking = page.getByText(/entendido! você vai rastrear/i);
    try {
      await expect(msgTracking).toBeVisible({ timeout: 8000 });
      console.log(`✓ [${S}] Modo tracking manual confirmado`);
      await shot(page, `${S}-step2-tracking`);
    } catch {
      const file = await shot(page, `${S}-step2-unexpected`);
      logBug({
        scenario: S,
        step: "step 2 tracking",
        severity: "major",
        description:
          'Mensagem "entendido! você vai rastrear" não apareceu — step 2 pode ter mudado',
        screenshot: file,
      });
    }

    await page.getByRole("button", { name: /^próximo →$/i }).click();

    // Step 3 — confirmar sem plano
    const btnConfirm = page.getByRole("button", { name: /confirmar e criar/i });
    await expect(btnConfirm).toBeVisible({ timeout: 5000 });
    await shot(page, `${S}-step3`);
    await btnConfirm.click();

    try {
      await expect(page.getByText("Treinar na Academia").first()).toBeVisible({ timeout: 10000 });
      console.log(`✓ [${S}] Hábito criado e apareceu na lista`);
      await shot(page, `${S}-habit-created`);
    } catch {
      const file = await shot(page, `${S}-habit-missing`);
      logBug({
        scenario: S,
        step: "hábito criado",
        severity: "critical",
        description: '"Treinar na Academia" não apareceu na lista após confirmar',
        screenshot: file,
      });
    }
  });

  // ── Cenário 3: Espanhol com plano, não gosta, feedback, regenera ─────────
  test("cenário 3 — Espanhol com plano IA (não gosta, regenera)", async ({ page, context }) => {
    const S = "c3-espanhol";
    await setupPage(page, context, S);
    await login(page, S);
    await goToHabits(page, S);

    const btnNovo = page.getByRole("button", { name: /novo hábito/i }).first();
    await expect(btnNovo).toBeVisible({ timeout: 5000 });
    await btnNovo.click();
    await expect(page.getByText("✨ Novo Hábito")).toBeVisible({ timeout: 5000 });

    // Step 1
    await page.getByLabel(/nome do hábito/i).fill("Aprender Espanhol");
    await page.getByRole("button", { name: /espanhol/i }).click();
    await shot(page, `${S}-step1`);
    await page.getByRole("button", { name: /próximo →/i }).click();

    // Step 2
    await page
      .getByLabel(/dificuldades e objetivos/i)
      .fill("Nunca estudei espanhol formalmente. Quero começar do zero.");
    await page.getByRole("button", { name: /gerar meu plano/i }).click();

    // Step 3 — 1º plano
    await waitForPlan(page, S, "1ª");

    // Aguarda cooldown do rate-limit da IA (5s)
    await page.waitForTimeout(6000);

    // Inspecionar campo de feedback
    const feedbackField = page.getByPlaceholder(/ex: as tarefas/i);
    const isFeedbackVisible = await feedbackField.isVisible();
    if (!isFeedbackVisible) {
      const file = await shot(page, `${S}-no-feedback-field`);
      logBug({
        scenario: S,
        step: "campo de feedback",
        severity: "major",
        description: "Campo de feedback não está visível após o plano ser gerado",
        screenshot: file,
      });
    }

    await feedbackField.fill(
      "As tarefas eram longas demais para o meu nível. Preciso de algo mais curto para começar."
    );
    await shot(page, `${S}-feedback-filled`);

    // Regenerar
    const btnRegen = page.getByRole("button", { name: /regenerar/i });
    await btnRegen.click();
    console.log(`  🔄 [${S}] Clicou em Regenerar`);

    // Aguarda 2º plano
    await waitForPlan(page, S, "2ª");

    // Confirmar
    const btnConfirm = page.getByRole("button", { name: /confirmar e criar/i });
    await expect(btnConfirm).toBeVisible({ timeout: 5000 });
    await btnConfirm.click();

    try {
      await expect(page.getByText("Aprender Espanhol").first()).toBeVisible({ timeout: 30000 });
      console.log(`✓ [${S}] Hábito criado e apareceu na lista`);
      await shot(page, `${S}-habit-created`);
    } catch {
      const file = await shot(page, `${S}-habit-missing`);
      logBug({
        scenario: S,
        step: "hábito criado",
        severity: "critical",
        description: '"Aprender Espanhol" não apareceu na lista após confirmar plano regenerado',
        screenshot: file,
      });
    }

    // Verificar lista final: 3 hábitos
    await shot(page, `${S}-final-list`);
  });

  // ── Relatório final ───────────────────────────────────────────────────────
  test.afterAll(async () => {
    const reportPath = path.join(OUT_DIR, "report.md");
    const lines: string[] = [
      "# Dogfood Report — Criação de Hábitos",
      `\n**Data:** ${new Date().toISOString()}`,
      `**Usuário:** ${EMAIL}`,
      "\n## Bugs Encontrados\n",
    ];

    if (bugs.length === 0) {
      lines.push("✅ Nenhum bug encontrado nos 3 cenários.");
    } else {
      const bySeverity = ["critical", "major", "minor", "info"] as const;
      for (const sev of bySeverity) {
        const group = bugs.filter((b) => b.severity === sev);
        if (group.length === 0) continue;
        lines.push(`### ${sev.toUpperCase()} (${group.length})\n`);
        for (const b of group) {
          lines.push(`**[${b.scenario}] ${b.step}**`);
          lines.push(`> ${b.description}`);
          if (b.screenshot) lines.push(`Screenshot: \`${b.screenshot}\``);
          lines.push("");
        }
      }
    }

    if (consoleErrors.length > 0) {
      lines.push("\n## Erros de Console\n");
      const unique = [...new Set(consoleErrors.map((e) => `[${e.scenario}] ${e.msg}`))];
      unique.slice(0, 20).forEach((e) => lines.push(`- ${e}`));
    }

    fs.writeFileSync(reportPath, lines.join("\n"));
    console.log(`\n📋 Report salvo em: ${reportPath}`);
    console.log(`🐛 Total de bugs: ${bugs.length}`);
    console.log(
      `⚠️  Erros de console únicos: ${[...new Set(consoleErrors.map((e) => e.msg))].length}`
    );
  });
});
