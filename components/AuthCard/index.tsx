"use client";

import { Link } from "@/lib/navigation";
import { ROUTES } from "@/lib/routes";
import { Box, Heading, Text } from "@chakra-ui/react";
import { useTranslations } from "next-intl";
import {
  sharedAuthStyles as s,
  brandLinkStyle,
  footerLinkStyle,
} from "@/app/[locale]/(auth)/auth.styles";

export interface AuthCardProps {
  title: string;
  subtitle: string;
  footerText: string;
  footerLinkLabel: string;
  footerLinkHref: string;
  children: React.ReactNode;
}

export function AuthCard({
  title,
  subtitle,
  footerText,
  footerLinkLabel,
  footerLinkHref,
  children,
}: AuthCardProps) {
  const tc = useTranslations("common");

  return (
    <Box {...s.pageWrapper}>
      <Box {...s.inner}>
        <Box {...s.brandWrapper}>
          <Link href={ROUTES.HOME} style={brandLinkStyle}>
            <Heading {...s.brandHeading}>
              <Box {...s.brandFlex}>🧠 {tc("appName")}</Box>
            </Heading>
          </Link>
        </Box>

        <Box {...s.card}>
          <Box {...s.cardStack}>
            <Box>
              <Heading {...s.cardTitle}>{title}</Heading>
              <Text {...s.cardSubtitle}>{subtitle}</Text>
            </Box>

            {children}

            <Text {...s.footerText}>
              {footerText}{" "}
              <Link href={footerLinkHref} style={footerLinkStyle}>
                {footerLinkLabel}
              </Link>
            </Text>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
