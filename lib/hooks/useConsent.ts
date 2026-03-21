import { useMutation } from "@tanstack/react-query";
import { consentService } from "@/lib/consent.service";

export function useSaveConsent() {
  return useMutation({
    mutationFn: () =>
      Promise.all([
        consentService.saveConsent("cookie_consent"),
        consentService.saveConsent("privacy_policy"),
        consentService.saveConsent("terms_of_use"),
      ]),
  });
}
