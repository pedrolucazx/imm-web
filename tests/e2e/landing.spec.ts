import { test, expect, type Page } from "@playwright/test";

const CONSENT_KEY = "imm_consent_given";
const CONSENT_DATA = JSON.stringify({
  version: "1.0",
  timestamp: new Date().toISOString(),
  accepted: true,
});

async function setConsent(page: Page) {
  await page.goto("/pt-BR/");
  await page.evaluate(({ key, value }) => localStorage.setItem(key, value), {
    key: CONSENT_KEY,
    value: CONSENT_DATA,
  });
}

test.describe("Landing page", () => {
  test("loads and shows the main heading", async ({ page }) => {
    await page.goto("/");
    await expect(page).toHaveTitle(/Inside My Mind/i);
  });

  test("navigate to login page from header", async ({ page }) => {
    await setConsent(page);
    await page
      .getByRole("link", { name: /entrar|log in/i })
      .first()
      .click();
    await expect(page).toHaveURL(/\/login/);
  });

  test("navigate to register page from CTA", async ({ page }) => {
    await setConsent(page);
    await page
      .getByRole("link", { name: /criar.*plano|create.*plan|crear.*plan/i })
      .first()
      .click();
    await expect(page).toHaveURL(/\/register/);
  });
});

test.describe("Auth pages", () => {
  test("login page renders the form", async ({ page }) => {
    await page.goto("/pt-BR/login");
    await expect(page.getByRole("textbox", { name: /e-mail|email/i })).toBeVisible();
    await expect(page.getByRole("textbox", { name: /senha|password/i })).toBeVisible();
  });

  test("register page renders the form", async ({ page }) => {
    await page.goto("/pt-BR/register");
    await expect(page.getByRole("textbox", { name: /e-mail|email/i })).toBeVisible();
  });
});
