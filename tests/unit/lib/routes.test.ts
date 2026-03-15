import { ROUTES } from "@/lib/routes";

describe("ROUTES", () => {
  it("has the correct HOME route", () => {
    expect(ROUTES.HOME).toBe("/");
  });

  it("has the correct LOGIN route", () => {
    expect(ROUTES.LOGIN).toBe("/login");
  });

  it("has the correct REGISTER route", () => {
    expect(ROUTES.REGISTER).toBe("/register");
  });

  it("has the correct APP_DAILY_LAB route", () => {
    expect(ROUTES.APP_DAILY_LAB).toBe("/daily-lab");
  });

  it("has the correct APP_HABITS route", () => {
    expect(ROUTES.APP_HABITS).toBe("/habits");
  });

  it("has the correct APP_HISTORY route", () => {
    expect(ROUTES.APP_HISTORY).toBe("/history");
  });

  it("has the correct APP_ANALYTICS route", () => {
    expect(ROUTES.APP_ANALYTICS).toBe("/analytics");
  });

  it("has the correct SETTINGS route", () => {
    expect(ROUTES.SETTINGS).toBe("/settings");
  });
});
