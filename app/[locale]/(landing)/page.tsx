"use client";

import { Button } from "@/components/ui";
import { Link } from "@/lib/navigation";
import { Box, Flex, Grid, Heading, Text, VStack } from "@chakra-ui/react";
import { useTranslations } from "next-intl";
import React from "react";

const phases = [
  {
    num: 1,
    daysKey: "phases.phase1.days" as const,
    titleKey: "phases.phase1.title" as const,
    descKey: "phases.phase1.desc" as const,
    color: "hsl(var(--surface-mint))",
  },
  {
    num: 2,
    daysKey: "phases.phase2.days" as const,
    titleKey: "phases.phase2.title" as const,
    descKey: "phases.phase2.desc" as const,
    color: "hsl(var(--surface-yellow))",
  },
  {
    num: 3,
    daysKey: "phases.phase3.days" as const,
    titleKey: "phases.phase3.title" as const,
    descKey: "phases.phase3.desc" as const,
    color: "hsl(var(--surface-coral))",
  },
];

const agents = [
  {
    icon: "🧠",
    titleKey: "agents.habitPlanner.title" as const,
    descKey: "agents.habitPlanner.desc" as const,
    badgeKey: "agents.habitPlanner.badge" as const,
    color: "hsl(var(--surface-sky))",
  },
  {
    icon: "📝",
    titleKey: "agents.languageTeacher.title" as const,
    descKey: "agents.languageTeacher.desc" as const,
    badgeKey: "agents.languageTeacher.badge" as const,
    color: "hsl(var(--surface-mint))",
  },
  {
    icon: "🎯",
    titleKey: "agents.behavioralCoach.title" as const,
    descKey: "agents.behavioralCoach.desc" as const,
    badgeKey: "agents.behavioralCoach.badge" as const,
    color: "hsl(var(--surface-lavender))",
  },
];

const features = [
  {
    icon: "📅",
    titleKey: "features.cycles.title" as const,
    descKey: "features.cycles.desc" as const,
  },
  {
    icon: "📊",
    titleKey: "features.analytics.title" as const,
    descKey: "features.analytics.desc" as const,
  },
  {
    icon: "✍️",
    titleKey: "features.journaling.title" as const,
    descKey: "features.journaling.desc" as const,
  },
  {
    icon: "🎙️",
    titleKey: "features.voice.title" as const,
    descKey: "features.voice.desc" as const,
  },
  {
    icon: "🌍",
    titleKey: "features.multilanguage.title" as const,
    descKey: "features.multilanguage.desc" as const,
  },
  {
    icon: "⚡",
    titleKey: "features.freeAI.title" as const,
    descKey: "features.freeAI.desc" as const,
  },
];

const reducedMotion = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export default function Home() {
  const t = useTranslations("landing");

  return (
    <Box minH="100vh" display="flex" flexDirection="column" bg="hsl(var(--background))">
      {/* Nav */}
      <Box
        as="header"
        borderBottom="3px solid hsl(var(--foreground))"
        bg="hsl(var(--card))"
        position="sticky"
        top={0}
        zIndex={50}
      >
        <Box maxW="6xl" mx="auto" px={6} py={4}>
          <Flex
            align={{ base: "flex-start", md: "center" }}
            justify={{ base: "flex-start", md: "space-between" }}
            direction={{ base: "column", md: "row" }}
            gap={{ base: 3, md: 0 }}
          >
            <Heading as="span" fontSize="2xl" fontWeight="900" whiteSpace="nowrap">
              <Box as="span" aria-hidden="true">
                🧠
              </Box>{" "}
              Inside My Mind
            </Heading>
            <Flex gap={3} width="100%">
              <Button
                asChild
                variant="muted"
                px={5}
                py={3}
                minH="11"
                fontSize="sm"
                fontWeight="bold"
                textTransform="uppercase"
                letterSpacing="wider"
                w="full"
                style={{ flex: 1 }}
              >
                <Link href="/login">{t("nav.login")}</Link>
              </Button>
              <Button
                asChild
                variant="primary"
                px={5}
                py={3}
                minH="11"
                fontSize="sm"
                fontWeight="bold"
                textTransform="uppercase"
                letterSpacing="wider"
                w="full"
                style={{ flex: 1 }}
              >
                <Link href="/register">{t("nav.signup")}</Link>
              </Button>
            </Flex>
          </Flex>
        </Box>
      </Box>

      {/* Hero */}
      <Box as="section" py={{ base: 20, md: 24 }}>
        <Box maxW="6xl" mx="auto" px={6}>
          <Box maxW="3xl">
            <Heading
              as="h2"
              fontSize={{ base: "5xl", md: "7xl" }}
              fontWeight="900"
              lineHeight="1.1"
              mb={6}
            >
              {t("hero.titleLine1")}
              <br />
              <Box
                as="span"
                style={{ backgroundColor: "hsl(var(--primary))" }}
                px={2}
                display="inline-block"
                mt={2}
              >
                {t("hero.titleLine2")}
              </Box>
            </Heading>
            <Text
              fontSize={{ base: "xl", md: "2xl" }}
              fontWeight="500"
              style={{ color: "hsl(var(--muted-foreground))" }}
              mb={10}
              maxW="xl"
            >
              {t("hero.subtitle")}
            </Text>
            <Link href="/register">
              <Box
                as="button"
                px={10}
                py={6}
                fontWeight="900"
                fontSize="xl"
                textTransform="uppercase"
                letterSpacing="wider"
                borderRadius={0}
                transition="transform 0.1s, box-shadow 0.1s"
                cursor="pointer"
                style={{
                  backgroundColor: "hsl(var(--primary))",
                  color: "hsl(var(--primary-foreground))",
                  border: "3px solid hsl(var(--foreground))",
                  boxShadow: "4px 4px 0 hsl(var(--foreground))",
                }}
                _hover={{
                  transform: "translate(-2px, -2px)",
                  boxShadow: "6px 6px 0 hsl(var(--foreground))",
                }}
                _motionReduce={{
                  transition: "none",
                  _hover: { transform: "none" },
                }}
              >
                {t("hero.cta")}
              </Box>
            </Link>
          </Box>
        </Box>
      </Box>

      {/* 66-Day Rule */}
      <Box as="section" borderTop="3px solid hsl(var(--foreground))" bg="hsl(var(--card))" py={20}>
        <Box maxW="6xl" mx="auto" px={6}>
          <Heading
            as="h3"
            fontSize={{ base: "2xl", md: "4xl" }}
            fontWeight="900"
            mb={3}
            textTransform="uppercase"
            letterSpacing="wider"
          >
            {t("phases.title")}
          </Heading>
          <Text
            fontSize={{ base: "lg", md: "xl" }}
            fontWeight="500"
            color="hsl(var(--muted-foreground))"
            mb={10}
            maxW="2xl"
          >
            {t("phases.subtitle")}
          </Text>
          <Grid templateColumns={{ base: "1fr", md: "repeat(3, 1fr)" }} gap={6} w="full">
            {phases.map((p) => (
              <Box
                key={p.num}
                style={{
                  backgroundColor: p.color,
                  border: "3px solid hsl(var(--foreground))",
                  boxShadow: "4px 4px 0 hsl(var(--foreground))",
                }}
                p={8}
                position="relative"
              >
                <Text
                  as="span"
                  aria-hidden="true"
                  fontSize="6xl"
                  fontWeight="900"
                  opacity={0.2}
                  position="absolute"
                  top={4}
                  right={4}
                  lineHeight={1}
                >
                  {p.num}
                </Text>
                <Text
                  fontSize="sm"
                  fontWeight="900"
                  textTransform="uppercase"
                  letterSpacing="wider"
                  mb={1}
                >
                  {t("phases.phaseLabel", { num: p.num, days: t(p.daysKey) })}
                </Text>
                <Heading as="h4" fontSize="2xl" fontWeight="900" mb={2}>
                  {t(p.titleKey)}
                </Heading>
                <Text fontSize="base" fontWeight="500">
                  {t(p.descKey)}
                </Text>
              </Box>
            ))}
          </Grid>
        </Box>
      </Box>

      {/* Ultralearning */}
      <Box as="section" borderTop="3px solid hsl(var(--foreground))" py={20}>
        <Box maxW="6xl" mx="auto" px={6}>
          <Heading
            as="h3"
            fontSize={{ base: "2xl", md: "4xl" }}
            fontWeight="900"
            mb={3}
            textTransform="uppercase"
            letterSpacing="wider"
          >
            {t("ultralearning.title")}
          </Heading>
          <Text
            fontSize={{ base: "lg", md: "xl" }}
            fontWeight="500"
            color="hsl(var(--muted-foreground))"
            mb={6}
            maxW="2xl"
          >
            {t("ultralearning.subtitle")}
          </Text>
          <Box
            bg="hsl(var(--surface-yellow))"
            p={8}
            maxW="2xl"
            border="3px solid hsl(var(--foreground))"
            boxShadow="4px 4px 0 hsl(var(--foreground))"
          >
            <Text fontSize="lg" fontWeight="900" mb={4}>
              {t("ultralearning.howItWorks")}
            </Text>
            <VStack gap={3} align="start">
              <Flex gap={3} align="start">
                <Text fontSize="xl" aria-hidden="true">
                  1️⃣
                </Text>
                <Text fontSize="base" fontWeight="500">
                  {t("ultralearning.steps.1")}
                </Text>
              </Flex>
              <Flex gap={3} align="start">
                <Text fontSize="xl" aria-hidden="true">
                  2️⃣
                </Text>
                <Text fontSize="base" fontWeight="500">
                  {t("ultralearning.steps.2")}
                </Text>
              </Flex>
              <Flex gap={3} align="start">
                <Text fontSize="xl" aria-hidden="true">
                  3️⃣
                </Text>
                <Text fontSize="base" fontWeight="500">
                  {t("ultralearning.steps.3")}
                </Text>
              </Flex>
            </VStack>
          </Box>
        </Box>
      </Box>

      {/* 3 AI Agents */}
      <Box as="section" borderTop="3px solid hsl(var(--foreground))" bg="hsl(var(--card))" py={20}>
        <Box maxW="6xl" mx="auto" px={6}>
          <Heading
            as="h3"
            fontSize={{ base: "2xl", md: "4xl" }}
            fontWeight="900"
            mb={10}
            textTransform="uppercase"
            letterSpacing="wider"
          >
            {t("agents.title")}
          </Heading>
          <Grid templateColumns={{ base: "1fr", md: "repeat(3, 1fr)" }} gap={6} w="full">
            {agents.map((a) => (
              <Box
                key={a.titleKey}
                bg={a.color}
                p={8}
                border="3px solid hsl(var(--foreground))"
                boxShadow="4px 4px 0 hsl(var(--foreground))"
              >
                <Flex align="center" gap={3} mb={3}>
                  <Text fontSize="4xl" lineHeight={1} aria-hidden="true">
                    {a.icon}
                  </Text>
                  <Heading as="h4" fontSize="2xl" fontWeight="900">
                    {t(a.titleKey)}
                  </Heading>
                </Flex>
                <Text fontSize="base" fontWeight="500" mb={4}>
                  {t(a.descKey)}
                </Text>
                <Box
                  as="span"
                  display="inline-block"
                  px={3}
                  py={1}
                  bg="hsl(var(--card))"
                  border="2px solid hsl(var(--foreground))"
                  fontSize="xs"
                  fontWeight="900"
                  textTransform="uppercase"
                >
                  {t(a.badgeKey)}
                </Box>
              </Box>
            ))}
          </Grid>
        </Box>
      </Box>

      {/* Features Grid */}
      <Box as="section" borderTop="3px solid hsl(var(--foreground))" py={20}>
        <Box maxW="6xl" mx="auto" px={6}>
          <Heading
            as="h3"
            fontSize="3xl"
            fontWeight="900"
            mb={8}
            textTransform="uppercase"
            letterSpacing="wider"
          >
            {t("features.title")}
          </Heading>
          <Grid
            templateColumns={{ base: "1fr", sm: "repeat(2, 1fr)", md: "repeat(3, 1fr)" }}
            gap={4}
          >
            {features.map((f) => (
              <Box
                key={f.titleKey}
                bg="hsl(var(--card))"
                p={6}
                border="3px solid hsl(var(--foreground))"
                boxShadow="4px 4px 0 hsl(var(--foreground))"
              >
                <Flex align="center" gap={4}>
                  <Text fontSize="3xl" flexShrink={0} lineHeight={1} aria-hidden="true">
                    {f.icon}
                  </Text>
                  <Box>
                    <Heading as="h4" fontSize="lg" fontWeight="900" mb={1}>
                      {t(f.titleKey)}
                    </Heading>
                    <Text fontSize="sm" fontWeight="500" color="hsl(var(--muted-foreground))">
                      {t(f.descKey)}
                    </Text>
                  </Box>
                </Flex>
              </Box>
            ))}
          </Grid>
        </Box>
      </Box>

      {/* Open Source */}
      <Box
        as="section"
        borderTop="3px solid hsl(var(--foreground))"
        bg="hsl(var(--surface-lavender))"
        py={20}
      >
        <Box maxW="6xl" mx="auto" px={6} textAlign="center">
          <Heading
            as="h3"
            fontSize={{ base: "2xl", md: "4xl" }}
            fontWeight="900"
            mb={4}
            textTransform="uppercase"
            letterSpacing="wider"
          >
            {t("opensource.title")}
          </Heading>
          <Text
            fontSize={{ base: "lg", md: "xl" }}
            fontWeight="500"
            color="hsl(var(--muted-foreground))"
            mb={8}
            maxW="2xl"
            mx="auto"
          >
            {t("opensource.subtitle")}
          </Text>
          <a
            href="https://github.com/pedrolucazx/imm-web"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-block",
              padding: "1rem 2rem",
              backgroundColor: "hsl(var(--foreground))",
              color: "hsl(var(--card))",
              fontWeight: 900,
              fontSize: "1.125rem",
              textTransform: "uppercase",
              letterSpacing: "0.05em",
              border: "3px solid hsl(var(--foreground))",
              boxShadow: "4px 4px 0 hsl(var(--foreground))",
              borderRadius: 0,
              transition: "transform 0.1s, box-shadow 0.1s",
              cursor: "pointer",
              textDecoration: "none",
            }}
            onMouseEnter={(e) => {
              if (reducedMotion()) return;
              e.currentTarget.style.transform = "translate(-2px, -2px)";
              e.currentTarget.style.boxShadow = "6px 6px 0 hsl(var(--foreground))";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "";
              e.currentTarget.style.boxShadow = "4px 4px 0 hsl(var(--foreground))";
            }}
          >
            {t("opensource.cta")}
          </a>
        </Box>
      </Box>

      {/* Final CTA */}
      <Box
        as="section"
        borderTop="3px solid hsl(var(--foreground))"
        bg="hsl(var(--foreground))"
        color="hsl(var(--card))"
        py={16}
      >
        <Box maxW="6xl" mx="auto" px={6} textAlign="center">
          <Heading as="h3" fontSize="4xl" fontWeight="900" mb={4}>
            {t("cta.title")}
          </Heading>
          <Text fontSize="lg" fontWeight="500" mb={8} opacity={0.8}>
            {t("cta.subtitle")}
          </Text>
          <Link href="/register">
            <Box
              as="button"
              px={10}
              py={5}
              bg="hsl(var(--primary))"
              color="hsl(var(--primary-foreground))"
              fontWeight="900"
              fontSize="lg"
              textTransform="uppercase"
              letterSpacing="wider"
              border="3px solid hsl(var(--foreground))"
              boxShadow="4px 4px 0 hsl(var(--foreground))"
              borderRadius={0}
              transition="transform 0.1s, box-shadow 0.1s"
              cursor="pointer"
              _hover={{
                transform: "translate(-2px, -2px)",
                boxShadow: "6px 6px 0 hsl(var(--foreground))",
              }}
              _motionReduce={{
                transition: "none",
                _hover: { transform: "none" },
              }}
            >
              {t("cta.button")}
            </Box>
          </Link>
        </Box>
      </Box>

      {/* Footer */}
      <Box as="footer" bg="hsl(var(--card))" borderTop="3px solid hsl(var(--foreground))" py={6}>
        <Box maxW="6xl" mx="auto" px={6}>
          <Flex
            align="center"
            justify={{ base: "center", md: "space-between" }}
            direction={{ base: "column", md: "row" }}
            gap={4}
            textAlign={{ base: "center", md: "left" }}
          >
            <Text fontSize="sm" fontWeight="900" color="hsl(var(--muted-foreground))">
              {t("footer.copy")}
            </Text>
            <a
              href="https://github.com/pedrolucazx/imm-web"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontSize: "0.875rem",
                fontWeight: 900,
                color: "hsl(var(--muted-foreground))",
                transition: "color 0.1s",
                textDecoration: "none",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = "hsl(var(--foreground))";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = "hsl(var(--muted-foreground))";
              }}
            >
              {t("footer.github")}
            </a>
          </Flex>
        </Box>
      </Box>
    </Box>
  );
}
