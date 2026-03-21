import { useMutation } from "@tanstack/react-query";
import { consentService } from "@/lib/consent.service";
import { toaster } from "@/components/ui/toaster";
import { useTranslatedError } from "./useTranslatedError";

export function useSaveConsent(options?: { onError?: (_error: Error) => void }) {
  const { translateError } = useTranslatedError();

  return useMutation({
    mutationFn: () =>
      Promise.all([
        consentService.saveConsent("cookie_consent"),
        consentService.saveConsent("privacy_policy"),
        consentService.saveConsent("terms_of_use"),
      ]),
    onError: (error: Error) => {
      toaster.create({
        title: "Error",
        description: translateError(error),
        type: "error",
        meta: { closable: true },
      });
      options?.onError?.(error);
    },
  });
}
