"use client";

import { Button } from "@/components/ui";
import { landingStyles } from "./landing.styles";
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
    color: "surface.mint",
  },
  {
    num: 2,
    daysKey: "phases.phase2.days" as const,
    titleKey: "phases.phase2.title" as const,
    descKey: "phases.phase2.desc" as const,
    color: "surface.yellow",
  },
  {
    num: 3,
    daysKey: "phases.phase3.days" as const,
    titleKey: "phases.phase3.title" as const,
    descKey: "phases.phase3.desc" as const,
    color: "surface.coral",
  },
];

const agents = [
  {
    icon: "🧠",
    titleKey: "agents.habitPlanner.title" as const,
    descKey: "agents.habitPlanner.desc" as const,
    badgeKey: "agents.habitPlanner.badge" as const,
    color: "surface.sky",
  },
  {
    icon: "📝",
    titleKey: "agents.languageTeacher.title" as const,
    descKey: "agents.languageTeacher.desc" as const,
    badgeKey: "agents.languageTeacher.badge" as const,
    color: "surface.mint",
  },
  {
    icon: "🎯",
    titleKey: "agents.behavioralCoach.title" as const,
    descKey: "agents.behavioralCoach.desc" as const,
    badgeKey: "agents.behavioralCoach.badge" as const,
    color: "surface.lavender",
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

export default function Home() {
  const t = useTranslations("landing");

  return (
    <Box minH="100vh" display="flex" flexDirection="column" bg="canvas">
      {/* Nav */}
      <Box
        as="header"
        borderBottom="3px solid black"
        bg="white"
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
            <Heading as="h2" textStyle="heroTitle" mb={6}>
              {t("hero.titleLine1")}
              <br />
              <Box as="span" bg="primary" px={2} display="inline-block" mt={2}>
                {t("hero.titleLine2")}
              </Box>
            </Heading>
            <Text textStyle="sectionSubtitle" mb={10} maxW="xl">
              {t("hero.subtitle")}
            </Text>
            <Button
              asChild
              variant="primary"
              px={10}
              py={6}
              fontSize="xl"
              _motionReduce={{ transition: "none", _hover: { transform: "none" } }}
            >
              <Link href="/register">{t("hero.cta")}</Link>
            </Button>
          </Box>
        </Box>
      </Box>

      {/* 66-Day Rule */}
      <Box as="section" borderTop="3px solid black" bg="white" py={20}>
        <Box maxW="6xl" mx="auto" px={6}>
          <Heading as="h3" textStyle="sectionTitle" mb={3}>
            {t("phases.title")}
          </Heading>
          <Text textStyle="sectionSubtitle" mb={10} maxW="2xl">
            {t("phases.subtitle")}
          </Text>
          <Grid templateColumns={{ base: "1fr", md: "repeat(3, 1fr)" }} gap={6} w="full">
            {phases.map((p) => (
              <Box key={p.num} bg={p.color} layerStyle="cardBrutal" p={8} position="relative">
                <Text as="span" aria-hidden="true" {...landingStyles.phaseNumber}>
                  {p.num}
                </Text>
                <Text textStyle="label" mb={1}>
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
      <Box as="section" borderTop="3px solid black" py={20}>
        <Box maxW="6xl" mx="auto" px={6}>
          <Heading as="h3" textStyle="sectionTitle" mb={3}>
            {t("ultralearning.title")}
          </Heading>
          <Text textStyle="sectionSubtitle" mb={6} maxW="2xl">
            {t("ultralearning.subtitle")}
          </Text>
          <Box bg="surface.yellow" p={8} maxW="2xl" layerStyle="cardBrutal">
            <Text fontSize="lg" fontWeight="900" mb={4}>
              {t("ultralearning.howItWorks")}
            </Text>
            <VStack gap={3} align="start">
              {(["1", "2", "3"] as const).map((n, i) => (
                <Flex key={n} gap={3} align="start">
                  <Text fontSize="xl" aria-hidden="true">
                    {["1️⃣", "2️⃣", "3️⃣"][i]}
                  </Text>
                  <Text fontSize="base" fontWeight="500">
                    {t(`ultralearning.steps.${n}`)}
                  </Text>
                </Flex>
              ))}
            </VStack>
          </Box>
        </Box>
      </Box>

      {/* 3 AI Agents */}
      <Box as="section" borderTop="3px solid black" bg="white" py={20}>
        <Box maxW="6xl" mx="auto" px={6}>
          <Heading as="h3" textStyle="sectionTitle" mb={10}>
            {t("agents.title")}
          </Heading>
          <Grid templateColumns={{ base: "1fr", md: "repeat(3, 1fr)" }} gap={6} w="full">
            {agents.map((a) => (
              <Box key={a.titleKey} bg={a.color} p={8} layerStyle="cardBrutal">
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
                <Box as="span" {...landingStyles.agentBadge}>
                  {t(a.badgeKey)}
                </Box>
              </Box>
            ))}
          </Grid>
        </Box>
      </Box>

      {/* Features Grid */}
      <Box as="section" borderTop="3px solid black" py={20}>
        <Box maxW="6xl" mx="auto" px={6}>
          <Heading as="h3" textStyle="featuresTitle" mb={8}>
            {t("features.title")}
          </Heading>
          <Grid
            templateColumns={{ base: "1fr", sm: "repeat(2, 1fr)", md: "repeat(3, 1fr)" }}
            gap={4}
          >
            {features.map((f) => (
              <Box key={f.titleKey} bg="white" p={6} layerStyle="cardBrutal">
                <Flex align="center" gap={4}>
                  <Text fontSize="3xl" flexShrink={0} lineHeight={1} aria-hidden="true">
                    {f.icon}
                  </Text>
                  <Box>
                    <Heading as="h4" fontSize="lg" fontWeight="900" mb={1}>
                      {t(f.titleKey)}
                    </Heading>
                    <Text fontSize="sm" fontWeight="500" color="mutedFg">
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
      <Box as="section" borderTop="3px solid black" bg="surface.lavender" py={20}>
        <Box maxW="6xl" mx="auto" px={6} textAlign="center">
          <Heading as="h3" textStyle="sectionTitle" mb={4}>
            {t("opensource.title")}
          </Heading>
          <Text textStyle="sectionSubtitle" mb={8} maxW="2xl" mx="auto">
            {t("opensource.subtitle")}
          </Text>
          <Button
            asChild
            variant="primary"
            px={8}
            py={4}
            fontSize="lg"
            bg="black"
            color="white"
            _motionReduce={{ transition: "none", _hover: { transform: "none" } }}
          >
            <a
              href="https://github.com/pedrolucazx/imm-web"
              target="_blank"
              rel="noopener noreferrer"
            >
              {t("opensource.cta")}
            </a>
          </Button>
        </Box>
      </Box>

      {/* Final CTA */}
      <Box as="section" borderTop="3px solid black" bg="black" color="white" py={16}>
        <Box maxW="6xl" mx="auto" px={6} textAlign="center">
          <Heading as="h3" fontSize="4xl" fontWeight="900" mb={4}>
            {t("cta.title")}
          </Heading>
          <Text fontSize="lg" fontWeight="500" mb={8} opacity={0.8}>
            {t("cta.subtitle")}
          </Text>
          <Button
            asChild
            variant="primary"
            px={10}
            py={5}
            fontSize="lg"
            _motionReduce={{ transition: "none", _hover: { transform: "none" } }}
          >
            <Link href="/register">{t("cta.button")}</Link>
          </Button>
        </Box>
      </Box>

      {/* Footer */}
      <Box as="footer" bg="white" borderTop="3px solid black" py={6}>
        <Box maxW="6xl" mx="auto" px={6}>
          <Flex
            align="center"
            justify={{ base: "center", md: "space-between" }}
            direction={{ base: "column", md: "row" }}
            gap={4}
            textAlign={{ base: "center", md: "left" }}
          >
            <Text fontSize="sm" fontWeight="900" color="mutedFg">
              {t("footer.copy")}
            </Text>
            <Box
              as="a"
              href="https://github.com/pedrolucazx/imm-web"
              target="_blank"
              rel="noopener noreferrer"
              fontSize="sm"
              fontWeight="900"
              color="mutedFg"
              transition="color 0.1s"
              textDecoration="none"
              _hover={{ color: "black" }}
            >
              {t("footer.github")}
            </Box>
          </Flex>
        </Box>
      </Box>
    </Box>
  );
}
