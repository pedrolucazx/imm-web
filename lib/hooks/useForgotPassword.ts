import { useMutation, type UseMutationResult } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { authService } from "@/lib/auth.service";
import { toaster } from "@/components/ui/toaster";

export interface ForgotPasswordOptions {
  onSuccess?: () => void;
  onError?: (_error: Error) => void;
}

export function useForgotPassword(
  options?: ForgotPasswordOptions
): UseMutationResult<{ message: string }, Error, string> {
  const t = useTranslations("auth.forgotPassword");

  return useMutation({
    mutationFn: (email: string): Promise<{ message: string }> => authService.forgotPassword(email),
    onSuccess: (): void => {
      options?.onSuccess?.();
    },
    onError: (error: Error): void => {
      if (!options?.onError) {
        toaster.create({
          title: t("errorTitle"),
          type: "error",
          meta: { closable: true },
        });
      }
      options?.onError?.(error);
    },
  });
}
