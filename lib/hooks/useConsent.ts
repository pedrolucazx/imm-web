import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { consentService } from "@/lib/consent.service";
import { toaster } from "@/components/ui/toaster";
import { useTranslatedError } from "./useTranslatedError";
import { useAuthContext } from "@/lib/auth-context";

export function useGetConsents() {
  const { isLoading: isAuthLoading, accessToken } = useAuthContext();

  return useQuery({
    queryKey: ["consents"],
    queryFn: () => consentService.getConsents(),
    retry: false,
    staleTime: Infinity,
    enabled: !isAuthLoading && !!accessToken,
  });
}

export function useSaveConsent(options?: { onError?: (_error: Error) => void }) {
  const t = useTranslations("errors");
  const { translateError } = useTranslatedError();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () =>
      Promise.all([
        consentService.saveConsent("cookie_consent"),
        consentService.saveConsent("privacy_policy"),
        consentService.saveConsent("terms_of_use"),
      ]),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["consents"] });
    },
    onError: (error: Error) => {
      toaster.create({
        title: t("title"),
        description: translateError(error),
        type: "error",
        meta: { closable: true },
      });
      options?.onError?.(error);
    },
  });
}
