import { useMutation, useQueryClient } from "@tanstack/react-query";
import { authService } from "@/services/auth.service";
import type { AuthResponse, LoginInput, RegisterInput } from "@/types/auth";

// Register mutation
export function useRegister() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: RegisterInput): Promise<AuthResponse> => {
      return authService.register(data);
    },
    onSuccess: (data) => {
      authService.setToken(data.token);
      queryClient.setQueryData(["user"], data.user);
    },
  });
}

// Login mutation
export function useLogin() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: LoginInput): Promise<AuthResponse> => {
      return authService.login(data);
    },
    onSuccess: (data) => {
      authService.setToken(data.token);
      queryClient.setQueryData(["user"], data.user);
    },
  });
}

// Logout
export function useLogout() {
  const queryClient = useQueryClient();

  return () => {
    authService.removeToken();
    queryClient.setQueryData(["user"], null);
    queryClient.clear();
  };
}
