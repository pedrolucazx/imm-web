import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api";
import type { AuthResponse, LoginInput, RegisterInput } from "@/types/auth";

// Register mutation
export function useRegister() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: RegisterInput): Promise<AuthResponse> => {
      return api.post<AuthResponse>("/auth/register", data);
    },
    onSuccess: (data) => {
      api.setToken(data.token);
      queryClient.setQueryData(["user"], data.user);
    },
  });
}

// Login mutation
export function useLogin() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: LoginInput): Promise<AuthResponse> => {
      return api.post<AuthResponse>("/auth/login", data);
    },
    onSuccess: (data) => {
      api.setToken(data.token);
      queryClient.setQueryData(["user"], data.user);
    },
  });
}

// Logout
export function useLogout() {
  const queryClient = useQueryClient();

  return () => {
    api.removeToken();
    queryClient.setQueryData(["user"], null);
    queryClient.clear();
  };
}
