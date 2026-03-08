import { api } from "@/lib/api-client";
import { ENDPOINTS } from "@/lib/endpoints";
import type { AuthResponse, LoginInput, RegisterInput } from "@/types/auth";

export const authService = {
  async register(data: RegisterInput): Promise<AuthResponse> {
    return api.post<AuthResponse>(ENDPOINTS.AUTH.REGISTER, data);
  },

  async login(data: LoginInput): Promise<AuthResponse> {
    return api.post<AuthResponse>(ENDPOINTS.AUTH.LOGIN, data);
  },

  async refresh(): Promise<AuthResponse> {
    return api.post<AuthResponse>(ENDPOINTS.AUTH.REFRESH);
  },

  async logout(): Promise<void> {
    return api.post<void>(ENDPOINTS.AUTH.LOGOUT);
  },
};
