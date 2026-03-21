"use client";

import { Box, Text } from "@chakra-ui/react";
import { useTranslations } from "next-intl";
import { Modal } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";
import { s } from "./styles";

interface PrivacyPolicyModalProps {
  open: boolean;
  onClose: () => void;
  onAccept: () => void;
}

export function PrivacyPolicyModal({ open, onClose, onAccept }: PrivacyPolicyModalProps) {
  const t = useTranslations("privacyPolicy");

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={t("title")}
      maxW="640px"
      footer={
        <Box display="flex" gap={2} w="100%">
          <Button type="button" onClick={onClose} variant="muted" flex={1}>
            {t("close")}
          </Button>
          <Button type="button" onClick={onAccept} flex={1}>
            {t("acceptAndClose")}
          </Button>
        </Box>
      }
    >
      <Box {...s.body}>
        <Box {...s.section}>
          <Text {...s.sectionTitle}>{t("dataCollection")}</Text>
          <Text {...s.sectionText}>{t("dataCollectionText")}</Text>
        </Box>

        <Box {...s.section}>
          <Text {...s.sectionTitle}>{t("aiUsage")}</Text>
          <Text {...s.sectionText}>{t("aiUsageText")}</Text>
        </Box>

        <Box {...s.section}>
          <Text {...s.sectionTitle}>{t("dataStorage2")}</Text>
          <Text {...s.sectionText}>{t("dataStorageText")}</Text>
        </Box>

        <Box {...s.section}>
          <Text {...s.sectionTitle}>{t("userRights")}</Text>
          <Text {...s.sectionText}>{t("userRightsText")}</Text>
        </Box>

        <Box {...s.section}>
          <Text {...s.sectionTitle}>{t("cookies")}</Text>
          <Text {...s.sectionText}>{t("cookiesText")}</Text>
        </Box>

        <Box {...s.section}>
          <Text {...s.sectionTitle}>{t("contact")}</Text>
          <Text {...s.sectionText}>{t("contactText")}</Text>
        </Box>

        <Box {...s.section}>
          <Text {...s.sectionTitle}>{t("updates")}</Text>
          <Text {...s.sectionText}>{t("updatesText")}</Text>
        </Box>
      </Box>
    </Modal>
  );
}
