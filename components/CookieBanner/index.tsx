"use client";

import { useState, useEffect } from "react";
import { Box, Text, Link as ChakraLink } from "@chakra-ui/react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui";
import { useAuthContext } from "@/lib/auth-context";
import { resolveAuthReady } from "@/lib/auth-state";
import { hasLocalConsent, setLocalConsent } from "@/lib/consent-constants";
import { useGetConsents, useSaveConsent } from "@/lib/hooks/useConsent";
import { PrivacyPolicyModal } from "./PrivacyPolicyModal";
import { s } from "./styles";

export function CookieBanner() {
  const t = useTranslations("cookieBanner");
  const auth = useAuthContext();
  const isAuthReady = resolveAuthReady(auth);
  const { isAuthenticated } = auth;
  const [isVisible, setIsVisible] = useState(false);
  const [isPrivacyModalOpen, setIsPrivacyModalOpen] = useState(false);

  const { data: consentsData, isLoading: isLoadingConsents } = useGetConsents();
  const { mutate: saveConsent, isPending: isSavingConsent } = useSaveConsent();

  useEffect(() => {
    if (!isAuthReady || isLoadingConsents) return;
    if ((consentsData?.length ?? 0) > 0) {
      if (!hasLocalConsent()) setLocalConsent();
      return;
    }
    if (hasLocalConsent()) return;
    setIsVisible(true);
  }, [isAuthReady, isLoadingConsents, consentsData]);

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

  if (!isAuthReady) return null;
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
