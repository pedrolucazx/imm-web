"use client";

import { Link } from "@/lib/navigation";
import { ROUTES } from "@/lib/routes";
import { Box, Heading, Text, chakra } from "@chakra-ui/react";
import { useTranslations } from "next-intl";
import { sharedAuthStyles as s } from "@/app/[locale]/(auth)/auth.styles";

const ChakraLink = chakra(Link);

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
          <ChakraLink
            href={ROUTES.HOME}
            textDecoration="none"
            color="inherit"
            _focusVisible={{ outline: "2px solid", outlineColor: "primary", outlineOffset: "2px" }}
          >
            <Heading {...s.brandHeading}>
              <Box {...s.brandFlex}>🧠 {tc("appName")}</Box>
            </Heading>
          </ChakraLink>
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
              <ChakraLink
                href={footerLinkHref}
                fontWeight="bold"
                color="fg"
                textDecoration="underline"
                textUnderlineOffset="4px"
                _hover={{ color: "primary" }}
                _focusVisible={{
                  outline: "2px solid",
                  outlineColor: "primary",
                  outlineOffset: "2px",
                }}
              >
                {footerLinkLabel}
              </ChakraLink>
            </Text>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
