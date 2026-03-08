import { authService } from "@/lib/auth.service";
import { ENDPOINTS } from "@/lib/endpoints";
import { api } from "@/lib/api-client";
import type { AuthResponse } from "@/types/auth";

jest.mock("@/lib/api-client", () => ({
  api: {
    post: jest.fn(),
  },
}));

const mockApi = api as jest.Mocked<typeof api>;

const mockResponse: AuthResponse = {
  token: "fake-jwt-token",
  user: { id: "1", email: "test@example.com", name: "Test User" },
};

beforeEach(() => {
  jest.clearAllMocks();
});

describe("authService", () => {
  describe("register", () => {
    it("calls api.post with the register endpoint and user data", async () => {
      mockApi.post.mockResolvedValue(mockResponse);

      const input = {
        email: "test@example.com",
        password: "password123",
        name: "Test User",
      };
      const result = await authService.register(input);

      expect(mockApi.post).toHaveBeenCalledWith(ENDPOINTS.AUTH.REGISTER, input);
      expect(result).toEqual(mockResponse);
    });
  });

  describe("login", () => {
    it("calls api.post with the login endpoint and credentials", async () => {
      mockApi.post.mockResolvedValue(mockResponse);

      const input = { email: "test@example.com", password: "password123" };
      const result = await authService.login(input);

      expect(mockApi.post).toHaveBeenCalledWith(ENDPOINTS.AUTH.LOGIN, input);
      expect(result).toEqual(mockResponse);
    });
  });

  describe("refresh", () => {
    it("calls api.post with the refresh endpoint", async () => {
      mockApi.post.mockResolvedValue(mockResponse);

      const result = await authService.refresh();

      expect(mockApi.post).toHaveBeenCalledWith(ENDPOINTS.AUTH.REFRESH);
      expect(result).toEqual(mockResponse);
    });
  });

  describe("logout", () => {
    it("calls api.post with the logout endpoint", async () => {
      mockApi.post.mockResolvedValue(undefined);

      await authService.logout();

      expect(mockApi.post).toHaveBeenCalledWith(ENDPOINTS.AUTH.LOGOUT);
    });
  });
});
