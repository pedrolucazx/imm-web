"use client";

import { Link } from "@/lib/navigation";
import { Box, Heading, HStack, Text } from "@chakra-ui/react";
import { useTranslations } from "next-intl";
import { s, gearAnimations } from "../app.styles";
import { ROUTES } from "@/lib/routes";

export default function DailyLabPage() {
  const t = useTranslations("dailyLab");

  return (
    <Box {...s.pageWrapper}>
      <Box {...s.card}>
        <HStack {...s.gearsRow} aria-hidden="true">
          <Box as="span" {...s.gearBase} style={gearAnimations.small}>
            ⚙️
          </Box>
          <Box as="span" {...s.gearBase} style={gearAnimations.large}>
            ⚙️
          </Box>
          <Box as="span" {...s.gearBase} style={gearAnimations.medium}>
            ⚙️
          </Box>
        </HStack>

        <Box {...s.badge}>{t("badge")}</Box>

        <Heading {...s.title}>
          {t("title")}
          <br />
          {t("comingSoon")}
        </Heading>

        <Text {...s.subtitle}>{t("description")}</Text>

        <Box {...s.divider} />

        <HStack {...s.statusRow} role="status">
          <Box {...s.statusDot} style={gearAnimations.pulse} />
          <Text {...s.statusText}>{t("status")}</Text>
        </HStack>

        <Box asChild {...s.backLink}>
          <Link href={ROUTES.HOME}>{t("backLink")}</Link>
        </Box>
      </Box>
    </Box>
  );
}
