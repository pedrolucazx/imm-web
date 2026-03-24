/** @jest-environment node */
import "../__setup__/msw/server";
import { authService } from "@/lib/auth.service";

describe("authService — MSW integration", () => {
  it("registers a user and returns a verification message", async () => {
    const result = await authService.register({
      email: "msw@example.com",
      password: "password123",
      name: "MSW User",
    });

    expect(result.message).toBe("Verification email sent");
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

  it("sends forgot-password email and returns a message", async () => {
    const result = await authService.forgotPassword("user@example.com");

    expect(result.message).toBe("Password reset email sent");
  });

  it("resets password with valid token and returns a message", async () => {
    const result = await authService.resetPassword("valid-token", "newpassword123");

    expect(result.message).toBe("Password reset successfully");
  });

  it("throws on reset-password with invalid token", async () => {
    await expect(authService.resetPassword("invalid-token", "newpassword123")).rejects.toThrow(
      "Invalid or expired token"
    );
  });

  it("verifies email with valid token and returns auth response", async () => {
    const result = await authService.verifyEmail("valid-token");

    expect(result.token).toBe("mock-jwt-token");
    expect(result.user.email).toBe("user@example.com");
  });

  it("throws on verify-email with invalid token", async () => {
    await expect(authService.verifyEmail("invalid-token")).rejects.toThrow(
      "Invalid or expired token"
    );
  });

  it("resends verification email and returns a message", async () => {
    const result = await authService.resendVerification("user@example.com");

    expect(result.message).toBe("Verification email sent");
  });
});
