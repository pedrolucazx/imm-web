import { api } from "@/lib/api";
import { ENDPOINTS } from "@/lib/endpoints";
import type { AuthResponse, LoginInput, RegisterInput } from "@/types/auth";

export const authService = {
  /**
   * Register a new user
   */
  async register(data: RegisterInput): Promise<AuthResponse> {
    return api.post<AuthResponse>(ENDPOINTS.AUTH.REGISTER, data);
  },

  /**
   * Login user
   */
  async login(data: LoginInput): Promise<AuthResponse> {
    return api.post<AuthResponse>(ENDPOINTS.AUTH.LOGIN, data);
  },

  /**
   * Set authentication token
   */
  setToken(token: string) {
    api.setToken(token);
  },

  /**
   * Get authentication token
   */
  getToken(): string | null {
    return api.getToken();
  },

  /**
   * Remove authentication token
   */
  removeToken() {
    api.removeToken();
  },
};
