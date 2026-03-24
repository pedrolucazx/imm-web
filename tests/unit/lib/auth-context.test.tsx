import { renderHook, act, waitFor } from "@testing-library/react";
import React from "react";
import { AuthProvider } from "@/providers/AuthProvider";
import { useAuthContext } from "@/lib/auth-context";
import { authService } from "@/lib/auth.service";
import { api } from "@/lib/api-client";
import type { AuthResponse } from "@/types/auth";

jest.mock("@/lib/auth.service", () => ({
  authService: {
    login: jest.fn(),
    register: jest.fn(),
    refresh: jest.fn(),
    logout: jest.fn(),
  },
}));

Object.defineProperty(document, "cookie", {
  value: "",
  writable: true,
  configurable: true,
});

jest.mock("@/lib/api-client", () => ({
  api: {
    setToken: jest.fn(),
    removeToken: jest.fn(),
    setOnTokenRefreshed: jest.fn(),
    getToken: jest.fn().mockReturnValue(null),
  },
}));

const mockAuthService = authService as jest.Mocked<typeof authService>;
const mockApi = api as jest.Mocked<typeof api>;

const mockAuthResponse: AuthResponse = {
  token: "test-token",
  user: { id: "user-1", email: "user@example.com", name: "Test User" },
};

function wrapper({ children }: { children: React.ReactNode }) {
  return <AuthProvider>{children}</AuthProvider>;
}

function clearCookies(): void {
  Object.defineProperty(document, "cookie", {
    value: "",
    writable: true,
    configurable: true,
  });
}

beforeEach(() => {
  clearCookies();
  jest.clearAllMocks();
  mockAuthService.refresh.mockRejectedValue(new Error("No session"));
});

afterEach(() => {
  clearCookies();
});

describe("AuthProvider", () => {
  describe("initial state", () => {
    it("starts with isLoading false when no token and no refresh cookie", async () => {
      const { result } = renderHook(() => useAuthContext(), { wrapper });

      expect(result.current.isLoading).toBe(false);
      expect(result.current.accessToken).toBeNull();
      expect(result.current.isAuthenticated).toBe(false);
    });

    it("has no user and no token when refresh fails", async () => {
      const { result } = renderHook(() => useAuthContext(), { wrapper });

      await waitFor(() => expect(result.current.isLoading).toBe(false));

      expect(result.current.accessToken).toBeNull();
      expect(result.current.user).toBeNull();
      expect(result.current.isAuthenticated).toBe(false);
    });

    it("rehydrates user from a valid refresh token cookie on mount", async () => {
      mockAuthService.refresh.mockResolvedValue(mockAuthResponse);
      Object.defineProperty(document, "cookie", {
        value: "refreshToken=test-refresh-token",
        writable: true,
        configurable: true,
      });

      const { result } = renderHook(() => useAuthContext(), { wrapper });

      await waitFor(() => expect(result.current.isLoading).toBe(false));

      expect(result.current.accessToken).toBe(mockAuthResponse.token);
      expect(result.current.user).toEqual(mockAuthResponse.user);
      expect(result.current.isAuthenticated).toBe(true);
      expect(mockApi.setToken).toHaveBeenCalledWith(mockAuthResponse.token);
    });

    it("skips loading block and hydrates user via background refresh when token already in memory", async () => {
      mockApi.getToken.mockReturnValue("existing-token");
      mockAuthService.refresh.mockResolvedValue(mockAuthResponse);

      const { result } = renderHook(() => useAuthContext(), { wrapper });

      expect(result.current.accessToken).toBe("existing-token");
      expect(result.current.isAuthenticated).toBe(true);

      await waitFor(() => expect(result.current.isLoading).toBe(false));
      await waitFor(() => expect(result.current.user).toEqual(mockAuthResponse.user));
      expect(result.current.accessToken).toBe(mockAuthResponse.token);

      mockApi.getToken.mockReturnValue(null);
    });

    it("clears token and auth state if background refresh fails after memory token", async () => {
      mockApi.getToken.mockReturnValue("existing-token");
      mockAuthService.refresh.mockRejectedValue(new Error("Session expired"));

      const { result } = renderHook(() => useAuthContext(), { wrapper });

      expect(result.current.accessToken).toBe("existing-token");
      expect(result.current.isAuthenticated).toBe(true);

      await waitFor(() => expect(result.current.isLoading).toBe(false));
      await waitFor(() => expect(result.current.accessToken).toBeNull());
      expect(result.current.isAuthenticated).toBe(false);
      expect(result.current.user).toBeNull();
      expect(mockApi.removeToken).toHaveBeenCalled();

      mockApi.getToken.mockReturnValue(null);
    });
  });

  describe("login", () => {
    it("sets accessToken and user on successful login", async () => {
      mockAuthService.login.mockResolvedValue(mockAuthResponse);

      const { result } = renderHook(() => useAuthContext(), { wrapper });
      await waitFor(() => expect(result.current.isLoading).toBe(false));

      await act(async () => {
        await result.current.login({ email: "user@example.com", password: "pass123" });
      });

      expect(result.current.accessToken).toBe(mockAuthResponse.token);
      expect(result.current.user).toEqual(mockAuthResponse.user);
      expect(result.current.isAuthenticated).toBe(true);
      expect(mockApi.setToken).toHaveBeenCalledWith(mockAuthResponse.token);
    });

    it("returns the AuthResponse from the service", async () => {
      mockAuthService.login.mockResolvedValue(mockAuthResponse);

      const { result } = renderHook(() => useAuthContext(), { wrapper });
      await waitFor(() => expect(result.current.isLoading).toBe(false));

      let response: AuthResponse | undefined;
      await act(async () => {
        response = await result.current.login({
          email: "user@example.com",
          password: "pass123",
        });
      });

      expect(response).toEqual(mockAuthResponse);
    });

    it("propagates errors from the service", async () => {
      const error = new Error("Invalid credentials");
      mockAuthService.login.mockRejectedValue(error);

      const { result } = renderHook(() => useAuthContext(), { wrapper });
      await waitFor(() => expect(result.current.isLoading).toBe(false));

      await expect(
        act(async () => {
          await result.current.login({ email: "bad@example.com", password: "wrong" });
        })
      ).rejects.toThrow("Invalid credentials");

      expect(result.current.accessToken).toBeNull();
      expect(result.current.isAuthenticated).toBe(false);
    });
  });

  describe("register", () => {
    it("returns message and does not set accessToken on successful registration", async () => {
      mockAuthService.register.mockResolvedValue({ message: "Verification email sent" });

      const { result } = renderHook(() => useAuthContext(), { wrapper });
      await waitFor(() => expect(result.current.isLoading).toBe(false));

      let response: { message: string } | undefined;
      await act(async () => {
        response = await result.current.register({
          name: "Test User",
          email: "user@example.com",
          password: "pass123",
        });
      });

      expect(response).toEqual({ message: "Verification email sent" });
      expect(result.current.accessToken).toBeNull();
      expect(result.current.user).toBeNull();
      expect(result.current.isAuthenticated).toBe(false);
    });
  });

  describe("logout", () => {
    it("clears accessToken and user on logout", async () => {
      mockAuthService.login.mockResolvedValue(mockAuthResponse);
      mockAuthService.logout.mockResolvedValue(undefined);

      const { result } = renderHook(() => useAuthContext(), { wrapper });
      await waitFor(() => expect(result.current.isLoading).toBe(false));

      await act(async () => {
        await result.current.login({ email: "user@example.com", password: "pass123" });
      });
      expect(result.current.isAuthenticated).toBe(true);

      await act(async () => {
        await result.current.logout();
      });

      expect(result.current.accessToken).toBeNull();
      expect(result.current.user).toBeNull();
      expect(result.current.isAuthenticated).toBe(false);
      expect(mockApi.removeToken).toHaveBeenCalled();
      expect(mockAuthService.logout).toHaveBeenCalled();
    });

    it("clears local state even when the logout API call fails", async () => {
      mockAuthService.login.mockResolvedValue(mockAuthResponse);
      mockAuthService.logout.mockRejectedValue(new Error("Network error"));

      const { result } = renderHook(() => useAuthContext(), { wrapper });
      await waitFor(() => expect(result.current.isLoading).toBe(false));

      await act(async () => {
        await result.current.login({ email: "user@example.com", password: "pass123" });
      });

      await act(async () => {
        await result.current.logout().catch(() => {});
      });

      expect(result.current.accessToken).toBeNull();
      expect(result.current.isAuthenticated).toBe(false);
      expect(mockApi.removeToken).toHaveBeenCalled();
    });
  });

  describe("useAuthContext outside provider", () => {
    it("throws when used outside of AuthProvider", () => {
      const consoleSpy = jest.spyOn(console, "error").mockImplementation(() => {});

      expect(() => {
        renderHook(() => useAuthContext());
      }).toThrow("useAuthContext must be used within an AuthProvider");

      consoleSpy.mockRestore();
    });
  });
});
