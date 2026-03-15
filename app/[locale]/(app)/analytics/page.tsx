"use client";

import { Badge, Box, Text } from "@chakra-ui/react";
import { useTranslations } from "next-intl";
import { PageWrapper } from "@/components/PageWrapper";
import { Link } from "@/lib/navigation";
import { ROUTES } from "@/lib/routes";

export default function AnalyticsPage() {
  const t = useTranslations("comingSoon");

  return (
    <PageWrapper title={t("analytics.pageTitle")}>
      <Box layerStyle="cardBrutal" bg="card" p={8} textAlign="center" maxW="480px">
        <Badge colorPalette="yellow" mb={4} fontSize="sm" px={3} py={1}>
          {t("badge")}
        </Badge>
        <Text fontWeight="bold" mb={6}>
          {t("message")}
        </Text>
        <Link
          href={ROUTES.APP_DAILY_LAB}
          style={{ fontWeight: "bold", textDecoration: "underline" }}
        >
          {t("backLink")}
        </Link>
      </Box>
    </PageWrapper>
  );
}
