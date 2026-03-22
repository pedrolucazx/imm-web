import { useEffect, useRef } from "react";
import { useAuthContext } from "@/lib/auth-context";
import { useGetConsents, useSaveConsent } from "./useConsent";
import { hasLocalConsent } from "@/lib/consent-constants";

export function useConsentSync() {
  const { isAuthenticated, isLoading: isAuthLoading } = useAuthContext();
  const { data: consentsData, isLoading: isLoadingConsents } = useGetConsents();
  const { mutate: saveConsent } = useSaveConsent({
    onError: () => {
      hasSynced.current = false;
    },
  });
  const hasSynced = useRef(false);

  useEffect(() => {
    if (!isAuthenticated) {
      hasSynced.current = false;
      return;
    }

    if (isAuthLoading || isLoadingConsents) return;
    if (hasSynced.current) return;
    if (!hasLocalConsent()) return;
    if ((consentsData?.length ?? 0) > 0) {
      hasSynced.current = true;
      return;
    }

    hasSynced.current = true;
    saveConsent();
  }, [isAuthLoading, isLoadingConsents, isAuthenticated, consentsData, saveConsent]);
}
