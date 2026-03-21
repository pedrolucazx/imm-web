import { test, expect, type Page } from "@playwright/test";
import { CONSENT_KEY, CONSENT_VERSION } from "@/lib/consent-constants";

const CONSENT_DATA = JSON.stringify({
  version: CONSENT_VERSION,
  timestamp: new Date().toISOString(),
  accepted: true,
});

/**
 * Sets cookie consent in localStorage before navigation.
 * Prevents the CookieBanner from blocking interactions.
 */
async function setConsent(page: Page) {
  await page.goto("/pt-BR/");
  await page.evaluate(({ key, value }) => localStorage.setItem(key, value), {
    key: CONSENT_KEY,
    value: CONSENT_DATA,
  });
  await page.reload();
  await page.waitForLoadState("networkidle");
}

test.describe("Landing page", () => {
  test("loads and shows the main heading", async ({ page }) => {
    await page.goto("/");
    await expect(page).toHaveTitle(/Inside My Mind/i);
  });

  test("navigate to login page from header", async ({ page }) => {
    await setConsent(page);
    const link = page.getByRole("link", { name: /entrar|log in/i }).first();
    await link.waitFor({ state: "visible" });
    await link.click();
    await expect(page).toHaveURL(/\/login/);
  });

  test("navigate to register page from CTA", async ({ page }) => {
    await setConsent(page);
    const link = page.getByRole("link", { name: /criar.*plano|create.*plan|crear.*plan/i }).first();
    await link.waitFor({ state: "visible" });
    await link.click();
    await expect(page).toHaveURL(/\/register/);
  });
});

test.describe("Auth pages", () => {
  test("login page renders the form", async ({ page }) => {
    await setConsent(page);
    await page.goto("/pt-BR/login");
    await expect(page.getByRole("textbox", { name: /e-mail|email/i })).toBeVisible();
    await expect(page.getByRole("textbox", { name: /senha|password/i })).toBeVisible();
  });

  test("register page renders the form", async ({ page }) => {
    await setConsent(page);
    await page.goto("/pt-BR/register");
    await expect(page.getByRole("textbox", { name: /e-mail|email/i })).toBeVisible();
  });
});
