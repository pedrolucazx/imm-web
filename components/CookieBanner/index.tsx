"use client";

import { useState, useEffect } from "react";
import { Box, Text, Link as ChakraLink } from "@chakra-ui/react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui";
import { PrivacyPolicyModal } from "./PrivacyPolicyModal";
import { useGetConsents, useSaveConsent } from "@/lib/hooks/useConsent";
import { s } from "./styles";
import { CONSENT_KEY, CONSENT_VERSION } from "@/lib/consent-constants";
import { useAuthContext } from "@/lib/auth-context";

export interface ConsentData {
  version: string;
  timestamp: string;
  accepted: boolean;
}

function hasLocalConsent(): boolean {
  if (typeof window === "undefined") return false;
  return !!localStorage.getItem(CONSENT_KEY);
}

function setLocalConsent(): void {
  const consentData: ConsentData = {
    version: CONSENT_VERSION,
    timestamp: new Date().toISOString(),
    accepted: true,
  };
  localStorage.setItem(CONSENT_KEY, JSON.stringify(consentData));
}

export function CookieBanner() {
  const t = useTranslations("cookieBanner");
  const { isAuthenticated, isLoading: isAuthLoading } = useAuthContext();
  const [isVisible, setIsVisible] = useState(false);
  const [isPrivacyModalOpen, setIsPrivacyModalOpen] = useState(false);

  const { data: consentsData, isLoading: isLoadingConsents } = useGetConsents();
  const { mutate: saveConsent, isPending: isSavingConsent } = useSaveConsent();

  useEffect(() => {
    if (isLoadingConsents || isAuthLoading) return;

    const hasConsent = hasLocalConsent() || (consentsData?.length ?? 0) > 0;
    if (!hasConsent) {
      setIsVisible(true);
    }
  }, [isLoadingConsents, consentsData, isAuthLoading]);

  const handleAccept = () => {
    setLocalConsent();
    setIsVisible(false);
    if (isAuthenticated) {
      saveConsent();
    }
  };

  const handleViewPrivacy = () => {
    setIsVisible(false);
    setIsPrivacyModalOpen(true);
  };

  const handlePrivacyClose = () => {
    setIsPrivacyModalOpen(false);
  };

  const handlePrivacyAccept = () => {
    handleAccept();
    setIsPrivacyModalOpen(false);
  };

  if (!isVisible && !isPrivacyModalOpen) return null;

  return (
    <>
      {isVisible && (
        <Box {...s.overlay} role="dialog" aria-modal="true" aria-labelledby="cookie-banner-title">
          <Box {...s.banner}>
            <Box {...s.header}>
              <Text {...s.headerIcon}>🍪</Text>
              <Text id="cookie-banner-title" {...s.headerTitle}>
                {t("title")}
              </Text>
            </Box>

            <Box {...s.body}>
              <Text {...s.introText}>{t("intro")}</Text>
            </Box>

            <Box {...s.footer}>
              <Button onClick={handleAccept} w="100%" loading={isSavingConsent}>
                {t("accept")}
              </Button>
              <Box {...s.links}>
                <ChakraLink as="button" type="button" onClick={handleViewPrivacy} {...s.link}>
                  {t("viewPrivacy")}
                </ChakraLink>
              </Box>
            </Box>
          </Box>
        </Box>
      )}

      <PrivacyPolicyModal
        open={isPrivacyModalOpen}
        onClose={handlePrivacyClose}
        onAccept={handlePrivacyAccept}
      />
    </>
  );
}
