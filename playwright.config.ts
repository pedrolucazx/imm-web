import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./tests/e2e",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  // 1 retry is enough — tests are now stable. 2 retries triplicavam o tempo em caso de falha.
  retries: process.env.CI ? 1 : 0,
  // Use all available CPU cores in CI (ubuntu-latest has 2 cores)
  workers: process.env.CI ? 2 : undefined,
  reporter: [["html", { outputFolder: "tests/e2e/report" }]],
  use: {
    baseURL: process.env.BASE_URL ?? "http://localhost:3000",
    // Only capture trace on the single retry (not on first failure)
    trace: "on-first-retry",
    screenshot: "only-on-failure",
    // Reduce default action timeout — fail fast instead of hanging 30s
    actionTimeout: 10000,
  },
  // Intentionally limited to Chromium in CI for speed and cost.
  // Firefox and WebKit coverage is handled on a separate nightly/weekly schedule.
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
  ],
  webServer: {
    // CI: build already ran, use the optimized production server (fast startup)
    // Local: use dev server with HMR
    command: process.env.CI ? "yarn start" : "yarn dev",
    url: "http://localhost:3000",
    reuseExistingServer: !process.env.CI,
    // next start is near-instant, 30s is more than enough
    timeout: process.env.CI ? 30000 : 120000,
  },
});
