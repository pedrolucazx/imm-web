"use client";

import { useState, useEffect } from "react";
import { Box, Text, Link as ChakraLink } from "@chakra-ui/react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui";
import { PrivacyPolicyModal } from "./PrivacyPolicyModal";
import { useSaveConsent } from "@/lib/hooks/useConsent";
import { s } from "./styles";

export const CONSENT_KEY = "imm_consent_given";
export const CONSENT_VERSION = "1.0";

export interface ConsentData {
  version: string;
  timestamp: string;
  accepted: boolean;
}

/**
 * Cookie consent banner component that prompts users to accept privacy policy
 * before using the application. Shows once and persists consent in localStorage.
 */
export function CookieBanner() {
  const t = useTranslations("cookieBanner");
  const [isVisible, setIsVisible] = useState(false);
  const [isPrivacyModalOpen, setIsPrivacyModalOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const { mutate: saveConsent } = useSaveConsent();

  useEffect(() => {
    const consent = localStorage.getItem(CONSENT_KEY);
    if (!consent) {
      setIsVisible(true);
    }

    const token = localStorage.getItem("imm_access_token");
    setIsAuthenticated(!!token);
  }, []);

  const handleAccept = () => {
    const consentData: ConsentData = {
      version: CONSENT_VERSION,
      timestamp: new Date().toISOString(),
      accepted: true,
    };
    localStorage.setItem(CONSENT_KEY, JSON.stringify(consentData));
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
              <Button onClick={handleAccept} w="100%">
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
