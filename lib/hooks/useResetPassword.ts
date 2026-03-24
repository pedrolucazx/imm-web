import { useMutation, type UseMutationResult } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { authService } from "@/lib/auth.service";
import { toaster } from "@/components/ui/toaster";
import { useTranslatedError } from "./useTranslatedError";

export interface ResetPasswordOptions {
  onSuccess?: () => void;
  onError?: (_error: Error) => void;
}

export function useResetPassword(
  options?: ResetPasswordOptions
): UseMutationResult<{ message: string }, Error, { token: string; newPassword: string }> {
  const t = useTranslations("auth.resetPassword");
  const { translateError } = useTranslatedError();

  return useMutation({
    mutationFn: ({
      token,
      newPassword,
    }: {
      token: string;
      newPassword: string;
    }): Promise<{ message: string }> => authService.resetPassword(token, newPassword),
    onSuccess: (): void => {
      toaster.create({
        title: t("toastSuccessTitle"),
        description: t("toastSuccessDesc"),
        type: "success",
        meta: { closable: true },
      });
      options?.onSuccess?.();
    },
    onError: (error: Error): void => {
      if (!options?.onError) {
        toaster.create({
          title: t("toastErrorTitle"),
          description: translateError(error),
          type: "error",
          meta: { closable: true },
        });
      }
      options?.onError?.(error);
    },
  });
}
