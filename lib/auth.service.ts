import { api } from "@/lib/api-client";
import { ENDPOINTS } from "@/lib/endpoints";
import type { AuthResponse, RegisterResponse, LoginInput, RegisterInput } from "@/types/auth";

export const authService = {
  async register(data: RegisterInput): Promise<RegisterResponse> {
    return api.post<RegisterResponse>(ENDPOINTS.AUTH.REGISTER, data);
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

  async forgotPassword(email: string): Promise<RegisterResponse> {
    return api.post<RegisterResponse>(ENDPOINTS.AUTH.FORGOT_PASSWORD, { email });
  },

  async resetPassword(token: string, newPassword: string): Promise<RegisterResponse> {
    return api.post<RegisterResponse>(ENDPOINTS.AUTH.RESET_PASSWORD, { token, newPassword });
  },

  async verifyEmail(token: string): Promise<AuthResponse> {
    return api.post<AuthResponse>(ENDPOINTS.AUTH.VERIFY_EMAIL, { token });
  },

  async resendVerification(email: string): Promise<RegisterResponse> {
    return api.post<RegisterResponse>(ENDPOINTS.AUTH.RESEND_VERIFICATION, { email });
  },
};
