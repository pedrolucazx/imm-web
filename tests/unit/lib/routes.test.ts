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

  it("has the correct APP route", () => {
    expect(ROUTES.APP).toBe("/app");
  });
});
