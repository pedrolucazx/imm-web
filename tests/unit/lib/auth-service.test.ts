import { authService } from "@/lib/auth.service";
import { ENDPOINTS } from "@/lib/endpoints";
import { api } from "@/lib/api-client";
import type { AuthResponse } from "@/types/auth";

jest.mock("@/lib/api-client", () => ({
  api: {
    post: jest.fn(),
    setToken: jest.fn(),
    getToken: jest.fn(),
    removeToken: jest.fn(),
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

  describe("setToken", () => {
    it("delegates to api.setToken", () => {
      authService.setToken("my-token");
      expect(mockApi.setToken).toHaveBeenCalledWith("my-token");
    });
  });

  describe("getToken", () => {
    it("delegates to api.getToken and returns the token", () => {
      mockApi.getToken.mockReturnValue("stored-token");

      const token = authService.getToken();

      expect(mockApi.getToken).toHaveBeenCalled();
      expect(token).toBe("stored-token");
    });

    it("returns null when no token is stored", () => {
      mockApi.getToken.mockReturnValue(null);

      expect(authService.getToken()).toBeNull();
    });
  });

  describe("removeToken", () => {
    it("delegates to api.removeToken", () => {
      authService.removeToken();
      expect(mockApi.removeToken).toHaveBeenCalled();
    });
  });
});
