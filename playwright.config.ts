import { defineConfig, devices } from "@playwright/test";

const BASE_URL = process.env.BASE_URL ?? "http://localhost:3000";
const WEB_SERVER_ORIGIN = "http://localhost:3000";
const E2E_LOCALE = process.env.E2E_LOCALE ?? "pt-BR";

export default defineConfig({
  testDir: "./tests/e2e",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  workers: process.env.CI ? 2 : undefined,
  timeout: 120000,
  reporter: [["html", { outputFolder: "tests/e2e/report" }]],
  use: {
    baseURL: BASE_URL,
    trace: "on-first-retry",
    screenshot: "only-on-failure",
    actionTimeout: 10000,
  },
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
  ],
  webServer: {
    command: process.env.CI ? "yarn start" : "yarn dev",
    url: new URL(`/${E2E_LOCALE}/login`, WEB_SERVER_ORIGIN).toString(),
    reuseExistingServer: !process.env.CI,
    timeout: process.env.CI ? 30000 : 120000,
  },
});
