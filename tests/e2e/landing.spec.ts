import { test, expect } from "@playwright/test";

test.describe("Landing page", () => {
  test("loads and shows the main heading", async ({ page }) => {
    await page.goto("/");
    await expect(page).toHaveTitle(/Inside My Mind/i);
  });

  // Explicitly navigating to /pt-BR/ to avoid dependency on the default locale
  test("navigate to login page from header", async ({ page }) => {
    await page.goto("/pt-BR/");
    await page
      .getByRole("link", { name: /entrar|log in/i })
      .first()
      .click();
    await expect(page).toHaveURL(/\/login/);
  });

  test("navigate to register page from CTA", async ({ page }) => {
    await page.goto("/pt-BR/");
    await page
      .getByRole("link", { name: /começar.*grátis|get started.*free|start free/i })
      .first()
      .click();
    await expect(page).toHaveURL(/\/register/);
  });
});

test.describe("Auth pages", () => {
  test("login page renders the form", async ({ page }) => {
    await page.goto("/pt-BR/login");
    await expect(page.getByRole("textbox", { name: /e-mail|email/i })).toBeVisible();
    await expect(page.getByLabel(/senha|password/i)).toBeVisible();
  });

  test("register page renders the form", async ({ page }) => {
    await page.goto("/pt-BR/register");
    await expect(page.getByRole("textbox", { name: /e-mail|email/i })).toBeVisible();
  });
});
