/**
 * DOGFOOD — Daily Lab
 * Usuário: dogfood@imm.test / Dogfood@2109
 * Pré-condição: usuário já tem 3 hábitos criados (Inglês, Fitness, Espanhol)
 *
 * Cenários:
 *  1. Inglês  — selecionar hábito, escrever em inglês, analisar, verificar Language Teacher Panel
 *  2. Fitness — selecionar hábito, escrever check-in, analisar, verificar Behavioral Coach Panel
 *  3. Espanhol — selecionar hábito, escrever em espanhol, analisar, verificar Language Teacher Panel
 *  4. Edge cases — botão desabilitado com campo vazio, checklist conta corretamente
 */

import { test, expect, type Page, type BrowserContext } from "@playwright/test";
import { CONSENT_KEY, CONSENT_VERSION } from "@/lib/consent-constants";
import * as fs from "fs";
import * as path from "path";

// ─── Config ──────────────────────────────────────────────────────────────────
const EMAIL = "dogfood@imm.test";
const PASSWORD = "Dogfood@2109";
const OUT_DIR = path.join(__dirname, "dogfood-daily-lab");
const API_URL = "http://localhost:3001";

const CONSENT_DATA = JSON.stringify({
  version: CONSENT_VERSION,
  timestamp: new Date().toISOString(),
  accepted: true,
});

// ─── Bug tracking ─────────────────────────────────────────────────────────────
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
  fs.mkdirSync(OUT_DIR, { recursive: true });
  const file = path.join(OUT_DIR, `${name}.png`);
  await page.screenshot({ path: file, fullPage: false });
  return file;
}

async function setupPage(page: Page, _context: BrowserContext, scenario: string) {
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

  await page.getByRole("button", { name: /entrar/i }).click();
  try {
    await page.waitForURL(/\/daily-lab/, { timeout: 15000 });
    console.log(`✓ [${scenario}] Login OK`);
  } catch {
    const file = await shot(page, `${scenario}-login-fail`);
    logBug({
      scenario,
      step: "login",
      severity: "critical",
      description: `Login não redirecionou para /daily-lab. URL: ${page.url()}`,
      screenshot: file,
    });
    throw new Error("Login failed");
  }
}

async function goToDailyLab(page: Page, scenario: string) {
  const link = page.getByRole("link", { name: /daily lab/i });
  if (await link.isVisible()) {
    await link.click();
  } else {
    await page.goto("/pt-BR/daily-lab");
  }
  try {
    await expect(page.getByText(/hábitos \(/i)).toBeVisible({ timeout: 15000 });
    console.log(`✓ [${scenario}] Daily Lab carregada`);
  } catch {
    const file = await shot(page, `${scenario}-daily-lab-fail`);
    logBug({
      scenario,
      step: "carregar daily lab",
      severity: "critical",
      description: "Checklist de hábitos não apareceu",
      screenshot: file,
    });
  }
}

async function selectHabit(page: Page, scenario: string, habitNamePattern: RegExp) {
  const btn = page.getByRole("button", { name: habitNamePattern }).first();
  try {
    await expect(btn).toBeVisible({ timeout: 10000 });
    await btn.click();
    console.log(`✓ [${scenario}] Hábito selecionado: ${habitNamePattern}`);
    await page.waitForTimeout(500);
  } catch {
    const file = await shot(page, `${scenario}-select-fail`);
    logBug({
      scenario,
      step: "selecionar hábito",
      severity: "major",
      description: `Botão do hábito "${habitNamePattern}" não encontrado`,
      screenshot: file,
    });
    throw new Error("Habit not found");
  }
}

async function writeAndSubmitJournal(
  page: Page,
  scenario: string,
  content: string,
  moodIdx: number, // 1-5
  energyIdx: number // 1-5
): Promise<"submitted" | "already-exists"> {
  // Se já existe um registro de hoje, retornar sem tentar submeter
  const existingEntryLabel = page.getByText("Seu Registro", { exact: true });
  if (await existingEntryLabel.isVisible({ timeout: 2000 }).catch(() => false)) {
    console.log(`  ℹ️  [${scenario}] Entrada já existe — pulando submissão, verificando feedback`);
    return "already-exists";
  }

  // Verificar que o textarea existe
  const textarea = page.getByRole("textbox").first();
  try {
    await expect(textarea).toBeVisible({ timeout: 8000 });
  } catch {
    const file = await shot(page, `${scenario}-no-textarea`);
    logBug({
      scenario,
      step: "textarea do diário",
      severity: "critical",
      description: "Textarea do diário não está visível após selecionar hábito",
      screenshot: file,
    });
    throw new Error("Textarea not found");
  }

  // Edge case: botão "Enviar para IA" deve estar desabilitado com campo vazio
  const saveBtn = page.getByRole("button", { name: /enviar para ia/i });
  const isDisabled = await saveBtn.isDisabled();
  if (!isDisabled) {
    logBug({
      scenario,
      step: "botão submit com campo vazio",
      severity: "major",
      description: 'Botão "Enviar para IA" NÃO está desabilitado com o campo de texto vazio',
    });
  } else {
    console.log(`✓ [${scenario}] Botão desabilitado com campo vazio ✔`);
  }

  // Preencher conteúdo
  await textarea.fill(content);
  await shot(page, `${scenario}-journal-filled`);

  // Verificar contador de palavras (ex: "5 palavras") — locator específico para evitar ambiguidade
  const wordCountEl = page.getByText(/^\d+ palavras?$/i);
  const hasWordCount = await wordCountEl.isVisible();
  if (!hasWordCount) {
    logBug({
      scenario,
      step: "contador de palavras",
      severity: "minor",
      description: "Contador de palavras não está visível após digitar",
    });
  }

  // Selecionar humor (mood) — buttons with aria-pressed
  const moodBtns = page.locator("[aria-pressed]").filter({ hasText: /😞|😕|😐|😊|😄/ });
  const moodCount = await moodBtns.count();
  if (moodCount === 5) {
    await moodBtns.nth(moodIdx - 1).click();
    console.log(`✓ [${scenario}] Humor selecionado: ${moodIdx}/5`);
  } else {
    logBug({
      scenario,
      step: "seletores de humor",
      severity: "minor",
      description: `Esperado 5 botões de humor, encontrado ${moodCount}`,
    });
  }

  // Selecionar energia — buttons with energy emojis
  const energyBtns = page.locator("[aria-pressed]").filter({ hasText: /🐌|🚶|🏃|💨|🚀/ });
  const energyCount = await energyBtns.count();
  if (energyCount === 5) {
    await energyBtns.nth(energyIdx - 1).click();
    console.log(`✓ [${scenario}] Energia selecionada: ${energyIdx}/5`);
  } else {
    logBug({
      scenario,
      step: "seletores de energia",
      severity: "minor",
      description: `Esperado 5 botões de energia, encontrado ${energyCount}`,
    });
  }

  await shot(page, `${scenario}-before-submit`);

  // Verificar botão habilitado após preencher
  const isNowEnabled = await saveBtn.isEnabled();
  if (!isNowEnabled) {
    const file = await shot(page, `${scenario}-btn-disabled-unexpected`);
    logBug({
      scenario,
      step: "botão submit após preencher",
      severity: "critical",
      description: 'Botão "Enviar para IA" permanece desabilitado após preencher o campo',
      screenshot: file,
    });
    throw new Error("Submit button disabled unexpectedly");
  }

  await saveBtn.click();
  console.log(`✓ [${scenario}] Journal submetido`);
  return "submitted" as const;
}

async function waitForAIFeedback(page: Page, scenario: string, panelTitle: RegExp) {
  // Verificar loading state
  try {
    await expect(page.getByText(/a ia está analisando/i)).toBeVisible({ timeout: 10000 });
    console.log(`  ⏳ [${scenario}] AI analisando...`);
  } catch {
    logBug({
      scenario,
      step: "loading state da IA",
      severity: "minor",
      description:
        'Mensagem "A IA está analisando" não apareceu — animação pode estar ausente ou retornou muito rápido',
    });
  }

  // Aguardar painel de feedback
  try {
    await expect(page.getByText(panelTitle)).toBeVisible({ timeout: 90000 });
    console.log(`  ✓ [${scenario}] Feedback recebido`);
    await shot(page, `${scenario}-feedback-received`);
  } catch {
    const file = await shot(page, `${scenario}-feedback-timeout`);
    logBug({
      scenario,
      step: "painel de feedback",
      severity: "critical",
      description: `Título do painel "${panelTitle}" não apareceu em 90s`,
      screenshot: file,
    });
    throw new Error("AI feedback not received");
  }
}

async function checkFeedbackPanel(page: Page, scenario: string, type: "language" | "behavioral") {
  if (type === "language") {
    // Language Teacher Panel
    const scoreLabels = ["Gramática", "Vocabulário", "Fluência"];
    for (const label of scoreLabels) {
      const visible = await page.getByText(label, { exact: true }).isVisible();
      if (!visible) {
        logBug({
          scenario,
          step: `score "${label}"`,
          severity: "major",
          description: `Score "${label}" não está visível no Language Teacher Panel`,
        });
      }
    }

    const modelSentence = page.getByText(/frase modelo/i);
    const hasModelSentence = await modelSentence.isVisible();
    if (!hasModelSentence) {
      logBug({
        scenario,
        step: "frase modelo",
        severity: "minor",
        description: "Seção 'Frase Modelo' não visível no Language Teacher Panel",
      });
    }

    const nextChallenge = page.getByText(/próximo desafio/i);
    const hasNextChallenge = await nextChallenge.isVisible();
    if (!hasNextChallenge) {
      logBug({
        scenario,
        step: "próximo desafio",
        severity: "minor",
        description: "Seção 'Próximo Desafio' não visível no Language Teacher Panel",
      });
    }

    console.log(`✓ [${scenario}] Language Teacher Panel verificado`);
  } else {
    // Behavioral Coach Panel
    const insightSection = page.getByText(/insights/i);
    const hasInsights = await insightSection.isVisible();
    if (!hasInsights) {
      logBug({
        scenario,
        step: "insights",
        severity: "major",
        description: "Seção 'Insights' não visível no Behavioral Coach Panel",
      });
    }

    const actionSection = page.getByText(/ação para amanhã/i);
    const hasAction = await actionSection.isVisible();
    if (!hasAction) {
      logBug({
        scenario,
        step: "ação para amanhã",
        severity: "minor",
        description: "Seção 'Ação para Amanhã' não visível no Behavioral Coach Panel",
      });
    }

    console.log(`✓ [${scenario}] Behavioral Coach Panel verificado`);
  }

  // Powered by deve estar presente em ambos
  const poweredBy = page.getByText(/desenvolvido por|free ai agent/i);
  const hasPoweredBy = await poweredBy.isVisible();
  if (!hasPoweredBy) {
    logBug({
      scenario,
      step: "powered by",
      severity: "info",
      description: '"Desenvolvido por..." não encontrado no painel de feedback',
    });
  }

  await shot(page, `${scenario}-panel-verified`);
}

async function checkUsageCounter(page: Page, scenario: string, _expectedUsed: number) {
  // Verifica apenas que o contador está visível — o número exato depende do histórico da conta
  const counter = page.getByText(/\d+ de \d+ análises hoje/);
  const visible = await counter.isVisible();
  if (!visible) {
    logBug({
      scenario,
      step: "contador de uso",
      severity: "minor",
      description: "Contador de análises diárias não está visível no painel de feedback",
    });
  } else {
    const text = await counter.textContent();
    console.log(`✓ [${scenario}] Contador visível: ${text?.trim()}`);
  }
}

// ─── Pre-check: garantir que o usuário tem hábitos ───────────────────────────
interface HabitInfo {
  id: string;
  name: string;
  is_active: boolean;
  plan_status: string | null;
  habit_mode: string | null;
}

let habitInfos: HabitInfo[] = [];

async function ensureHabitsExist(): Promise<string[]> {
  const loginRes = await fetch(`${API_URL}/api/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email: EMAIL, password: PASSWORD }),
  });
  const { token } = (await loginRes.json()) as { token: string };
  const res = await fetch(`${API_URL}/api/habits`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  const habits = (await res.json()) as HabitInfo[];
  if (!Array.isArray(habits) || habits.length === 0) {
    throw new Error(
      "Nenhum hábito encontrado para dogfood@imm.test. Execute dogfood.spec.ts primeiro."
    );
  }
  habitInfos = habits.filter((h) => h.is_active);
  const names = habitInfos.map((h) => h.name);
  console.log(`📋 Hábitos ativos encontrados: ${names.join(", ")}`);
  return names;
}

// ─── Suite ────────────────────────────────────────────────────────────────────
test.describe.serial("Dogfood — Daily Lab", () => {
  test.describe.configure({ retries: 0 });
  let habitNames: string[] = [];

  test.beforeAll(async () => {
    fs.mkdirSync(OUT_DIR, { recursive: true });
    habitNames = await ensureHabitsExist();
  });

  // ── Cenário 1: Hábito de Inglês — Language Teacher ───────────────────────
  test("cenário 1 — Inglês: diário + Language Teacher feedback", async ({ page, context }) => {
    const S = "c1-ingles";
    await setupPage(page, context, S);
    await login(page, S);
    await shot(page, `${S}-daily-lab-initial`);

    // Verificar data de hoje visível
    const dateText = page.getByText(/segunda|terça|quarta|quinta|sexta|sábado|domingo/i).first();
    const hasDate = await dateText.isVisible().catch(() => false);
    if (!hasDate) {
      logBug({
        scenario: S,
        step: "data do dia",
        severity: "minor",
        description: "Data por extenso não encontrada na página",
      });
    } else {
      console.log(`✓ [${S}] Data do dia visível`);
    }

    // Selecionar hábito de Inglês
    const inglesName = habitNames.find((n) => /inglês/i.test(n)) ?? "Praticar Inglês";
    await selectHabit(page, S, new RegExp(inglesName.split(" ").slice(0, 2).join(" "), "i"));

    // Verificar título da seção "Diário" aparece
    const journalTitle = page.getByText(/diário/i);
    const hasJournalTitle = await journalTitle.isVisible();
    if (!hasJournalTitle) {
      const file = await shot(page, `${S}-no-journal-section`);
      logBug({
        scenario: S,
        step: "seção diário",
        severity: "major",
        description: "Seção 'Diário' não apareceu após selecionar o hábito de Inglês",
        screenshot: file,
      });
    }

    // Verificar banner do idioma alvo (skill-building)
    const skillBanner = page.getByText(/escreva em.*inglês/i);
    const hasSkillBanner = await skillBanner.isVisible();
    if (!hasSkillBanner) {
      logBug({
        scenario: S,
        step: "banner de idioma alvo",
        severity: "minor",
        description: 'Banner "Escreva em Inglês para receber feedback" não visível',
      });
    }

    await shot(page, `${S}-habit-selected`);

    const result1 = await writeAndSubmitJournal(
      page,
      S,
      "Today I practiced English for 30 minutes. I focused on pronunciation and had a conversation about technology and remote work. I found it challenging to use conditional sentences correctly.",
      4, // mood: 😊
      3 // energy: 🏃
    );

    if (result1 === "submitted") {
      await waitForAIFeedback(page, S, /professor de idiomas/i);
    }
    await checkFeedbackPanel(page, S, "language");
    await checkUsageCounter(page, S, 1);

    // Verificar que a entrada salva aparece (existingEntry)
    const savedEntry = page.getByText(/seu registro/i);
    const hasSavedEntry = await savedEntry.isVisible();
    if (!hasSavedEntry) {
      logBug({
        scenario: S,
        step: "entrada salva",
        severity: "major",
        description: '"Seu Registro" não aparece após submeter e analisar o diário',
      });
    } else {
      console.log(`✓ [${S}] "Seu Registro" visível após análise`);
    }

    // Verificar que o checklist marca o hábito como concluído
    const checkmark = page.getByRole("button", { name: /inglês.*feito hoje/i });
    const hasCheckmark = await checkmark.isVisible().catch(() => false);
    if (!hasCheckmark) {
      logBug({
        scenario: S,
        step: "checklist concluído",
        severity: "minor",
        description: "Hábito de Inglês não aparece como 'Feito hoje' no checklist após análise",
      });
    } else {
      console.log(`✓ [${S}] Hábito marcado como feito no checklist`);
    }
  });

  // ── Cenário 2: Fitness — Behavioral Coach ────────────────────────────────
  test("cenário 2 — Fitness: diário + Behavioral Coach feedback", async ({ page, context }) => {
    const S = "c2-fitness";
    await setupPage(page, context, S);
    await login(page, S);
    await goToDailyLab(page, S);

    const fitnessName = habitNames.find((n) => /academia|fitness|treino/i.test(n)) ?? "Treinar";
    await selectHabit(page, S, new RegExp(fitnessName.split(" ").slice(0, 2).join(" "), "i"));

    // Para behavioral habit, não deve ter banner de idioma
    const skillBanner = page.getByText(/escreva em.*para receber/i);
    const hasBanner = await skillBanner.isVisible().catch(() => false);
    if (hasBanner) {
      logBug({
        scenario: S,
        step: "banner idioma em hábito behavioral",
        severity: "major",
        description: "Banner de idioma alvo aparece em hábito behavioral (Fitness) — não deveria",
      });
    }

    await shot(page, `${S}-habit-selected`);

    const result2 = await writeAndSubmitJournal(
      page,
      S,
      "Fui à academia hoje e completei 45 minutos de musculação. Fiz exercícios para pernas e costas. Senti dificuldade nos últimos sets mas consegui concluir. Preciso melhorar a alimentação antes do treino.",
      3, // mood: 😐
      4 // energy: 💨
    );

    if (result2 === "submitted") {
      await waitForAIFeedback(page, S, /coach comportamental/i);
    }
    await checkFeedbackPanel(page, S, "behavioral");
    await checkUsageCounter(page, S, 2);

    // Verificar mood detectado está visível
    const moodDetected = page.getByText(/motivado|cansado|neutro|estressado|relaxado|ansioso/i);
    const hasMoodDetected = await moodDetected.isVisible();
    if (!hasMoodDetected) {
      logBug({
        scenario: S,
        step: "mood detectado",
        severity: "minor",
        description: "Mood detectado pela IA não visível no Behavioral Coach Panel",
      });
    } else {
      console.log(`✓ [${S}] Mood detectado visível`);
    }

    await shot(page, `${S}-final`);
  });

  // ── Cenário 3: Espanhol — Language Teacher ───────────────────────────────
  test("cenário 3 — Espanhol: diário + Language Teacher feedback", async ({ page, context }) => {
    const S = "c3-espanhol";
    await setupPage(page, context, S);
    await login(page, S);
    await goToDailyLab(page, S);

    const espanholName = habitNames.find((n) => /espanhol/i.test(n)) ?? "Aprender Espanhol";
    const espanholInfo = habitInfos.find((h) => /espanhol/i.test(h.name));
    await selectHabit(page, S, new RegExp(espanholName.split(" ").slice(0, 2).join(" "), "i"));

    // Verificar plano de fases aparece no checklist — apenas se o hábito tiver plano pronto
    if (espanholInfo?.plan_status === "ready") {
      const phaseFocus = page.getByText(/foco de hoje/i);
      const hasPhase = await phaseFocus.isVisible().catch(() => false);
      if (!hasPhase) {
        logBug({
          scenario: S,
          step: "foco de hoje do plano",
          severity: "minor",
          description:
            '"Foco de Hoje" não visível — hábito tem plan_status=ready mas plano não aparece',
        });
      } else {
        console.log(`✓ [${S}] "Foco de Hoje" com fase do plano visível`);
      }
    } else {
      console.log(
        `  ℹ️  [${S}] Hábito sem plano pronto (plan_status=${espanholInfo?.plan_status ?? "null"}) — "Foco de Hoje" não esperado`
      );
    }

    await shot(page, `${S}-habit-selected`);

    // Rate limit cooldown — aguarda 8s entre requisições de IA
    await page.waitForTimeout(8000);

    const result3 = await writeAndSubmitJournal(
      page,
      S,
      "Hoy practiqué español durante 20 minutos. Aprendí vocabulario nuevo sobre los colores y los números. Me resultó difícil pronunciar correctamente algunas palabras, especialmente las que tienen la letra ñ.",
      5, // mood: 😄
      4 // energy: 💨
    );

    if (result3 === "submitted") {
      await waitForAIFeedback(page, S, /professor de idiomas/i);
    }
    await checkFeedbackPanel(page, S, "language");
    await checkUsageCounter(page, S, 3);

    // Verificar checklist: 3/3 concluídos
    const checklistHeader = page.getByText(/hábitos \(3\/3\)/i);
    const hasFullCount = await checklistHeader.isVisible();
    if (!hasFullCount) {
      const file = await shot(page, `${S}-checklist-count`);
      const headerText = await page.getByText(/hábitos \(\d+\/\d+\)/i).textContent();
      logBug({
        scenario: S,
        step: "contagem do checklist",
        severity: "major",
        description: `Esperado "Hábitos (3/3)" após 3 análises, mas encontrou: "${headerText}"`,
        screenshot: file,
      });
    } else {
      console.log(`✓ [${S}] Checklist mostra 3/3 concluídos`);
    }

    await shot(page, `${S}-final-3of3`);
  });

  // ── Edge case: tentar enviar sem texto ───────────────────────────────────
  test("edge case — botão desabilitado + seleção de humor/energia funciona", async ({
    page,
    context,
  }) => {
    const S = "ec-empty";
    await setupPage(page, context, S);
    await login(page, S);
    await goToDailyLab(page, S);

    // Verificar que sem hábito selecionado, journal não aparece
    // (apenas se nenhum hábito for auto-selecionado — na prática o primeiro é auto-selecionado)
    // Então verificamos que a seção "Diário" está visível mas com a entrada já existente
    const seuRegistro = page.getByText(/seu registro/i);
    const hasSavedEntry = await seuRegistro.isVisible({ timeout: 5000 }).catch(() => false);
    if (hasSavedEntry) {
      console.log(
        `✓ [${S}] Hábito auto-selecionado já tem registro do dia — entrada existente exibida corretamente`
      );
      // Verificar que o botão "Analisar" aparece se ainda não tiver feedback
      // (já deve ter feedback dos cenários anteriores, então não aparece)
      await shot(page, `${S}-existing-entry`);
    } else {
      // Nenhum hábito tinha sido selecionado ainda nesta sessão, verifica o textarea
      const firstHabit = habitNames[0];
      if (firstHabit) {
        await selectHabit(page, S, new RegExp(firstHabit.split(" ")[0], "i"));
        const seuRegistroAgain = page.getByText(/seu registro/i);
        const hasEntry = await seuRegistroAgain.isVisible({ timeout: 5000 }).catch(() => false);
        if (!hasEntry) {
          // Textarea disponível — verificar que botão está desabilitado
          const saveBtn = page.getByRole("button", { name: /enviar para ia/i });
          const disabled = await saveBtn.isDisabled();
          if (!disabled) {
            logBug({
              scenario: S,
              step: "botão sem texto",
              severity: "major",
              description: "Botão de submit não está desabilitado com campo vazio",
            });
          }
        }
      }
      await shot(page, `${S}-check`);
    }
  });

  // ── Relatório final ───────────────────────────────────────────────────────
  test.afterAll(async () => {
    const reportPath = path.join(OUT_DIR, "report.md");
    const lines: string[] = [
      "# Dogfood Report — Daily Lab",
      `\n**Data:** ${new Date().toISOString()}`,
      `**Usuário:** ${EMAIL}`,
      `**Hábitos testados:** ${habitNames.join(", ")}`,
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

    lines.push(`\n---\n🐛 Total de bugs: ${bugs.length}`);
    lines.push(`⚠️  Erros de console: ${[...new Set(consoleErrors.map((e) => e.msg))].length}`);

    fs.writeFileSync(reportPath, lines.join("\n"));
    console.log(`\n📋 Report salvo em: ${reportPath}`);
    console.log(`🐛 Total de bugs: ${bugs.length}`);
    console.log(
      `⚠️  Erros de console únicos: ${[...new Set(consoleErrors.map((e) => e.msg))].length}`
    );
  });
});
