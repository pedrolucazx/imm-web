import { test, expect } from "@playwright/test";

test.describe("Landing page", () => {
  test("loads and shows the main heading", async ({ page }) => {
    await page.goto("/");
    await expect(page).toHaveTitle(/Inside My Mind/i);
  });

  test("navigate to login page from header", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("link", { name: /login|entrar/i }).click();
    await expect(page).toHaveURL(/\/login/);
  });

  test("navigate to register page from CTA", async ({ page }) => {
    await page.goto("/");
    await page
      .getByRole("link", { name: /get started|começar/i })
      .first()
      .click();
    await expect(page).toHaveURL(/\/register/);
  });
});

test.describe("Auth pages", () => {
  test("login page renders the form", async ({ page }) => {
    await page.goto("/login");
    await expect(page.getByRole("textbox", { name: /email/i })).toBeVisible();
    await expect(page.getByRole("textbox", { name: /password|senha/i })).toBeVisible();
  });

  test("register page renders the form", async ({ page }) => {
    await page.goto("/register");
    await expect(page.getByRole("textbox", { name: /email/i })).toBeVisible();
  });
});
