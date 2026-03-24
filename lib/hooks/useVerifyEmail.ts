import { useMutation, type UseMutationResult } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { authService } from "@/lib/auth.service";
import { api } from "@/lib/api-client";
import { toaster } from "@/components/ui/toaster";
import type { AuthResponse } from "@/types/auth";

export interface VerifyEmailOptions {
  onSuccess?: (_data: AuthResponse) => void;
  onError?: (_error: Error) => void;
}

export function useVerifyEmail(
  options?: VerifyEmailOptions
): UseMutationResult<AuthResponse, Error, string> {
  const t = useTranslations("auth.verifyEmail");

  return useMutation({
    mutationFn: (token: string): Promise<AuthResponse> => authService.verifyEmail(token),
    onSuccess: (data: AuthResponse): void => {
      api.setToken(data.token);
      toaster.create({
        title: t("toastSuccessTitle"),
        description: t("toastSuccessDesc"),
        type: "success",
        meta: { closable: true },
      });
      options?.onSuccess?.(data);
    },
    onError: (error: Error): void => {
      toaster.create({
        title: t("toastErrorTitle"),
        description: t("toastErrorDesc"),
        type: "error",
        meta: { closable: true },
      });
      options?.onError?.(error);
    },
  });
}
