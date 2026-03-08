/** @jest-environment node */
import "../__setup__/msw/server";
import { authService } from "@/lib/auth.service";

describe("authService — MSW integration", () => {
  it("registers a user and returns a token and user object", async () => {
    const result = await authService.register({
      email: "msw@example.com",
      password: "password123",
      name: "MSW User",
    });

    expect(result.token).toBe("mock-jwt-token");
    expect(result.user.email).toBe("msw@example.com");
    expect(result.user.name).toBe("MSW User");
    expect(result.user.id).toBeDefined();
  });

  it("logs in and returns a token and user object", async () => {
    const result = await authService.login({
      email: "user@example.com",
      password: "password123",
    });

    expect(result.token).toBe("mock-jwt-token");
    expect(result.user.email).toBe("user@example.com");
  });

  it("throws with the server error message on invalid credentials", async () => {
    await expect(
      authService.login({ email: "wrong@example.com", password: "bad" })
    ).rejects.toThrow("Invalid email or password");
  });

  it("refreshes the session and returns a new token", async () => {
    const result = await authService.refresh();

    expect(result.token).toBe("new-mock-jwt-token");
    expect(result.user).toBeDefined();
  });

  it("logs out successfully without throwing", async () => {
    await expect(authService.logout()).resolves.not.toThrow();
  });
});
